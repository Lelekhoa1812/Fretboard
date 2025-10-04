import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - Page Not Found | Fretboard Lookup</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b0b18 0%, #101024 100%)',
        color: '#e9f3ff',
        fontFamily: 'Lato, sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{
          fontSize: '120px',
          margin: '0 0 20px 0',
          background: 'linear-gradient(135deg, #e9f3ff 0%, #00baba 50%, #8a2be2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '300'
        }}>
          404
        </div>
        <h1 style={{
          fontSize: '36px',
          margin: '0 0 20px 0',
          color: '#00baba',
          fontWeight: '300'
        }}>
          Page Not Found
        </h1>
        <p style={{
          fontSize: '18px',
          margin: '0 0 40px 0',
          color: '#b7c4d6',
          maxWidth: '500px',
          lineHeight: '1.6'
        }}>
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              background: 'linear-gradient(135deg, #00baba 0%, #008a8a 100%)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 25px rgba(0,186,186,0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Go Home
          </button>
          <button 
            onClick={() => window.history.back()}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#e9f3ff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '16px 32px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}
