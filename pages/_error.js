import React from 'react';
import Head from 'next/head';

function Error({ statusCode }) {
  return (
    <>
      <Head>
        <title>Error {statusCode} - Fretboard Lookup</title>
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
        <h1 style={{
          fontSize: '72px',
          margin: '0 0 20px 0',
          background: 'linear-gradient(135deg, #e9f3ff 0%, #00baba 50%, #8a2be2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {statusCode || 'Error'}
        </h1>
        <p style={{
          fontSize: '24px',
          margin: '0 0 40px 0',
          color: '#b7c4d6'
        }}>
          {statusCode === 404 
            ? 'Page not found' 
            : 'An error occurred on the server'
          }
        </p>
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
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
