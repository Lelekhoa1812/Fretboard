import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import the main app to avoid SSR issues
const FretboardApp = dynamic(() => import('../components/FretboardApp'), {
  ssr: false,
  loading: () => (
    <div className="loading-screen" id="loading-screen">
      <div className="loading-spinner"></div>
      <p style={{ color: '#00baba', marginTop: '20px' }}>Loading Fretboard App...</p>
    </div>
  )
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="loading-screen" id="loading-screen">
        <div className="loading-spinner"></div>
        <p style={{ color: '#00baba', marginTop: '20px' }}>Initializing...</p>
      </div>
    );
  }

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
