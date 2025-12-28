// app/aurora-signal.ts
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { createPublicClient, http, formatEther, isAddress } from "viem";
import { base, baseSepolia } from "viem/chains";

type Network = {
  chain: typeof base;
  chainId: number;
  rpc: string;
  explorer: string;
  title: string;
};

const NETWORKS: Network[] = [
  {
    chain: baseSepolia,
    chainId: 84532,
    rpc: "https://sepolia.base.org",
    explorer: "https://sepolia.basescan.org",
    title: "Base Sepolia",
  },
  {
    chain: base,
    chainId: 8453,
    rpc: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    title: "Base Mainnet",
  },
];

let active = NETWORKS[0];

const sdk = new CoinbaseWalletSDK({
  appName: "Aurora Signal (Built for Base)",
  appLogoUrl: "https://base.org/favicon.ico",
});

const panel = document.createElement("pre");
panel.style.background = "#0e1224";
panel.style.color = "#e9efff";
panel.style.padding = "16px";
panel.style.borderRadius = "12px";

function log(lines: string[]) {
  panel.textContent = lines.join("\n");
}

function client() {
  return createPublicClient({
    chain: active.chain,
    transport: http(active.rpc),
  });
}

async function connectWallet() {
  const provider = sdk.makeWeb3Provider(active.rpc, active.chainId);
  const [address] = (await provider.request({ method: "eth_requestAccounts" })) as string[];
  const balance = await client().getBalance({ address: address as `0x${string}` });

  log([
    "Wallet connected",
    `Network: ${active.title}`,
    `Address: ${address}`,
    `Balance: ${formatEther(balance)} ETH`,
    `${active.explorer}/address/${address}`,
  ]);
}

async function inspect(addr: string) {
  if (!isAddress(addr)) throw new Error("Invalid address");
  const [balance, nonce] = await Promise.all([
    client().getBalance({ address: addr as `0x${string}` }),
    client().getTransactionCount({ address: addr as `0x${string}` }),
  ]);

  log([
    "Address inspection",
    `Network: ${active.title}`,
    `Address: ${addr}`,
    `Balance: ${formatEther(balance)} ETH`,
    `Tx count: ${nonce}`,
    `${active.explorer}/address/${addr}`,
  ]);
}

async function snapshot() {
  const block = await client().getBlock();
  log([
    "Network snapshot",
    `Network: ${active.title}`,
    `Block: ${block.number}`,
    `Timestamp: ${block.timestamp}`,
    `Gas used: ${block.gasUsed}`,
    `${active.explorer}/block/${block.number}`,
  ]);
}

function switchNetwork() {
  active = active.chainId === 84532 ? NETWORKS[1] : NETWORKS[0];
  log([`Switched to ${active.title}`]);
}

function mount() {
  const root = document.createElement("div");
  root.style.maxWidth = "920px";
  root.style.margin = "24px auto";

  const h1 = document.createElement("h1");
  h1.textContent = "Aurora Signal";

  const input = document.createElement("input");
  input.placeholder = "0x… address";
  input.style.minWidth = "420px";

  function btn(label: string, fn: () => void | Promise<void>) {
    const b = document.createElement("button");
    b.textContent = label;
    b.onclick = () => Promise.resolve(fn()).catch(e => log([String(e)]));
    return b;
  }

  root.append(
    h1,
    btn("Connect wallet", connectWallet),
    btn("Switch network", switchNetwork),
    btn("Snapshot", snapshot),
    input,
    btn("Inspect address", () => inspect(input.value)),
    panel,
  );

  document.body.appendChild(root);
  log(["Ready", `Active network: ${active.title}`, "Read-only mode"]);
}

mount();
