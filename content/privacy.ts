import type { Rich } from "@/content/rich";

export const VERCEL_PRIVACY_URL = "https://vercel.com/legal/privacy-notice";
export const CALENDLY_PRIVACY_URL = "https://calendly.com/legal/privacy-notice";
export const PRIVACY_UPDATED = "2026-10-12";

export interface PrivacySection {
  heading: string;
  paragraphs: readonly Rich[];
}

export const PRIVACY = {
  title: "Privacy | Rayyan Abzal",
  description:
    "What this website does with your data: Vercel Analytics page views and booking clicks, the Calendly booking popup, and email. Plain language, last updated 2026-10-12.",
  h1: "Privacy.",
  lede: "This is a small portfolio site. This page says plainly what it does with your data and which third parties are involved.",
  updatedLabel: `Last updated: ${PRIVACY_UPDATED}`,
  sections: [
    {
      heading: "What this site does not do",
      paragraphs: [
        ["The site has no accounts, no sign-in, and no forms. It does not ask you for personal information. The site’s own code does not set cookies or use local storage."],
      ],
    },
    {
      heading: "Analytics",
      paragraphs: [
        [
          "The site uses Vercel Analytics to count page views and to record when a booking link is clicked. The booking event is called book_click and carries a short label for where on the site the link was. Vercel describes the product as privacy-friendly. How Vercel handles that data is covered by ",
          { link: "Vercel’s privacy policy", href: VERCEL_PRIVACY_URL },
          ".",
        ],
      ],
    },
    {
      heading: "Booking with Calendly",
      paragraphs: [
        [
          "Booking buttons open a Calendly popup. Every page loads Calendly’s script and styles from Calendly’s servers, so Calendly can see that request. Anything you enter to book a call is handled by Calendly under ",
          { link: "Calendly’s privacy policy", href: CALENDLY_PRIVACY_URL },
          ". A booking creates an appointment with me, so I see the details you enter.",
        ],
      ],
    },
    {
      heading: "Email and LinkedIn",
      paragraphs: [
        ["If you email me, I receive your message and email address and use them to reply. The LinkedIn link leaves this site, and LinkedIn’s own policy applies once you follow it."],
      ],
    },
    {
      heading: "Hosting and fonts",
      paragraphs: [
        ["My hosting provider, Vercel, may process request data such as IP addresses when a page loads. Fonts are served from this site, not from a font provider."],
      ],
    },
  ] as readonly PrivacySection[],
  contactNote: "Questions about this page: email rayyanabzal@gmail.com.",
} as const;
