import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { getChordShape, hasChordShape } from '../lib/chord-shapes';

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

  // Get chord shape from library or Llama
  const getChordShapeData = async (chordName) => {
    console.log(`Getting chord shape for: ${chordName}`);
    
    // First try to get from chord library
    if (hasChordShape(chordName)) {
      const shape = getChordShape(chordName);
      console.log(`Found chord shape in library:`, shape);
      return shape;
    }
    
    console.log(`Chord ${chordName} not found in library, asking Llama...`);

    // If not in library, ask Llama for chord positions with timeout
    try {
      const response = await Promise.race([
        fetch('/api/music-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'get-chord-shape',
            data: { 
              chordName: chordName
            }
          })
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Chord shape timeout')), 5000))
      ]);

      if (response.ok) {
        const data = await response.json();
        const positionString = data.data;
        
        // Parse the position string from Llama
        if (positionString && typeof positionString === 'string') {
          const positions = positionString.split(',').map(pos => {
            const [string, fret, finger] = pos.trim().split(':');
            return {
              string: parseInt(string),
              fret: parseInt(fret),
              finger: parseInt(finger)
            };
          });
          
          if (positions.length > 0) {
            return positions;
          }
        }
      }
    } catch (error) {
      console.error('Failed to get chord positions from Llama:', error);
    }

    // Fallback to basic positions if all else fails
    console.log(`Using fallback positions for ${chordName}`);
    return [
      { string: 5, fret: 3, finger: 3 },
      { string: 4, fret: 2, finger: 2 },
      { string: 3, fret: 0, finger: 0 },
      { string: 2, fret: 1, finger: 1 },
      { string: 1, fret: 0, finger: 0 }
    ];
  };

  // Generate AI analysis for the entire progression
  const generateProgressionAnalysis = async () => {
    setIsGeneratingAnalysis(true);
    
    try {
      // First, get the overall vibe and analysis with timeout
      try {
        const vibeResponse = await Promise.race([
          fetch('/api/music-analysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'progression-vibe',
              data: { 
                progression: chordProgression,
                context: 'Generate creative vibe analysis and emotional journey for this chord progression'
              }
            })
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
        ]);

        if (vibeResponse.ok) {
          const vibeData = await vibeResponse.json();
          setProgressionVibe(vibeData.data);
        }
      } catch (error) {
        console.error('Vibe analysis failed:', error);
        setProgressionVibe('This progression creates a beautiful musical journey with rich harmonic colors.');
      }

      // Then generate individual chord analysis with timeout
      const analysisPromises = chords.map(async (chord, index) => {
        try {
          const chordResponse = await Promise.race([
            fetch('/api/music-analysis', {
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
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 8000))
          ]);

          if (chordResponse.ok) {
            const chordData = await chordResponse.json();
            try {
              const parsedAnalysis = JSON.parse(chordData.data);
              
              // Get real chord shape from library or Llama
              const fretboardPositions = await getChordShapeData(chord);
              
              // Summarize the explanation for concise display
              const summarizedExplanation = await summarizeAIResponse(parsedAnalysis.explanation, chord);
              
              return { 
                chord, 
                analysis: {
                  ...parsedAnalysis,
                  explanation: summarizedExplanation,
                  fullExplanation: parsedAnalysis.explanation,
                  fretboardPositions: fretboardPositions // Use real chord shapes
                }
              };
            } catch (error) {
              console.error('Failed to parse chord analysis JSON:', error);
              
              // Get real chord shape even for fallback
              const fretboardPositions = await getChordShapeData(chord);
              
              return { 
                chord, 
                analysis: {
                  name: chord,
                  emotion: 'Musical',
                  impact: 'Adds character to the progression',
                  explanation: `The ${chord} chord brings its unique character to this position in the progression.`,
                  alternatives: [`${chord}m`, `${chord}7`, `${chord}sus4`],
                  fretboardPositions: fretboardPositions,
                  color: '#00baba'
                }
              };
            }
          }
        } catch (error) {
          console.error(`Failed to analyze chord ${chord}:`, error);
          
          // Always get chord shape even when AI fails
          const fretboardPositions = await getChordShapeData(chord);
          
          // Fallback analysis
          return { 
            chord, 
            analysis: {
              name: chord,
              emotion: 'Musical',
              impact: 'Adds character to the progression',
              explanation: `The ${chord} chord brings its unique character to this position in the progression.`,
              alternatives: [`${chord}m`, `${chord}7`, `${chord}sus4`],
              fretboardPositions: fretboardPositions, // Use real chord shapes
              color: '#00baba'
            }
          };
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
      // Create fallback analysis for all chords
      const fallbackAnalysis = {};
      chords.forEach(chord => {
        fallbackAnalysis[chord] = {
          name: chord,
          emotion: 'Musical',
          impact: 'Contributes to the progression',
          explanation: `The ${chord} chord adds its unique character to this progression.`,
          alternatives: [`${chord}m`, `${chord}7`, `${chord}sus4`],
          fretboardPositions: [
            {"fret": 0, "string": 5, "finger": 3},
            {"fret": 2, "string": 4, "finger": 1}
          ],
          color: '#00baba'
        };
      });
      setChordAnalysis(fallbackAnalysis);
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

        {/* Fretboard Visualization */}
        {currentChord && currentChord.analysis && currentChord.analysis.fretboardPositions && currentChord.analysis.fretboardPositions.length > 0 && (
          <div className="fretboard-visualization">
            <h4>🎸 Chord Positions</h4>
            <div className="fretboard-display">
              <div className="fretboard-strings">
                {[6, 5, 4, 3, 2, 1].map(string => (
                  <div key={string} className="guitar-string">
                    <div className="string-label">E{string === 6 ? '6' : string === 5 ? '5' : string === 4 ? '4' : string === 3 ? '3' : string === 2 ? '2' : '1'}</div>
                    <div className="string-line"></div>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(fret => {
                      const position = currentChord.analysis.fretboardPositions.find(
                        pos => pos.string === string && pos.fret === fret
                      );
                      return (
                        <div 
                          key={fret} 
                          className={`fret-marker ${position ? 'active' : ''}`}
                          style={{ 
                            left: `${fret * 25 + 30}px`,
                            backgroundColor: position ? (currentChord.analysis.color || '#00baba') : 'transparent'
                          }}
                        >
                          {position && (
                            <div className="finger-number">
                              {position.finger}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="fret-numbers">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(fret => (
                  <div key={fret} className="fret-number" style={{ left: `${fret * 25 + 30}px` }}>
                    {fret}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Detailed thoughts panel (collapsible) */}
        {showDetailedThoughts && currentChord && currentChord.analysis && currentChord.analysis.fullExplanation && (
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
                {currentChord.analysis.fullExplanation}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Enhanced Alternatives Display */}
        {currentChord && currentChord.analysis && (
          <div className="alternatives-section">
            <h4>🎵 Alternative Chords</h4>
            <div className="alternatives-grid">
              {currentChord.analysis.alternatives && currentChord.analysis.alternatives.length > 0 ? (
                currentChord.analysis.alternatives.map((alt, index) => {
                  // Handle both old format (strings) and new format (objects)
                  const chordName = typeof alt === 'string' ? alt : alt.chord || alt;
                  const emotion = typeof alt === 'object' ? alt.emotion : 'Alternative';
                  const reason = typeof alt === 'object' ? alt.reason : 'Creative alternative';
                  const color = typeof alt === 'object' ? alt.color : '#00baba';
                  
                  return (
                    <div key={index} className="alternative-chord">
                      <div className="alternative-name" style={{ color: color }}>
                        {chordName}
                      </div>
                      <div className="alternative-emotion">
                        {emotion}
                      </div>
                      <div className="alternative-reason">
                        {reason}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="alternative-chord">
                  <div className="alternative-name" style={{ color: '#00baba' }}>
                    Cmaj7
                  </div>
                  <div className="alternative-emotion">
                    Warm & Dreamy
                  </div>
                  <div className="alternative-reason">
                    Creates a more sophisticated jazz feel
                  </div>
                </div>
              )}
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
          color: white;
          font-size: 18px;
          font-weight: bold;
          margin: 12px 0 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .markdown-h3 {
          color: white;
          font-size: 16px;
          font-weight: 600;
          margin: 10px 0 6px 0;
        }

        .markdown-h4 {
          color: white;
          font-size: 15px;
          font-weight: 600;
          margin: 8px 0 4px 0;
        }

        .markdown-p {
          color: white;
          margin: 8px 0;
          line-height: 1.6;
        }

        .markdown-ul, .markdown-ol {
          color: white;
          margin: 8px 0;
          padding-left: 20px;
        }

        .markdown-li {
          color: white;
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
          color: white;
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

        /* Alternatives Section */
        .alternatives-section {
          padding: 15px 20px;
          background: rgba(0, 186, 186, 0.05);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .alternatives-section h4 {
          color: #00baba;
          margin: 0 0 15px 0;
          font-size: 16px;
          font-weight: bold;
        }

        .alternatives-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        .alternative-chord {
          background: rgba(0, 186, 186, 0.1);
          border: 1px solid rgba(0, 186, 186, 0.3);
          border-radius: 8px;
          padding: 12px;
          transition: all 0.3s ease;
        }

        .alternative-chord:hover {
          background: rgba(0, 186, 186, 0.15);
          border-color: rgba(0, 186, 186, 0.5);
        }

        .alternative-name {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 6px;
        }

        .alternative-emotion {
          color: #4dd0e1;
          font-size: 13px;
          font-style: italic;
          margin-bottom: 8px;
        }

        .alternative-reason {
          color: #e9f3ff;
          font-size: 12px;
          line-height: 1.4;
        }

        /* Fretboard Visualization */
        .fretboard-visualization {
          padding: 15px 20px;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .fretboard-visualization h4 {
          color: #00baba;
          margin: 0 0 15px 0;
          font-size: 16px;
          font-weight: bold;
        }

        .fretboard-display {
          position: relative;
          background: linear-gradient(90deg, #2a2a3e 0%, #3a3a4e 100%);
          border-radius: 8px;
          padding: 20px;
          border: 2px solid #4a4a5e;
          overflow-x: auto;
        }

        .fretboard-strings {
          position: relative;
          height: 120px;
        }

        .guitar-string {
          position: absolute;
          width: 100%;
          height: 2px;
          background: #8a8a9e;
          display: flex;
          align-items: center;
        }

        .guitar-string:nth-child(1) { top: 10px; }
        .guitar-string:nth-child(2) { top: 30px; }
        .guitar-string:nth-child(3) { top: 50px; }
        .guitar-string:nth-child(4) { top: 70px; }
        .guitar-string:nth-child(5) { top: 90px; }
        .guitar-string:nth-child(6) { top: 110px; }

        .string-label {
          position: absolute;
          left: -25px;
          color: #8a8a9e;
          font-size: 12px;
          font-weight: bold;
          top: 50%;
          transform: translateY(-50%);
        }

        .string-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: #8a8a9e;
        }

        .fret-marker {
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

        .fret-marker.active {
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(0, 186, 186, 0.5);
          z-index: 10;
        }

        .finger-number {
          color: white;
          font-weight: bold;
          font-size: 10px;
        }

        .fret-numbers {
          position: absolute;
          top: -25px;
          left: 0;
          right: 0;
          height: 20px;
        }

        .fret-number {
          position: absolute;
          color: #8a8a9e;
          font-size: 10px;
          font-weight: bold;
          top: 0;
          transform: translateX(-50%);
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