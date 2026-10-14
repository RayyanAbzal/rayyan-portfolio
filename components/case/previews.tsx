import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import type {
  BotPreviewData,
  CrmPreviewData,
  PreviewData,
  RosterPreviewData,
  TokenPreviewData,
} from "@/content/case-studies/types";

interface AppBarProps {
  name: string;
  sub: string;
  badge?: ReactNode;
}

function AppBar({ name, sub, badge }: AppBarProps) {
  return (
    <div className="pr-app-bar">
      <span className="pr-app-name">{name}</span>
      <span className="pr-app-sub">{sub}</span>
      {badge}
    </div>
  );
}

function Footer({ text }: { text: string }) {
  return <div className="pr-footer">{text}</div>;
}

function CrmPreview({ data }: { data: CrmPreviewData }) {
  return (
    <>
      <AppBar name={data.appName} sub={data.appSub} badge={<Badge variant="dim">{data.badge}</Badge>} />
      <div className="pr-g-crm pr-col-heads">
        <span>creator</span>
        <span className="pr-sm-hide">platform</span>
        <span>eng rate</span>
        <span className="pr-sm-hide">v-score</span>
        <span>stage</span>
      </div>
      {data.rows.map((row) => (
        <div key={row.handle} className="pr-g-crm pr-data-row">
          <span className={row.handleTone === "hi" ? "pr-hi" : "pr-text"}>{row.handle}</span>
          <Badge variant="dim" className="max-[640px]:hidden">{row.platform}</Badge>
          <span>{row.engagement}</span>
          <span className={row.scoreHi ? "pr-hi pr-sm-hide" : "pr-sm-hide"}>{row.score}</span>
          <Badge variant={row.stageTone}>{row.stage}</Badge>
        </div>
      ))}
      <Footer text={data.footer} />
    </>
  );
}

function RosterPreview({ data }: { data: RosterPreviewData }) {
  return (
    <>
      <AppBar name={data.appName} sub={data.appSub} />
      <div className="pr-cards">
        {data.cards.map((card) => (
          <div key={card.label} className="pr-card">
            <div className={card.hi ? "val pr-hi" : "val"}>{card.value}</div>
            <div className="lab">{card.label}</div>
          </div>
        ))}
      </div>
      <div className="pr-section">
        <div className="pr-prog-row">
          <span>{data.progressLabel}</span>
          <span className="pr-hi">{data.progressValue}</span>
        </div>
        <div className="pr-prog-wrap">
          <div className="pr-prog" style={{ width: `${data.progressPercent}%` }} />
        </div>
      </div>
      <Footer text={data.footer} />
    </>
  );
}

function BotPreview({ data }: { data: BotPreviewData }) {
  return (
    <>
      <AppBar name={data.appName} sub={data.appSub} badge={<Badge variant="green">{data.badge}</Badge>} />
      {data.messages.map((message) => (
        <div key={message.command} className="pr-msg">
          <div className="pr-msg-cmd">{message.command}</div>
          {message.checks && (
            <div className="pr-msg-checks">
              {message.checks.map((check) => (
                <span key={check} className="pr-check">{check}</span>
              ))}
            </div>
          )}
          {message.result && (
            <div className="pr-msg-result">
              <span className="pr-hi">{message.result.tier}</span> · payout{" "}
              <span className="pr-hi">{message.result.payout}</span> ·{" "}
              <Badge variant="green">{message.result.badge}</Badge>
            </div>
          )}
          {message.failure && (
            <div className="pr-msg-fail">
              {message.failure.text} · <Badge variant="amber">{message.failure.badge}</Badge>
            </div>
          )}
        </div>
      ))}
      <Footer text={data.footer} />
    </>
  );
}

function TokenPreview({ data }: { data: TokenPreviewData }) {
  const { token } = data;
  return (
    <>
      <AppBar name={data.appName} sub={data.appSub} badge={<Badge variant="green">{data.badge}</Badge>} />
      <div className="pr-g-token pr-col-heads">
        <span>token</span>
        <span className="pr-sm-hide">price</span>
        <span>mkt cap</span>
        <span className="pr-sm-hide">holders</span>
        <span>status</span>
      </div>
      <div className="pr-g-token pr-data-row">
        <span><span className="pr-hi">{token.symbol}</span> · {token.name}</span>
        <span className="pr-sm-hide">{token.price}</span>
        <span className="pr-hi">{token.marketCap}</span>
        <span className="pr-text pr-sm-hide">{token.holders}</span>
        <Badge variant="green">{token.status}</Badge>
      </div>
      <div className="pr-section">
        <div className="pr-section-label">{data.tradesLabel}</div>
        <div className="pr-g-trade pr-col-heads">
          <span>type</span>
          <span>wallet</span>
          <span>amount</span>
          <span className="pr-sm-hide">time</span>
        </div>
        {data.trades.map((trade) => (
          <div key={trade.wallet} className="pr-g-trade pr-data-row">
            <Badge variant={trade.side === "BUY" ? "green" : "amber"}>{trade.side}</Badge>
            <span className="pr-text">{trade.wallet}</span>
            <span>{trade.amount}</span>
            <span className="pr-dim pr-sm-hide">{trade.time}</span>
          </div>
        ))}
      </div>
      <Footer text={data.footer} />
    </>
  );
}

function PreviewBody({ data }: { data: PreviewData }) {
  switch (data.kind) {
    case "crm":
      return <CrmPreview data={data} />;
    case "roster":
      return <RosterPreview data={data} />;
    case "bot":
      return <BotPreview data={data} />;
    case "token":
      return <TokenPreview data={data} />;
  }
}

/** The one dark surface: an interface preview drawn with synthetic data. */
export function CasePreview({ data }: { data: PreviewData }) {
  return (
    <article className="case-block" aria-label="Interface preview">
      <div className="case-preview">
        <PreviewBody data={data} />
      </div>
    </article>
  );
}
