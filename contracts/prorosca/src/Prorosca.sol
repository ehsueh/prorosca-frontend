// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
//@dev Prorosca is a peer-to-peer lending platform for crewmates to join sails
//@dev this is a proof of concept version that hasn't been fully tested 
//@dev (definitely not optimized but since we are on Worldchain where gas is free, we will allow it for now)
contract Prorosca {
    enum Urgency { Eventually, Soon, Now }

    struct Bid {
        address bidder;
        uint256 amount;  // This is now the interest rate in basis points (e.g., 1000 = 10%)
        uint256 timestamp;
    }

    struct CaptainReputation {
        uint256 successfulSails;
        uint256 abandonedSails;
        uint256 lockedCapital;
        uint256[] ledSails;
        bool isActive;
    }

    struct CrewmateApplication {
        address applicant;
        uint256 monthlyBudget;
        uint256 desiredLoanAmount;
        Urgency urgency;
        uint256 timestamp;
        bool isMatched;
        uint256 contribution;
    }

    struct Sail {
        string name;
        uint256 monthlyPrincipal;
        uint256 totalCrewmates;
        uint256 durationInDays;
        address[] crewmates;
        bool isSailing;
        uint256 startTime;
        uint256 nextPayoutTime;
        uint256 currentRound;
        Bid highestBid;
        address captain;
        mapping(address => bool) hasContributed;
        mapping(uint256 => address) roundWinners;
        mapping(address => uint256) contributions;
        mapping(address => uint256) winnerInterestRates;  // Interest rate they must pay in future rounds
    }

    mapping(uint256 => Sail) public sails;
    uint256 public sailCount;
    
    // New state variables for matching system
    CrewmateApplication[] public pendingApplications;
    mapping(address => uint256) public applicantToIndex;
    mapping(address => CaptainReputation) public captainReputations;

    event CaptainRegistered(address indexed captain, uint256 lockedCapital);
    event CaptainWithdrawn(address indexed captain, uint256 unlockedCapital);
    event SailLaunched(
        uint256 indexed sailId,
        string name,
        uint256 monthlyPrincipal,
        address indexed captain
    );
    event CrewmateJoined(uint256 indexed sailId, address indexed crewmate);
    event ApplicationSubmitted(
        address indexed applicant,
        uint256 monthlyBudget,
        uint256 desiredLoanAmount,
        Urgency urgency
    );
    event CrewmateMatched(address indexed applicant, uint256 indexed sailId);
    event BidPlaced(
        uint256 indexed sailId,
        address indexed bidder,
        uint256 amount
    );
    event RoundCompleted(
        uint256 indexed sailId,
        uint256 indexed round,
        address winner,
        uint256 amount
    );
    event SailAbandoned(uint256 indexed sailId, address indexed captain);
    event SailCompleted(uint256 indexed sailId, address indexed captain);

    modifier onlyCaptain(uint256 sailId) {
        require(msg.sender == sails[sailId].captain, "Only sail captain can call this");
        _;
    }

    modifier onlyActiveCaptain() {
        require(captainReputations[msg.sender].isActive, "Not an active captain");
        _;
    }

    modifier onlyCrewmate(uint256 sailId) {
        Sail storage sail = sails[sailId];
        bool isCrewmate = false;
        for (uint256 i = 0; i < sail.crewmates.length; i++) {
            if (sail.crewmates[i] == msg.sender) {
                isCrewmate = true;
                break;
            }
        }
        require(isCrewmate, "Only crewmates can call this");
        _;
    }

    function registerAsCaptain() public payable {
        require(!captainReputations[msg.sender].isActive, "Already a captain");
        require(msg.value > 0, "Must lock capital to become captain");

        CaptainReputation storage reputation = captainReputations[msg.sender];
        reputation.lockedCapital = msg.value;
        reputation.isActive = true;
        reputation.successfulSails = 0;
        reputation.abandonedSails = 0;

        emit CaptainRegistered(msg.sender, msg.value);
    }

    function withdrawAsCaptain() public {
        CaptainReputation storage reputation = captainReputations[msg.sender];
        require(reputation.isActive, "Not an active captain");
        
        // Check if captain has any active sails
        for (uint256 i = 0; i < reputation.ledSails.length; i++) {
            uint256 sailId = reputation.ledSails[i];
            require(!sails[sailId].isSailing, "Cannot withdraw with active sails");
        }

        uint256 amountToWithdraw = reputation.lockedCapital;
        reputation.lockedCapital = 0;
        reputation.isActive = false;

        payable(msg.sender).transfer(amountToWithdraw);
        emit CaptainWithdrawn(msg.sender, amountToWithdraw);
    }

    function launchSail(
        string memory name,
        uint256 monthlyPrincipal,
        uint256 totalCrewmates,
        uint256 durationInDays
    ) public onlyActiveCaptain returns (uint256) {
        require(totalCrewmates > 1, "Need at least 2 crewmates");
        require(durationInDays > 0, "Duration must be positive");
        require(monthlyPrincipal > 0, "Principal must be positive");
        
        CaptainReputation storage reputation = captainReputations[msg.sender];
        require(
            reputation.lockedCapital >= monthlyPrincipal * totalCrewmates,
            "Insufficient locked capital for sail size"
        );

        uint256 sailId = sailCount++;
        Sail storage sail = sails[sailId];

        sail.name = name;
        sail.monthlyPrincipal = monthlyPrincipal;
        sail.totalCrewmates = totalCrewmates;
        sail.durationInDays = durationInDays;
        sail.isSailing = true;
        sail.startTime = block.timestamp;
        sail.nextPayoutTime = block.timestamp + (durationInDays * 1 days);
        sail.currentRound = 0;
        sail.captain = msg.sender;

        // Captain is the first crewmate
        sail.crewmates.push(msg.sender);
        
        // Track this sail in captain's reputation
        reputation.ledSails.push(sailId);

        emit SailLaunched(sailId, name, monthlyPrincipal, msg.sender);
        return sailId;
    }

    function joinSail(
        uint256 monthlyBudget,
        uint256 desiredLoanAmount,
        Urgency urgency
    ) public payable {
        require(msg.value >= monthlyBudget, "Must commit funds to apply");
        require(applicantToIndex[msg.sender] == 0, "Already applied");

        CrewmateApplication memory application = CrewmateApplication({
            applicant: msg.sender,
            monthlyBudget: monthlyBudget,
            desiredLoanAmount: desiredLoanAmount,
            urgency: urgency,
            timestamp: block.timestamp,
            isMatched: false,
            contribution: msg.value
        });

        pendingApplications.push(application);
        applicantToIndex[msg.sender] = pendingApplications.length;

        emit ApplicationSubmitted(
            msg.sender,
            monthlyBudget,
            desiredLoanAmount,
            urgency
        );
    }

    function hasWonBefore(uint256 sailId, address crewmate) public view returns (bool) {
        Sail storage sail = sails[sailId];
        for (uint256 i = 0; i < sail.currentRound; i++) {
            if (sail.roundWinners[i] == crewmate) {
                return true;
            }
        }
        return false;
    }

    function makePayment(uint256 sailId) public payable onlyCrewmate(sailId) {
        Sail storage sail = sails[sailId];
        require(sail.isSailing, "This sail is not active");
        require(!sail.hasContributed[msg.sender], "Already contributed this round");
        
        uint256 requiredAmount = sail.monthlyPrincipal;
        if (sail.winnerInterestRates[msg.sender] > 0) {
            requiredAmount += (sail.monthlyPrincipal * sail.winnerInterestRates[msg.sender]) / 10000;
        }
        require(msg.value == requiredAmount, "Must contribute exact principal + interest");
        
        sail.contributions[msg.sender] = msg.value;
        sail.hasContributed[msg.sender] = true;
    }

    function placeBid(uint256 sailId, uint256 interestRate) public payable onlyCrewmate(sailId) {
        Sail storage sail = sails[sailId];
        require(sail.isSailing, "This sail is not active");
        require(
            block.timestamp < sail.nextPayoutTime,
            "Bidding period has ended"
        );
        require(
            interestRate > sail.highestBid.amount,
            "Interest rate must be higher than current highest"
        );
        require(!hasWonBefore(sailId, msg.sender), "Previous winners cannot bid again");

        // If they haven't contributed this round, they must send principal
        if (!sail.hasContributed[msg.sender]) {
            require(msg.value == sail.monthlyPrincipal, "Must contribute monthly principal");
            sail.contributions[msg.sender] = msg.value;
            sail.hasContributed[msg.sender] = true;
        } else {
            require(msg.value == 0, "Already contributed this round");
        }

        sail.highestBid = Bid({
            bidder: msg.sender,
            amount: interestRate,
            timestamp: block.timestamp
        });

        emit BidPlaced(sailId, msg.sender, interestRate);
    }

    function completeRound(uint256 sailId) public {
        Sail storage sail = sails[sailId];
        require(sail.isSailing, "This sail is not active");
        require(
            block.timestamp >= sail.nextPayoutTime,
            "Round is not over yet"
        );
        require(
            sail.crewmates.length == sail.totalCrewmates,
            "Crew not full yet"
        );

        address winner = sail.highestBid.bidder;
        uint256 payout = sail.monthlyPrincipal * sail.totalCrewmates;

        // Record winner and their interest rate for future rounds
        sail.roundWinners[sail.currentRound] = winner;
        sail.winnerInterestRates[winner] = sail.highestBid.amount;
        
        // Transfer the pool to the winner
        payable(winner).transfer(payout);

        emit RoundCompleted(
            sailId,
            sail.currentRound,
            winner,
            payout
        );

        // Reset for next round
        sail.currentRound++;
        sail.nextPayoutTime += sail.durationInDays * 1 days;
        sail.highestBid = Bid(address(0), 0, 0);

        // Reset contributions tracking for next round
        for (uint256 i = 0; i < sail.crewmates.length; i++) {
            sail.hasContributed[sail.crewmates[i]] = false;
        }

        // Check if all rounds are complete
        if (sail.currentRound >= sail.totalCrewmates) {
            sail.isSailing = false;
            // Update captain reputation for successful completion
            CaptainReputation storage reputation = captainReputations[sail.captain];
            reputation.successfulSails++;
            emit SailCompleted(sailId, sail.captain);
        }
    }

    function abandonShip(uint256 sailId) public onlyCaptain(sailId) {
        Sail storage sail = sails[sailId];
        require(sail.isSailing, "This sail is not active");
        
        // Return remaining funds to crewmates
        for (uint256 i = 0; i < sail.crewmates.length; i++) {
            address crewmate = sail.crewmates[i];
            uint256 contribution = sail.contributions[crewmate];
            if (contribution > 0) {
                payable(crewmate).transfer(contribution);
            }
        }

        sail.isSailing = false;
        
        // Update captain reputation for abandonment
        CaptainReputation storage reputation = captainReputations[sail.captain];
        reputation.abandonedSails++;
        
        emit SailAbandoned(sailId, sail.captain);
    }

    function matchCrewmateToSail(
        uint256 applicationIndex,
        uint256 sailId
    ) public onlyCaptain(sailId) {
        require(applicationIndex < pendingApplications.length, "Invalid application");
        CrewmateApplication storage application = pendingApplications[applicationIndex];
        require(!application.isMatched, "Already matched");

        Sail storage sail = sails[sailId];
        require(sail.isSailing, "Sail not active");
        require(sail.crewmates.length < sail.totalCrewmates, "Sail is full");
        require(
            application.contribution >= sail.monthlyPrincipal,
            "Insufficient contribution"
        );

        // Add crewmate to sail
        sail.crewmates.push(application.applicant);
        sail.contributions[application.applicant] = application.contribution;
        
        // Mark application as matched
        application.isMatched = true;

        emit CrewmateMatched(application.applicant, sailId);
        emit CrewmateJoined(sailId, application.applicant);
    }

    function withdrawUnmatchedApplication() public {
        uint256 index = applicantToIndex[msg.sender];
        require(index > 0, "No application found");
        index--; // Convert to zero-based index

        CrewmateApplication storage application = pendingApplications[index];
        require(!application.isMatched, "Already matched");

        // Return contribution
        payable(msg.sender).transfer(application.contribution);

        // Remove application
        delete applicantToIndex[msg.sender];
        // Move last element to deleted position if not already last
        if (index != pendingApplications.length - 1) {
            pendingApplications[index] = pendingApplications[pendingApplications.length - 1];
            applicantToIndex[pendingApplications[index].applicant] = index + 1;
        }
        pendingApplications.pop();
    }

    // View functions
    function getSailInfo(uint256 sailId)
        public
        view
        returns (
            string memory name,
            uint256 monthlyPrincipal,
            uint256 totalCrewmates,
            uint256 durationInDays,
            bool isSailing,
            uint256 startTime,
            uint256 nextPayoutTime,
            uint256 currentRound,
            uint256 currentCrewmates,
            address captain,
            address highestBidder,
            uint256 highestBid
        )
    {
        Sail storage sail = sails[sailId];
        return (
            sail.name,
            sail.monthlyPrincipal,
            sail.totalCrewmates,
            sail.durationInDays,
            sail.isSailing,
            sail.startTime,
            sail.nextPayoutTime,
            sail.currentRound,
            sail.crewmates.length,
            sail.captain,
            sail.highestBid.bidder,
            sail.highestBid.amount
        );
    }

    function getCrewmates(uint256 sailId) public view returns (address[] memory) {
        return sails[sailId].crewmates;
    }

    function getRoundWinner(uint256 sailId, uint256 round)
        public
        view
        returns (address)
    {
        return sails[sailId].roundWinners[round];
    }

    function getContribution(uint256 sailId, address crewmate)
        public
        view
        returns (uint256)
    {
        return sails[sailId].contributions[crewmate];
    }

    function getPendingApplicationsCount() public view returns (uint256) {
        return pendingApplications.length;
    }

    function getPendingApplication(uint256 index)
        public
        view
        returns (
            address applicant,
            uint256 monthlyBudget,
            uint256 desiredLoanAmount,
            Urgency urgency,
            uint256 timestamp,
            bool isMatched,
            uint256 contribution
        )
    {
        require(index < pendingApplications.length, "Invalid index");
        CrewmateApplication storage app = pendingApplications[index];
        return (
            app.applicant,
            app.monthlyBudget,
            app.desiredLoanAmount,
            app.urgency,
            app.timestamp,
            app.isMatched,
            app.contribution
        );
    }

    // New view functions for captain reputation
    function getCaptainReputation(address captain) 
        public 
        view 
        returns (
            uint256 successfulSails,
            uint256 abandonedSails,
            uint256 lockedCapital,
            uint256[] memory ledSails,
            bool isActive
        )
    {
        CaptainReputation storage reputation = captainReputations[captain];
        return (
            reputation.successfulSails,
            reputation.abandonedSails,
            reputation.lockedCapital,
            reputation.ledSails,
            reputation.isActive
        );
    }

    function getCaptainSuccessRate(address captain) public view returns (uint256) {
        CaptainReputation storage reputation = captainReputations[captain];
        uint256 totalSails = reputation.successfulSails + reputation.abandonedSails;
        if (totalSails == 0) return 0;
        return (reputation.successfulSails * 100) / totalSails;
    }
} 