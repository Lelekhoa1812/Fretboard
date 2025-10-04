import Head from 'next/head';
import FretboardApp from '../components/FretboardApp';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fretboard Lookup - AI-Powered Music Theory</title>
        <meta name="description" content="Visualize notes, chords, and scales on guitar, bass, and ukulele with AI-powered music theory assistance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </Head>
      <FretboardApp />
    </>
  );
}
