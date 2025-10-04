// Debug endpoint to check environment variables in production
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const envCheck = {
    nodeEnv: process.env.NODE_ENV,
    hasApi1: !!process.env.NVIDIA_API_1,
    hasApi2: !!process.env.NVIDIA_API_2,
    hasApi3: !!process.env.NVIDIA_API_3,
    hasApi4: !!process.env.NVIDIA_API_4,
    hasApi5: !!process.env.NVIDIA_API_5,
    hasApi6: !!process.env.NVIDIA_API_6,
    hasSmall: !!process.env.NVIDIA_SMALL,
    hasMedium: !!process.env.NVIDIA_MEDIUM,
    hasLarge: !!process.env.NVIDIA_LARGE,
    hasRerank: !!process.env.NVIDIA_RERANK,
    allNvidiaKeys: Object.keys(process.env).filter(key => key.startsWith('NVIDIA_')),
    totalEnvKeys: Object.keys(process.env).length,
    sampleEnvKeys: Object.keys(process.env).slice(0, 20), // Show first 20 env keys
    apiKeyLengths: {
      api1: process.env.NVIDIA_API_1 ? process.env.NVIDIA_API_1.length : 0,
      api2: process.env.NVIDIA_API_2 ? process.env.NVIDIA_API_2.length : 0,
      api3: process.env.NVIDIA_API_3 ? process.env.NVIDIA_API_3.length : 0,
      api4: process.env.NVIDIA_API_4 ? process.env.NVIDIA_API_4.length : 0,
      api5: process.env.NVIDIA_API_5 ? process.env.NVIDIA_API_5.length : 0,
      api6: process.env.NVIDIA_API_6 ? process.env.NVIDIA_API_6.length : 0,
    }
  };

  // Check if any API keys are loaded
  const hasAnyApiKeys = envCheck.hasApi1 || envCheck.hasApi2 || envCheck.hasApi3 || 
                       envCheck.hasApi4 || envCheck.hasApi5 || envCheck.hasApi6;

  res.status(200).json({
    success: true,
    environment: envCheck,
    status: hasAnyApiKeys ? 'API keys loaded successfully' : 'No API keys found - check Vercel environment variables',
    instructions: hasAnyApiKeys ? 
      'Great! Your API keys are loaded correctly.' : 
      'Go to Vercel dashboard → Settings → Environment Variables and add NVIDIA_API_1 through NVIDIA_API_6',
    timestamp: new Date().toISOString()
  });
}
