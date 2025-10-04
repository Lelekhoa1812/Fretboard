import axios from 'axios';
import { LRUCache } from 'lru-cache';

// Round Robin Load Balancer for NVIDIA APIs
class NVIDIAAPIManager {
  constructor() {
    this.apiKeys = [
      process.env.NVIDIA_API_1,
      process.env.NVIDIA_API_2,
      process.env.NVIDIA_API_3,
      process.env.NVIDIA_API_4,
      process.env.NVIDIA_API_5,
      process.env.NVIDIA_API_6,
    ].filter(Boolean);
    
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
      throw new Error('No NVIDIA API keys configured');
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
    
    const response = await axios.post(
      `https://api.nvcf.nvidia.com/v1/rerank`,
      {
        model: process.env.NVIDIA_RERANK,
        query: query,
        documents: history.map(h => h.content),
        top_k: 3
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.results.map(result => 
      history[result.index]
    );
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

  // Main API call method
  async callNVIDIAAPI(prompt, options = {}) {
    const {
      sessionId,
      taskType = 'general',
      complexity = 'medium',
      includeHistory = true,
      temperature = 0.7,
      maxTokens = 1000
    } = options;

    const model = this.selectModel(taskType, complexity);
    const apiKey = this.getNextAPIKey();

    // Get relevant chat history
    let messages = [];
    if (includeHistory && sessionId) {
      const history = await this.getRelevantHistory(sessionId, prompt);
      messages = history;
    }

    // Add current prompt
    messages.push({
      role: 'user',
      content: prompt
    });

    try {
      const response = await axios.post(
        `https://api.nvcf.nvidia.com/v1/chat/completions`,
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
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;

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
      console.error('NVIDIA API Error:', error.response?.data || error.message);
      throw new Error(`NVIDIA API call failed: ${error.message}`);
    }
  }
}

// Export singleton instance
export const nvidiaAPI = new NVIDIAAPIManager();
