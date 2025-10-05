import { useState } from 'react';

export default function ChordProgressionDemo() {
  const [showDemo, setShowDemo] = useState(false);
  const [progression, setProgression] = useState('Cadd9 - Bm7b5 - E7 - Am7 - Fmaj7 - G6 - Em9 - Am7 - Dm7 - G7sus4 - Cmaj7');

  const exampleProgressions = [
    {
      name: 'Jazz Ballad',
      progression: 'Cmaj7 - Am7 - Dm7 - G7 - Cmaj7',
      description: 'A smooth, romantic progression perfect for ballads'
    },
    {
      name: 'Blues Rock',
      progression: 'A7 - D7 - A7 - E7 - D7 - A7 - E7',
      description: 'Classic blues progression with dominant 7th chords'
    },
    {
      name: 'Modern Pop',
      progression: 'F - Am - Dm - Bb - F - Am - Bb - C',
      description: 'Contemporary pop progression with emotional depth'
    },
    {
      name: 'Jazz Sophisticated',
      progression: 'Cadd9 - Bm7b5 - E7 - Am7 - Fmaj7 - G6 - Em9 - Am7 - Dm7 - G7sus4 - Cmaj7',
      description: 'Complex jazz progression with smooth voice leading'
    }
  ];

  if (!showDemo) {
    return (
      <div className="demo-trigger">
        <button 
          className="demo-button"
          onClick={() => setShowDemo(true)}
        >
          🎸 Try Interactive Chord Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="chord-progression-demo">
      <div className="demo-header">
        <h3>🎸 Interactive Chord Progression Analyzer</h3>
        <button 
          className="demo-close"
          onClick={() => setShowDemo(false)}
        >
          ×
        </button>
      </div>

      <div className="demo-content">
        <div className="demo-section">
          <h4>Choose a Progression to Analyze:</h4>
          <div className="progression-examples">
            {exampleProgressions.map((example, index) => (
              <button
                key={index}
                className={`example-button ${progression === example.progression ? 'selected' : ''}`}
                onClick={() => setProgression(example.progression)}
              >
                <div className="example-name">{example.name}</div>
                <div className="example-progression">{example.progression}</div>
                <div className="example-description">{example.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="demo-section">
          <h4>Or Enter Your Own Progression:</h4>
          <input
            type="text"
            value={progression}
            onChange={(e) => setProgression(e.target.value)}
            placeholder="e.g., C - Am - F - G"
            className="progression-input"
          />
        </div>

        <div className="demo-section">
          <h4>Ready to Analyze?</h4>
          <p>This will open an interactive analyzer that shows each chord on the fretboard with:</p>
          <ul>
            <li>🎸 Visual fretboard positions</li>
            <li>💡 Emotional impact explanations</li>
            <li>🎵 Alternative chord suggestions</li>
            <li>🎼 Step-by-step guidance</li>
          </ul>
          
          <button 
            className="analyze-button"
            onClick={() => {
              // This would trigger the actual analyzer
              console.log('Analyzing progression:', progression);
              // In a real implementation, this would open the ChordProgressionAnalyzer
            }}
          >
            🎸 Start Interactive Analysis
          </button>
        </div>
      </div>

      <style jsx>{`
        .demo-trigger {
          position: fixed;
          bottom: 100px;
          right: 20px;
          z-index: 1000;
        }

        .demo-button {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
          transition: all 0.3s ease;
        }

        .demo-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
        }

        .chord-progression-demo {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(255, 107, 107, 0.3);
          z-index: 2001;
          max-width: 800px;
          width: 90vw;
          max-height: 85vh;
          overflow-y: auto;
        }

        .demo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .demo-header h3 {
          color: #ff6b6b;
          margin: 0;
          font-size: 22px;
          font-weight: 600;
        }

        .demo-close {
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

        .demo-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .demo-content {
          padding: 25px;
        }

        .demo-section {
          margin-bottom: 30px;
        }

        .demo-section h4 {
          color: #ff6b6b;
          margin: 0 0 15px 0;
          font-size: 18px;
        }

        .progression-examples {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .example-button {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .example-button:hover {
          background: rgba(255, 107, 107, 0.1);
          border-color: rgba(255, 107, 107, 0.3);
          transform: translateY(-2px);
        }

        .example-button.selected {
          background: rgba(255, 107, 107, 0.1);
          border-color: #ff6b6b;
          box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
        }

        .example-name {
          color: #ff6b6b;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 5px;
        }

        .example-progression {
          color: #e9f3ff;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .example-description {
          color: #b7c4d6;
          font-size: 12px;
          line-height: 1.4;
        }

        .progression-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e9f3ff;
          padding: 12px 15px;
          border-radius: 8px;
          font-size: 14px;
          font-family: 'Courier New', monospace;
        }

        .progression-input:focus {
          outline: none;
          border-color: #ff6b6b;
        }

        .demo-section p {
          color: #b7c4d6;
          margin: 0 0 15px 0;
          line-height: 1.6;
        }

        .demo-section ul {
          color: #b7c4d6;
          margin: 0 0 20px 0;
          padding-left: 20px;
        }

        .demo-section li {
          margin: 5px 0;
        }

        .analyze-button {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }

        .analyze-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
        }

        @media (max-width: 768px) {
          .chord-progression-demo {
            width: 95vw;
            max-height: 90vh;
          }
          
          .progression-examples {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
