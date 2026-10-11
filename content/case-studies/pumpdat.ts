import type { CaseStudy } from "./types";

export const pumpdat: CaseStudy = {
  slug: "pumpdat",
  title: "pumpdat",
  metaTitle: "pumpdat Token Launchpad Case Study | Rayyan Abzal",
  description:
    "A token launchpad shipped to Ethereum mainnet in about 10 weeks: smart contracts, real-time trade feed, backend, frontend, and auth, handed over to the founder.",
  socialDescription:
    "A token launchpad on Ethereum mainnet: contracts, backend, and frontend, delivered end to end.",
  summary: [
    "A token launchpad on ",
    { strong: "Ethereum mainnet" },
    ": contracts, backend, and frontend, delivered end to end.",
  ],
  facts: ["Crypto startup", "Full-stack + smart contracts", "About 10 weeks", "Shipped to mainnet"],
  preview: {
    kind: "token",
    appName: "pumpdat",
    appSub: "· Token Launchpad · Ethereum Mainnet",
    badge: "live",
    token: { symbol: "EXMP", name: "ExampleToken", price: "0.000042 ETH", marketCap: "$4.2K", holders: "284", status: "trading" },
    tradesLabel: "Live trades via websocket",
    trades: [
      { side: "BUY", wallet: "0xAb3f...c82e", amount: "0.12 ETH", time: "2s ago" },
      { side: "SELL", wallet: "0x7e2c...f91a", amount: "0.08 ETH", time: "14s ago" },
      { side: "BUY", wallet: "0xF91a...d4c3", amount: "0.31 ETH", time: "41s ago" },
    ],
    footer: "contract 0x7f4e...3a2b · IPFS metadata verified · representative data",
  },
  problem: {
    heading: ["Mainnet, ", { hi: "full stack" }, "."],
    paragraphs: [
      ["A crypto startup wanted to launch a Pump.fun-style token launchpad on Ethereum mainnet but needed the entire system built: smart contracts, backend infrastructure, and a user-facing frontend. One team, three disciplines, one ship date."],
    ],
  },
  built: {
    heading: ["Contracts → API → app."],
    paragraphs: [
      ["The full stack. Upgradeable Solidity proxy contracts handle token creation and trading on-chain. An Express + Socket.IO backend serves real-time trade data over websockets."],
      ["A Next.js frontend connects wallets via WalletConnect, handles Twitter OAuth, and lets users launch and trade tokens. Token metadata is stored on IPFS via Pinata."],
    ],
  },
  outcome: {
    heading: ["Shipped to mainnet."],
    paragraphs: [
      [
        "Deployed to ",
        { mark: "Ethereum mainnet" },
        " and handed over to the client. Live and trading.",
      ],
    ],
  },
  stack: ["Solidity", "Hardhat", "Express", "Socket.IO", "Next.js 15", "MongoDB", "Pinata", "Alchemy", "Vercel", "Railway"],
  quote: {
    text: [
      "Rayyan delivered flawless, high-quality work, faster and better than I imagined possible. Communication was smooth throughout, and he came up with smart solutions to problems before I even had to ask. ",
      { mark: "Reliable, insanely skilled, easy to work with. I’d hire him again without hesitation." },
    ],
    role: "Founder",
    project: "pumpdat, shipped 2025",
  },
  ctaSource: "case_pumpdat",
  prev: { label: "Previous", target: "FeedHack", href: "/work/feedhack" },
  next: { label: "done →", target: "All work", href: "/#work" },
};
