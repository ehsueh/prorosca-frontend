# <img src="/prorosca_transparent.png" alt="Prorosca Logo" width="300"/>
![Prorosca Logo](public/prorosca_transparent.png)

Prorosca is a decentralized lending platform built on World Chain, enabling secure and transparent lending within sailing communities. The platform leverages World ID for human verification and provides a seamless experience through World App integration.

## 🌟 Features

- **World Chain Integration**: Native support for World Chain with free gas fees
- **World ID Authentication**: Secure human verification
- **Mini App Support**: Seamless integration with World App
- **Real-time Transaction Monitoring**: Track lending transactions with Blockscout SDK
- **Modern UI/UX**: Built with Next.js and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- NPM 9+
- World App installed for testing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prorosca-frontend.git
cd prorosca-frontend
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_WORLD_APP_ID=your_world_app_id
NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_WORLD_CHAIN_RPC_URL=https://rpc.world.org
```

4. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗️ Built With

- [Next.js](https://nextjs.org/) - React Framework
- [World ID](https://worldcoin.org/world-id) - Human Verification
- [World Chain](https://worldcoin.org/) - Blockchain Platform
- [Blockscout SDK](https://docs.blockscout.com/) - Transaction Monitoring
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components

## 📱 World App Mini App Integration

This project is configured as a World App Mini App, providing:
- Native-like experience within World App
- Seamless World ID authentication
- Direct World Chain interaction
- Real-time transaction monitoring

### Mini App Setup

1. Register your app in the [World Developer Portal](https://developer.worldcoin.org)
2. Configure the required environment variables
3. Whitelist your contract address and functions
4. Deploy to Netlify for production use

## 🚢 Deployment

The project is configured for deployment on Netlify:

1. Connect your repository to Netlify
2. Configure environment variables in Netlify:
   - Site settings > Environment variables
   - Add all required variables (see `.env` section)
3. Deploy using the provided `netlify.toml` configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- World Foundation for the World ID and World Chain infrastructure
- Blockscout for transaction monitoring capabilities
- The sailing community for inspiration and support
