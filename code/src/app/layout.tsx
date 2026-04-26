import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CaptionForge – Generator opisów i hasztagów dla social media",
  description:
    "Generuj angażujące opisy i hasztagi do postów na Instagram, TikTok, LinkedIn, Twitter/X i Facebook w 10 sekund. Napędzany przez AI (Google Gemini).",
  keywords: [
    "generator opisów",
    "hasztagi",
    "instagram",
    "tiktok",
    "social media",
    "copywriting",
    "AI",
  ],
  authors: [{ name: "CaptionForge" }],
  openGraph: {
    title: "CaptionForge – Generator opisów i hasztagów",
    description: "Opisy, które angażują. Hasztagi, które docierają.",
    type: "website",
    locale: "pl_PL",
  },
};

/**
 * Anti-FOUC: czyta localStorage przed pierwszym renderem i ustawia data-theme
 * ZANIM React/CSS załadują stronę — eliminuje mignięcie białego tła w dark mode.
 */
const antiFoucScript = `
(function() {
  try {
    var stored = localStorage.getItem('captionforge-theme');
    var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = stored || preferred || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: musi być pierwszym skryptem w <head> */}
        <script
          dangerouslySetInnerHTML={{ __html: antiFoucScript }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
