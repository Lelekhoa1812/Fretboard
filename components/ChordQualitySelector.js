import { useState, useEffect } from 'react';

export default function ChordQualitySelector({ 
  selectedChord, 
  onQualityChange, 
  isVisible, 
  position = { x: 0, y: 0 },
  onClose 
}) {
  const [selectedQuality, setSelectedQuality] = useState('major');

  // Chord quality definitions with descriptions
  const chordQualities = [
    {
      id: 'major',
      name: 'Major',
      symbol: '',
      description: 'Happy, bright sound',
      color: '#4CAF50',
      examples: ['C', 'G', 'F']
    },
    {
      id: 'minor',
      name: 'Minor',
      symbol: 'm',
      description: 'Sad, melancholic sound',
      color: '#2196F3',
      examples: ['Am', 'Em', 'Dm']
    },
    {
      id: 'major7',
      name: 'Major 7th',
      symbol: 'maj7',
      description: 'Jazzy, sophisticated',
      color: '#9C27B0',
      examples: ['Cmaj7', 'Gmaj7', 'Fmaj7']
    },
    {
      id: 'minor7',
      name: 'Minor 7th',
      symbol: 'm7',
      description: 'Smooth, jazzy minor',
      color: '#673AB7',
      examples: ['Am7', 'Em7', 'Dm7']
    },
    {
      id: 'dominant7',
      name: 'Dominant 7th',
      symbol: '7',
      description: 'Bluesy, resolves tension',
      color: '#FF9800',
      examples: ['C7', 'G7', 'F7']
    },
    {
      id: 'minor7b5',
      name: 'Minor 7♭5',
      symbol: 'm7♭5',
      description: 'Diminished, tense',
      color: '#795548',
      examples: ['Bm7♭5', 'F#m7♭5']
    },
    {
      id: 'diminished',
      name: 'Diminished',
      symbol: 'dim',
      description: 'Very tense, unstable',
      color: '#607D8B',
      examples: ['Bdim', 'F#dim']
    },
    {
      id: 'augmented',
      name: 'Augmented',
      symbol: 'aug',
      description: 'Bright, mysterious',
      color: '#E91E63',
      examples: ['Caug', 'Gaug']
    },
    {
      id: 'sus2',
      name: 'Sus2',
      symbol: 'sus2',
      description: 'Open, suspended',
      color: '#00BCD4',
      examples: ['Csus2', 'Gsus2']
    },
    {
      id: 'sus4',
      name: 'Sus4',
      symbol: 'sus4',
      description: 'Suspended, unresolved',
      color: '#009688',
      examples: ['Csus4', 'Gsus4']
    },
    {
      id: 'add9',
      name: 'Add9',
      symbol: 'add9',
      description: 'Extended, colorful',
      color: '#8BC34A',
      examples: ['Cadd9', 'Gadd9']
    },
    {
      id: 'major9',
      name: 'Major 9th',
      symbol: 'maj9',
      description: 'Rich, complex major',
      color: '#CDDC39',
      examples: ['Cmaj9', 'Gmaj9']
    }
  ];

  // Update selected quality when chord changes
  useEffect(() => {
    if (selectedChord && selectedChord.quality) {
      setSelectedQuality(selectedChord.quality);
    }
  }, [selectedChord]);

  const handleQualitySelect = (quality) => {
    setSelectedQuality(quality.id);
    onQualityChange(quality);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="chord-quality-backdrop"
        onClick={handleClose}
      />
      
      {/* Selector Panel */}
      <div 
        className="chord-quality-selector"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        {/* Header */}
        <div className="chord-quality-header">
          <h3>Choose Chord Quality</h3>
          <button 
            className="chord-quality-close"
            onClick={handleClose}
            title="Close"
          >
            ×
          </button>
        </div>

        {/* Quality Grid */}
        <div className="chord-quality-grid">
          {chordQualities.map((quality) => (
            <button
              key={quality.id}
              className={`chord-quality-option ${selectedQuality === quality.id ? 'selected' : ''}`}
              onClick={() => handleQualitySelect(quality)}
              style={{ '--quality-color': quality.color }}
              title={quality.description}
            >
              <div className="chord-quality-symbol">
                {quality.symbol || 'M'}
              </div>
              <div className="chord-quality-name">
                {quality.name}
              </div>
              <div className="chord-quality-examples">
                {quality.examples.slice(0, 2).join(', ')}
              </div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="chord-quality-actions">
          <button 
            className="chord-quality-action"
            onClick={() => handleQualitySelect(chordQualities[0])} // Major
          >
            🎵 Major
          </button>
          <button 
            className="chord-quality-action"
            onClick={() => handleQualitySelect(chordQualities[1])} // Minor
          >
            🎶 Minor
          </button>
          <button 
            className="chord-quality-action"
            onClick={() => handleQualitySelect(chordQualities[4])} // Dominant 7th
          >
            🎸 7th
          </button>
        </div>

        {/* Help Text */}
        <div className="chord-quality-help">
          <p>💡 <strong>Tip:</strong> Click any quality to instantly change your chord. Try different qualities to hear how they sound!</p>
        </div>
      </div>

      <style jsx>{`
        .chord-quality-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .chord-quality-selector {
          position: fixed;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(0, 186, 186, 0.3);
          z-index: 1001;
          max-width: 500px;
          max-height: 80vh;
          overflow-y: auto;
          animation: slideIn 0.3s ease-out;
        }

        .chord-quality-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chord-quality-header h3 {
          color: #00baba;
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }

        .chord-quality-close {
          background: none;
          border: none;
          color: #b7c4d6;
          font-size: 24px;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .chord-quality-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .chord-quality-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          padding: 20px 25px;
        }

        .chord-quality-option {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 15px 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .chord-quality-option::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--quality-color);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .chord-quality-option:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--quality-color);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .chord-quality-option:hover::before {
          transform: scaleX(1);
        }

        .chord-quality-option.selected {
          background: rgba(0, 186, 186, 0.1);
          border-color: #00baba;
          box-shadow: 0 0 20px rgba(0, 186, 186, 0.3);
        }

        .chord-quality-option.selected::before {
          transform: scaleX(1);
          background: #00baba;
        }

        .chord-quality-symbol {
          font-size: 24px;
          font-weight: bold;
          color: var(--quality-color);
          margin-bottom: 8px;
        }

        .chord-quality-name {
          font-size: 14px;
          font-weight: 600;
          color: #e9f3ff;
          margin-bottom: 4px;
        }

        .chord-quality-examples {
          font-size: 11px;
          color: #b7c4d6;
          opacity: 0.8;
        }

        .chord-quality-actions {
          display: flex;
          gap: 10px;
          padding: 0 25px 20px;
          justify-content: center;
        }

        .chord-quality-action {
          background: rgba(0, 186, 186, 0.1);
          border: 1px solid rgba(0, 186, 186, 0.3);
          color: #00baba;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .chord-quality-action:hover {
          background: rgba(0, 186, 186, 0.2);
          border-color: rgba(0, 186, 186, 0.5);
          transform: translateY(-1px);
        }

        .chord-quality-help {
          padding: 15px 25px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chord-quality-help p {
          margin: 0;
          font-size: 13px;
          color: #b7c4d6;
          line-height: 1.4;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 768px) {
          .chord-quality-selector {
            left: 10px !important;
            right: 10px !important;
            top: 50% !important;
            transform: translateY(-50%);
            max-width: none;
          }
          
          .chord-quality-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
}
