// Test endpoint to verify AI flow and prevent duplicate requests
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();
  
  try {
    // Test 1: Environment Variables
    const envCheck = {
      hasApi1: !!process.env.NVIDIA_API_1,
      hasApi2: !!process.env.NVIDIA_API_2,
      hasApi3: !!process.env.NVIDIA_API_3,
      hasApi4: !!process.env.NVIDIA_API_4,
      hasApi5: !!process.env.NVIDIA_API_5,
      hasApi6: !!process.env.NVIDIA_API_6,
      totalNvidiaKeys: Object.keys(process.env).filter(key => key.startsWith('NVIDIA_')).length
    };

    // Test 2: Simple AI Call
    let aiTest = null;
    let aiError = null;
    
    try {
      const { nvidiaAPI } = await import('../../lib/nvidia-api.js');
      
      const testResult = await nvidiaAPI.callNVIDIAAPI(
        "What is a C major chord?",
        {
          sessionId: 'test-flow-session',
          taskType: 'ask-question',
          complexity: 'low',
          temperature: 0.7,
          maxTokens: 100
        }
      );
      
      aiTest = {
        success: true,
        model: testResult.model,
        responseLength: testResult.response.length,
        responsePreview: testResult.response.substring(0, 150) + '...',
        isFallback: testResult.model === 'fallback'
      };
    } catch (error) {
      aiError = {
        message: error.message,
        isTimeout: error.code === 'ECONNABORTED',
        isNetworkError: error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED'
      };
    }

    // Test 3: Music Analysis API
    let musicAnalysisTest = null;
    let musicAnalysisError = null;
    
    try {
      const response = await fetch(`${req.headers.origin || 'http://localhost:3000'}/api/music-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'ask-question',
          data: {
            question: 'What is a major scale?',
            context: 'User is asking about music theory basics.'
          },
          sessionId: 'test-music-analysis'
        })
      });

      if (response.ok) {
        const result = await response.json();
        musicAnalysisTest = {
          success: result.success,
          hasData: !!result.data,
          dataLength: result.data ? result.data.length : 0,
          model: result.model,
          isFallback: result.model === 'fallback'
        };
      } else {
        musicAnalysisError = {
          status: response.status,
          statusText: response.statusText
        };
      }
    } catch (error) {
      musicAnalysisError = {
        message: error.message,
        isNetworkError: error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED'
      };
    }

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    // Overall status
    const hasApiKeys = envCheck.hasApi1 || envCheck.hasApi2 || envCheck.hasApi3 || 
                      envCheck.hasApi4 || envCheck.hasApi5 || envCheck.hasApi6;
    
    const overallStatus = hasApiKeys && aiTest?.success && musicAnalysisTest?.success ? 
      'All systems operational' : 
      'Issues detected';

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      totalTime: `${totalTime}ms`,
      overallStatus,
      
      // Test Results
      tests: {
        environmentVariables: {
          status: hasApiKeys ? 'PASS' : 'FAIL',
          details: envCheck,
          message: hasApiKeys ? 
            'Environment variables loaded successfully' : 
            'No NVIDIA API keys found - check Vercel dashboard'
        },
        
        nvidiaAPI: {
          status: aiTest ? 'PASS' : 'FAIL',
          details: aiTest,
          error: aiError,
          message: aiTest ? 
            (aiTest.isFallback ? 'NVIDIA API working but using fallback responses' : 'NVIDIA API working with real models') :
            'NVIDIA API call failed'
        },
        
        musicAnalysisAPI: {
          status: musicAnalysisTest ? 'PASS' : 'FAIL',
          details: musicAnalysisTest,
          error: musicAnalysisError,
          message: musicAnalysisTest ? 
            (musicAnalysisTest.isFallback ? 'Music Analysis API working but using fallback responses' : 'Music Analysis API working with real models') :
            'Music Analysis API failed'
        }
      },
      
      // Fixes Applied
      fixesApplied: {
        requestDeduplication: 'Added pending request state to prevent duplicate calls',
        timeoutHandling: 'Added 30-second timeout to prevent hanging requests',
        errorHandling: 'Improved error handling and fallback responses',
        logging: 'Enhanced logging for debugging duplicate requests'
      },
      
      // Instructions
      instructions: {
        ifEnvironmentFails: 'Go to Vercel dashboard → Settings → Environment Variables and add NVIDIA_API_1 through NVIDIA_API_6',
        ifApiFails: 'Check NVIDIA API keys are valid and network connectivity',
        ifMusicAnalysisFails: 'Check that Music Analysis API can access NVIDIA API',
        nextSteps: hasApiKeys ? 
          'Environment variables are loaded. Check other test results for any issues.' :
          'Add environment variables to Vercel dashboard and redeploy.'
      },
      
      // Quick Actions
      quickActions: {
        testEnvironment: 'https://fretboard-ten.vercel.app/api/debug-env',
        testMusicAnalysis: 'POST to /api/music-analysis with type: "ask-question"',
        testChordProgression: 'POST to /api/music-analysis with type: "chord-progression"',
        testScaleAnalysis: 'POST to /api/music-analysis with type: "scale-suggestions"'
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Test endpoint failed',
      message: error.message,
      stack: error.stack?.split('\n').slice(0, 10),
      timestamp: new Date().toISOString()
    });
  }
}
