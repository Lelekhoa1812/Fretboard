(function() {
const root = document.documentElement;
const fretboard = document.querySelector('.fretboard');
const instrumentSelector = document.querySelector('#instrument-selector');
const searchSelector = document.querySelector('#search-by');
const scaleSelector = document.querySelector('#scale');
const scalesetSelector = document.querySelector('#scale-set');
const stringSetSelector = document.querySelector('#string-set');
const minFretInput = document.querySelector('#min-fret');
const maxFretInput = document.querySelector('#max-fret');
const handPositionsCheckbox = document.querySelector('#hand-positions');
const handPositionPicker = document.querySelector('#hand-position-picker');
const handPositionIndexSelect = document.querySelector('#hand-position-index');
const accidentalSelector = document.querySelector('.accidental-selector');
const numberOfFretsSelector = document.querySelector('#number-of-frets');
const showAllNotesSelector = document.querySelector('#show-all-notes');
const showMultipleNotesSelector = document.querySelector('#show-multiple-notes');
const noteNameSection = document.querySelector('.note-name-section');
const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPositions = [12, 24];
const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const enharmonicToFlats = {"C#":"Db","D#":"Eb","F#":"Gb","G#":"Ab","A#":"Bb"};
const enharmonicToSharps = {"Db":"C#","Eb":"D#","Gb":"F#","Ab":"G#","Bb":"A#"};
function toPreferredAccidental(root, acc) {
    return acc === 'sharps' ? (enharmonicToSharps[root] || root) : (enharmonicToFlats[root] || root);
}
function resolveRootInMap(root, map) {
    if (map[root]) return root;
    if (map[enharmonicToFlats[root]]) return enharmonicToFlats[root];
    if (map[enharmonicToSharps[root]]) return enharmonicToSharps[root];
    return undefined;
}
// Helpers for generating tone maps
function getNoteIndexByName(name) {
    let idx = notesFlat.indexOf(name);
    if (idx !== -1) return idx;
    return notesSharp.indexOf(name);
}
function getNoteNameByIndex(idx, acc) {
    idx = ((idx % 12) + 12) % 12;
    return acc === 'sharps' ? notesSharp[idx] : notesFlat[idx];
}
function buildMapForIntervals(intervals, acc = 'flats') {
    const roots = acc === 'sharps' ? notesSharp : notesFlat;
    const map = {};
    roots.forEach((root) => {
        const rootIdx = getNoteIndexByName(root);
        map[root] = intervals.map(semi => getNoteNameByIndex(rootIdx + semi, acc));
    });
    return map;
}
function getSelectedChordMap() {
    const q = scaleSelector.value;
    return (
      q === 'major' ? chordmajorNotes :
      q === 'minor' ? chordminorNotes :
      q === '7' ? chord7Notes :
      q === 'm7' ? chordm7Notes :
      q === 'maj7' ? chordmaj7Notes :
      q === 'sus2' ? chordsus2Notes :
      q === 'sus4' ? chordsus4Notes :
      q === 'add9' ? chordadd9Notes :
      q === 'm7b5' ? chordm7b5Notes :
      q === '6' ? chord6Notes :
      q === 'm6' ? chordm6Notes :
      q === 'dim' ? chorddimNotes :
      q === 'aug' ? chordaugNotes :
      q === 'dim7' ? chorddim7Notes :
      q === '9' ? chord9Notes :
      q === 'm9' ? chordm9Notes :
      q === 'maj9' ? chordmaj9Notes :
      q === '11' ? chord11Notes :
      q === '13' ? chord13Notes :
      chordmajorNotes
    );
}
function getSelectedScaleMap() {
    const s = scalesetSelector.value;
    return (
      s === 'major' ? scaleMajor :
      s === 'minor' ? scaleMinor :
      s === 'modes' ? scaleModes :
      s === 'pentatonicMajor' ? scalePentatonicMajor :
      s === 'pentatonicMinor' ? scalePentatonicMinor :
      s === 'blues' ? scaleBlues :
      scaleMajor
    );
}
const instrumentTuningPresets = {
    'Guitar': [4, 11, 7, 2, 9, 4],
    'Bass (4 strings)': [7, 2, 9, 4],
    'Bass (5 strings)': [7, 2, 9, 4, 11],
    'Ukulele': [9, 4, 0, 7]
};
const chordmajorNotes = {
    'C': ['C', 'E', 'G'],
    'Db': ['Db', 'F', 'Ab'],
    'D': ['D', 'Gb', 'A'],
    'Eb': ['Eb', 'G', 'Bb'],
    'E': ['E', 'Ab', 'B'],
    'F': ['F', 'A', 'C'],
    'Gb': ['Gb', 'Bb', 'Db'],
    'G': ['G', 'B', 'D'],
    'Ab': ['Ab', 'C', 'Eb'],
    'A': ['A', 'Db', 'E'],
    'Bb': ['Bb', 'D', 'F'],
    'B': ['B', 'Eb', 'Gb']
};
const chordminorNotes = {
    'C': ['C', 'Eb', 'G'],
    'Db': ['Db', 'E', 'Ab'],
    'D': ['D', 'F', 'A'],
    'Eb': ['Eb', 'Gb', 'Bb'],
    'E': ['E', 'G', 'B'],
    'F': ['F', 'Ab', 'C'],
    'Gb': ['Gb', 'A', 'Db'],
    'G': ['G', 'Bb', 'D'],
    'Ab': ['Ab', 'B', 'Eb'],
    'A': ['A', 'C', 'E'],
    'Bb': ['Bb', 'Db', 'F'],
    'B': ['B', 'D', 'Gb']
};
const chord7Notes = {
    'C': ['C', 'E', 'G', 'Bb'],
    'Db': ['Db', 'F', 'Ab', 'B'],
    'D': ['D', 'Gb', 'A', 'C'],
    'Eb': ['Eb', 'G', 'Bb', 'Db'],
    'E': ['E', 'Ab', 'B', 'D'],
    'F': ['F', 'A', 'C', 'Eb'],
    'Gb': ['Gb', 'Bb', 'Db', 'E'],
    'G': ['G', 'B', 'D', 'F'],
    'Ab': ['Ab', 'C', 'Eb', 'Gb'],
    'A': ['A', 'Db', 'E', 'G'],
    'Bb': ['Bb', 'D', 'F', 'Ab'],
    'B': ['B', 'Eb', 'Gb', 'A']
};
const chordm7Notes = {
    'C': ['C', 'Eb', 'G', 'Bb'],
    'Db': ['Db', 'E', 'Ab', 'B'],
    'D': ['D', 'F', 'A', 'C'],
    'Eb': ['Eb', 'Gb', 'Bb', 'Db'],
    'E': ['E', 'G', 'B', 'D'],
    'F': ['F', 'Ab', 'C', 'Eb'],
    'Gb': ['Gb', 'A', 'Db', 'E'],
    'G': ['G', 'Bb', 'D', 'F'],
    'Ab': ['Ab', 'B', 'Eb', 'Gb'],
    'A': ['A', 'C', 'E', 'G'],
    'Bb': ['Bb', 'Db', 'F', 'Ab'],
    'B': ['B', 'D', 'Gb', 'A']
};
const chordmaj7Notes = {
    'C': ['C', 'E', 'G', 'B'],
    'Db': ['Db', 'F', 'Ab', 'C'],
    'D': ['D', 'Gb', 'A', 'Db'],
    'Eb': ['Eb', 'G', 'Bb', 'D'],
    'E': ['E', 'Ab', 'B', 'Eb'],
    'F': ['F', 'A', 'C', 'E'],
    'Gb': ['Gb', 'Bb', 'Db', 'F'],
    'G': ['G', 'B', 'D', 'Gb'],
    'Ab': ['Ab', 'C', 'Eb', 'G'],
    'A': ['A', 'Db', 'E', 'Ab'],
    'Bb': ['Bb', 'D', 'F', 'A'],
    'B': ['B', 'Eb', 'Gb', 'Bb']
};
const chordsus2Notes = {
    'C': ['C', 'D', 'G'],
    'Db': ['Db', 'Eb', 'Ab'],
    'D': ['D', 'E', 'A'],
    'Eb': ['Eb', 'F', 'Bb'],
    'E': ['E', 'Gb', 'B'],
    'F': ['F', 'G', 'C'],
    'Gb': ['Gb', 'Ab', 'Db'],
    'G': ['G', 'A', 'D'],
    'Ab': ['Ab', 'Bb', 'Eb'],
    'A': ['A', 'B', 'E'],
    'Bb': ['Bb', 'C', 'F'],
    'B': ['B', 'Db', 'Gb']
};
const chordsus4Notes = {
    'C': ['C', 'F', 'G'],
    'Db': ['Db', 'Gb', 'Ab'],
    'D': ['D', 'G', 'A'],
    'Eb': ['Eb', 'Ab', 'Bb'],
    'E': ['E', 'A', 'B'],
    'F': ['F', 'Bb', 'C'],
    'Gb': ['Gb', 'B', 'Db'],
    'G': ['G', 'C', 'D'],
    'Ab': ['Ab', 'Db', 'Eb'],
    'A': ['A', 'D', 'E'],
    'Bb': ['Bb', 'Eb', 'F'],
    'B': ['B', 'E', 'Gb']
};
const chordadd9Notes = {
    'C': ['C', 'E', 'G', 'D'],
    'Db': ['Db', 'F', 'Ab', 'Eb'],
    'D': ['D', 'Gb', 'A', 'E'],
    'Eb': ['Eb', 'G', 'Bb', 'F'],
    'E': ['E', 'Ab', 'B', 'Gb'],
    'F': ['F', 'A', 'C', 'G'],
    'Gb': ['Gb', 'Bb', 'Db', 'Ab'],
    'G': ['G', 'B', 'D', 'A'],
    'Ab': ['Ab', 'C', 'Eb', 'Bb'],
    'A': ['A', 'Db', 'E', 'B'],
    'Bb': ['Bb', 'D', 'F', 'C'],
    'B': ['B', 'Eb', 'Gb', 'Db']
};
const chordm7b5Notes = {
    'C': ['C', 'Eb', 'Gb', 'Bb'],
    'Db': ['Db', 'E', 'G', 'B'],
    'D': ['D', 'F', 'Ab', 'C'],
    'Eb': ['Eb', 'Gb', 'A', 'Db'],
    'E': ['E', 'G', 'Bb', 'D'],
    'F': ['F', 'Ab', 'B', 'Eb'],
    'Gb': ['Gb', 'A', 'C', 'E'],
    'G': ['G', 'Bb', 'Db', 'F'],
    'Ab': ['Ab', 'B', 'D', 'Gb'],
    'A': ['A', 'C', 'Eb', 'G'],
    'Bb': ['Bb', 'Db', 'E', 'Ab'],
    'B': ['B', 'D', 'F', 'A']
};
const chord6Notes = {
    'C': ['C', 'E', 'G', 'A'],
    'Db': ['Db', 'F', 'Ab', 'Bb'],
    'D': ['D', 'Gb', 'A', 'B'],
    'Eb': ['Eb', 'G', 'Bb', 'C'],
    'E': ['E', 'Ab', 'B', 'Db'],
    'F': ['F', 'A', 'C', 'D'],
    'Gb': ['Gb', 'Bb', 'Db', 'Eb'],
    'G': ['G', 'B', 'D', 'E'],
    'Ab': ['Ab', 'C', 'Eb', 'F'],
    'A': ['A', 'Db', 'E', 'Gb'],
    'Bb': ['Bb', 'D', 'F', 'G'],
    'B': ['B', 'Eb', 'Gb', 'Ab']
};
const chordm6Notes = {
    'C': ['C', 'Eb', 'G', 'A'],
    'Db': ['Db', 'E', 'Ab', 'Bb'],
    'D': ['D', 'F', 'A', 'B'],
    'Eb': ['Eb', 'Gb', 'Bb', 'C'],
    'E': ['E', 'G', 'B', 'Db'],
    'F': ['F', 'Ab', 'C', 'D'],
    'Gb': ['Gb', 'A', 'Db', 'Eb'],
    'G': ['G', 'Bb', 'D', 'E'],
    'Ab': ['Ab', 'B', 'Eb', 'F'],
    'A': ['A', 'C', 'E', 'Gb'],
    'Bb': ['Bb', 'Db', 'F', 'G'],
    'B': ['B', 'D', 'Gb', 'Ab']
};
const chorddimNotes = {
    'C': ['C', 'Eb', 'Gb'],
    'Db': ['Db', 'E', 'G'],
    'D': ['D', 'F', 'Ab'],
    'Eb': ['Eb', 'Gb', 'A'],
    'E': ['E', 'G', 'Bb'],
    'F': ['F', 'Ab', 'B'],
    'Gb': ['Gb', 'A', 'C'],
    'G': ['G', 'Bb', 'Db'],
    'Ab': ['Ab', 'B', 'D'],
    'A': ['A', 'C', 'Eb'],
    'Bb': ['Bb', 'Db', 'E'],
    'B': ['B', 'D', 'F']
};
const chordaugNotes = {
    'C': ['C', 'E', 'G#'],
    'Db': ['Db', 'F', 'A'],
    'D': ['D', 'F#', 'A#'],
    'Eb': ['Eb', 'G', 'B'],
    'E': ['E', 'G#', 'C'],
    'F': ['F', 'A', 'C#'],
    'Gb': ['Gb', 'Bb', 'D'],
    'G': ['G', 'B', 'D#'],
    'Ab': ['Ab', 'C', 'E'],
    'A': ['A', 'C#', 'F'],
    'Bb': ['Bb', 'D', 'F#'],
    'B': ['B', 'D#', 'G']
};
const chorddim7Notes = {
    'C': ['C', 'Eb', 'Gb', 'A'],
    'Db': ['Db', 'E', 'G', 'Bb'],
    'D': ['D', 'F', 'Ab', 'B'],
    'Eb': ['Eb', 'Gb', 'A', 'C'],
    'E': ['E', 'G', 'Bb', 'Db'],
    'F': ['F', 'Ab', 'B', 'D'],
    'Gb': ['Gb', 'A', 'C', 'Eb'],
    'G': ['G', 'Bb', 'Db', 'E'],
    'Ab': ['Ab', 'B', 'D', 'F'],
    'A': ['A', 'C', 'Eb', 'Gb'],
    'Bb': ['Bb', 'Db', 'E', 'G'],
    'B': ['B', 'D', 'F', 'Ab']
};
const chord9Notes = {
    'C': ['C', 'E', 'G', 'Bb', 'D'],
    'Db': ['Db', 'F', 'Ab', 'B', 'Eb'],
    'D': ['D', 'F#', 'A', 'C', 'E'],
    'Eb': ['Eb', 'G', 'Bb', 'Db', 'F'],
    'E': ['E', 'G#', 'B', 'D', 'F#'],
    'F': ['F', 'A', 'C', 'Eb', 'G'],
    'Gb': ['Gb', 'Bb', 'Db', 'E', 'Ab'],
    'G': ['G', 'B', 'D', 'F', 'A'],
    'Ab': ['Ab', 'C', 'Eb', 'Gb', 'Bb'],
    'A': ['A', 'C#', 'E', 'G', 'B'],
    'Bb': ['Bb', 'D', 'F', 'Ab', 'C'],
    'B': ['B', 'D#', 'F#', 'A', 'C#']
};
const chordm9Notes = {
    'C': ['C', 'Eb', 'G', 'Bb', 'D'],
    'Db': ['Db', 'E', 'Ab', 'B', 'Eb'],
    'D': ['D', 'F', 'A', 'C', 'E'],
    'Eb': ['Eb', 'Gb', 'Bb', 'Db', 'F'],
    'E': ['E', 'G', 'B', 'D', 'F#'],
    'F': ['F', 'Ab', 'C', 'Eb', 'G'],
    'Gb': ['Gb', 'A', 'Db', 'E', 'Ab'],
    'G': ['G', 'Bb', 'D', 'F', 'A'],
    'Ab': ['Ab', 'B', 'Eb', 'Gb', 'Bb'],
    'A': ['A', 'C', 'E', 'G', 'B'],
    'Bb': ['Bb', 'Db', 'F', 'Ab', 'C'],
    'B': ['B', 'D', 'F#', 'A', 'C#']
};
const chordmaj9Notes = {
    'C': ['C', 'E', 'G', 'B', 'D'],
    'Db': ['Db', 'F', 'Ab', 'C', 'Eb'],
    'D': ['D', 'F#', 'A', 'C#', 'E'],
    'Eb': ['Eb', 'G', 'Bb', 'D', 'F'],
    'E': ['E', 'G#', 'B', 'D#', 'F#'],
    'F': ['F', 'A', 'C', 'E', 'G'],
    'Gb': ['Gb', 'Bb', 'Db', 'F', 'Ab'],
    'G': ['G', 'B', 'D', 'F#', 'A'],
    'Ab': ['Ab', 'C', 'Eb', 'G', 'Bb'],
    'A': ['A', 'C#', 'E', 'G#', 'B'],
    'Bb': ['Bb', 'D', 'F', 'A', 'C'],
    'B': ['B', 'D#', 'F#', 'A#', 'C#']
};
// Dominant 11 and 13 (b7)
const chord11Notes = buildMapForIntervals([0, 4, 7, 10, 14, 17], 'flats');
const chord13Notes = buildMapForIntervals([0, 4, 7, 10, 14, 17, 21], 'flats');
const scaleMajor = {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    'D': ['D', 'E', 'Gb', 'G', 'A', 'B', 'Db'],
    'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    'E': ['E', "Gb", 'Ab', 'A', 'B', 'Db', 'Eb'],
    'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'Gb'],
    'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    'A': ['A', 'B', 'Db', 'D', 'E', 'Gb', 'Ab'],
    'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    'B': ['B', 'Db', 'Eb', 'E', 'Gb', 'Ab', 'Bb']
};
const scaleMinor = {
    'C': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'],
    'Db': ['Db', 'Eb', 'E', 'Gb', 'Ab', 'A', 'C'],
    'D': ['D', 'E', 'F', 'G', 'A', 'Bb', 'Db'],
    'Eb': ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'B', 'D'],
    'E': ['E', "Gb", 'G', 'A', 'B', 'C', 'Eb'],
    'F': ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'E'],
    'Gb': ['Gb', 'Ab', 'A', 'Cb', 'Db', 'D', 'F'],
    'G': ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'Gb'],
    'Ab': ['Ab', 'B', 'C', 'Db', 'Eb', 'E', 'G'],
    'A': ['A', 'B', 'C', 'D', 'E', 'F', 'Ab'],
    'Bb': ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'A'],
    'B': ['B', 'Db', 'D', 'E', 'Gb', 'G', 'Bb']
};
// Additional scale sets
// Scale families across all roots
// modes default to Ionian (major) for now
const scaleModes = buildMapForIntervals([0, 2, 4, 5, 7, 9, 11], 'flats');
const scalePentatonicMajor = buildMapForIntervals([0, 2, 4, 7, 9], 'flats');
const scalePentatonicMinor = buildMapForIntervals([0, 3, 5, 7, 10], 'flats');
const scaleBlues = buildMapForIntervals([0, 3, 5, 6, 7, 10], 'flats');

