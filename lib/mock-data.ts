// Mock data for development and demo purposes

export const mockUserState = {
  state: "sailing", // "sailing" | "not-sailing" | "marooned" | "crew-incident"
};

export const mockSailingData = {
  currentRound: 3,
  totalRounds: 12,
  roundsRemaining: 9,
  hasWon: false,
  lastRound: {
    awardedAmount: 2400,
    winningInterest: 8.5,
    winningMember: "CaptainBlue.eth",
  },
  nextPayment: {
    amount: 200,
    currency: "USDC",
    dueDate: "2025-06-15T00:00:00Z",
  },
  crewMembers: [
    { id: 1, name: "CaptainBlue.eth", isActive: true, hasWon: true, isCaptain: true },
    { id: 2, name: "MarineMaster.eth", isActive: true, hasWon: true },
    { id: 3, name: "OceanRider.eth", isActive: true, hasWon: false },
    { id: 4, name: "WaveWalker.eth", isActive: true, hasWon: false },
    { id: 5, name: "You", isActive: true, hasWon: false },
  ],
};

export const mockIncidentData = {
  defaulter: "WaveWalker.eth",
  defaultAmount: 200,
  defaultRound: 3,
  captainBounty: 20,
};

export const mockMaroonedData = {
  outstandingDebt: {
    principal: 200,
    interest: 17,
    penalty: 30,
    total: 247,
  },
  missedPayments: [
    {
      date: "2025-05-15T00:00:00Z",
      amount: 200,
    },
  ],
  lockDeposit: 100,
};

export const mockHistoryData = [
  {
    id: 1,
    name: "North Sea Voyage",
    startDate: "2024-12-01T00:00:00Z",
    endDate: "2025-05-01T00:00:00Z",
    status: "completed",
    totalMembers: 5,
    totalValue: 2500,
    userWonRound: 3,
    rounds: [
      {
        round: 1,
        winner: "CaptainBlue.eth",
        interest: 9.2,
        amount: 2480,
      },
      {
        round: 2,
        winner: "MarineMaster.eth",
        interest: 8.8,
        amount: 2440,
      },
      {
        round: 3,
        winner: "You",
        interest: 8.5,
        amount: 2425,
      },
      {
        round: 4,
        winner: "OceanRider.eth",
        interest: 7.9,
        amount: 2395,
      },
      {
        round: 5,
        winner: "WaveWalker.eth",
        interest: 7.1,
        amount: 2355,
      },
    ],
  },
  {
    id: 2,
    name: "Caribbean Circle",
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-11-01T00:00:00Z",
    status: "completed",
    totalMembers: 6,
    totalValue: 3000,
    userWonRound: 5,
    rounds: [
      {
        round: 1,
        winner: "IslandHopper.eth",
        interest: 10.2,
        amount: 2940,
      },
      {
        round: 2,
        winner: "SunsetSailor.eth",
        interest: 9.8,
        amount: 2906,
      },
      {
        round: 3,
        winner: "TropicalTide.eth",
        interest: 9.1,
        amount: 2868,
      },
      {
        round: 4,
        winner: "CoralCruiser.eth",
        interest: 8.5,
        amount: 2835,
      },
      {
        round: 5,
        winner: "You",
        interest: 7.9,
        amount: 2805,
      },
      {
        round: 6,
        winner: "ReefRanger.eth",
        interest: 7.2,
        amount: 2778,
      },
    ],
  },
];

export const mockProfileData = {
  totalSails: 5,
  successfulSails: 4,
  abandonedSails: 1,
  nauticalMiles: 12000,
  meritPoints: 850,
  anchorsEarned: 2,
  accountAddress: "0x742...A39B",
  joinDate: "2024-03-15T00:00:00Z",
};

export const mockSettingsData = {
  maxInterestWillingToBid: 12,
  riskPreference: "Balanced", // "Stable" | "Balanced" | "Bold"
  notificationsEnabled: true,
  defaultCurrency: "USDC",
  language: "English",
  theme: "system", // "light" | "dark" | "system"
};