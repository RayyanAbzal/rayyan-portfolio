import "./globals.css";
import { fontVariables } from "./fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
