import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="title" content="SheConfident | Women Empower Platform" />
        <meta
          name="description"
          content="She build is a women empowerment platform. That provide AI confidence boost and NFT Marketplace for confident faces of womens and suppor women projects but allowing them to list there projects on out crowd funding section."
        />
        <meta
          name="keywords"
          content="empowerment, women empowerment, sheconfident, she confident, confident, women, hackathon, she build, she build hackathon, confidence boost, confident on camera"
        />
        <meta name="author" content="Team Shyenn" />
        <meta
          property="og:title"
          content="SheConfident | Women Empower Platform"
        />
        <meta
          property="og:description"
          content="empowerment, women empowerment, sheconfident, she confident, confident, women, hackathon, she build, she build hackathon, confidence boost, confident on camera"
        />
        <meta property="og:image" content="/android-chrome-512x512.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
