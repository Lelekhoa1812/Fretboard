import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  notesFlat, 
  notesSharp, 
  instrumentTuningPresets, 
  chordDefinitions, 
  scaleDefinitions,
  getSelectedChordMap,
  getSelectedScaleMap,
  toPreferredAccidental,
  getNoteIndexByName,
  getNoteNameByIndex,
  resolveRootInMap
} from '../lib/music-data';

export default function Fretboard({ 
  currentMode, 
  instrument, 
  accidentals, 
  numberOfFrets, 
  chordQuality, 
  scaleFamily,
  showAllNotes,
  showMultipleNotes,
  handPositions,
  handPositionIndex,
  onNoteClick,
  onChordSelect,
  onScaleSelect
}) {
  const fretboardRef = useRef(null);
  const noteNameSectionRef = useRef(null);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [hoveredNote, setHoveredNote] = useState(null);
  const [selectedRoot, setSelectedRoot] = useState(null);

  // Memoized note map calculation for performance
  const notesForMode = useMemo(() => {
    if (currentMode === 'chords') {
      return getSelectedChordMap(chordQuality, accidentals);
    } else if (currentMode === 'scales') {
      return getSelectedScaleMap(scaleFamily, accidentals);
    } else {
      // Notes mode - return all notes
      const roots = accidentals === 'sharps' ? notesSharp : notesFlat;
      const map = {};
      roots.forEach(note => {
        map[note] = [note];
      });
      return map;
    }
  }, [currentMode, chordQuality, scaleFamily, accidentals]);

  const generateFretboard = () => {
    if (!fretboardRef.current) {
      console.log('Fretboard ref not available');
      return;
    }

    const tuning = instrumentTuningPresets[instrument] || instrumentTuningPresets['Guitar'];
    const fretboard = fretboardRef.current;
    fretboard.innerHTML = '';

    console.log('Generating fretboard for instrument:', instrument, 'tuning:', tuning);

    // Set CSS variable for number of strings
    document.documentElement.style.setProperty('--number-of-strings', tuning.length);
    
    // Set initial note dot opacity to make fretboard visible
    document.documentElement.style.setProperty('--noteDotOpacity', '0.3');
    
    console.log('CSS variables set:', {
      numberOfStrings: document.documentElement.style.getPropertyValue('--number-of-strings'),
      noteDotOpacity: document.documentElement.style.getPropertyValue('--noteDotOpacity')
    });

    tuning.forEach((openNote, stringIndex) => {
      const stringDiv = document.createElement('div');
      stringDiv.className = 'string';
      
      // Add fret marks
      const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
      const doubleFretMarkPositions = [12, 24];
      
      for (let fret = 0; fret <= numberOfFrets; fret++) {
        const fretDiv = document.createElement('div');
        fretDiv.className = 'note-fret';
        
        // Add fret marks
        if (stringIndex === 0 && singleFretMarkPositions.includes(fret)) {
          fretDiv.classList.add('single-fretmark');
        } else if (stringIndex === 0 && doubleFretMarkPositions.includes(fret)) {
          fretDiv.classList.add('double-fretmark');
        }
        
        // Calculate note for this fret
        const noteIndex = (openNote + fret) % 12;
        const noteName = getNoteNameByIndex(noteIndex, accidentals);
        fretDiv.setAttribute('data-note', noteName);
        fretDiv.setAttribute('data-fret', fret);
        fretDiv.setAttribute('data-string', stringIndex);
        fretDiv.setAttribute('data-string-index', stringIndex + 1);
        fretDiv.setAttribute('data-fret-index', fret);
        
        // Add click handler
        fretDiv.addEventListener('click', () => handleFretClick(noteName, fret, stringIndex));
        
        // Add hover handlers
        fretDiv.addEventListener('mouseenter', () => handleFretHover(noteName, true));
        fretDiv.addEventListener('mouseleave', () => handleFretHover(noteName, false));
        
        stringDiv.appendChild(fretDiv);
      }
      
      fretboard.appendChild(stringDiv);
    });
    
    console.log('Fretboard generated with', fretboard.children.length, 'strings');
    console.log('Fretboard element:', fretboard);
  };

  const generateNoteNames = () => {
    if (!noteNameSectionRef.current) return;

    const noteNameSection = noteNameSectionRef.current;
    noteNameSection.innerHTML = '';

    const notes = accidentals === 'sharps' ? notesSharp : notesFlat;

    if (currentMode === 'notes') {
      // Notes mode - show all note names
      notes.forEach(noteName => {
        const span = document.createElement('span');
        span.textContent = noteName;
        span.style.cursor = 'pointer';
        span.style.padding = '10px';
        span.style.margin = '5px';
        span.style.borderRadius = '8px';
        span.style.transition = 'all 0.3s ease';
        
        // Add hover effect
        span.addEventListener('mouseenter', () => {
          span.style.backgroundColor = 'rgba(0, 186, 186, 0.2)';
          span.style.color = '#00baba';
          handleNoteHover(noteName, true);
        });
        
        span.addEventListener('mouseleave', () => {
          span.style.backgroundColor = 'transparent';
          span.style.color = '#fff';
          handleNoteHover(noteName, false);
        });

        // Add click handler
        span.addEventListener('click', () => handleNoteClick(noteName));
        
        noteNameSection.appendChild(span);
      });
    } else if (currentMode === 'chords') {
      // Chords mode - show root names with chord-note class
      const chordMap = getSelectedChordMap(chordQuality, accidentals);
      notes.forEach(root => {
        const span = document.createElement('span');
        span.textContent = root;
        span.className = 'chord-note';
        span.style.cursor = 'pointer';
        span.style.padding = '10px';
        span.style.margin = '5px';
        span.style.borderRadius = '8px';
        span.style.transition = 'all 0.3s ease';
        
        // Add hover effect
        span.addEventListener('mouseenter', () => {
          span.style.backgroundColor = 'rgba(0, 186, 186, 0.2)';
          span.style.color = '#00baba';
          handleNoteHover(root, true);
        });
        
        span.addEventListener('mouseleave', () => {
          span.style.backgroundColor = 'transparent';
          span.style.color = '#fff';
          handleNoteHover(root, false);
        });

        // Add click handler
        span.addEventListener('click', () => handleNoteClick(root));
        
        noteNameSection.appendChild(span);
      });
    } else if (currentMode === 'scales') {
      // Scales mode - show root names with scale-note class
      const scaleMap = getSelectedScaleMap(scaleFamily, accidentals);
      notes.forEach(root => {
        const resolved = resolveRootInMap(root, scaleMap);
        if (!resolved) return;
        
        const span = document.createElement('span');
        span.textContent = root;
        span.className = 'scale-note';
        span.style.cursor = 'pointer';
        span.style.padding = '10px';
        span.style.margin = '5px';
        span.style.borderRadius = '8px';
        span.style.transition = 'all 0.3s ease';
        
        // Add hover effect
        span.addEventListener('mouseenter', () => {
          span.style.backgroundColor = 'rgba(0, 186, 186, 0.2)';
          span.style.color = '#00baba';
          handleNoteHover(root, true);
        });
        
        span.addEventListener('mouseleave', () => {
          span.style.backgroundColor = 'transparent';
          span.style.color = '#fff';
          handleNoteHover(root, false);
        });

        // Add click handler
        span.addEventListener('click', () => handleNoteClick(root));
        
        noteNameSection.appendChild(span);
      });
    }
  };

  const handleFretClick = (noteName, fret, stringIndex) => {
    if (currentMode === 'notes') {
      if (showMultipleNotes) {
        setSelectedNotes(prev => {
          const newNotes = prev.includes(noteName) 
            ? prev.filter(n => n !== noteName)
            : [...prev, noteName];
          return newNotes;
        });
      } else {
        setSelectedNotes([noteName]);
      }
    }
    
    if (onNoteClick) {
      onNoteClick(noteName, fret, stringIndex);
    }
  };

  const handleNoteClick = (noteName) => {
    if (currentMode === 'notes') {
      if (showMultipleNotes) {
        setSelectedNotes(prev => {
          const newNotes = prev.includes(noteName) 
            ? prev.filter(n => n !== noteName)
            : [...prev, noteName];
          return newNotes;
        });
      } else {
        setSelectedNotes([noteName]);
      }
    } else if (currentMode === 'chords' || currentMode === 'scales') {
      // For chords and scales, set the root note
      setSelectedRoot(noteName);
      if (onChordSelect && currentMode === 'chords') {
        onChordSelect(noteName);
      }
      if (onScaleSelect && currentMode === 'scales') {
        onScaleSelect(noteName);
      }
    }
    
    if (onNoteClick) {
      onNoteClick(noteName);
    }
  };

  const handleFretHover = (noteName, isHovering) => {
    if (isHovering) {
      setHoveredNote(noteName);
    } else {
      setHoveredNote(null);
    }
  };

  const handleNoteHover = (noteName, isHovering) => {
    if (isHovering) {
      setHoveredNote(noteName);
    } else {
      setHoveredNote(null);
    }
  };

  const toggleMultipleNotes = (noteName, opacity) => {
    if (!fretboardRef.current) return;
    
    const frets = fretboardRef.current.querySelectorAll('.note-fret');
    frets.forEach(fret => {
      if (fret.getAttribute('data-note') === noteName) {
        const stringIndex = parseInt(fret.getAttribute('data-string-index'));
        const fretIndex = parseInt(fret.getAttribute('data-fret-index'));
        
        // Apply hand position filtering if enabled
        if (handPositions) {
          const handPositionRanges = [
            { min: 0, max: 4 },
            { min: 1, max: 5 },
            { min: 2, max: 6 },
            { min: 3, max: 7 },
            { min: 4, max: 8 }
          ];
          const range = handPositionRanges[handPositionIndex];
          if (fretIndex < range.min || fretIndex > range.max) return;
        }
        
        fret.style.setProperty('--noteDotOpacity', opacity);
      }
    });
  };

  const highlightNotes = useCallback(() => {
    if (!fretboardRef.current) return;

    const frets = fretboardRef.current.querySelectorAll('.note-fret');
    let notesToHighlight = [];

    if (currentMode === 'notes') {
      if (showAllNotes) {
        // Show all notes
        notesToHighlight = accidentals === 'sharps' ? notesSharp : notesFlat;
        frets.forEach(fret => {
          const noteName = fret.getAttribute('data-note');
          const shouldHighlight = notesToHighlight.includes(noteName);
          fret.style.setProperty('--noteDotOpacity', shouldHighlight ? '1' : '0.3');
        });
      } else {
        // Handle individual note highlighting
        if (hoveredNote) {
          toggleMultipleNotes(hoveredNote, 1);
        } else if (selectedNotes.length > 0) {
          selectedNotes.forEach(note => {
            toggleMultipleNotes(note, 1);
          });
        } else {
          // Clear all highlights but keep base visibility
          frets.forEach(fret => {
            fret.style.setProperty('--noteDotOpacity', '0.3');
          });
        }
      }
    } else if (currentMode === 'chords' || currentMode === 'scales') {
      // Use memoized notesForMode for better performance
      if (hoveredNote && notesForMode[hoveredNote]) {
        notesToHighlight = notesForMode[hoveredNote];
      } else if (selectedRoot && notesForMode[selectedRoot]) {
        notesToHighlight = notesForMode[selectedRoot];
      }
      
      frets.forEach(fret => {
        const noteName = fret.getAttribute('data-note');
        const shouldHighlight = notesToHighlight.includes(noteName);
        fret.style.setProperty('--noteDotOpacity', shouldHighlight ? '1' : '0.3');
      });
    }
  }, [currentMode, accidentals, showAllNotes, hoveredNote, selectedNotes, selectedRoot, notesForMode, handPositions, handPositionIndex]);

  // Initial mount effect
  useEffect(() => {
    console.log('Component mounted, generating initial fretboard...');
    setTimeout(() => {
      generateFretboard();
    }, 100);
  }, []);

  // Effects with optimized dependencies
  useEffect(() => {
    console.log('useEffect triggered for fretboard generation:', { instrument, numberOfFrets, accidentals });
    // Add a small delay to ensure the component is fully mounted
    setTimeout(() => {
      generateFretboard();
    }, 100);
  }, [instrument, numberOfFrets, accidentals]);

  useEffect(() => {
    generateNoteNames();
  }, [accidentals, currentMode, chordQuality, scaleFamily]);

  useEffect(() => {
    highlightNotes();
  }, [highlightNotes]);

  // Reset selected root when mode changes
  useEffect(() => {
    setSelectedRoot(null);
    setSelectedNotes([]);
  }, [currentMode, chordQuality, scaleFamily]);

  // Cleanup effect for event listeners
  useEffect(() => {
    return () => {
      // Cleanup any remaining event listeners
      if (fretboardRef.current) {
        const frets = fretboardRef.current.querySelectorAll('.note-fret');
        frets.forEach(fret => {
          fret.replaceWith(fret.cloneNode(true));
        });
      }
      if (noteNameSectionRef.current) {
        const spans = noteNameSectionRef.current.querySelectorAll('span');
        spans.forEach(span => {
          span.replaceWith(span.cloneNode(true));
        });
      }
    };
  }, []);

  return (
    <>
      <div className="fretboard" ref={fretboardRef}></div>
      <div className="note-name-section" ref={noteNameSectionRef}></div>
    </>
  );
}