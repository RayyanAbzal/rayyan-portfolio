"use client";

import {
  Badge,
  Button,
  Check,
  Collapse,
  Count,
  Divider,
  Field,
  Popover,
  Stage,
  States,
  Window,
  type Act,
} from "../kit";
import "../look.css";
import "./pumpdat.css";

// pumpdat: launching a token from the web app (after the overlap gold for the
// satellite and the payout-flow gold for the slow arrivals). The creator types
// a symbol, the image is pinned to IPFS, Launch asks the wallet to confirm on
// Ethereum mainnet, the form gives way to the live token and trades stream in
// over the websocket. Token name, ticker and every address are made up.

interface S {
  focus: boolean;
  symbol: string;
  pinned: boolean;
  wallet: boolean;
  launched: boolean;
  trades: number;
}

const START: S = { focus: false, symbol: "", pinned: false, wallet: false, launched: false, trades: 0 };
const POSTER: S = { focus: false, symbol: "EXMP", pinned: true, wallet: false, launched: true, trades: 4 };

const SYMBOL = "EXMP";
const REST = { x: 330, y: 410 };

interface Trade {
  side: "BUY" | "SELL";
  ticker: string;
  wallet: string;
  amount: string;
}

// Newest first. The first four arrive after the launch; the rest were already there.
const FRESH: Trade[] = [
  { side: "BUY", ticker: "EXMP", wallet: "0x4c1d...9a07", amount: "0.31 ETH" },
  { side: "BUY", ticker: "EXMP", wallet: "0xd20e...71b3", amount: "0.12 ETH" },
  { side: "SELL", ticker: "EXMP", wallet: "0x8b5a...c4e9", amount: "0.08 ETH" },
  { side: "BUY", ticker: "EXMP", wallet: "0x19f6...e2d8", amount: "0.22 ETH" },
];

const OLDER: Trade[] = [
  { side: "BUY", ticker: "ACME", wallet: "0xa7c3...5f10", amount: "0.45 ETH" },
  { side: "SELL", ticker: "ZETA", wallet: "0x63e8...b92c", amount: "0.17 ETH" },
  { side: "BUY", ticker: "ACME", wallet: "0xf04b...3d6a", amount: "0.09 ETH" },
  { side: "BUY", ticker: "ZETA", wallet: "0x2e91...a8f5", amount: "0.26 ETH" },
];

const script = async (a: Act<S>) => {
  await a.wait(900);
  a.mark("symbol");
  await a.move({ at: "symbol", x: 0.3, y: 0.5 });
  await a.click();
  a.put({ focus: true });
  await a.wait(300);
  await a.type("symbol", SYMBOL, { interval: 90 });
  await a.wait(300);
  a.put({ focus: false, pinned: true });
  await a.wait(900);
  a.mark("launch");
  await a.move({ at: "launch", x: 0.5, y: 0.5 });
  await a.wait(200);
  await a.click();
  a.put({ wallet: true });
  await a.wait(1000);
  a.mark("confirm");
  await a.move({ at: "confirm", x: 0.5, y: 0.5 });
  await a.wait(250);
  await a.click();
  a.put({ wallet: false });
  await a.wait(350);
  a.put({ launched: true });
  await a.move(REST, { duration: 700 });
  await a.wait(600);
  a.mark("trades");
  for (let t = 1; t <= 4; t++) {
    a.put({ trades: t });
    await a.wait(750);
  }
  await a.wait(3000);
};

const cap = (n: number) => `$${(n / 1000).toFixed(1)}K`;

function TradeRow({ t }: { t: Trade }) {
  return (
    <div className="pd-trade">
      <Badge tone={t.side === "BUY" ? "success" : "danger"}>{t.side}</Badge>
      <span className="pd-trade__ticker">{t.ticker}</span>
      <span className="pd-trade__wallet">{t.wallet}</span>
      <span className="pd-trade__amount">{t.amount}</span>
    </div>
  );
}