let allNotes;
let showMultipleNotes = false;
let showAllNotes = false;
let numberOfFrets = 8;
let accidentals = 'flats';
let selectedInstrument = 'Guitar';
let numberOfStrings = instrumentTuningPresets[selectedInstrument].length;
let stringSet = 'any';
let minFret = 0;
let maxFret = 24;

const app = {
    init() {
     this.setupFretboard();
     this.setupinstrumentSelector();
     this.setupNoteNameSection();
     handlers.setupEventListeners();
    },
    setupFretboard() {
        fretboard.innerHTML = '';
        root.style.setProperty('--number-of-strings', numberOfStrings);
        // Add strings to fretboard
        for (let i = 0; i < numberOfStrings; i++) {
            let string = tools.createElement('div');
            string.classList.add('string');
            fretboard.appendChild(string);
         
            // Create frets
            for (let fret = 0; fret <= numberOfFrets; fret++) {
                let noteFret = tools.createElement('div');
                noteFret.classList.add('note-fret');
                string.appendChild(noteFret);
                
                let noteName = this.generateNoteNames((fret + instrumentTuningPresets[selectedInstrument][i]), accidentals);
                noteFret.setAttribute('data-note', noteName);
                noteFret.setAttribute('data-string-index', i + 1);
                noteFret.setAttribute('data-fret-index', fret);
                
                // Add single fret marks
                if (i === 0 && singleFretMarkPositions.indexOf(fret) !== -1) {
                    noteFret.classList.add('single-fretmark');
                }

                if (i === 0 && doubleFretMarkPositions.indexOf(fret) !== -1) {
                    let doubleFretMark = tools.createElement('div');
                    doubleFretMark.classList.add('double-fretmark');
                    noteFret.appendChild(doubleFretMark);
                }

            }
        }
        allNotes = document.querySelectorAll('.note-fret');
    },
    generateNoteNames(noteIndex, accidentals) {
        noteIndex = noteIndex % 12;
        let noteName;
        if (accidentals === 'flats') {
            noteName = notesFlat[noteIndex];
        } else if (accidentals === 'sharps') {
            noteName = notesSharp[noteIndex];
        }
        return noteName;
    },
    setupinstrumentSelector() {
        for (instrument in instrumentTuningPresets) {
            let instrumentOption = tools.createElement('option', instrument);
            instrumentSelector.appendChild(instrumentOption);
        }
    },
    setupNoteNameSection() {
        noteNameSection.innerHTML = '';
        let noteNames;
        if (accidentals === 'flats') {
            noteNames = notesFlat;
        } else {
            noteNames = notesSharp;
        }
        if (searchSelector.value === 'notes') {
            noteNames.forEach((noteName) => {
                let noteNameElement = tools.createElement('span', noteName);
                noteNameSection.appendChild(noteNameElement);
            });
        } else if (searchSelector.value === 'chords') {
            // Show root names according to accidental preference
            noteNames.forEach((root) => {
                let el = tools.createElement('span', root);
                el.classList.add('chord-note');
                noteNameSection.appendChild(el);
            });
        }
        else if (searchSelector.value === 'scales') {
            const map = getSelectedScaleMap();
            noteNames.forEach((root) => {
                const resolved = resolveRootInMap(root, map);
                if (!resolved) return;
                let el = tools.createElement('span', root);
                el.classList.add('scale-note');
                noteNameSection.appendChild(el);
            });
       }
    },
    toggleMultipleNotes(noteName, opacity) {
        for (let i = 0; i < allNotes.length; i++) {
            const el = allNotes[i];
            if (el.dataset.note !== noteName) continue;
            const stringIndex = parseInt(el.getAttribute('data-string-index'));
            const fretIndex = parseInt(el.getAttribute('data-fret-index'));
            if (!handlers.filterByStringAndFret(stringIndex, fretIndex)) continue;
            el.style.setProperty('--noteDotOpacity', opacity);
        }
    }
}

