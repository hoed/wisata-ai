# 🇮🇩 Web3 Agentic AI Tour Guide for Indonesia

> **A decentralized, intelligent travel companion powered by Web3 and Agentic AI.**  
> Discover Indonesia's cultural treasures with an AI tour guide that knows history, culture, and your preferences.

---

## ✨ Features

### 🤖 Agentic AI Tour Guide
- Acts as a professional human-like tour guide
- Rich, verified knowledge of Indonesian historical sites, legends, languages, and traditions
- Real-time travel advice, multilingual support, and adaptive itinerary suggestions
- Learns user preferences and adapts future recommendations

### 🌐 Web3 Integration
- **Decentralized Identity (DID)** via MetaMask
- **Smart Contracts**:
  - Simulated bookings & itinerary confirmations
  - NFT-based travel achievements
  - DAO voting for community-recommended places
- **Decentralized Storage**:
  - Itinerary & user memory stored in IPFS/Arweave
  - Optional mutable data via Ceramic

### 🎒 Additional Features
- Offline-first support for remote areas
- ERC-20 reward tokens for visiting hidden gems
- Admin dashboard for updating tourist databases
- Voice interaction (STT & TTS)
- Mobile-first responsive UI

---

## 🏗️ Tech Stack

| Layer         | Technology                        |
| ------------- | --------------------------------- |
| Frontend      | React, TailwindCSS, Web3Modal     |
| Backend       | FastAPI / Node.js (AI interface)  |
| AI Model      | GPT-based agent with memory       |
| Blockchain    | Ethereum / Polygon + Solidity     |
| Storage       | IPFS, Arweave, Ceramic            |
| Vector Memory | Pinecone / Weaviate               |

---

## 🧠 AI Capabilities

- ✅ Historical knowledge of 1000+ Indonesian sites
- ✅ Natural multilingual conversation
- ✅ Personalized itinerary planning
- ✅ Smart contract interaction (mock or live)
- ✅ Continual learning of user behavior

---

## 📂 Project Structure

```

/agentic-tour-guide/
│
├── frontend/            # React + Web3 + Tailwind frontend
├── backend/             # FastAPI/Node backend to connect with AI agent
├── contracts/           # Solidity smart contracts (NFTs, bookings)
├── ai-core/             # Prompt chains, vector DB, AI logic
├── scripts/             # Deployment and utility scripts
├── data/                # Static data: historical sites, culture, etc.
└── docs/                # Architecture diagrams, specs, user flows

````

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ v18
- Python ≥ 3.10
- MetaMask extension
- IPFS CLI (optional for dev)

### Clone and Setup

```bash
git clone https://github.com/yourusername/agentic-tour-guide.git
cd agentic-tour-guide
````

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Smart Contracts

```bash
cd contracts
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

---

## 🧪 Demo & Usage

* Access app via `http://localhost:3000`
* Connect wallet to sign in
* Ask AI about places like "Candi Borobudur" or "Kuliner di Malang"
* View personalized itineraries
* Mint NFTs as travel badges

---

## 📌 Roadmap

* [x] AI with cultural knowledge
* [x] Web3 wallet integration
* [x] Booking smart contract
* [ ] DAO voting for places
* [ ] TTS/Voice Mode
* [ ] Mobile App (PWA)

---

## 🤝 Contributing

PRs welcome! For major changes, open an issue first.
Please read our [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details.

---

## 📜 License

MIT License © 2025 – \[hoed]

---

## 🌏 Credits

Built with ❤️ for Indonesian tourism & tech innovation.
Data sourced from Kemendikbud, BPS, UNESCO, and local guides.
