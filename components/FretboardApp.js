import { useState, useEffect } from 'react';
import AIAssistant from './AIAssistant';
import Fretboard from './Fretboard';

export default function FretboardApp() {
  const [currentMode, setCurrentMode] = useState('notes');
  const [selectedChords, setSelectedChords] = useState([]);
  const [selectedScales, setSelectedScales] = useState([]);
  const [showMainApp, setShowMainApp] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  // App state
  const [instrument, setInstrument] = useState('Guitar');
  const [accidentals, setAccidentals] = useState('flats');
  const [numberOfFrets, setNumberOfFrets] = useState(8);
  const [chordQuality, setChordQuality] = useState('major');
  const [scaleFamily, setScaleFamily] = useState('major');
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [showMultipleNotes, setShowMultipleNotes] = useState(false);
  const [handPositions, setHandPositions] = useState(false);
  const [handPositionIndex, setHandPositionIndex] = useState(0);

  // Card click handler
  const handleCardClick = (feature) => {
    if (feature === 'help') {
      setShowHelpModal(true);
    } else {
      // Set the search mode and show main app
      setCurrentMode(feature);
      setShowMainApp(true);
    }
  };

  // Initialize app
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Show loading screen initially
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 1500);
    }

    // Initialize animations
    initializeAnimations();
  }, []);

  // Reset selections when mode changes
  useEffect(() => {
    setSelectedChords([]);
    setSelectedScales([]);
  }, [currentMode]);

  // Initialize animations like the original app
  const initializeAnimations = () => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Add slide-in animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add('slide-in');
    });

    // Add typing effect to hero text
    const heroTyped = document.getElementById('hero-typed');
    if (heroTyped) {
      const text = heroTyped.getAttribute('data-text');
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTyped.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      };
      setTimeout(typeWriter, 1000);
    }
  };

  return (
    <div className="app-container">
      {/* Loading Screen */}
      <div className="loading-screen" id="loading-screen">
        <div className="loading-spinner"></div>
      </div>
      
      {/* Help Modal */}
      {showHelpModal && (
        <div className="modal-overlay" id="help-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>How to Use Fretboard Lookup</h2>
              <button className="modal-close" id="modal-close" onClick={() => setShowHelpModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="help-section">
                <h3>🎵 Notes Mode</h3>
                <p>Hover over any note name below the fretboard to highlight all positions of that note. Toggle "Show multiple notes" to compare different notes simultaneously.</p>
              </div>
              
              <div className="help-section">
                <h3>🎸 Chords Mode</h3>
                <p>Select a chord quality from the dropdown, then hover over root notes to see chord shapes. Use "Hand Position" to focus on specific fret ranges (5-fret windows).</p>
              </div>
              
              <div className="help-section">
                <h3>🎼 Scales Mode</h3>
                <p>Choose a scale family (Major, Minor, Pentatonic, Blues, Modes), then hover over root notes to visualize scale patterns across the fretboard.</p>
              </div>
              
              <div className="help-section">
                <h3>🤖 AI Assistant</h3>
                <p>Click the AI Assistant button to get personalized music theory help, chord analysis, practice recommendations, and answers to your questions.</p>
              </div>
              
              <div className="help-section">
                <h3>⚙️ Controls</h3>
                <ul>
                  <li><strong>Instrument:</strong> Switch between Guitar, Bass, and Ukulele</li>
                  <li><strong>Accidentals:</strong> Choose between flats (♭) and sharps (♯)</li>
                  <li><strong>Number of Frets:</strong> Adjust fretboard length (5-30 frets)</li>
                  <li><strong>Hand Position:</strong> Focus on specific fret ranges for easier playing</li>
                </ul>
              </div>
              
              <div className="help-section">
                <h3>💡 Tips</h3>
                <ul>
                  <li>Use the AI Assistant for personalized learning guidance</li>
                  <li>Try different instruments to see how patterns transpose</li>
                  <li>Experiment with multiple notes to understand intervals</li>
                  <li>Ask the AI about chord progressions and scale relationships</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Landing Screen */}
      {!showMainApp && (
        <section id="hero" className="page-transition">
          <div className="hero-inner">
            <div className="logo-container">
              <img src="/logo.svg" alt="Fretboard Lookup Logo" className="app-logo" />
            </div>
            <h1>Fretboard Lookup</h1>
            <p className="lead" id="hero-typed" data-text="Visualize notes, chords, and scales on guitar, bass, and ukulele. Choose a mode, hover a root, see every position instantly."> </p>
            <div className="hero-grid">
              <div className="card slide-in" data-feature="notes" onClick={() => handleCardClick('notes')}>
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3V21M8 7L12 3L16 7M8 17L12 21L16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <strong>Notes</strong>
                <p>Hover any note name to light up all fret positions. Toggle multiple to compare.</p>
                <img src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200&auto=format&fit=crop" alt="Guitar neck"/>
                <div className="card-overlay">
                  <span className="card-action">Explore Notes →</span>
                </div>
              </div>
              <div className="card slide-in" data-feature="chords" onClick={() => handleCardClick('chords')}>
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12L9 6L15 12L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 18L9 12L15 18L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="6" cy="9" r="2" fill="currentColor"/>
                    <circle cx="12" cy="15" r="2" fill="currentColor"/>
                    <circle cx="18" cy="9" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <strong>Chords</strong>
                <p>Pick a chord quality, hover a root to see chord tones and try Hand Position presets.</p>
                <img src="https://artiumacademy.mo.cloudinary.net/v1n/blogs/how-to-read-guitar-chord-charts-a-simple-guide.webp?q=80&w=1200&auto=format&fit=crop" alt="Chord shapes"/>
                <div className="card-overlay">
                  <span className="card-action">Learn Chords →</span>
                </div>
              </div>
              <div className="card slide-in" data-feature="scales" onClick={() => handleCardClick('scales')}>
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L9 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M15 6L15 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="9" cy="9" r="2" fill="currentColor"/>
                    <circle cx="15" cy="15" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <strong>Scales</strong>
                <p>Choose a family (major/minor, pentatonic, blues, modes) and hover a root to light up scale tones.</p>
                <img src="https://appliedguitartheory.com/wp-content/uploads/2020/07/minor-scale-structure-intervals-fretboard.png?q=80&w=1200&auto=format&fit=crop" alt="Scales walkthrough"/>
                <div className="card-overlay">
                  <span className="card-action">Master Scales →</span>
                </div>
              </div>
              <div className="card slide-in" data-feature="help" onClick={() => handleCardClick('help')}>
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <strong>Help</strong>
                <p>Use the controls below to switch mode, root, and qualities. Hand Position shows 5 fret windows.</p>
                <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop" alt="Getting started"/>
                <div className="card-overlay">
                  <span className="card-action">Get Started →</span>
                </div>
              </div>
            </div>
            <button id="start-app" onClick={() => setShowMainApp(true)}>Start Exploring</button>
            <div className="scroll-indicator"></div>
          </div>
        </section>
      )}

      {/* Main App */}
      {showMainApp && (
        <div className="settings" id="app-root">
          <div className="app-header">
            <div className="header-logo">
              <img src="/logo.svg" alt="Fretboard Lookup Logo" className="header-logo-img" />
            </div>
            <button id="back-to-landing" className="back-button" onClick={() => setShowMainApp(false)}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Landing
            </button>
          </div>
          <div className="controls-row">
            <div className="control">
              <label htmlFor="instrument-selector">Selected instrument:</label>
              <select 
                name="instrument-selector" 
                id="instrument-selector"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
              >
                <option value="Guitar">Guitar</option>
                <option value="Bass (4 strings)">Bass (4 strings)</option>
                <option value="Bass (5 strings)">Bass (5 strings)</option>
                <option value="Ukulele">Ukulele</option>
              </select>
            </div>
            <div className="control">
              <label htmlFor="search-by">Search by:</label>
              <select 
                name="search-by" 
                id="search-by" 
                value={currentMode} 
                onChange={(e) => setCurrentMode(e.target.value)}
              >
                <option value="notes">Notes</option>
                <option value="chords">Chords</option>
                <option value="scales">Scales</option>
              </select>
            </div>
            <div className="control accidental-selector">
              <span className="control-label">Accidentals</span>
              <input 
                type="radio" 
                className="acc-select" 
                id="flats" 
                name="accidentals" 
                value="flats" 
                checked={accidentals === 'flats'}
                onChange={(e) => setAccidentals(e.target.value)}
              />
              <label htmlFor="flats">♭</label>
              <input 
                type="radio" 
                className="acc-select" 
                id="sharps" 
                name="accidentals" 
                value="sharps"
                checked={accidentals === 'sharps'}
                onChange={(e) => setAccidentals(e.target.value)}
              />
              <label htmlFor="sharps">♯</label>
            </div>
            <div className="control">
              <label htmlFor="number-of-frets">Number of frets: </label>
              <input 
                type="number" 
                id="number-of-frets" 
                min="5" 
                max="30" 
                value={numberOfFrets}
                onChange={(e) => setNumberOfFrets(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="controls-row">
            <label htmlFor="scale" id="scale-label" style={{display: currentMode === 'chords' ? 'block' : 'none'}}>Chord quality</label>
            <div className="scale-container" id="scale-container" style={{display: currentMode === 'chords' ? 'block' : 'none'}}>
              <select 
                name="scale" 
                id="scale"
                value={chordQuality}
                onChange={(e) => setChordQuality(e.target.value)}
              >
                <optgroup label="Triads & Power">
                  <option value="major">major</option>
                  <option value="minor">minor</option>
                  <option value="dim">dim</option>
                  <option value="aug">aug</option>
                  <option value="5">5 (power)</option>
                </optgroup>
                <optgroup label="Suspended">
                  <option value="sus2">sus2</option>
                  <option value="sus4">sus4</option>
                  <option value="7sus4">7sus4</option>
                  <option value="9sus4">9sus4</option>
                </optgroup>
                <optgroup label="Sixths">
                  <option value="6">6</option>
                  <option value="m6">m6</option>
                  <option value="6add9">6add9</option>
                  <option value="m6add9">m6add9</option>
                </optgroup>
                <optgroup label="Sevenths">
                  <option value="7">7</option>
                  <option value="m7">m7</option>
                  <option value="maj7">maj7</option>
                  <option value="dim7">dim7</option>
                  <option value="m7b5">m7b5</option>
                </optgroup>
                <optgroup label="Add9/Add11/Add13">
                  <option value="add9">add9</option>
                  <option value="add11">add11</option>
                  <option value="add13">add13</option>
                </optgroup>
                <optgroup label="Extensions">
                  <option value="9">9</option>
                  <option value="m9">m9</option>
                  <option value="maj9">maj9</option>
                  <option value="m11">m11</option>
                  <option value="11">11</option>
                  <option value="m13">m13</option>
                  <option value="13">13</option>
                </optgroup>
                <optgroup label="Altered Dominants">
                  <option value="7b9">7b9</option>
                  <option value="7#9">7#9</option>
                  <option value="7#11">7#11</option>
                  <option value="7b13">7b13</option>
                  <option value="maj7#11">maj7#11</option>
                </optgroup>
              </select>
            </div>

            <label htmlFor="scale-set" id="scale-set-label" style={{display: currentMode === 'scales' ? 'block' : 'none'}}>Scale family</label>
            <div className="scale-set-container" id="scale-set-container" style={{display: currentMode === 'scales' ? 'block' : 'none'}}>
              <select 
                name="scale-set" 
                id="scale-set"
                value={scaleFamily}
                onChange={(e) => setScaleFamily(e.target.value)}
              >
                <option value="major">Major</option>
                <option value="minor">Minor</option>
                <option value="modes">Church (Gregorian)</option>
                <option value="pentatonicMajor">Pentatonic Major</option>
                <option value="pentatonicMinor">Pentatonic Minor</option>
                <option value="blues">Blues</option>
              </select>
            </div>
          </div>

          <div className="hand-position-controls" id="hand-position-controls" style={{display: currentMode === 'chords' ? 'flex' : 'none'}}>
            <div className="control">
              <label htmlFor="hand-positions">Hand Position</label>
              <input 
                type="checkbox" 
                id="hand-positions"
                checked={handPositions}
                onChange={(e) => setHandPositions(e.target.checked)}
              />
            </div>
            <div className="control" id="hand-position-picker" style={{display: handPositions ? 'block' : 'none'}}>
              <label htmlFor="hand-position-index" id="hand-position-index-label">Position</label>
              <select 
                id="hand-position-index"
                value={handPositionIndex}
                onChange={(e) => setHandPositionIndex(parseInt(e.target.value))}
              >
                <option value="0">0-4</option>
                <option value="1">1-5</option>
                <option value="2">2-6</option>
                <option value="3">3-7</option>
                <option value="4">4-8</option>
              </select>
            </div>
          </div>

          <div className="controls-row">
            <div className="control">
              <label htmlFor="show-all-notes" id="show-all-notes-label">Show all notes </label>
              <div className="checkbox-container" id="show-all-notes-container">
                <input 
                  type="checkbox" 
                  id="show-all-notes"
                  checked={showAllNotes}
                  onChange={(e) => setShowAllNotes(e.target.checked)}
                />
              </div>
            </div>
            <div className="control">
              <label htmlFor="show-multiple-notes" id="show-multiple-notes-label">Show multiple notes </label>
              <div className="checkbox-container" id="show-multiple-notes-container">
                <input 
                  type="checkbox" 
                  id="show-multiple-notes"
                  checked={showMultipleNotes}
                  onChange={(e) => setShowMultipleNotes(e.target.checked)}
                />
              </div>
            </div>
          </div>

          {/* Fretboard Component */}
          <Fretboard
            currentMode={currentMode}
            instrument={instrument}
            accidentals={accidentals}
            numberOfFrets={numberOfFrets}
            chordQuality={chordQuality}
            scaleFamily={scaleFamily}
            showAllNotes={showAllNotes}
            showMultipleNotes={showMultipleNotes}
            handPositions={handPositions}
            handPositionIndex={handPositionIndex}
            onNoteClick={(note, fret, string) => {
              console.log('Note clicked:', note, fret, string);
            }}
            onChordSelect={(rootNote) => {
              console.log('Chord selected:', rootNote, chordQuality);
              setSelectedChords(prev => [...prev, { root: rootNote, quality: chordQuality }]);
            }}
            onScaleSelect={(rootNote) => {
              console.log('Scale selected:', rootNote, scaleFamily);
              setSelectedScales(prev => [...prev, { root: rootNote, family: scaleFamily }]);
            }}
          />
        </div>
      )}

      {/* AI Assistant - Only show when main app is visible */}
      {showMainApp && (
        <AIAssistant 
          currentMode={currentMode}
          selectedChords={selectedChords}
          selectedScales={selectedScales}
          instrument={instrument}
          accidentals={accidentals}
          onSuggestion={(suggestion) => {
            // Handle AI suggestions
            console.log('AI Suggestion:', suggestion);
            // You can add more sophisticated suggestion handling here
          }}
        />
      )}
    </div>
  );
}
