import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ChordProgressionAnalyzer from './ChordProgressionAnalyzer';
import { audioAnalyzer } from '../lib/audio-analyzer.js';
import { adaptiveLearning } from '../lib/adaptive-learning.js';
import { gamificationEngine } from '../lib/gamification-engine.js';
import { voiceAssistant } from '../lib/voice-assistant.js';
import { musicGenerator } from '../lib/music-generator.js';
import { progressTracker } from '../lib/progress-tracker.js';

export default function AIAssistant({ 
  currentMode, 
  selectedChords = [], 
  selectedScales = [],
  instrument = 'Guitar',
  accidentals = 'flats',
  onSuggestion,
  onClearSelectedChords
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [recentInsights, setRecentInsights] = useState(null);
  const [showProgressionAnalyzer, setShowProgressionAnalyzer] = useState(false);
  const [currentProgression, setCurrentProgression] = useState('');
  const messagesEndRef = useRef(null);
  
  // Add request deduplication
  const [pendingRequest, setPendingRequest] = useState(null);
  const requestIdRef = useRef(0);
  const lastRequestTimeRef = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Detect chord progressions in user input
  const detectChordProgression = (message) => {
    // More precise chord pattern that avoids false positives
    const chordPattern = /\b([A-G][#♭]?(?:major|minor|maj|min|m|M|dim|aug|sus|add|6|7|9|11|13|♭5|♯5|♭9|♯9|♭13|♯13|♯11|♭11|5|b5|#5|b9|#9|b13|#13|#11|b11)*\d*)\b/g;
    const matches = message.match(chordPattern);
    
    console.log('🔍 Chord detection debug:', { 
      message: message.substring(0, 50) + '...', 
      matches, 
      matchCount: matches?.length 
    });
    
    if (matches && matches.length >= 3) {
      // Additional validation: check if it's actually a chord progression
      // by looking for common chord progression patterns
      const progressionText = message.toLowerCase();
      const hasChordSeparators = progressionText.includes(' - ') || progressionText.includes(' → ') || progressionText.includes(' -> ');
      const hasChordKeywords = progressionText.includes('chord') || progressionText.includes('progression') || progressionText.includes('sequence');
      
      console.log('🔍 Validation check:', { 
        hasChordSeparators, 
        hasChordKeywords, 
        matchCount: matches.length 
      });
      
      // Only trigger if it looks like an intentional chord progression
      if (hasChordSeparators || hasChordKeywords || matches.length >= 4) {
        const progression = matches.join(' - ');
        console.log('✅ Chord progression detected:', progression);
        setCurrentProgression(progression);
        setShowProgressionAnalyzer(true);
        return true;
      } else {
        console.log('❌ False positive avoided - not a chord progression');
      }
    }
    return false;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize AI features on component mount
  useEffect(() => {
    initializeAIFeatures();
    return () => cleanupAIFeatures();
  }, []);

  // Initialize AI features
  const initializeAIFeatures = async () => {
    try {
      // Initialize adaptive learning
      adaptiveLearning.createUserProfile(userId, {
        skillLevel: 'beginner',
        learningStyle: 'mixed',
        interests: ['rock', 'pop', 'blues'],
        practiceTime: 30,
        goals: ['learn basic chords', 'play songs']
      });

      // Initialize voice assistant
      if (voiceAssistant.instance && voiceAssistant.instance.isSupported()) {
        voiceAssistant.instance.setCallbacks({
          onCommand: handleVoiceCommand,
          onError: (error) => console.error('Voice command error:', error),
          onStart: () => setIsListening(true),
          onEnd: () => setIsListening(false)
        });
      }

      // Initialize audio analyzer
      const audioInitialized = await audioAnalyzer.initialize();
      if (audioInitialized) {
        audioAnalyzer.setCallbacks({
          onChordDetected: handleChordDetected,
          onTimingFeedback: handleTimingFeedback,
          onPitchFeedback: handlePitchFeedback,
          onTechniqueFeedback: handleTechniqueFeedback
        });
      }

      // Initialize music generator
      await musicGenerator.initialize();

      console.log('🤖 AI Assistant: All features initialized successfully');
    } catch (error) {
      console.error('🤖 AI Assistant: Failed to initialize features:', error);
    }
  };

  // Cleanup AI features
  const cleanupAIFeatures = () => {
    audioAnalyzer.cleanup();
    if (voiceAssistant.instance) {
      voiceAssistant.instance.cleanup();
    }
    musicGenerator.cleanup();
  };

  // Handle voice commands
  const handleVoiceCommand = async (command, transcript) => {
    console.log('🎤 Voice command received:', command, transcript);
    
    let message = '';
    switch (command) {
      case 'analyze_chord':
        message = 'Analyze the current chord selection';
        break;
      case 'show_scales':
        message = 'Show scales for the current chord';
        break;
      case 'practice_plan':
        message = 'Create a practice plan for me';
        break;
      case 'music_theory':
        message = 'Explain music theory concepts';
        break;
      case 'help':
        message = 'Show me available voice commands';
        break;
      default:
        message = transcript;
    }
    
    if (message) {
      await sendMessage(message);
    }
  };

  // Handle audio analysis callbacks
  const handleChordDetected = (chordData) => {
    console.log('🎵 Chord detected:', chordData);
    // Update UI with detected chord
  };

  const handleTimingFeedback = (timingData) => {
    console.log('🎵 Timing feedback:', timingData);
    // Update UI with timing feedback
  };

  const handlePitchFeedback = (pitchData) => {
    console.log('🎵 Pitch feedback:', pitchData);
    // Update UI with pitch feedback
  };

  const handleTechniqueFeedback = (techniqueData) => {
    console.log('🎵 Technique feedback:', techniqueData);
    // Update UI with technique feedback
  };

  // Start audio analysis
  const startAudioAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      audioAnalyzer.startAnalysis();
      await sendMessage('🎵 Started real-time audio analysis! Play your guitar and I\'ll provide feedback on your playing.');
    } catch (error) {
      console.error('Failed to start audio analysis:', error);
      await sendMessage('Sorry, I couldn\'t start audio analysis. Please check your microphone permissions.');
    }
  };

  // Stop audio analysis
  const stopAudioAnalysis = () => {
    audioAnalyzer.stopAnalysis();
    setIsAnalyzing(false);
    sendMessage('🎵 Stopped audio analysis. Great practice session!');
  };

  // Generate backing track
  const generateBackingTrack = async () => {
    try {
      if (selectedChords.length === 0) {
        await sendMessage('Please select some chords first to generate a backing track!');
        return;
      }

      const chordNames = selectedChords.map(c => `${c.root}${c.quality}`);
      await sendMessage(`🎶 Generating a backing track for: ${chordNames.join(' - ')}...`);
      
      const backingTrack = await musicGenerator.generateBackingTrack(chordNames, {
        style: 'pop',
        tempo: 120,
        duration: 60
      });

      if (backingTrack) {
        await sendMessage(`🎶 Backing track generated! I've created a ${backingTrack.options.style} track at ${backingTrack.options.tempo} BPM. You can now play along with it!`);
      }
    } catch (error) {
      console.error('Failed to generate backing track:', error);
      await sendMessage('Sorry, I couldn\'t generate a backing track right now. Please try again later.');
    }
  };

  // Show progress
  const showProgress = async () => {
    try {
      const progress = progressTracker.getProgressSummary(userId);
      const insights = progressTracker.getUserInsights(userId);
      
      if (progress) {
        let progressMessage = `📊 **Your Progress Summary:**\n\n`;
        progressMessage += `**Practice Stats:**\n`;
        progressMessage += `• Total Practice Time: ${Math.round(progress.totalPracticeTime)} minutes\n`;
        progressMessage += `• Sessions Completed: ${progress.sessionsCompleted}\n`;
        progressMessage += `• Current Streak: ${progress.currentStreak} days\n`;
        progressMessage += `• Longest Streak: ${progress.longestStreak} days\n\n`;
        
        progressMessage += `**Learning Progress:**\n`;
        progressMessage += `• Chords Learned: ${progress.chordsLearned}\n`;
        progressMessage += `• Scales Learned: ${progress.scalesLearned}\n`;
        progressMessage += `• Songs Completed: ${progress.songsCompleted}\n\n`;
        
        progressMessage += `**Performance:**\n`;
        progressMessage += `• Average Accuracy: ${Math.round(progress.averageAccuracy * 100)}%\n`;
        progressMessage += `• Average Speed: ${Math.round(progress.averageSpeed * 100)}%\n`;
        progressMessage += `• Average Technique: ${Math.round(progress.averageTechnique * 100)}%\n\n`;
        
        progressMessage += `**Achievements:**\n`;
        progressMessage += `• Milestones: ${progress.milestones}\n`;

        if (insights && insights.insights) {
          progressMessage += `\n**AI Insights:**\n${insights.insights}`;
        }

        await sendMessage(progressMessage);
      } else {
        await sendMessage('No progress data available yet. Start practicing to see your progress!');
      }
    } catch (error) {
      console.error('Failed to show progress:', error);
      await sendMessage('Sorry, I couldn\'t retrieve your progress data right now.');
    }
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    
    // Prevent duplicate requests
    if (loading || pendingRequest) {
      console.log('🚫 AI Assistant: Request already in progress, ignoring duplicate');
      return;
    }

    // Additional check to prevent rapid-fire requests
    const now = Date.now();
    if (lastRequestTimeRef.current && (now - lastRequestTimeRef.current) < 10000) {
      console.log('🚫 AI Assistant: Request too soon after last request, ignoring');
      return;
    }
    lastRequestTimeRef.current = now;

    const requestId = ++requestIdRef.current;
    console.log(`🚀 AI Assistant: Starting request ${requestId}`, { message: message.substring(0, 50) + '...' });

    // Check for chord progression first
    if (detectChordProgression(message)) {
      const userMessage = {
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, userMessage]);
      setPendingRequest(requestId);
      
      const aiMessage = {
        role: 'assistant',
        content: `**I detected a chord progression!** Let me analyze this step-by-step with interactive fretboard guidance.\n\n**Progression:** ${currentProgression}\n\nClick the analyzer below to start the interactive analysis!`,
        timestamp: new Date().toISOString(),
        hasProgression: true
      };
      setMessages(prev => [...prev, aiMessage]);
      setPendingRequest(null);
      return;
    }

    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setPendingRequest(requestId);

    try {
      console.log('AI Assistant: Starting analysis...', { message, selectedChords, selectedScales, currentMode });
      
      // Build rich context for the AI
      const context = {
        instrument,
        accidentals,
        currentMode,
        selectedChords: selectedChords.map(chord => `${chord.root}${chord.quality}`),
        selectedScales: selectedScales.map(scale => `${scale.root} ${scale.family}`),
        fretboardState: {
          hasChords: selectedChords.length > 0,
          hasScales: selectedScales.length > 0,
          chordCount: selectedChords.length,
          scaleCount: selectedScales.length
        }
      };

      // Determine analysis type based on context and message content
      let analysisType = 'ask-question';
      let data = { 
        question: message,
        context: `You are helping a user with a ${instrument} fretboard in ${currentMode} mode. ` +
                `Current selections: ${selectedChords.length} chords, ${selectedScales.length} scales. ` +
                `Instrument: ${instrument}, Accidentals: ${accidentals}. ` +
                `Selected chords: ${context.selectedChords.join(', ')}. ` +
                `Selected scales: ${context.selectedScales.join(', ')}.`
      };

      // Enhanced analysis type detection
      if (selectedChords.length > 0 && (message.toLowerCase().includes('chord') || message.toLowerCase().includes('progression'))) {
        analysisType = 'chord-progression';
        data = { 
          chords: context.selectedChords,
          context: data.context
        };
      } else if (selectedScales.length > 0 && message.toLowerCase().includes('scale')) {
        analysisType = 'scale-analysis';
        data = { 
          scale: selectedScales[0].family, 
          key: selectedScales[0].root,
          context: data.context
        };
      } else if (message.toLowerCase().includes('practice')) {
        analysisType = 'practice-plan';
        data = { 
          skillLevel: 'intermediate', 
          timeAvailable: 30, 
          focusArea: currentMode,
          context: data.context
        };
      } else if (message.toLowerCase().includes('fretboard') || message.toLowerCase().includes('navigate') || message.toLowerCase().includes('guide')) {
        // For fretboard navigation guidance
        analysisType = 'fretboard-guidance';
        data = { context: data.context };
      } else if (message.toLowerCase().includes('select') || message.toLowerCase().includes('chord') || message.toLowerCase().includes('help')) {
        // For general questions about selecting chords or getting help
        analysisType = 'ask-question';
        data.context += ' The user is asking for guidance on chord selection and fretboard interaction.';
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
        // Don't break UX on 504; show analyzer if progression detected
        if (response.status === 504) {
          if (detectChordProgression(message)) {
            setShowProgressionAnalyzer(true);
          }
        }
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      // Additional validation to ensure we have a valid response
      if (!response.headers.get('content-type')?.includes('application/json')) {
        console.error('🤖 AI Assistant: Invalid response content type:', response.headers.get('content-type'));
        throw new Error('Invalid response format - expected JSON');
      }

      const result = await response.json();
      console.log('🤖 AI Assistant: API result:', {
        success: result.success,
        hasData: !!result.data,
        dataLength: result.data?.length,
        model: result.model,
        usage: result.usage
      });

      if (result.success && result.data) {
        const aiMessage = {
          role: 'assistant',
          content: result.data,
          timestamp: new Date().toISOString(),
          model: result.model
        };
        setMessages(prev => [...prev, aiMessage]);

        // Track progress and update gamification
        trackUserActivity(message, result.data);
      } else {
        console.error('🤖 AI Assistant: API returned success=false or no data:', result);
        throw new Error(result.message || 'Analysis failed - no data received');
      }
    } catch (error) {
      console.error('🤖 AI Assistant Error:', error);
      console.error('🤖 AI Assistant Error Stack:', error.stack);
      
      // Check if this is a network error or API error
      const isNetworkError = error.message.includes('fetch') || error.message.includes('network');
      const isAPIError = error.message.includes('API request failed');
      
      let errorContent;
      if (isNetworkError) {
        errorContent = `🌐 **Network Error**\n\nI'm having trouble connecting to the AI service. This might be a temporary network issue.\n\n**What you can try:**\n- Check your internet connection\n- Refresh the page and try again\n- Wait a moment and retry\n\n*The AI service should be back online soon!*`;
      } else if (isAPIError) {
        errorContent = `🔧 **Service Error**\n\nI encountered an issue with the AI service. This is likely temporary.\n\n**What you can try:**\n- Try asking a different question\n- Wait a moment and retry\n- Check if the service is back online\n\n*I'll be back to full functionality soon!*`;
      } else {
        errorContent = `⚠️ **Technical Issue**\n\nI encountered an unexpected error: ${error.message}\n\n**What you can try:**\n- Try rephrasing your question\n- Ask about a different topic\n- Wait a moment and try again\n\n*I'm working to resolve this issue!*`;
      }
      
      const errorMessage = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setPendingRequest(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading && !pendingRequest) {
      sendMessage(input);
      setInput('');
    }
  };

  // Track user activity for progress and gamification
  const trackUserActivity = async (message, response) => {
    try {
      // Extract activity data from message and response
      const activityData = {
        duration: 5, // Default session duration
        context: 'ai_interaction',
        timestamp: new Date()
      };

      // Check if message contains learning activities
      if (message.toLowerCase().includes('chord')) {
        activityData.chordsLearned = selectedChords.map(c => `${c.root}${c.quality}`);
      }

      if (message.toLowerCase().includes('scale')) {
        activityData.scalesLearned = selectedScales.map(s => `${s.root} ${s.family}`);
      }

      if (message.toLowerCase().includes('practice')) {
        activityData.duration = 30; // Practice session
      }

      // Update progress tracker
      progressTracker.trackActivity(userId, activityData);

      // Update gamification
      const gamificationResult = gamificationEngine.updateUserStats(userId, activityData);
      
      if (gamificationResult.newAchievements.length > 0) {
        const achievementMessage = `**New Achievement${gamificationResult.newAchievements.length > 1 ? 's' : ''} Unlocked!**\n\n`;
        const achievementsText = gamificationResult.newAchievements
          .map(achievement => `• ${achievement.icon} **${achievement.name}** - ${achievement.description} (+${achievement.points} points)`)
          .join('\n');
        
        await sendMessage(achievementMessage + achievementsText);
      }

      if (gamificationResult.newBadges.length > 0) {
        const badgeMessage = `**New Badge${gamificationResult.newBadges.length > 1 ? 's' : ''} Earned!**\n\n`;
        const badgesText = gamificationResult.newBadges
          .map(badge => `• ${badge.icon} **${badge.name}** - ${badge.description}`)
          .join('\n');
        
        await sendMessage(badgeMessage + badgesText);
      }

      // Update user stats
      setUserStats(gamificationResult.updatedStats);

      // Generate AI encouragement
      const encouragement = await gamificationEngine.generateEncouragement(userId, activityData);
      if (encouragement && encouragement !== "Keep up the great work!") {
        // Only show encouragement occasionally to avoid spam
        if (Math.random() < 0.3) {
          await sendMessage(encouragement);
        }
      }

    } catch (error) {
      console.error('Failed to track user activity:', error);
    }
  };

  const quickActions = [
    {
      label: selectedChords.length > 0 ? `Analyze ${selectedChords.length} Chord${selectedChords.length > 1 ? 's' : ''}` : 'Select Chords First',
      action: () => {
        if (selectedChords.length === 0) {
          return sendMessage('I need some chords selected first. Please select some chords on the fretboard.');
        }
        const progression = selectedChords.map(c => `${c.root}${c.quality}`).join(' - ');
        setCurrentProgression(progression);
        setShowProgressionAnalyzer(true); // open immediately without waiting on any API
      }
    },
    {
      label: 'Fretboard Guide',
      action: () => sendMessage('Show me how to navigate the fretboard and select meaningful chords')
    },
    {
      label: 'Chord Progressions',
      action: () => sendMessage('Suggest some beautiful chord progressions I can try')
    },
    {
      label: 'Music Theory',
      action: () => sendMessage('Explain the music theory behind what I\'m playing')
    },
    {
      label: 'Practice Plan',
      action: () => sendMessage('Create a practice plan for improving my guitar skills')
    },
    {
      label: 'Creative Ideas',
      action: () => sendMessage('Give me creative ideas for using these chords in songwriting')
    },
    {
      label: 'Analyze Progression',
      action: () => sendMessage('Cadd9 - Bm7b5 - E7 - Am7 - Fmaj7 - G6 - Em9 - Am7 - Dm7 - G7sus4 - Cmaj7')
    },
    {
      label: isListening ? '🎤 Stop Listening' : '🎤 Voice Control',
      action: () => isListening ? voiceAssistant.instance?.stopListening() : voiceAssistant.instance?.startListening()
    },
    {
      label: isAnalyzing ? '🎵 Stop Analysis' : '🎵 Start Audio Analysis',
      action: () => isAnalyzing ? stopAudioAnalysis() : startAudioAnalysis()
    },
    {
      label: 'Generate Backing Track',
      action: () => generateBackingTrack()
    },
    {
      label: 'My Progress',
      action: () => showProgress()
    }
  ];

  return (
    <>
      {/* AI Assistant Toggle Button - Hide when progression analyzer is open */}
      {!showProgressionAnalyzer && (
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
      )}

      {/* AI Assistant Panel - Hide when progression analyzer is open */}
      {isOpen && !showProgressionAnalyzer && (
        <div className="ai-assistant-panel">
          <div className="ai-assistant-header">
            <div className="ai-header-content">
              <h3>AI Music Theory Assistant</h3>
              <div className="ai-status-indicators">
                {isListening && <span className="status-indicator listening">🎤 Listening</span>}
                {isAnalyzing && <span className="status-indicator analyzing">🎵 Analyzing</span>}
                {userStats && (
                  <span className="status-indicator stats">
                    Level {userStats.level} • {userStats.totalPoints} pts
                  </span>
                )}
              </div>
            </div>
            <button 
              className="ai-assistant-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Selected Chords Display */}
          {selectedChords.length > 0 && (
            <div className="selected-chords-display">
              <div className="selected-chords-header">
                <span className="selected-chords-title">
                  Selected Chords ({selectedChords.length})
                </span>
                <button 
                  className="clear-chords-button"
                  onClick={() => {
                    if (onClearSelectedChords) {
                      onClearSelectedChords();
                    }
                  }}
                  title="Clear all selected chords"
                >
                  ✕
                </button>
              </div>
              <div className="selected-chords-list">
                {selectedChords.map((chord, index) => (
                  <span key={index} className="selected-chord-item">
                    {chord.root}{chord.quality}
                  </span>
                ))}
              </div>
            </div>
          )}

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
                  {message.role === 'assistant' ? (
                    <ReactMarkdown 
                      components={{
                        h1: ({children}) => <h1 className="markdown-h1">{children}</h1>,
                        h2: ({children}) => <h2 className="markdown-h2">{children}</h2>,
                        h3: ({children}) => <h3 className="markdown-h3">{children}</h3>,
                        h4: ({children}) => <h4 className="markdown-h4">{children}</h4>,
                        p: ({children}) => <p className="markdown-p">{children}</p>,
                        ul: ({children}) => <ul className="markdown-ul">{children}</ul>,
                        ol: ({children}) => <ol className="markdown-ol">{children}</ol>,
                        li: ({children}) => <li className="markdown-li">{children}</li>,
                        strong: ({children}) => <strong className="markdown-strong">{children}</strong>,
                        em: ({children}) => <em className="markdown-em">{children}</em>,
                        code: ({children}) => <code className="markdown-code">{children}</code>,
                        blockquote: ({children}) => <blockquote className="markdown-blockquote">{children}</blockquote>,
                        hr: () => <hr className="markdown-hr" />,
                        a: ({href, children}) => <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">{children}</a>
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
                {message.hasProgression && (
                  <div className="ai-progression-action">
                    <button 
                      className="progression-analyzer-button"
                      onClick={() => setShowProgressionAnalyzer(true)}
                    >
                      🎸 Analyze Progression Interactively
                    </button>
                  </div>
                )}
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

        .ai-header-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ai-assistant-header h3 {
          color: #00baba;
          margin: 0;
          font-size: 18px;
        }

        .ai-status-indicators {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .status-indicator {
          background: rgba(0,186,186,0.1);
          border: 1px solid rgba(0,186,186,0.3);
          color: #00baba;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
        }

        .status-indicator.listening {
          background: rgba(255,193,7,0.1);
          border-color: rgba(255,193,7,0.3);
          color: #ffc107;
          animation: pulse 2s infinite;
        }

        .status-indicator.analyzing {
          background: rgba(40,167,69,0.1);
          border-color: rgba(40,167,69,0.3);
          color: #28a745;
          animation: pulse 2s infinite;
        }

        .status-indicator.stats {
          background: rgba(108,117,125,0.1);
          border-color: rgba(108,117,125,0.3);
          color: #6c757d;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
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

        .selected-chords-display {
          background: rgba(0, 186, 186, 0.05);
          border-bottom: 1px solid rgba(0, 186, 186, 0.2);
          padding: 12px 20px;
        }

        .selected-chords-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .selected-chords-title {
          color: #00baba;
          font-size: 14px;
          font-weight: 600;
        }

        .clear-chords-button {
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.3);
          color: #ff6b6b;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .clear-chords-button:hover {
          background: rgba(255, 0, 0, 0.2);
          border-color: rgba(255, 0, 0, 0.5);
          color: #ff5252;
        }

        .selected-chords-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .selected-chord-item {
          background: rgba(0, 186, 186, 0.15);
          border: 1px solid rgba(0, 186, 186, 0.4);
          color: #00d4d4;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
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

        /* Markdown Styling */
        .markdown-h1 {
          color: #00baba;
          font-size: 20px;
          font-weight: bold;
          margin: 15px 0 10px 0;
          border-bottom: 2px solid rgba(0,186,186,0.3);
          padding-bottom: 5px;
        }

        .markdown-h2 {
          color: #00d4d4;
          font-size: 18px;
          font-weight: bold;
          margin: 12px 0 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .markdown-h3 {
          color: #4dd0e1;
          font-size: 16px;
          font-weight: 600;
          margin: 10px 0 6px 0;
        }

        .markdown-h4 {
          color: #81d4fa;
          font-size: 15px;
          font-weight: 600;
          margin: 8px 0 4px 0;
        }

        .markdown-p {
          margin: 8px 0;
          line-height: 1.6;
        }

        .markdown-ul, .markdown-ol {
          margin: 8px 0;
          padding-left: 20px;
        }

        .markdown-li {
          margin: 4px 0;
          line-height: 1.5;
        }

        .markdown-strong {
          color: #00baba;
          font-weight: bold;
        }

        .markdown-em {
          color: #4dd0e1;
          font-style: italic;
        }

        .markdown-code {
          background: rgba(0,186,186,0.1);
          color: #00d4d4;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 13px;
        }

        .markdown-blockquote {
          border-left: 4px solid #00baba;
          background: rgba(0,186,186,0.05);
          padding: 10px 15px;
          margin: 10px 0;
          border-radius: 0 8px 8px 0;
          font-style: italic;
        }

        .markdown-hr {
          border: none;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00baba, transparent);
          margin: 15px 0;
        }

        .markdown-link {
          color: #4dd0e1;
          text-decoration: none;
          border-bottom: 1px dotted #4dd0e1;
          transition: all 0.3s ease;
        }

        .markdown-link:hover {
          color: #00d4d4;
          border-bottom-color: #00d4d4;
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

        .ai-progression-action {
          padding: 10px 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .progression-analyzer-button {
          background: linear-gradient(135deg, #00baba 0%, #008a8a 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 186, 186, 0.3);
          width: 100%;
        }

        .progression-analyzer-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 186, 186, 0.4);
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

      {/* Chord Progression Analyzer */}
      {showProgressionAnalyzer && (
        <ChordProgressionAnalyzer
          chordProgression={currentProgression}
          isVisible={showProgressionAnalyzer}
          onClose={() => setShowProgressionAnalyzer(false)}
          onChordSelect={(chord) => {
            console.log('Chord selected:', chord);
            // You can add chord selection logic here
          }}
        />
      )}
    </>
  );
}
