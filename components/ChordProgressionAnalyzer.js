import { useState, useEffect, useRef } from 'react';

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
  
  const typingTimeoutRef = useRef(null);
  const stepTimeoutRef = useRef(null);

  // Parse chord progression string into array
  const chords = chordProgression.split(' - ').map(chord => chord.trim());
  
  // AI-Generated chord analysis data (will be populated dynamically)
  const [chordAnalysis, setChordAnalysis] = useState({});
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
    'E7': {
      name: 'E7',
      emotion: 'Strong, resolving, bluesy',
      impact: 'The dominant chord that demands resolution',
      fretboardPositions: [
        { fret: 0, string: 6, finger: 0 }, // E
        { fret: 2, string: 5, finger: 2 }, // B
        { fret: 1, string: 4, finger: 1 }, // D
        { fret: 0, string: 3, finger: 0 }, // G
        { fret: 0, string: 2, finger: 0 }, // B
        { fret: 0, string: 1, finger: 0 }  // E
      ],
      explanation: 'The E7 is your "homecoming" chord. It creates tension that desperately wants to resolve to A minor, making the progression feel complete.',
      alternatives: ['For jazz: try E9', 'For blues: try E7♯9', 'For rock: try E5']
    },
    'Am7': {
      name: 'Am7',
      emotion: 'Melancholic, smooth, jazzy',
      impact: 'The emotional center of the progression',
      fretboardPositions: [
        { fret: 0, string: 5, finger: 0 }, // A
        { fret: 2, string: 4, finger: 2 }, // C
        { fret: 0, string: 3, finger: 0 }, // A
        { fret: 2, string: 2, finger: 1 }, // E
        { fret: 0, string: 1, finger: 0 }, // A
        { fret: 0, string: 0, finger: 0 }  // A
      ],
      explanation: 'Am7 is the heart of this progression. It\'s smooth, sophisticated, and creates the perfect emotional backdrop for storytelling.',
      alternatives: ['For classical: try Am', 'For jazz: try Am9', 'For pop: try Am6']
    },
    'Fmaj7': {
      name: 'Fmaj7',
      emotion: 'Warm, comforting, resolved',
      impact: 'Brings warmth and stability to the progression',
      fretboardPositions: [
        { fret: 1, string: 6, finger: 1 }, // F
        { fret: 0, string: 5, finger: 0 }, // A
        { fret: 0, string: 4, finger: 0 }, // C
        { fret: 2, string: 3, finger: 2 }, // E
        { fret: 1, string: 2, finger: 1 }, // F
        { fret: 0, string: 1, finger: 0 }  // A
      ],
      explanation: 'Fmaj7 is like a warm hug in music. It provides comfort and stability, perfect for the emotional journey of this progression.',
      alternatives: ['For jazz: try Fmaj9', 'For pop: try F', 'For classical: try F6']
    },
    'G6': {
      name: 'G6',
      emotion: 'Bright, optimistic, open',
      impact: 'Adds brightness and forward momentum',
      fretboardPositions: [
        { fret: 3, string: 6, finger: 3 }, // G
        { fret: 0, string: 5, finger: 0 }, // G
        { fret: 0, string: 4, finger: 0 }, // B
        { fret: 0, string: 3, finger: 0 }, // D
        { fret: 2, string: 2, finger: 1 }, // E (6th)
        { fret: 3, string: 1, finger: 2 }  // G
      ],
      explanation: 'G6 brings sunshine to the progression. The E note adds brightness and creates a sense of optimism and forward movement.',
      alternatives: ['For jazz: try G6/9', 'For pop: try G', 'For classical: try Gmaj7']
    },
    'Em9': {
      name: 'Em9',
      emotion: 'Sophisticated, jazzy, complex',
      impact: 'Adds jazz sophistication and harmonic richness',
      fretboardPositions: [
        { fret: 0, string: 6, finger: 0 }, // E
        { fret: 2, string: 5, finger: 2 }, // F# (9th)
        { fret: 0, string: 4, finger: 0 }, // E
        { fret: 2, string: 3, finger: 1 }, // G
        { fret: 0, string: 2, finger: 0 }, // B
        { fret: 0, string: 1, finger: 0 }  // E
      ],
      explanation: 'Em9 is the jazz master\'s choice. The F# adds sophistication and creates beautiful tension that resolves beautifully.',
      alternatives: ['For classical: try Em', 'For jazz: try Em11', 'For pop: try Em7']
    },
    'Dm7': {
      name: 'Dm7',
      emotion: 'Soft, gentle, introspective',
      impact: 'Creates a gentle, introspective moment',
      fretboardPositions: [
        { fret: 0, string: 6, finger: 0 }, // D
        { fret: 0, string: 5, finger: 0 }, // A
        { fret: 0, string: 4, finger: 0 }, // D
        { fret: 0, string: 3, finger: 0 }, // F
        { fret: 1, string: 2, finger: 1 }, // A
        { fret: 0, string: 1, finger: 0 }  // D
      ],
      explanation: 'Dm7 is the gentle whisper in your progression. It\'s soft, introspective, and perfect for moments of reflection.',
      alternatives: ['For classical: try Dm', 'For jazz: try Dm9', 'For pop: try Dm6']
    },
    'G7sus4': {
      name: 'G7sus4',
      emotion: 'Suspended, unresolved, building',
      impact: 'Creates anticipation and builds toward resolution',
      fretboardPositions: [
        { fret: 3, string: 6, finger: 3 }, // G
        { fret: 0, string: 5, finger: 0 }, // G
        { fret: 0, string: 4, finger: 0 }, // B
        { fret: 0, string: 3, finger: 0 }, // D
        { fret: 3, string: 2, finger: 2 }, // C (4th)
        { fret: 3, string: 1, finger: 1 }  // G
      ],
      explanation: 'G7sus4 is the "almost there" chord. It creates anticipation and builds excitement before the final resolution.',
      alternatives: ['For jazz: try G7', 'For pop: try Gsus4', 'For classical: try G']
    },
    'Cmaj7': {
      name: 'Cmaj7',
      emotion: 'Peaceful, resolved, complete',
      impact: 'The perfect resolution that brings everything together',
      fretboardPositions: [
        { fret: 0, string: 6, finger: 0 }, // C
        { fret: 3, string: 5, finger: 3 }, // E
        { fret: 0, string: 4, finger: 0 }, // C
        { fret: 0, string: 3, finger: 0 }, // G
        { fret: 0, string: 2, finger: 0 }, // B
        { fret: 0, string: 1, finger: 0 }  // E
      ],
      explanation: 'Cmaj7 is the perfect ending. It\'s peaceful, resolved, and brings the entire emotional journey to a satisfying conclusion.',
      alternatives: ['For jazz: try Cmaj9', 'For pop: try C', 'For classical: try C6']
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
      typeText(`🎸 **${chordName}** - ${chordData.emotion}`, () => {
        setTimeout(() => {
          // Step 2: Explain the chord
          typeText(`💡 ${chordData.explanation}`, () => {
            setTimeout(() => {
              // Step 3: Show alternatives
              typeText(`🎵 **Alternatives:** ${chordData.alternatives.join(' | ')}`, () => {
                setTimeout(() => {
                  setShowFretboard(false);
                  setCurrentChord(null);
                  setCurrentStep(stepIndex + 1);
                }, 2000);
              });
            }, 3000);
          });
        }, 2000);
      });
    }
  };

  // Start analysis
  useEffect(() => {
    if (isVisible && chords.length > 0) {
      setCurrentStep(0);
      setAnalysisComplete(false);
      setDisplayText('');
      
      // Initial explanation
      typeText(`🎼 **Analyzing your chord progression:** ${chordProgression}`, () => {
        setTimeout(() => {
          typeText(`🎵 **This progression has a sophisticated, jazzy feel with smooth voice leading and emotional depth.**`, () => {
            setTimeout(() => {
              processStep(0);
            }, 2000);
          });
        }, 2000);
      });
    }
  }, [isVisible, chordProgression]);

  // Auto-advance to next chord
  useEffect(() => {
    if (currentStep < chords.length && !isTyping && !showFretboard) {
      const timeout = setTimeout(() => {
        processStep(currentStep);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentStep, isTyping, showFretboard]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="progression-backdrop"
        onClick={onClose}
      />
      
      {/* Main Container */}
      <div className="progression-analyzer">
        {/* Header */}
        <div className="progression-header">
          <h3>🎸 Interactive Chord Analysis</h3>
          <button 
            className="progression-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Subtitle Container */}
        <div className="progression-subtitle">
          <div className="subtitle-content">
            {displayText}
            {isTyping && <span className="typing-cursor">|</span>}
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
            {currentStep} of {chords.length} chords analyzed
          </div>
        </div>

        {/* Fretboard Display */}
        {showFretboard && currentChord && (
          <div className="progression-fretboard">
            <div className="fretboard-container">
              <div className="fretboard">
                {[6, 5, 4, 3, 2, 1].map(string => (
                  <div key={string} className="string">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(fret => {
                      const position = currentChord.fretboardPositions.find(
                        pos => pos.string === string && pos.fret === fret
                      );
                      return (
                        <div 
                          key={fret} 
                          className={`fret ${position ? 'active' : ''}`}
                          style={{ 
                            left: `${fret * 40}px`,
                            backgroundColor: position ? currentChord.color || '#00baba' : 'transparent'
                          }}
                        >
                          {position && (
                            <div className="finger-indicator">
                              {position.finger}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Completion Message */}
        {analysisComplete && (
          <div className="progression-complete">
            <h4>🎉 Analysis Complete!</h4>
            <p>You've mastered a sophisticated chord progression with beautiful voice leading and emotional depth.</p>
            <div className="completion-actions">
              <button 
                className="action-button primary"
                onClick={() => {
                  setCurrentStep(0);
                  setAnalysisComplete(false);
                  processStep(0);
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
          background: rgba(0, 0, 0, 0.8);
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        .progression-analyzer {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(0, 186, 186, 0.3);
          z-index: 2001;
          max-width: 900px;
          width: 90vw;
          max-height: 85vh;
          overflow-y: auto;
          animation: slideIn 0.4s ease;
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

        .progression-subtitle {
          padding: 20px 25px;
          background: rgba(0, 186, 186, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          min-height: 80px;
          display: flex;
          align-items: center;
        }

        .subtitle-content {
          color: #e9f3ff;
          font-size: 16px;
          line-height: 1.6;
          font-weight: 500;
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
        }

        .string {
          position: absolute;
          width: 100%;
          height: 2px;
          background: #8a8a9e;
          top: 50%;
          transform: translateY(-50%);
        }

        .string:nth-child(1) { top: 20%; }
        .string:nth-child(2) { top: 30%; }
        .string:nth-child(3) { top: 40%; }
        .string:nth-child(4) { top: 50%; }
        .string:nth-child(5) { top: 60%; }
        .string:nth-child(6) { top: 70%; }

        .fret {
          position: absolute;
          width: 2px;
          height: 100%;
          background: #6a6a7e;
          top: 0;
        }

        .fret.active {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(0, 186, 186, 0.5);
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

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
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