function Tile({ small }: { small?: boolean }) {
  return <span className="pd-tile" data-small={small || undefined} aria-hidden="true" />;
}

export default function Pumpdat() {
  return (
    <Stage<S>
      width={760}
      height={456}
      compact={{ below: 600, width: 358, height: 600 }}
      initial={START}
      poster={POSTER}
      script={script}
      play="once"
      cursor={{ at: REST }}
      className="look-ra pd"
    >
      {(s) => (
        <>
          <Window
            className="pd-win"
            title="Launch a token"
            toolbar={
              <Badge tone="neutral" dot>
                0x4c1d...9a07
              </Badge>
            }
          >
            <div className="pd-body">
              <div className="pd-left">
                <States
                  value={s.launched ? "token" : "form"}
                  align="start"
                  className="pd-states"
                  states={{
                    form: (
                      <div className="pd-form">
                        <span className="pd-h">New token</span>
                        <Field label="Name" value="ExampleToken" />
                        <Field
                          label="Symbol"
                          value={s.symbol}
                          placeholder="e.g. TKN"
                          focused={s.focus}
                          box={{ "data-target": "symbol" }}
                        />
                        <div className="pd-image">
                          <Tile />
                          <span className="pd-image__text">
                            <span className="pd-image__name">logo.png</span>
                            <span className="pd-image__sub">Pinned to IPFS</span>
                          </span>
                          <Check on={s.pinned} size={16} />
                        </div>
                        <Button variant="primary" size="large" className="pd-launch" data-target="launch">
                          {s.wallet ? "Confirm in wallet" : "Launch token"}
                        </Button>
                      </div>
                    ),
                    token: (
                      <div className="pd-token">
                        <div className="pd-token__head">
                          <Tile />
                          <span className="pd-token__who">
                            <span className="pd-token__name">ExampleToken</span>
                            <span className="pd-token__sym">EXMP</span>
                          </span>
                          <Badge tone="success" dot>
                            Trading
                          </Badge>
                        </div>
                        <div className="pd-stat">
                          <span className="pd-stat__label">Price</span>
                          <span className="pd-stat__big">0.000042 ETH</span>
                        </div>
                        <Divider />
                        <div className="pd-stats">
                          <div className="pd-stat">
                            <span className="pd-stat__label">Market cap</span>
                            <Count className="pd-stat__val" value={s.trades >= 1 ? 4200 : 0} duration={1400} format={cap} />
                          </div>
                          <div className="pd-stat">
                            <span className="pd-stat__label">Holders</span>
                            <Count className="pd-stat__val" value={s.trades >= 1 ? 284 : 0} duration={1400} />
                          </div>
                        </div>
                      </div>
                    ),
                  }}
                />
              </div>

              <div className="pd-feed">
                <div className="pd-feed__head">
                  <span className="pd-h">Live trades</span>
                  <Badge tone="success" dot>
                    Live
                  </Badge>
                </div>
                <div className="pd-feed__list">
                  {FRESH.map((t, i) => (
                    <Collapse key={t.wallet} open={s.trades > FRESH.length - 1 - i} reveal="drop">
                      <TradeRow t={t} />
                    </Collapse>
                  ))}
                  {OLDER.map((t) => (
                    <TradeRow key={t.wallet} t={t} />
                  ))}
                </div>
              </div>
            </div>
          </Window>

          <Popover show={s.wallet} origin="top right" className="pd-wallet">
            <span className="pd-wallet__title">Confirm launch</span>
            <span className="pd-wallet__line">
              Create <strong>EXMP</strong> on Ethereum mainnet
            </span>
            <div className="pd-wallet__actions">
              <Button size="small" variant="secondary">
                Reject
              </Button>
              <Button size="small" variant="primary" data-target="confirm">
                Confirm
              </Button>
            </div>
          </Popover>
        </>
      )}
    </Stage>
  );
}
