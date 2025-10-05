import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChordProgressionAnalyzer({ 
  chordProgression, 
  isVisible, 
  onClose,
  onChordSelect 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentChord, setCurrentChord] = useState(null);
  const [showFretboard, setShowFretboard] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [chordAnalysis, setChordAnalysis] = useState({});
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const [progressionVibe, setProgressionVibe] = useState('');
  const [showDetailedThoughts, setShowDetailedThoughts] = useState(false);
  const [summarizedAnalysis, setSummarizedAnalysis] = useState({});
  
  const typingTimeoutRef = useRef(null);
  const stepTimeoutRef = useRef(null);

  // Parse chord progression string into array with better validation
  const chords = chordProgression
    .split(/ - | → | -> |,/)
    .map(chord => chord.trim())
    .filter(chord => {
      // Filter out invalid chords and common false positives
      const validChordPattern = /^[A-G][#♭]?(?:maj|min|m|M|dim|aug|sus|add|6|7|9|11|13|♭5|♯5|♭9|♯9|♭13|♯13|♯11|♭11|5|b5|#5|b9|#9|b13|#13|#11|b11)*\d*$/;
      return validChordPattern.test(chord) && chord.length > 0;
    });

  // Summarize AI responses using Llama
  const summarizeAIResponse = async (fullResponse, chordName) => {
    try {
      const response = await fetch('/api/music-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'summarize-analysis',
          data: { 
            fullResponse: fullResponse,
            chordName: chordName,
            context: 'Summarize this chord analysis to be concise and instructional'
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.data;
      }
    } catch (error) {
      console.error('Failed to summarize response:', error);
    }
    return fullResponse; // Fallback to original
  };

  // Generate AI analysis for the entire progression
  const generateProgressionAnalysis = async () => {
    setIsGeneratingAnalysis(true);
    
    try {
      // First, get the overall vibe and analysis
      const vibeResponse = await fetch('/api/music-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'progression-vibe',
          data: { 
            progression: chordProgression,
            context: 'Generate creative vibe analysis and emotional journey for this chord progression'
          }
        })
      });

      if (vibeResponse.ok) {
        const vibeData = await vibeResponse.json();
        setProgressionVibe(vibeData.data);
      }

      // Then generate individual chord analysis
      const analysisPromises = chords.map(async (chord, index) => {
        const chordResponse = await fetch('/api/music-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'chord-analysis',
            data: { 
              chord: chord,
              progression: chordProgression,
              position: index + 1,
              totalChords: chords.length,
              context: `Analyze this chord in the context of the progression: ${chordProgression}`
            }
          })
        });

        if (chordResponse.ok) {
          const chordData = await chordResponse.json();
          try {
            // Try to parse the JSON response
            const parsedAnalysis = JSON.parse(chordData.data);
            
            // Summarize the explanation for concise display
            const summarizedExplanation = await summarizeAIResponse(parsedAnalysis.explanation, chord);
            
            return { 
              chord, 
              analysis: {
                ...parsedAnalysis,
                explanation: summarizedExplanation,
                fullExplanation: parsedAnalysis.explanation // Keep original for detailed view
              }
            };
          } catch (error) {
            console.error('Failed to parse chord analysis JSON:', error);
            // Fallback to basic analysis
            return { 
              chord, 
              analysis: {
                name: chord,
                emotion: 'Analyzing...',
                impact: 'Processing chord analysis...',
                explanation: chordData.data || 'Processing chord analysis...',
                alternatives: ['Alternative 1', 'Alternative 2', 'Alternative 3'],
                fretboardPositions: [],
                color: '#00baba'
              }
            };
          }
        }
        return { chord, analysis: null };
      });

      const results = await Promise.all(analysisPromises);
      const analysisMap = {};
      
      results.forEach(({ chord, analysis }) => {
        if (analysis) {
          analysisMap[chord] = analysis;
        }
      });

      setChordAnalysis(analysisMap);
    } catch (error) {
      console.error('Failed to generate progression analysis:', error);
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  // Typewriter effect
  const typeText = (text, callback) => {
    setIsTyping(true);
    let index = 0;
    setDisplayText('');
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        if (callback) callback();
      }
    }, 30);
  };

  // Process each chord step
  const processStep = (stepIndex) => {
    if (stepIndex >= chords.length) {
      setAnalysisComplete(true);
      return;
    }

    const chordName = chords[stepIndex];
    const chordData = chordAnalysis[chordName];
    
    if (chordData) {
      setCurrentChord(chordData);
      
      // Step 1: Show chord on fretboard
      setShowFretboard(true);
      typeText(`**${chordName}** - ${chordData.emotion || 'Analyzing...'}`, () => {
        setTimeout(() => {
          // Step 2: Explain the chord
          typeText(`💡 ${chordData.explanation || 'Processing chord analysis...'}`, () => {
            setTimeout(() => {
              // Step 3: Show alternatives
              if (chordData.alternatives && chordData.alternatives.length > 0) {
                typeText(`🎵 **Alternatives:** ${chordData.alternatives.join(' | ')}`, () => {
                  setTimeout(() => {
                    setShowFretboard(false);
                    setCurrentChord(null);
                    setCurrentStep(stepIndex + 1);
                  }, 2000);
                });
              } else {
                setTimeout(() => {
                  setShowFretboard(false);
                  setCurrentChord(null);
                  setCurrentStep(stepIndex + 1);
                }, 2000);
              }
            }, 3000);
          });
        }, 2000);
      });
    } else {
      // Fallback if chord analysis not available
      typeText(`**${chordName}** - Processing...`, () => {
        setTimeout(() => {
          typeText(`💡 Analyzing this chord in the context of your progression...`, () => {
            setTimeout(() => {
              setCurrentStep(stepIndex + 1);
            }, 2000);
          });
        }, 2000);
      });
    }
  };

  // Start analysis
  useEffect(() => {
    if (isVisible && chords.length > 0) {
      console.log('🎸 Starting chord progression analysis:', { 
        originalProgression: chordProgression, 
        parsedChords: chords, 
        chordCount: chords.length 
      });
      
      setCurrentStep(0);
      setAnalysisComplete(false);
      setDisplayText('');
      
      // Generate AI analysis first
      generateProgressionAnalysis().then(() => {
        // Initial explanation
        typeText(`🎼 **Analyzing your chord progression:** ${chordProgression}`, () => {
          setTimeout(() => {
            if (progressionVibe) {
              typeText(`🎵 **${progressionVibe}**`, () => {
                setTimeout(() => {
                  processStep(0);
                }, 2000);
              });
            } else {
              typeText(`🎵 **This progression has a unique character with interesting harmonic relationships.**`, () => {
                setTimeout(() => {
                  processStep(0);
                }, 2000);
              });
            }
          }, 2000);
        });
      });
    } else if (isVisible && chords.length === 0) {
      console.log('❌ No valid chords found in progression:', chordProgression);
      typeText(`❌ **No valid chord progression detected.** Please enter chords like: C - Am - F - G`, () => {
        setTimeout(() => {
          onClose();
        }, 3000);
      });
    }
  }, [isVisible, chordProgression]);

  // Auto-advance to next chord
  useEffect(() => {
    if (currentStep < chords.length && !isTyping && !showFretboard && !isGeneratingAnalysis) {
      const timeout = setTimeout(() => {
        processStep(currentStep);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentStep, isTyping, showFretboard, isGeneratingAnalysis]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="progression-backdrop"
      />
      
      {/* Main Container */}
      <div className="progression-analyzer">
        {/* Header */}
        <div className="progression-header">
          <h3>AI-Powered Chord Analysis</h3>
          <button 
            className="progression-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Compact Subtitle Container at Bottom */}
        <div className="progression-subtitle-compact">
          <div className="subtitle-content-compact">
            <ReactMarkdown 
              components={{
                h1: ({children}) => <h1 className="markdown-h1-compact">{children}</h1>,
                h2: ({children}) => <h2 className="markdown-h2-compact">{children}</h2>,
                h3: ({children}) => <h3 className="markdown-h3-compact">{children}</h3>,
                h4: ({children}) => <h4 className="markdown-h4-compact">{children}</h4>,
                p: ({children}) => <p className="markdown-p-compact">{children}</p>,
                ul: ({children}) => <ul className="markdown-ul-compact">{children}</ul>,
                ol: ({children}) => <ol className="markdown-ol-compact">{children}</ol>,
                li: ({children}) => <li className="markdown-li-compact">{children}</li>,
                strong: ({children}) => <strong className="markdown-strong-compact">{children}</strong>,
                em: ({children}) => <em className="markdown-em-compact">{children}</em>,
                code: ({children}) => <code className="markdown-code-compact">{children}</code>,
                blockquote: ({children}) => <blockquote className="markdown-blockquote-compact">{children}</blockquote>,
                hr: () => <hr className="markdown-hr-compact" />
              }}
            >
              {displayText}
            </ReactMarkdown>
            {isTyping && <span className="typing-cursor">|</span>}
          </div>
          
          {/* Toggle for detailed thoughts */}
          <div className="thoughts-toggle">
            <button 
              className={`thoughts-button ${showDetailedThoughts ? 'active' : ''}`}
              onClick={() => setShowDetailedThoughts(!showDetailedThoughts)}
              title={showDetailedThoughts ? 'Hide detailed thoughts' : 'Show detailed thoughts'}
            >
              💭 {showDetailedThoughts ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="progression-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(currentStep / chords.length) * 100}%` }}
            />
          </div>
          <div className="progress-text">
            {isGeneratingAnalysis ? 'Generating AI analysis...' : `${currentStep} of ${chords.length} chords analyzed`}
          </div>
        </div>

        {/* Detailed thoughts panel (collapsible) */}
        {showDetailedThoughts && currentChord && currentChord.fullExplanation && (
          <div className="detailed-thoughts-panel">
            <div className="thoughts-content">
              <h4>💭 Detailed Analysis</h4>
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
                  hr: () => <hr className="markdown-hr" />
                }}
              >
                {currentChord.fullExplanation}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Completion Message */}
        {analysisComplete && (
          <div className="progression-complete">
            <h4>🎉 Analysis Complete!</h4>
            <p>You've explored a unique chord progression with AI-generated insights and personalized guidance.</p>
            <div className="completion-actions">
              <button 
                className="action-button primary"
                onClick={() => {
                  setCurrentStep(0);
                  setAnalysisComplete(false);
                  generateProgressionAnalysis().then(() => processStep(0));
                }}
              >
                🔄 Analyze Again
              </button>
              <button 
                className="action-button secondary"
                onClick={onClose}
              >
                ✅ Done
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .progression-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          z-index: 2000;
          animation: fadeIn 0.3s ease;
          pointer-events: none;
        }

        .progression-analyzer {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(0, 186, 186, 0.3);
          z-index: 2001;
          max-width: 800px;
          width: 90vw;
          max-height: 40vh;
          overflow-y: auto;
          animation: slideUp 0.4s ease;
          pointer-events: auto;
        }

        .progression-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .progression-header h3 {
          color: #00baba;
          margin: 0;
          font-size: 22px;
          font-weight: 600;
        }

        .progression-close {
          background: none;
          border: none;
          color: #b7c4d6;
          font-size: 28px;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .progression-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .progression-subtitle-compact {
          padding: 15px 20px;
          background: rgba(0, 186, 186, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .subtitle-content-compact {
          color: #e9f3ff;
          font-size: 14px;
          line-height: 1.4;
          font-weight: 500;
          flex: 1;
        }

        .thoughts-toggle {
          flex-shrink: 0;
        }

        .thoughts-button {
          background: rgba(0, 186, 186, 0.1);
          border: 1px solid rgba(0, 186, 186, 0.3);
          color: #00baba;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .thoughts-button:hover {
          background: rgba(0, 186, 186, 0.2);
          border-color: rgba(0, 186, 186, 0.5);
        }

        .thoughts-button.active {
          background: rgba(0, 186, 186, 0.2);
          border-color: #00baba;
          color: #00d4d4;
        }

        /* Markdown Styling */
        .markdown-h1 {
          color: #00baba;
          font-size: 20px;
          font-weight: bold;
          margin: 15px 0 10px 0;
          border-bottom: 2px solid rgba(0, 186, 186, 0.3);
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
          background: rgba(0, 186, 186, 0.1);
          color: #00d4d4;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 13px;
        }

        .markdown-blockquote {
          border-left: 4px solid #00baba;
          background: rgba(0, 186, 186, 0.05);
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

        /* Compact Markdown Styling */
        .markdown-h1-compact {
          color: #00baba;
          font-size: 16px;
          font-weight: bold;
          margin: 8px 0 6px 0;
        }

        .markdown-h2-compact {
          color: #00d4d4;
          font-size: 14px;
          font-weight: bold;
          margin: 6px 0 4px 0;
        }

        .markdown-h3-compact {
          color: #4dd0e1;
          font-size: 13px;
          font-weight: 600;
          margin: 4px 0 3px 0;
        }

        .markdown-p-compact {
          margin: 4px 0;
          line-height: 1.4;
          font-size: 13px;
        }

        .markdown-strong-compact {
          color: #00baba;
          font-weight: bold;
        }

        .markdown-em-compact {
          color: #4dd0e1;
          font-style: italic;
        }

        /* Detailed thoughts panel */
        .detailed-thoughts-panel {
          padding: 15px 20px;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          max-height: 200px;
          overflow-y: auto;
        }

        .thoughts-content h4 {
          color: #00baba;
          margin: 0 0 10px 0;
          font-size: 14px;
        }

        .typing-cursor {
          animation: blink 1s infinite;
          color: #00baba;
          font-weight: bold;
        }

        .progression-progress {
          padding: 15px 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00baba, #00d4d4);
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .progress-text {
          color: #b7c4d6;
          font-size: 14px;
          text-align: center;
        }

        .progression-fretboard {
          padding: 20px 25px;
          background: rgba(0, 0, 0, 0.2);
        }

        .fretboard-container {
          background: #2a2a3e;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid rgba(0, 186, 186, 0.3);
        }

        .fretboard {
          position: relative;
          height: 200px;
          background: linear-gradient(90deg, #3a3a4e 0%, #4a4a5e 100%);
          border-radius: 8px;
          border: 2px solid #5a5a6e;
          padding: 20px;
        }

        .guitar-string {
          position: absolute;
          width: calc(100% - 40px);
          height: 2px;
          background: #8a8a9e;
          left: 20px;
        }

        .guitar-string:nth-child(1) { top: 20px; }
        .guitar-string:nth-child(2) { top: 50px; }
        .guitar-string:nth-child(3) { top: 80px; }
        .guitar-string:nth-child(4) { top: 110px; }
        .guitar-string:nth-child(5) { top: 140px; }
        .guitar-string:nth-child(6) { top: 170px; }

        .fret-position {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .fret-position.active {
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(0, 186, 186, 0.5);
          z-index: 10;
        }

        .finger-indicator {
          color: white;
          font-weight: bold;
          font-size: 12px;
        }

        .progression-complete {
          padding: 30px 25px;
          text-align: center;
          background: rgba(0, 186, 186, 0.1);
          border-radius: 0 0 20px 20px;
        }

        .progression-complete h4 {
          color: #00baba;
          margin: 0 0 15px 0;
          font-size: 20px;
        }

        .progression-complete p {
          color: #b7c4d6;
          margin: 0 0 20px 0;
          line-height: 1.6;
        }

        .completion-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .action-button {
          padding: 12px 24px;
          border-radius: 25px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .action-button.primary {
          background: linear-gradient(135deg, #00baba 0%, #008a8a 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 186, 186, 0.3);
        }

        .action-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 186, 186, 0.4);
        }

        .action-button.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #b7c4d6;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .action-button.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @media (max-width: 768px) {
          .progression-analyzer {
            width: 95vw;
            max-height: 90vh;
          }
          
          .progression-subtitle {
            padding: 15px 20px;
            min-height: 60px;
          }
          
          .subtitle-content {
            font-size: 14px;
          }
          
          .fretboard {
            height: 150px;
          }
        }
      `}</style>
    </>
  );
}