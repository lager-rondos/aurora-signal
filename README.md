# Aurora Signal (Built for Base)

Aurora Signal is a compact, read-only utility designed specifically for the Base ecosystem. Its goal is to help developers quickly inspect onchain data, confirm network configuration, and verify contract deployments without performing any state-changing actions.

---

## Purpose

This repository exists to support lightweight verification and exploration tasks. It is especially useful when you want to:
- Double-check that you are connected to the correct Base network
- Look up balances, blocks, and addresses
- Confirm contract deployments using Basescan
- Run safe, non-invasive checks during development or testing

All functionality is strictly read-only.

---

## Repository Structure

- **app.aurora-signal.ts**  
  Browser-based entry point that connects to Coinbase Wallet and queries Base RPC endpoints.

- **contracts/**  
  Solidity contracts deployed to Base Sepolia for testnet validation:
  - `control.sol` — defines ownership or roles (owner, admin, etc.)
  - `ERC721.sol` — a Solidity contract that implements the ERC-721 (NFT) standard

- **docs/testnet-validation.md**  
  Notes and results collected during Base Sepolia validation.

- **scripts/sample-addresses.json**  
  Example addresses used for repeatable inspection.

- **scripts/deploy-contracts.sh**  
  Helper script for deploying contracts to Base networks.

- **package.json**  
  Dependency manifest referencing selected Base and Coinbase repositories.

- **README.md**  
  Main documentation for the project.

---

## Supported Networks

Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  

---

## How It Works

Aurora Signal connects to Coinbase Wallet using the Coinbase Wallet SDK and communicates directly with Base RPC endpoints via viem. It retrieves public blockchain data such as blocks, balances, and transaction counts, and provides direct links to Basescan for independent verification.

No transactions are signed or broadcast.

---

## Tooling

This project relies on a small set of well-established tools:
- Coinbase Wallet SDK for wallet connectivity  
- OnchainKit references for Base-aligned primitives  
- viem for efficient, type-safe RPC communication  
- Selected Base and Coinbase GitHub repositories as dependencies  

---

## License

MIT License  
Copyright (c) 2025 YOUR_NAME

---

## Author

GitHub: https://github.com/lager-rondos 

Email: lager.rondos.0m@icloud.com  

Public contact (X): https://x.com/nirisar17

---

## Testnet Deployment (Base Sepolia)

The following contracts were deployed on Base Sepolia to validate tooling behavior and network compatibility before mainnet usage.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract control.sol address:  
0x6d87Fa33C676557Bd32fe68BAfc9Ef6dBf3F969f

Deployment and verification:
- https://sepolia.basescan.org/address/0x6d87Fa33C676557Bd32fe68BAfc9Ef6dBf3F969f
- https://sepolia.basescan.org/0x6d87Fa33C676557Bd32fe68BAfc9Ef6dBf3F969f/0#code  

Contract ERC721.sol address:  
0x3b2269125Aff25823C5a096ea2Ab6871B58a2f90

Deployment and verification:
- https://sepolia.basescan.org/address/0x3b2269125Aff25823C5a096ea2Ab6871B58a2f90
- https://sepolia.basescan.org/0x3b2269125Aff25823C5a096ea2Ab6871B58a2f90/0#code  

These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.
