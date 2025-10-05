import axios from 'axios';
import { LRUCache } from 'lru-cache';

// Round Robin Load Balancer for NVIDIA APIs
class NVIDIAAPIManager {
  constructor() {
    // Debug environment variables in production
    console.log('🔧 NVIDIA API: Environment check', {
      nodeEnv: process.env.NODE_ENV,
      hasApi1: !!process.env.NVIDIA_API_1,
      hasApi2: !!process.env.NVIDIA_API_2,
      hasApi3: !!process.env.NVIDIA_API_3,
      hasApi4: !!process.env.NVIDIA_API_4,
      hasApi5: !!process.env.NVIDIA_API_5,
      hasApi6: !!process.env.NVIDIA_API_6,
      allEnvKeys: Object.keys(process.env).filter(key => key.startsWith('NVIDIA_')),
      totalEnvKeys: Object.keys(process.env).length,
      sampleEnvKeys: Object.keys(process.env).slice(0, 10) // Show first 10 env keys for debugging
    });

    // Try multiple ways to load API keys
    this.apiKeys = [
      process.env.NVIDIA_API_1,
      process.env.NVIDIA_API_2,
      process.env.NVIDIA_API_3,
      process.env.NVIDIA_API_4,
      process.env.NVIDIA_API_5,
      process.env.NVIDIA_API_6,
    ].filter(Boolean);

    // If no API keys found, try alternative loading methods
    if (this.apiKeys.length === 0) {
      console.warn('⚠️ NVIDIA API: No API keys found in process.env, trying alternative methods...');
      
      // Try loading from different sources (useful for debugging)
      const alternativeKeys = [
        process.env['NVIDIA_API_1'],
        process.env['NVIDIA_API_2'],
        process.env['NVIDIA_API_3'],
        process.env['NVIDIA_API_4'],
        process.env['NVIDIA_API_5'],
        process.env['NVIDIA_API_6'],
      ].filter(Boolean);
      
      if (alternativeKeys.length > 0) {
        console.log('✅ NVIDIA API: Found alternative API keys');
        this.apiKeys = alternativeKeys;
      } else {
        console.error('❌ NVIDIA API: No API keys found in any method. Check Vercel environment variables.');
        console.log('Available environment variables:', Object.keys(process.env).filter(key => key.includes('NVIDIA') || key.includes('API')));
      }
    }

    console.log(`🔧 NVIDIA API: Loaded ${this.apiKeys.length} API keys`);
    
    this.currentIndex = 0;
    this.models = {
      small: process.env.NVIDIA_SMALL || 'meta/llama-3.1-8b-instruct',
      medium: process.env.NVIDIA_MEDIUM || 'qwen/qwen3-next-80b-a3b-thinking',
      large: process.env.NVIDIA_LARGE || 'openai/gpt-oss-120b'
    };
    
    // Chat history cache (max 5 turns)
    this.chatCache = new LRUCache({
      max: 100,
      ttl: 1000 * 60 * 30 // 30 minutes
    });
  }

  // Round Robin API Key Selection
  getNextAPIKey() {
    if (this.apiKeys.length === 0) {
      console.warn('⚠️ NVIDIA API: No API keys configured, using fallback responses');
      return null;
    }
    
    const key = this.apiKeys[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.apiKeys.length;
    return key;
  }

  // Smart Model Selection based on task complexity
  selectModel(taskType, complexity = 'medium') {
    switch (taskType) {
      case 'simple_chat':
      case 'basic_explanation':
        return this.models.small;
      
      case 'reasoning':
      case 'planning':
      case 'analysis':
        return this.models.medium;
      
      case 'complex_analysis':
      case 'long_context':
      case 'detailed_explanation':
        return this.models.large;
      
      default:
        return complexity === 'high' ? this.models.large : 
               complexity === 'low' ? this.models.small : 
               this.models.medium;
    }
  }

  // Get relevant chat history using reranker
  async getRelevantHistory(sessionId, currentQuery) {
    const history = this.chatCache.get(sessionId) || [];
    if (history.length === 0) return [];

    try {
      // Use reranker to select most relevant history
      const rerankResponse = await this.rerankHistory(history, currentQuery);
      return rerankResponse.slice(0, 3); // Return top 3 relevant exchanges
    } catch (error) {
      console.error('Reranking failed, using recent history:', error);
      return history.slice(-3); // Fallback to recent history
    }
  }

  // Rerank chat history for relevance
  async rerankHistory(history, query) {
    const apiKey = this.getNextAPIKey();
    
    // Skip reranking for now to avoid 404 errors
    // Return recent history as fallback
    return history.slice(-3);
  }

  // Store chat history
  storeChatHistory(sessionId, userMessage, aiResponse) {
    const history = this.chatCache.get(sessionId) || [];
    
    // Add new exchange
    history.push({
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    });
    
    history.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: Date.now()
    });

    // Keep only last 5 turns (10 messages)
    if (history.length > 10) {
      history.splice(0, history.length - 10);
    }

