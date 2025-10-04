import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Fretboard Lookup - AI-Powered Music Theory</title>
        <meta name="description" content="Visualize notes, chords, and scales on guitar, bass, and ukulele with AI-powered music theory assistance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
