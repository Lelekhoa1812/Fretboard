import { useState, useRef, useEffect } from 'react';

export default function AIAssistant({ 
  currentMode, 
  selectedChords = [], 
  selectedScales = [],
  onSuggestion 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      console.log('🤖 AI Assistant: Starting analysis...', { message, selectedChords, selectedScales, currentMode });
      
      // Determine analysis type based on context
      let analysisType = 'ask-question';
      let data = { question: message };

      if (selectedChords.length > 0 && message.toLowerCase().includes('chord')) {
        analysisType = 'chord-progression';
        data = { chords: selectedChords };
      } else if (selectedScales.length > 0 && message.toLowerCase().includes('scale')) {
        analysisType = 'scale-analysis';
        data = { scale: selectedScales[0], key: 'C' };
      } else if (message.toLowerCase().includes('practice')) {
        analysisType = 'practice-plan';
        data = { 
          skillLevel: 'intermediate', 
          timeAvailable: 30, 
          focusArea: currentMode 
        };
      }

      console.log('🤖 AI Assistant: Analysis type determined:', { analysisType, data });

      const response = await fetch('/api/music-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: analysisType,
          data,
          sessionId
        }),
      });

      console.log('🤖 AI Assistant: API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🤖 AI Assistant: API error response:', errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('🤖 AI Assistant: API result:', result);

      if (result.success) {
        const aiMessage = {
          role: 'assistant',
          content: result.data,
          timestamp: new Date().toISOString(),
          model: result.model
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        console.error('🤖 AI Assistant: API returned success=false:', result);
        throw new Error(result.message || 'Analysis failed');
      }
    } catch (error) {
      console.error('🤖 AI Assistant Error:', error);
      console.error('🤖 AI Assistant Error Stack:', error.stack);
      
      const errorMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}. Please check the console for more details.`,
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      sendMessage(input);
      setInput('');
    }
  };

  const quickActions = [
    {
      label: 'Analyze Current Chords',
      action: () => selectedChords.length > 0 ? 
        sendMessage(`Analyze this chord progression: ${selectedChords.join(' - ')}`) :
        sendMessage('I need some chords selected first. Please select some chords on the fretboard.')
    },
    {
      label: 'Explain Music Theory',
      action: () => sendMessage('Explain the music theory behind what I\'m playing')
    },
    {
      label: 'Practice Suggestions',
      action: () => sendMessage('Give me practice suggestions for improving my guitar skills')
    },
    {
      label: 'Scale Recommendations',
      action: () => sendMessage('What scales work well with the chords I\'m playing?')
    }
  ];

  return (
    <>
      {/* AI Assistant Toggle Button */}
      <button
        className="ai-assistant-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Open AI Music Assistant"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        AI Assistant
      </button>

      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="ai-assistant-panel">
          <div className="ai-assistant-header">
            <h3>AI Music Theory Assistant</h3>
            <button 
              className="ai-assistant-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Quick Actions */}
          <div className="ai-quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="ai-quick-action"
                onClick={action.action}
                disabled={loading}
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="ai-messages">
            {messages.length === 0 && (
              <div className="ai-welcome">
                <p>Hi! I'm your AI music theory assistant. Ask me about:</p>
                <ul>
                  <li>Chord progressions and harmony</li>
                  <li>Scale relationships and improvisation</li>
                  <li>Guitar techniques and practice tips</li>
                  <li>Music theory concepts</li>
                </ul>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div key={index} className={`ai-message ${message.role}`}>
                <div className="ai-message-content">
                  {message.content}
                </div>
                <div className="ai-message-meta">
                  {message.timestamp && new Date(message.timestamp).toLocaleTimeString()}
                  {message.model && ` • ${message.model}`}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="ai-message assistant">
                <div className="ai-message-content">
                  <div className="ai-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form className="ai-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about music theory, chords, scales..."
              disabled={loading}
              className="ai-input"
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="ai-send-button"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        .ai-assistant-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: linear-gradient(135deg, #00baba 0%, #008a8a 100%);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(0,186,186,0.3);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .ai-assistant-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,186,186,0.4);
        }

        .ai-assistant-toggle svg {
          width: 20px;
          height: 20px;
        }

        .ai-assistant-panel {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 400px;
          height: 500px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          z-index: 1001;
          border: 1px solid rgba(0,186,186,0.3);
        }

        .ai-assistant-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .ai-assistant-header h3 {
          color: #00baba;
          margin: 0;
          font-size: 18px;
        }

        .ai-assistant-close {
          background: none;
          border: none;
          color: #b7c4d6;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .ai-assistant-close:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .ai-quick-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 15px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .ai-quick-action {
          background: rgba(0,186,186,0.1);
          border: 1px solid rgba(0,186,186,0.3);
          color: #00baba;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ai-quick-action:hover:not(:disabled) {
          background: rgba(0,186,186,0.2);
          border-color: rgba(0,186,186,0.5);
        }

        .ai-quick-action:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .ai-messages {
          flex: 1;
          overflow-y: auto;
          padding: 15px 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .ai-welcome {
          color: #b7c4d6;
          font-size: 14px;
        }

        .ai-welcome ul {
          margin: 10px 0;
          padding-left: 20px;
        }

        .ai-welcome li {
          margin: 5px 0;
        }

        .ai-message {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .ai-message.user {
          align-items: flex-end;
        }

        .ai-message.assistant {
          align-items: flex-start;
        }

        .ai-message-content {
          background: rgba(255,255,255,0.05);
          padding: 12px 15px;
          border-radius: 15px;
          color: #e9f3ff;
          font-size: 14px;
          line-height: 1.5;
          max-width: 85%;
        }

        .ai-message.user .ai-message-content {
          background: rgba(0,186,186,0.2);
          border: 1px solid rgba(0,186,186,0.3);
        }

        .ai-message-meta {
          font-size: 11px;
          color: #888;
          margin-top: 5px;
        }

        .ai-typing {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .ai-typing span {
          width: 6px;
          height: 6px;
          background: #00baba;
          border-radius: 50%;
          animation: ai-typing 1.4s infinite ease-in-out;
        }

        .ai-typing span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .ai-typing span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes ai-typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .ai-input-form {
          display: flex;
          padding: 15px 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          gap: 10px;
        }

        .ai-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #e9f3ff;
          padding: 10px 15px;
          border-radius: 20px;
          font-size: 14px;
          outline: none;
        }

        .ai-input:focus {
          border-color: #00baba;
        }

        .ai-input::placeholder {
          color: #888;
        }

        .ai-send-button {
          background: #00baba;
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .ai-send-button:hover:not(:disabled) {
          background: #00d4d4;
          transform: translateY(-1px);
        }

        .ai-send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .ai-assistant-panel {
            width: calc(100vw - 40px);
            height: calc(100vh - 100px);
            bottom: 10px;
            right: 10px;
          }
        }
      `}</style>
    </>
  );
}
