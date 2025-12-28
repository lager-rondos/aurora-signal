# Aurora Signal — Base Sepolia Validation Notes

This document records validation steps and observed results during testing on **Base Sepolia**.

---

## Network Details

- **Network:** Base Sepolia  
- **Chain ID:** 84532  
- **RPC:** https://sepolia.base.org  
- **Explorer:** https://sepolia.basescan.org  

---

## Validation Timeline

### Initial Setup
- [x] Network configuration loaded correctly
- [x] Chain ID verified as 84532
- [x] RPC endpoint reachable

---

### Read-only Validation

Using `scripts/sample-addresses.json`:

- [x] ETH balance lookup for `exampleEOA`
- [x] Zero address returns `0` balance
- [x] Burn address does not error
- [x] Contract code check for `exampleContract`

---

### RPC Resilience

- [x] Default RPC responsive
- [x] Fallback RPC tested successfully
- [x] No hardcoded RPC URLs detected

---

### Explorer Checks

- [x] Address pages open on BaseScan Sepolia
- [x] Block numbers match RPC results
- [x] No accidental mainnet links during testnet runs

---

## Notes

- Any RPC or chainId changes should be treated as **high risk**
- Prefer fixing configuration before modifying logic
- Keep this document updated as validation evolves

_Last updated: initial scaffold_
