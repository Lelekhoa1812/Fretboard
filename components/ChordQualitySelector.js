import { useState, useEffect } from 'react';

export default function ChordQualitySelector({ 
  selectedChord, 
  onQualityChange, 
  isVisible, 
  position = { x: 0, y: 0 },
  onClose 
}) {
  const [selectedQuality, setSelectedQuality] = useState('major');

  // Chord quality definitions with descriptions - Expanded collection
  const chordQualities = [
    // Basic Triads
    {
      id: 'major',
      name: 'Major',
      symbol: '',
      description: 'Happy, bright sound',
      color: '#4CAF50',
      examples: ['C', 'G', 'F'],
      category: 'Basic Triads'
    },
    {
      id: 'minor',
      name: 'Minor',
      symbol: 'm',
      description: 'Sad, melancholic sound',
      color: '#2196F3',
      examples: ['Am', 'Em', 'Dm'],
      category: 'Basic Triads'
    },
    {
      id: 'dim',
      name: 'Diminished',
      symbol: 'dim',
      description: 'Very tense, unstable',
      color: '#607D8B',
      examples: ['Bdim', 'F#dim'],
      category: 'Basic Triads'
    },
    {
      id: 'aug',
      name: 'Augmented',
      symbol: 'aug',
      description: 'Bright, mysterious',
      color: '#E91E63',
      examples: ['Caug', 'Gaug'],
      category: 'Basic Triads'
    },
    {
      id: '5',
      name: 'Power Chord',
      symbol: '5',
      description: 'Rock, punk sound',
      color: '#FF5722',
      examples: ['C5', 'G5', 'F5'],
      category: 'Basic Triads'
    },
    
    // Suspended Chords
    {
      id: 'sus2',
      name: 'Sus2',
      symbol: 'sus2',
      description: 'Open, suspended',
      color: '#00BCD4',
      examples: ['Csus2', 'Gsus2'],
      category: 'Suspended'
    },
    {
      id: 'sus4',
      name: 'Sus4',
      symbol: 'sus4',
      description: 'Suspended, unresolved',
      color: '#009688',
      examples: ['Csus4', 'Gsus4'],
      category: 'Suspended'
    },
    {
      id: '7sus4',
      name: '7Sus4',
      symbol: '7sus4',
      description: 'Jazzy suspended',
      color: '#4DB6AC',
      examples: ['C7sus4', 'G7sus4'],
      category: 'Suspended'
    },
    {
      id: '9sus4',
      name: '9Sus4',
      symbol: '9sus4',
      description: 'Extended suspended',
      color: '#26A69A',
      examples: ['C9sus4', 'G9sus4'],
      category: 'Suspended'
    },
    
    // Sixth Chords
    {
      id: '6',
      name: 'Major 6th',
      symbol: '6',
      description: 'Sweet, jazzy major',
      color: '#8BC34A',
      examples: ['C6', 'G6', 'F6'],
      category: 'Sixths'
    },
    {
      id: 'm6',
      name: 'Minor 6th',
      symbol: 'm6',
      description: 'Melancholic, jazzy',
      color: '#689F38',
      examples: ['Am6', 'Em6'],
      category: 'Sixths'
    },
    {
      id: '6add9',
      name: '6Add9',
      symbol: '6add9',
      description: 'Extended major 6th',
      color: '#9CCC65',
      examples: ['C6add9', 'G6add9'],
      category: 'Sixths'
    },
    {
      id: 'm6add9',
      name: 'm6Add9',
      symbol: 'm6add9',
      description: 'Extended minor 6th',
      color: '#7CB342',
      examples: ['Am6add9', 'Em6add9'],
      category: 'Sixths'
    },
    
    // Seventh Chords
    {
      id: 'maj7',
      name: 'Major 7th',
      symbol: 'maj7',
      description: 'Jazzy, sophisticated',
      color: '#9C27B0',
      examples: ['Cmaj7', 'Gmaj7', 'Fmaj7'],
      category: 'Sevenths'
    },
    {
      id: 'minor7',
      name: 'Minor 7th',
      symbol: 'm7',
      description: 'Smooth, jazzy minor',
      color: '#673AB7',
      examples: ['Am7', 'Em7', 'Dm7'],
      category: 'Sevenths'
    },
    {
      id: 'dominant7',
      name: 'Dominant 7th',
      symbol: '7',
      description: 'Bluesy, resolves tension',
      color: '#FF9800',
      examples: ['C7', 'G7', 'F7'],
      category: 'Sevenths'
    },
    {
      id: 'dim7',
      name: 'Diminished 7th',
      symbol: 'dim7',
      description: 'Very tense, symmetrical',
      color: '#5D4037',
      examples: ['Bdim7', 'F#dim7'],
      category: 'Sevenths'
    },
    {
      id: 'minor7b5',
      name: 'Minor 7♭5',
      symbol: 'm7♭5',
      description: 'Half-diminished, tense',
      color: '#795548',
      examples: ['Bm7♭5', 'F#m7♭5'],
      category: 'Sevenths'
    },
    
    // Add Chords
    {
      id: 'add9',
      name: 'Add9',
      symbol: 'add9',
      description: 'Extended, colorful',
      color: '#8BC34A',
      examples: ['Cadd9', 'Gadd9'],
      category: 'Add Chords'
    },
    {
      id: 'add11',
      name: 'Add11',
      symbol: 'add11',
      description: 'Bright, open sound',
      color: '#AED581',
      examples: ['Cadd11', 'Gadd11'],
      category: 'Add Chords'
    },
    {
      id: 'add13',
      name: 'Add13',
      symbol: 'add13',
      description: 'Rich, extended',
      color: '#C5E1A5',
      examples: ['Cadd13', 'Gadd13'],
      category: 'Add Chords'
    },
    
    // Ninth Chords
    {
      id: 'major9',
      name: 'Major 9th',
      symbol: 'maj9',
      description: 'Rich, complex major',
      color: '#CDDC39',
      examples: ['Cmaj9', 'Gmaj9'],
      category: 'Ninths'
    },
    {
      id: 'm9',
      name: 'Minor 9th',
      symbol: 'm9',
      description: 'Smooth, jazzy minor',
      color: '#DCE775',
      examples: ['Am9', 'Em9'],
      category: 'Ninths'
    },
    {
      id: '9',
      name: 'Dominant 9th',
      symbol: '9',
      description: 'Bluesy, extended',
      color: '#FFF176',
      examples: ['C9', 'G9'],
      category: 'Ninths'
    },
    
    // Eleventh Chords
    {
      id: 'm11',
      name: 'Minor 11th',
      symbol: 'm11',
      description: 'Complex minor',
      color: '#FFEB3B',
      examples: ['Am11', 'Em11'],
      category: 'Elevenths'
    },
    {
      id: '11',
      name: 'Dominant 11th',
      symbol: '11',
      description: 'Extended dominant',
      color: '#FFC107',
      examples: ['C11', 'G11'],
      category: 'Elevenths'
    },
    
    // Thirteenth Chords
    {
      id: 'm13',
      name: 'Minor 13th',
      symbol: 'm13',
      description: 'Complex minor',
      color: '#FF9800',
      examples: ['Am13', 'Em13'],
      category: 'Thirteenths'
    },
    {
      id: '13',
      name: 'Dominant 13th',
      symbol: '13',
      description: 'Full extended dominant',
      color: '#FF5722',
      examples: ['C13', 'G13'],
      category: 'Thirteenths'
    },
    
    // Altered Dominants
    {
      id: '7b9',
      name: '7♭9',
      symbol: '7♭9',
      description: 'Dark, altered',
      color: '#D32F2F',
      examples: ['C7♭9', 'G7♭9'],
      category: 'Altered'
    },
    {
      id: '7#9',
      name: '7♯9',
      symbol: '7♯9',
      description: 'Hendrix chord',
      color: '#F44336',
      examples: ['C7♯9', 'G7♯9'],
      category: 'Altered'
    },
    {
      id: '7#11',
      name: '7♯11',
      symbol: '7♯11',
      description: 'Lydian dominant',
      color: '#E91E63',
      examples: ['C7♯11', 'G7♯11'],
      category: 'Altered'
    },
    {
      id: '7b13',
      name: '7♭13',
      symbol: '7♭13',
      description: 'Altered dominant',
      color: '#C2185B',
      examples: ['C7♭13', 'G7♭13'],
      category: 'Altered'
    },
    {
      id: 'maj7#11',
      name: 'Maj7♯11',
      symbol: 'maj7♯11',
      description: 'Lydian major',
      color: '#AD1457',
      examples: ['Cmaj7♯11', 'Gmaj7♯11'],
      category: 'Altered'
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
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
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

        {/* Quality Grid with Categories */}
        <div className="chord-quality-content">
          {Object.entries(
            chordQualities.reduce((acc, quality) => {
              if (!acc[quality.category]) {
                acc[quality.category] = [];
              }
              acc[quality.category].push(quality);
              return acc;
            }, {})
          ).map(([category, qualities]) => (
            <div key={category} className="chord-quality-category">
              <h4 className="chord-quality-category-title">{category}</h4>
              <div className="chord-quality-grid">
                {qualities.map((quality) => (
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
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="chord-quality-actions">
          <button 
            className="chord-quality-action"
            onClick={() => handleQualitySelect(chordQualities.find(q => q.id === 'major'))} // Major
          >
            🎵 Major
          </button>
          <button 
            className="chord-quality-action"
            onClick={() => handleQualitySelect(chordQualities.find(q => q.id === 'minor'))} // Minor
          >
            🎶 Minor
          </button>
          <button 
            className="chord-quality-action"
            onClick={() => handleQualitySelect(chordQualities.find(q => q.id === 'dominant7'))} // Dominant 7th
          >
            🎸 7th
          </button>
          <button 
            className="chord-quality-action"
            onClick={() => handleQualitySelect(chordQualities.find(q => q.id === 'maj7'))} // Major 7th
          >
            🎼 Maj7
          </button>
          <button 
            className="chord-quality-action"
            onClick={() => handleQualitySelect(chordQualities.find(q => q.id === 'sus4'))} // Sus4
          >
            🎵 Sus4
          </button>
        </div>

        {/* Help Text */}
        <div className="chord-quality-help">
          <p>💡 <strong>Tip:</strong> Choose from {chordQualities.length} chord qualities organized by category. Use Shift+click on chord names to open this selector anytime!</p>
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
          max-width: 800px;
          width: 90vw;
          max-height: 85vh;
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

        .chord-quality-content {
          padding: 20px 25px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .chord-quality-category {
          margin-bottom: 25px;
        }

        .chord-quality-category:last-child {
          margin-bottom: 0;
        }

        .chord-quality-category-title {
          color: #00baba;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 15px 0;
          padding-bottom: 8px;
          border-bottom: 2px solid rgba(0, 186, 186, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .chord-quality-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
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
            left: 5px !important;
            right: 5px !important;
            top: 50% !important;
            transform: translate(-50%, -50%);
            max-width: none;
            width: calc(100vw - 10px);
            max-height: 90vh;
          }
          
          .chord-quality-content {
            padding: 15px 20px;
            max-height: 70vh;
          }
          
          .chord-quality-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
          }

          .chord-quality-category-title {
            font-size: 14px;
            margin-bottom: 12px;
          }

          .chord-quality-option {
            padding: 12px 8px;
          }

          .chord-quality-symbol {
            font-size: 20px;
          }

          .chord-quality-name {
            font-size: 12px;
          }

          .chord-quality-examples {
            font-size: 10px;
          }
        }
      `}</style>
    </>
  );
}
