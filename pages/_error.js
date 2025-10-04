import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Error({ statusCode }) {
  const router = useRouter();

  useEffect(() => {
    // Auto-refresh on error
    const timer = setTimeout(() => {
      router.reload();
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0b0b18 0%, #101024 100%)',
      color: '#e9f3ff',
      fontFamily: 'Lato, sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#00baba' }}>
        {statusCode ? `Error ${statusCode}` : 'An error occurred'}
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', textAlign: 'center' }}>
        {statusCode === 404 
          ? "The page you're looking for doesn't exist." 
          : "Something went wrong. The page will refresh automatically."
        }
      </p>
      <button
        onClick={() => router.push('/')}
        style={{
          background: 'linear-gradient(135deg, #00baba, #008a8a)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '25px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(0,186,186,0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        Go Home
      </button>
    </div>
  );
}