import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import the main app to avoid SSR issues
const FretboardApp = dynamic(() => import('../components/FretboardApp'), {
  ssr: false,
  loading: () => <div className="loading-screen">
    <div className="loading-spinner"></div>
  </div>
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Fretboard Lookup - AI-Powered Music Theory</title>
        <meta name="description" content="Visualize notes, chords, and scales on guitar, bass, and ukulele with AI-powered music theory assistance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FretboardApp />
    </>
  );
}
