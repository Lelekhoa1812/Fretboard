import { useState, useEffect, useRef } from 'react';
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
  getNoteNameByIndex
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

  // Get the appropriate note map based on current mode
  const getNotesForMode = () => {
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
  };

  const generateFretboard = () => {
    if (!fretboardRef.current) return;

    const tuning = instrumentTuningPresets[instrument] || instrumentTuningPresets['Guitar'];
    const fretboard = fretboardRef.current;
    fretboard.innerHTML = '';

    // Set CSS variable for number of strings
    document.documentElement.style.setProperty('--number-of-strings', tuning.length);

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

  const highlightNotes = () => {
    if (!fretboardRef.current) return;

    const frets = fretboardRef.current.querySelectorAll('.note-fret');
    const notesForMode = getNotesForMode();
    let notesToHighlight = [];

    if (currentMode === 'notes') {
      if (showAllNotes) {
        // Show all notes
        notesToHighlight = accidentals === 'sharps' ? notesSharp : notesFlat;
      } else {
        notesToHighlight = hoveredNote ? [hoveredNote] : selectedNotes;
      }
    } else if (currentMode === 'chords' || currentMode === 'scales') {
      // For chords and scales, highlight based on hovered root note
      if (hoveredNote && notesForMode[hoveredNote]) {
        notesToHighlight = notesForMode[hoveredNote];
      } else if (selectedRoot && notesForMode[selectedRoot]) {
        notesToHighlight = notesForMode[selectedRoot];
      }
    }

    frets.forEach(fret => {
      const noteName = fret.getAttribute('data-note');
      const shouldHighlight = notesToHighlight.includes(noteName);

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
  }, [selectedNotes, hoveredNote, selectedRoot, currentMode, chordQuality, scaleFamily, accidentals]);

  // Reset selected root when mode changes
  useEffect(() => {
    setSelectedRoot(null);
    setSelectedNotes([]);
  }, [currentMode, chordQuality, scaleFamily]);

  return (
    <>
      <div className="fretboard" ref={fretboardRef}></div>
      <div className="note-name-section" ref={noteNameSectionRef}></div>
    </>
  );
}