const handlers = {
    showNoteDot(event) {
        // Check if show all notes is selected
        if (showAllNotes) {
            return;
        }
        if (event.target.classList.contains('note-fret')) {
            if (showMultipleNotes) {
                app.toggleMultipleNotes(event.target.dataset.note, 1);
            } else {
                event.target.style.setProperty('--noteDotOpacity', 1);
            }
        }
    },
    hideNoteDot(event) {
        if (showAllNotes) {
            return;
        }
        if (showMultipleNotes) {
            app.toggleMultipleNotes(event.target.dataset.note, 0);
        } else {
            event.target.style.setProperty('--noteDotOpacity', 0);
        }
        
    },
    setSelectedInstrument(event) {
        selectedInstrument = event.target.value;
        numberOfStrings = instrumentTuningPresets[selectedInstrument].length;
        app.setupFretboard();
    },
    setAccidentals(event) {
        if (event.target.classList.contains('acc-select')) {
            accidentals = event.target.value;
            app.setupFretboard();
            app.setupNoteNameSection();
        } else {
            return;
        }
    },
    setNumberOfFrets() {
        numberOfFrets = numberOfFretsSelector.value;
        app.setupFretboard();
    },
    setShowAllNotes() {
        showAllNotes = showAllNotesSelector.checked;
        if (showAllNotes) {
            root.style.setProperty('--noteDotOpacity', 1);
            app.setupFretboard();
        } else {
            root.style.setProperty('--noteDotOpacity', 0);
            app.setupFretboard();
        }
    },
    setShowMultipleNotes() {
        showMultipleNotes = !showMultipleNotes;
    },
    filterByStringAndFret(stringIndex, fretIndex) {
        if (fretIndex < minFret || fretIndex > maxFret) return false;
        if (stringSet === 'any') return true;
        const [start, end] = stringSet.split('-').map(Number);
        return stringIndex >= start && stringIndex <= end;
    },
    setNotesToShow(event) {
        if (searchSelector.value === 'notes') {
            let noteToShow = event.target.innerText;
            app.toggleMultipleNotes(noteToShow, 1);
        } else if (searchSelector.value === 'chords') {
            const displayedRoot = event.target.innerText;
            const map = getSelectedChordMap();
            const key = resolveRootInMap(displayedRoot, map);
            if (!key) return;
            const tones = map[key];
            tones && tones.forEach((note) => { app.toggleMultipleNotes(toPreferredAccidental(note, accidentals), 1); });
        }
        else if (searchSelector.value === 'scales') {
            const displayedRoot = event.target.innerText;
            const map = getSelectedScaleMap();
            const key = resolveRootInMap(displayedRoot, map);
            if (!key) return;
            const tones = map[key];
            tones && tones.forEach((note) => { app.toggleMultipleNotes(toPreferredAccidental(note, accidentals), 1); });
        }
        
    },
    setNotesToHide(event) {
        if (!showAllNotes) {
            if (searchSelector.value === 'notes') {
                let noteToHide = event.target.innerText;
                app.toggleMultipleNotes(noteToHide, 0);
            } else if (searchSelector.value === 'chords') {
                const displayedRoot = event.target.innerText;
                const map = getSelectedChordMap();
                const key = resolveRootInMap(displayedRoot, map);
                if (!key) return;
                const tones = map[key];
                tones && tones.forEach((note) => { app.toggleMultipleNotes(toPreferredAccidental(note, accidentals), 0); });
            }
            else if (searchSelector.value === 'scales') {
                const displayedRoot = event.target.innerText;
                const map = getSelectedScaleMap();
                const key = resolveRootInMap(displayedRoot, map);
                if (!key) return;
                const tones = map[key];
                tones && tones.forEach((note) => { app.toggleMultipleNotes(toPreferredAccidental(note, accidentals), 0); });
            }
        }
    },
    setSearchBy(event) {
        const selectedOption = event.target.value;
        app.setupNoteNameSection();

        // Hide or show checkbox containers based on the selected option
        if (selectedOption === 'chords') {
            document.getElementById('show-all-notes-container').style.display = 'none';
            document.getElementById('show-all-notes-label').style.display = 'none';
            document.getElementById('show-multiple-notes-container').style.display = 'none';
            document.getElementById('show-multiple-notes-label').style.display = 'none';
            document.getElementById('scale-container').style.display = 'block';
            document.getElementById('scale-label').style.display = 'block';
            document.getElementById('scale-set-container').style.display = 'none';
            document.getElementById('scale-set-label').style.display = 'none';
            document.getElementById('voicing-controls').style.display = 'flex';
        } else if (selectedOption === 'notes') {
            document.getElementById('show-all-notes-container').style.display = 'block';
            document.getElementById('show-all-notes-label').style.display = 'block';
            document.getElementById('show-multiple-notes-container').style.display = 'block';
            document.getElementById('show-multiple-notes-label').style.display = 'block';
            document.getElementById('scale-container').style.display = 'none';
            document.getElementById('scale-label').style.display = 'none';
            document.getElementById('scale-set-container').style.display = 'none';
            document.getElementById('scale-set-label').style.display = 'none';
            document.getElementById('voicing-controls').style.display = 'none';
        }
        if (selectedOption === 'scales') {
            document.getElementById('show-all-notes-container').style.display = 'none';
            document.getElementById('show-all-notes-label').style.display = 'none';
            document.getElementById('show-multiple-notes-container').style.display = 'none';
            document.getElementById('show-multiple-notes-label').style.display = 'none';
            document.getElementById('scale-container').style.display = 'none';
            document.getElementById('scale-label').style.display = 'none';
            document.getElementById('scale-set-container').style.display = 'block';
            document.getElementById('scale-set-label').style.display = 'block';
            document.getElementById('voicing-controls').style.display = 'none';
        }
    },
    setupEventListeners() {
        fretboard.addEventListener('mouseover', this.showNoteDot);
        fretboard.addEventListener('mouseout', this.hideNoteDot);
        instrumentSelector.addEventListener('change', this.setSelectedInstrument);
        accidentalSelector.addEventListener('click', this.setAccidentals);
        numberOfFretsSelector.addEventListener('change', this.setNumberOfFrets);
        showAllNotesSelector.addEventListener('change', this.setShowAllNotes);
        showMultipleNotesSelector.addEventListener('change', this.setShowMultipleNotes);
        noteNameSection.addEventListener('mouseover', this.setNotesToShow);
        noteNameSection.addEventListener('mouseout', this.setNotesToHide);
        searchSelector.addEventListener('change', this.setSearchBy);
        stringSetSelector && stringSetSelector.addEventListener('change', (e) => { stringSet = e.target.value; });
        minFretInput && minFretInput.addEventListener('change', (e) => { minFret = parseInt(e.target.value || 0); });
        maxFretInput && maxFretInput.addEventListener('change', (e) => { maxFret = parseInt(e.target.value || 24); });
        // Hand positions presets
        if (handPositionsCheckbox && handPositionPicker && handPositionIndexSelect) {
            const presets = [
                { label: 'Open (0–3)', min: 0, max: 3 },
                { label: 'I (3–5)', min: 3, max: 5 },
                { label: 'II (5–7)', min: 5, max: 7 },
                { label: 'III (7–9)', min: 7, max: 9 },
                { label: 'IV (9–12)', min: 9, max: 12 }
            ];
            handPositionsCheckbox.addEventListener('change', (e) => {
                const enabled = e.target.checked;
                handPositionPicker.style.display = enabled ? 'inline-flex' : 'none';
                if (enabled) {
                    handPositionIndexSelect.innerHTML = '';
                    presets.forEach((p, idx) => {
                        const opt = document.createElement('option');
                        opt.value = String(idx);
                        opt.textContent = p.label;
                        handPositionIndexSelect.appendChild(opt);
                    });
                    const apply = () => {
                        const i = parseInt(handPositionIndexSelect.value || '0');
                        const p = presets[i];
                        minFret = p.min; maxFret = p.max;
                        if (minFretInput) minFretInput.value = String(minFret);
                        if (maxFretInput) maxFretInput.value = String(maxFret);
                    };
                    handPositionIndexSelect.addEventListener('change', apply);
                    apply();
                }
            });
        }
    }
}


const tools = {
    createElement(element, content) {
        element = document.createElement(element);
        if (arguments.length > 1) {
            element.innerHTML = content;
        }
        return element;
    }
}


app.init();
})();


