// Debug endpoint to check environment variables in production
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Only allow this in development or with a secret key
  if (process.env.NODE_ENV === 'production' && req.query.secret !== process.env.DEBUG_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
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
    totalEnvKeys: Object.keys(process.env).length
  };

  res.status(200).json({
    success: true,
    environment: envCheck,
    timestamp: new Date().toISOString()
  });
}
