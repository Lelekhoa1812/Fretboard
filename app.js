(function() {
const root = document.documentElement;
const fretboard = document.querySelector('.fretboard');
const instrumentSelector = document.querySelector('#instrument-selector');
const searchSelector = document.querySelector('#search-by');
const scaleSelector = document.querySelector('#scale');
const scalesetSelector = document.querySelector('#scale-set');
const accidentalSelector = document.querySelector('.accidental-selector');
const numberOfFretsSelector = document.querySelector('#number-of-frets');
const showAllNotesSelector = document.querySelector('#show-all-notes');
const showMultipleNotesSelector = document.querySelector('#show-multiple-notes');
const noteNameSection = document.querySelector('.note-name-section');
const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPositions = [12, 24];
const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
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

let allNotes;
let showMultipleNotes = false;
let showAllNotes = false;
let numberOfFrets = 8;
let accidentals = 'flats';
let selectedInstrument = 'Guitar';
let numberOfStrings = instrumentTuningPresets[selectedInstrument].length;

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
            if (scaleSelector.value === "major")
            {
                for (let chord in chordmajorNotes) {
                    let chordmajorNotesElement = tools.createElement('span', chord);
                    chordmajorNotesElement.classList.add('chord-note');
                    noteNameSection.appendChild(chordmajorNotesElement);
                }
            }
            else if (scaleSelector.value === "minor")
            {
                for (let chord in chordminorNotes) {
                    let chordminorNotesElement = tools.createElement('span', chord);
                    chordminorNotesElement.classList.add('chord-note');
                    noteNameSection.appendChild(chordminorNotesElement);
                }
            }
            else if (scaleSelector.value === "7")
            {
                for (let chord in chord7Notes) {
                    let chord7NotesElement = tools.createElement('span', chord);
                    chord7NotesElement.classList.add('chord-note');
                    noteNameSection.appendChild(chord7NotesElement);
                }
            }
            else if (scaleSelector.value === "m7")
            {
                for (let chord in chordm7Notes) {
                    let chordm7NotesElement = tools.createElement('span', chord);
                    chordm7NotesElement.classList.add('chord-note');
                    noteNameSection.appendChild(chordm7NotesElement);
                }
            }
            else if (scaleSelector.value === "maj7")
            {
                for (let chord in chordmaj7Notes) {
                    let chordmaj7NotesElement = tools.createElement('span', chord);
                    chordmaj7NotesElement.classList.add('chord-note');
                    noteNameSection.appendChild(chordmaj7NotesElement);
                }
            }
            else if (scaleSelector.value === "sus2")
            {
                for (let chord in chordsus2Notes) {
                    let chordsus2NotesElement = tools.createElement('span', chord);
                    chordsus2NotesElement.classList.add('chord-note');
                    noteNameSection.appendChild(chordsus2NotesElement);
                }
            }
            else if (scaleSelector.value === "sus4")
            {
                for (let chord in chordsus4Notes) {
                    let chordsus4NotesElement = tools.createElement('span', chord);
                    chordsus4NotesElement.classList.add('chord-note');
                    noteNameSection.appendChild(chordsus4NotesElement);
                }
            }
            else if (scaleSelector.value === "add9")
            {
                for (let chord in chordadd9Notes) {
                    let chordadd9NotesElement = tools.createElement('span', chord);
                    chordadd9NotesElement.classList.add('chord-note');
                    noteNameSection.appendChild(chordadd9NotesElement);
                }
            }
            else if (scaleSelector.value === "m7b5")
            {
                for (let chord in chordm7b5Notes) {
                    let chordm7b5NotesElement = tools.createElement('span', chord);
                    chordm7b5NotesElement.classList.add('chord-note');
                    noteNameSection.appendChild(chordm7b5NotesElement);
                }
            }
        }
        else if (searchSelector.value === 'scales') {
            if (scalesetSelector.value === "major")
            {
                for (let scale in scaleMajor) {
                    let scaleMajorElement = tools.createElement('span', scale);
                    scaleMajorElement.classList.add('scale-note');
                    noteNameSection.appendChild(scaleMajorElement);
                }
            }
            else if (scalesetSelector.value === "minor")
            {
                for (let scale in scaleMinor) {
                    let scaleMinorElement = tools.createElement('span', scale);
                    scaleMinorElement.classList.add('scale-note');
                    noteNameSection.appendChild(scaleMinorElement);
                }
            }
       }
    },
    toggleMultipleNotes(noteName, opacity) {
        for (let i = 0; i < allNotes.length; i++) {
            if (allNotes[i].dataset.note === noteName) {
                allNotes[i].style.setProperty('--noteDotOpacity', opacity);
            }
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
    setNotesToShow(event) {
        if (searchSelector.value === 'notes') {
            let noteToShow = event.target.innerText;
            app.toggleMultipleNotes(noteToShow, 1);
        } else if (searchSelector.value === 'chords') {
            let chordName = event.target.innerText;
            if (scaleSelector.value === "major"){
                let chordmajorNotesArray = chordmajorNotes[chordName];
                chordmajorNotesArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
            else if (scaleSelector.value === "minor"){
                let chordminorNotesArray = chordminorNotes[chordName];
                chordminorNotesArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
            else if (scaleSelector.value === "7"){
                let chord7NotesArray = chord7Notes[chordName];
                chord7NotesArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
            else if (scaleSelector.value === "m7"){
                let chordm7NotesArray = chordm7Notes[chordName];
                chordm7NotesArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
            else if (scaleSelector.value === "maj7"){
                let chordmaj7NotesArray = chordmaj7Notes[chordName];
                chordmaj7NotesArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
            else if (scaleSelector.value === "sus2"){
                let chordsus2NotesArray = chordsus2Notes[chordName];
                chordsus2NotesArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
            else if (scaleSelector.value === "sus4"){
                let chordsus4NotesArray = chordsus4Notes[chordName];
                chordsus4NotesArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
            else if (scaleSelector.value === "add9"){
                let chordadd9NotesArray = chordadd9Notes[chordName];
                chordadd9NotesArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
            else if (scaleSelector.value === "m7b5"){
                let chordm7b5NotesArray = chordm7b5Notes[chordName];
                chordm7b5NotesArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
        }
        else if (searchSelector.value === 'scales') {
            let scaleName = event.target.innerText;
            if (scalesetSelector.value === "major"){
                let scaleMajorArray = scaleMajor[scaleName];
                scaleMajorArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
            else if (scalesetSelector.value === "minor"){
                let scaleMinorArray = scaleMinor[scaleName];
                scaleMinorArray.forEach((note) => {
                    app.toggleMultipleNotes(note, 1);
                });
            }
        }
        
    },
    setNotesToHide(event) {
        if (!showAllNotes) {
            if (searchSelector.value === 'notes') {
                let noteToHide = event.target.innerText;
                app.toggleMultipleNotes(noteToHide, 0);
            } else if (searchSelector.value === 'chords') {
                let chordName = event.target.innerText;
                if (scaleSelector.value === "major"){
                    let chordmajorNotesArray = chordmajorNotes[chordName];
                    chordmajorNotesArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
                else if (scaleSelector.value === "minor"){
                    let chordminorNotesArray = chordminorNotes[chordName];
                    chordminorNotesArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
                else if (scaleSelector.value === "7"){
                    let chord7NotesArray = chord7Notes[chordName];
                    chord7NotesArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
                else if (scaleSelector.value === "m7"){
                    let chordm7NotesArray = chord7Notes[chordName];
                    chordm7NotesArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
                else if (scaleSelector.value === "maj7"){
                    let chordmaj7NotesArray = chordmaj7Notes[chordName];
                    chordmaj7NotesArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
                else if (scaleSelector.value === "sus2"){
                    let chordsus2NotesArray = chordsus2Notes[chordName];
                    chordsus2NotesArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
                else if (scaleSelector.value === "sus4"){
                    let chordsus4NotesArray = chordsus4Notes[chordName];
                    chordsus4NotesArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
                else if (scaleSelector.value === "add9"){
                    let chordadd9NotesArray = chordadd9Notes[chordName];
                    chordadd9NotesArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
                else if (scaleSelector.value === "m7b5"){
                    let chordm7b5NotesArray = chordm7b5Notes[chordName];
                    chordm7b5NotesArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
            }
            else if (searchSelector.value === 'scales') {
                let scaleName = event.target.innerText;
                if (scalesetSelector.value === "major"){
                    let scaleMajorArray = scaleMajor[scaleName];
                    scaleMajorArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
                else if (scalesetSelector.value === "minor"){
                    let scaleMinorArray = scaleMinor[scaleName];
                    scaleMinorArray.forEach((note) => {
                        app.toggleMultipleNotes(note, 0);
                    });
                }
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
        } else if (selectedOption === 'notes') {
            document.getElementById('show-all-notes-container').style.display = 'block';
            document.getElementById('show-all-notes-label').style.display = 'block';
            document.getElementById('show-multiple-notes-container').style.display = 'block';
            document.getElementById('show-multiple-notes-label').style.display = 'block';
            document.getElementById('scale-container').style.display = 'none';
            document.getElementById('scale-label').style.display = 'none';
            document.getElementById('scale-set-container').style.display = 'none';
            document.getElementById('scale-set-label').style.display = 'none';
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


