# Fretboard AI - Next.js Migration

## 🚀 **Migration Complete!**

This project has been successfully migrated to Next.js with integrated NVIDIA NIM AI features.

## ✨ **New Features**

### **AI-Powered Music Theory Assistant**
- **Smart Model Selection**: Automatically chooses the best NVIDIA model based on task complexity
- **Round Robin Load Balancing**: Distributes API calls across 6 NVIDIA API keys
- **Context Management**: Maintains conversation history with intelligent reranking
- **Real-time Analysis**: Instant chord progression analysis and scale recommendations

### **AI Features Available**
1. **Chord Progression Analysis** - Analyze and improve chord progressions
2. **Scale Recommendations** - Get scales that work with your chords
3. **Music Theory Explanations** - Learn concepts with AI tutoring
4. **Practice Plan Generation** - Personalized practice recommendations
5. **Interactive Q&A** - Ask any music theory questions

## 🛠 **Technical Architecture**

### **NVIDIA Model Selection Strategy**
- **Small (Llama-8b)**: Simple explanations, basic questions
- **Medium (Qwen3-thinking)**: Reasoning, planning, analysis
- **Large (GPT-OSS-120b)**: Complex analysis, long context

### **Load Balancing**
- 6 NVIDIA API keys with round-robin distribution
- Automatic failover and error handling
- Usage optimization to minimize costs

### **Context Management**
- Chat history cached for 5 turns
- NVIDIA reranker for relevant context selection
- Smart context pruning for optimal performance

## 📁 **Project Structure**

```
fretboard-ai/
├── pages/
│   ├── api/
│   │   └── music-analysis.js    # AI API endpoints
│   ├── _app.js                  # App wrapper
│   └── index.js                 # Main page
├── components/
│   ├── FretboardApp.js          # Main app component
│   └── AIAssistant.js           # AI chat interface
├── lib/
│   ├── nvidia-api.js            # NVIDIA API manager
│   └── music-theory-ai.js       # Music theory AI functions
├── styles/
│   └── globals.css              # All styles
└── public/
    └── img/                     # Images
```

## 🚀 **Deployment to Vercel**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Environment Setup**
Copy `env.example` to `.env.local` and configure:
```bash
cp env.example .env.local
```

### **3. Configure NVIDIA API Keys**
Add your NVIDIA API keys to `.env.local`:
```env
NVIDIA_API_1=your_key_1
NVIDIA_API_2=your_key_2
# ... etc
```

### **4. Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

## 🎯 **Usage**

### **For Users**
1. **Landing Screen**: Choose your mode (Notes, Chords, Scales)
2. **Main App**: Use the fretboard with AI assistance
3. **AI Assistant**: Click the floating AI button for help
4. **Quick Actions**: Use pre-built prompts for common tasks

### **For Developers**
1. **API Integration**: Use `/api/music-analysis` for AI features
2. **Model Selection**: Configure task complexity in API calls
3. **Context Management**: Sessions are automatically managed
4. **Error Handling**: Built-in retry and fallback mechanisms

## 🔧 **Configuration**

### **Model Selection Logic**
```javascript
// Simple tasks use small model
const result = await nvidiaAPI.callNVIDIAAPI(prompt, {
  taskType: 'simple_chat',
  complexity: 'low'
});

// Complex analysis uses large model
const analysis = await nvidiaAPI.callNVIDIAAPI(prompt, {
  taskType: 'complex_analysis',
  complexity: 'high'
});
```

### **Context Management**
```javascript
// Sessions are automatically managed
const sessionId = 'user_123';
const response = await nvidiaAPI.callNVIDIAAPI(prompt, {
  sessionId,
  includeHistory: true
});
```

## 📊 **Performance Optimizations**

- **Smart Caching**: LRU cache for chat history
- **Model Selection**: Right-sized models for each task
- **Load Balancing**: Even distribution across API keys
- **Context Pruning**: Automatic cleanup of old conversations

## 🎵 **AI Features in Action**

### **Chord Analysis**
- Select chords on fretboard
- Click "Analyze Current Chords" in AI Assistant
- Get detailed harmonic analysis and suggestions

### **Scale Recommendations**
- Ask "What scales work with C major?"
- Get practical guitar applications
- Learn theory behind each suggestion

### **Practice Planning**
- Ask "Give me a 30-minute practice session"
- Get personalized exercises
- Track progress with AI guidance

## 🔒 **Security & Privacy**

- API keys stored securely in Vercel environment variables
- No user data stored permanently
- Chat history cached temporarily (30 minutes)
- Automatic cleanup of sensitive information

## 🚀 **Next Steps**

1. **Deploy to Vercel**: Follow deployment instructions
2. **Configure API Keys**: Add your NVIDIA API keys
3. **Test AI Features**: Try the AI Assistant
4. **Customize**: Modify prompts and responses as needed

## 📞 **Support**

For issues or questions:
1. Check the AI Assistant for help
2. Review the console logs for errors
3. Verify API key configuration
4. Check Vercel deployment logs

---

**Ready to rock with AI-powered music theory! 🎸🤖**