    this.chatCache.set(sessionId, history);
  }

  // Generate fallback response when API fails
  generateFallbackResponse(prompt, taskType) {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('chord') && lowerPrompt.includes('progression')) {
      return `I'd be happy to help analyze chord progressions! However, I'm currently experiencing technical difficulties with my AI service. 

For chord progression analysis, here are some general tips:
- Look for common patterns like I-V-vi-IV (C-G-Am-F)
- Identify the key signature and harmonic function
- Consider voice leading between chords
- Try different inversions for smoother transitions

Please try again later when the AI service is restored, or feel free to ask specific questions about music theory!`;
    }
    
    if (lowerPrompt.includes('scale')) {
      return `I'd love to help with scale analysis! Unfortunately, I'm having some technical issues right now.

For scale work, remember:
- Major scales follow the pattern: W-W-H-W-W-W-H
- Minor scales have different variations (natural, harmonic, melodic)
- Practice scales in different positions on the fretboard
- Learn the relationship between scales and chords

Please try again later when my AI service is back online!`;
    }
    
    if (lowerPrompt.includes('practice')) {
      return `I'd be happy to create a practice plan for you! However, I'm experiencing some technical difficulties at the moment.

Here's a general practice structure:
1. Warm-up (5-10 minutes) - finger exercises, scales
2. Technique work (10-15 minutes) - specific skills
3. Repertoire (15-20 minutes) - songs or pieces
4. Theory application (5-10 minutes) - understanding what you're playing
5. Cool-down (5 minutes) - review and reflection

Please try again later when the AI service is restored!`;
    }
    
    return `I'd love to help with your music theory question! However, I'm currently experiencing some technical difficulties with my AI service.

I can help with:
- Chord progressions and harmony
- Scale relationships and improvisation
- Guitar techniques and practice tips
- Music theory concepts

Please try again later when the service is restored, or feel free to ask specific questions about music theory!`;
  }

  // Main API call method
  async callNVIDIAAPI(prompt, options = {}) {
    const {
      sessionId,
      taskType = 'general',
      complexity = 'medium',
      includeHistory = true,
      temperature = 0.7,
      maxTokens = 2500
    } = options;

    const model = this.selectModel(taskType, complexity);
    const apiKey = this.getNextAPIKey();

    // If no API key is available, return fallback response immediately
    if (!apiKey) {
      console.log('🚀 NVIDIA API: No API key available, using fallback response');
      const fallbackResponse = this.generateFallbackResponse(prompt, taskType);
      return {
        response: fallbackResponse,
        model: 'fallback',
        usage: { total_tokens: 0 }
      };
    }

    // Get relevant chat history
    let messages = [];
    if (includeHistory && sessionId) {
      try {
        const history = await this.getRelevantHistory(sessionId, prompt);
        messages = Array.isArray(history) ? history : [];
      } catch (error) {
        console.error('Failed to get chat history:', error);
        messages = [];
      }
    }

    // Add current prompt
    messages.push({
      role: 'user',
      content: prompt
    });

    // Ensure messages is always a valid array
    if (!Array.isArray(messages)) {
      console.error('Messages is not an array:', messages);
      messages = [];
    }

    console.log('🚀 NVIDIA API: Starting API call', { 
      model, 
      taskType, 
      complexity, 
      sessionId: sessionId ? 'provided' : 'none',
      promptLength: prompt.length,
      messagesCount: messages.length
    });

    try {
      // Try different NVIDIA API endpoints (NIM API)
      const endpoints = [
        `https://integrate.api.nvidia.com/v1/chat/completions`,
        // `https://api.nvcf.nvidia.com/v1/chat/completions`
      ];
      
      let response;
      let lastError;
      
      for (const endpoint of endpoints) {
        try {
          console.log(`🚀 NVIDIA API: Trying endpoint: ${endpoint}`);
          response = await axios.post(
            endpoint,
            {
              model: model,
              messages: messages,
              temperature: temperature,
              max_tokens: maxTokens,
              stream: false
            },
            {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
              },
              timeout: 30000 // 30 second timeout
            }
          );
          console.log(`🚀 NVIDIA API: Success with ${endpoint}`, { 
            status: response.status,
            usage: response.data.usage 
          });
          break; // Success, exit the loop
        } catch (error) {
          lastError = error;
          console.error(`🚀 NVIDIA API: Failed to connect to ${endpoint}:`, {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message
          });
          continue; // Try next endpoint
        }
      }
      
      if (!response) {
        console.error('🚀 NVIDIA API: All endpoints failed, using fallback');
        throw lastError || new Error('All NVIDIA API endpoints failed');
      }

      // Handle different response formats from different models
      const message = response.data.choices[0].message;
      const aiResponse = message.content || message.reasoning_content || 'No response content available';
      
      console.log('🚀 NVIDIA API: Response received', { 
        responseLength: aiResponse.length,
        model: model,
        hasContent: !!message.content,
        hasReasoningContent: !!message.reasoning_content
      });

      // Store in chat history
      if (sessionId) {
        this.storeChatHistory(sessionId, prompt, aiResponse);
      }

      return {
        response: aiResponse,
        model: model,
        usage: response.data.usage
      };

    } catch (error) {
      console.error('🚀 NVIDIA API: All endpoints failed, using fallback response', error);
      
      // Fallback response when all API endpoints fail
      const fallbackResponse = this.generateFallbackResponse(prompt, taskType);
      console.log('🚀 NVIDIA API: Using fallback response', { 
        fallbackLength: fallbackResponse.length,
        taskType 
      });
      
      return {
        response: fallbackResponse,
        model: 'fallback',
        usage: { total_tokens: 0 }
      };
    }
  }
}

// Export singleton instance
export const nvidiaAPI = new NVIDIAAPIManager();
