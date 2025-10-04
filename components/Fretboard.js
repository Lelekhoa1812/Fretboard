import { useState, useEffect, useRef } from 'react';

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

  // Music theory data
  const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const enharmonicToFlats = {"C#":"Db","D#":"Eb","F#":"Gb","G#":"Ab","A#":"Bb"};
  const enharmonicToSharps = {"Db":"C#","Eb":"D#","Gb":"F#","Ab":"G#","Bb":"A#"};

  const instrumentTuningPresets = {
    'Guitar': [4, 11, 7, 2, 9, 4],
    'Bass (4 strings)': [7, 2, 9, 4],
    'Bass (5 strings)': [7, 2, 9, 4, 11],
    'Ukulele': [9, 4, 0, 7]
  };

  // Chord definitions
  const chordDefinitions = {
    'major': { intervals: [0, 4, 7], name: 'Major' },
    'minor': { intervals: [0, 3, 7], name: 'Minor' },
    '7': { intervals: [0, 4, 7, 10], name: 'Dominant 7th' },
    'm7': { intervals: [0, 3, 7, 10], name: 'Minor 7th' },
    'maj7': { intervals: [0, 4, 7, 11], name: 'Major 7th' },
    'sus2': { intervals: [0, 2, 7], name: 'Sus2' },
    'sus4': { intervals: [0, 5, 7], name: 'Sus4' },
    'dim': { intervals: [0, 3, 6], name: 'Diminished' },
    'aug': { intervals: [0, 4, 8], name: 'Augmented' },
    '5': { intervals: [0, 7], name: 'Power Chord' }
  };

  // Scale definitions
  const scaleDefinitions = {
    'major': { intervals: [0, 2, 4, 5, 7, 9, 11], name: 'Major' },
    'minor': { intervals: [0, 2, 3, 5, 7, 8, 10], name: 'Minor' },
    'pentatonicMajor': { intervals: [0, 2, 4, 7, 9], name: 'Major Pentatonic' },
    'pentatonicMinor': { intervals: [0, 3, 5, 7, 10], name: 'Minor Pentatonic' },
    'blues': { intervals: [0, 3, 5, 6, 7, 10], name: 'Blues' }
  };

  // Helper functions
  const toPreferredAccidental = (root, acc) => {
    return acc === 'sharps' ? (enharmonicToSharps[root] || root) : (enharmonicToFlats[root] || root);
  };

  const getNoteIndexByName = (name) => {
    let idx = notesFlat.indexOf(name);
    if (idx !== -1) return idx;
    return notesSharp.indexOf(name);
  };

  const getNoteNameByIndex = (idx, acc) => {
    idx = ((idx % 12) + 12) % 12;
    return acc === 'sharps' ? notesSharp[idx] : notesFlat[idx];
  };

  const buildMapForIntervals = (intervals, acc = 'flats') => {
    const roots = acc === 'sharps' ? notesSharp : notesFlat;
    const map = {};
    roots.forEach((root) => {
      const rootIdx = getNoteIndexByName(root);
      map[root] = intervals.map(semi => getNoteNameByIndex(rootIdx + semi, acc));
    });
    return map;
  };

  const getSelectedChordMap = () => {
    const definition = chordDefinitions[chordQuality] || chordDefinitions['major'];
    return buildMapForIntervals(definition.intervals, accidentals);
  };

  const getSelectedScaleMap = () => {
    const definition = scaleDefinitions[scaleFamily] || scaleDefinitions['major'];
    return buildMapForIntervals(definition.intervals, accidentals);
  };

  const getNotesForMode = () => {
    if (currentMode === 'chords') {
      return getSelectedChordMap();
    } else if (currentMode === 'scales') {
      return getSelectedScaleMap();
    } else {
      // Notes mode - return all notes
      const roots = accidentals === 'sharps' ? notesSharp : notesFlat;
      const map = {};
      roots.forEach(note => {
        map[note] = [note];
      });
      return map;
    }
  };

  const generateFretboard = () => {
    if (!fretboardRef.current) return;

    const tuning = instrumentTuningPresets[instrument] || instrumentTuningPresets['Guitar'];
    const fretboard = fretboardRef.current;
    fretboard.innerHTML = '';

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
        if (singleFretMarkPositions.includes(fret)) {
          fretDiv.classList.add('single-fretmark');
        } else if (doubleFretMarkPositions.includes(fret)) {
          fretDiv.classList.add('double-fretmark');
        }
        
        // Calculate note for this fret
        const noteIndex = (openNote + fret) % 12;
        const noteName = getNoteNameByIndex(noteIndex, accidentals);
        fretDiv.setAttribute('data-note', noteName);
        fretDiv.setAttribute('data-fret', fret);
        fretDiv.setAttribute('data-string', stringIndex);
        
        // Add click handler
        fretDiv.addEventListener('click', () => handleFretClick(noteName, fret, stringIndex));
        
        // Add hover handlers
        fretDiv.addEventListener('mouseenter', () => handleFretHover(noteName, true));
        fretDiv.addEventListener('mouseleave', () => handleFretHover(noteName, false));
        
        stringDiv.appendChild(fretDiv);
      }
      
      fretboard.appendChild(stringDiv);
    });
  };

  const generateNoteNames = () => {
    if (!noteNameSectionRef.current) return;

    const noteNameSection = noteNameSectionRef.current;
    noteNameSection.innerHTML = '';

    const notes = accidentals === 'sharps' ? notesSharp : notesFlat;
    const notesForMode = getNotesForMode();

    notes.forEach(note => {
      const span = document.createElement('span');
      span.textContent = note;
      span.style.cursor = 'pointer';
      span.style.padding = '10px';
      span.style.margin = '5px';
      span.style.borderRadius = '8px';
      span.style.transition = 'all 0.3s ease';
      
      // Add hover effect
      span.addEventListener('mouseenter', () => {
        span.style.backgroundColor = 'rgba(0, 186, 186, 0.2)';
        span.style.color = '#00baba';
        handleNoteHover(note, true);
      });
      
      span.addEventListener('mouseleave', () => {
        span.style.backgroundColor = 'transparent';
        span.style.color = '#fff';
        handleNoteHover(note, false);
      });

      // Add click handler
      span.addEventListener('click', () => handleNoteClick(note));
      
      noteNameSection.appendChild(span);
    });
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

  const highlightNotes = () => {
    if (!fretboardRef.current) return;

    const frets = fretboardRef.current.querySelectorAll('.note-fret');
    const notesToHighlight = hoveredNote ? [hoveredNote] : selectedNotes;
    const notesForMode = getNotesForMode();

    frets.forEach(fret => {
      const noteName = fret.getAttribute('data-note');
      let shouldHighlight = false;

      if (currentMode === 'notes') {
        shouldHighlight = notesToHighlight.includes(noteName);
      } else if (currentMode === 'chords' || currentMode === 'scales') {
        // For chords and scales, we need to check if this note is part of the current selection
        // This would require more complex logic based on the selected root note
        // For now, we'll highlight based on hover
        shouldHighlight = notesToHighlight.includes(noteName);
      }

      if (shouldHighlight) {
        fret.style.setProperty('--noteDotOpacity', '1');
        fret.classList.add('highlighted');
      } else {
        fret.style.setProperty('--noteDotOpacity', '0');
        fret.classList.remove('highlighted');
      }
    });
  };

  // Effects
  useEffect(() => {
    generateFretboard();
  }, [instrument, numberOfFrets, accidentals]);

  useEffect(() => {
    generateNoteNames();
  }, [accidentals, currentMode, chordQuality, scaleFamily]);

  useEffect(() => {
    highlightNotes();
  }, [selectedNotes, hoveredNote, currentMode, chordQuality, scaleFamily]);

  return (
    <>
      <div className="fretboard" ref={fretboardRef}></div>
      <div className="note-name-section" ref={noteNameSectionRef}></div>
    </>
  );
}
