// Comprehensive chord shape library with real fretboard positions
// Format: { string: fret, finger } where string 1-6, fret 0-12, finger 1-4

export const chordShapes = {
  // Major Chords
  'C': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'C#': [
    { string: 6, fret: 4, finger: 4 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 3, finger: 2 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'D': [
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 3, finger: 3 },
    { string: 1, fret: 2, finger: 1 }
  ],
  'D#': [
    { string: 6, fret: 6, finger: 4 },
    { string: 5, fret: 6, finger: 3 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 3, finger: 2 },
    { string: 2, fret: 4, finger: 4 },
    { string: 1, fret: 3, finger: 2 }
  ],
  'E': [
    { string: 6, fret: 0, finger: 0 },
    { string: 5, fret: 2, finger: 2 },
    { string: 4, fret: 2, finger: 3 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'F': [
    { string: 6, fret: 1, finger: 1 },
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 3, finger: 4 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'F#': [
    { string: 6, fret: 2, finger: 1 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 3, finger: 2 },
    { string: 2, fret: 2, finger: 1 },
    { string: 1, fret: 2, finger: 1 }
  ],
  'G': [
    { string: 6, fret: 3, finger: 2 },
    { string: 5, fret: 2, finger: 1 },
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 3, finger: 3 }
  ],
  'G#': [
    { string: 6, fret: 4, finger: 2 },
    { string: 5, fret: 3, finger: 1 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 4, finger: 3 }
  ],
  'A': [
    { string: 5, fret: 0, finger: 0 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 2, finger: 3 },
    { string: 2, fret: 2, finger: 4 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'A#': [
    { string: 6, fret: 6, finger: 4 },
    { string: 5, fret: 1, finger: 1 },
    { string: 4, fret: 3, finger: 2 },
    { string: 3, fret: 3, finger: 3 },
    { string: 2, fret: 3, finger: 4 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'B': [
    { string: 6, fret: 2, finger: 1 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 4, finger: 4 },
    { string: 2, fret: 4, finger: 4 },
    { string: 1, fret: 2, finger: 1 }
  ],

  // Minor Chords
  'Cm': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'C#m': [
    { string: 6, fret: 4, finger: 4 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'Dm': [
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 3, finger: 3 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'D#m': [
    { string: 6, fret: 6, finger: 4 },
    { string: 5, fret: 6, finger: 3 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 3, finger: 2 },
    { string: 2, fret: 4, finger: 4 },
    { string: 1, fret: 2, finger: 2 }
  ],
  'Em': [
    { string: 6, fret: 0, finger: 0 },
    { string: 5, fret: 2, finger: 2 },
    { string: 4, fret: 2, finger: 3 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'Fm': [
    { string: 6, fret: 1, finger: 1 },
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 3, finger: 4 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'F#m': [
    { string: 6, fret: 2, finger: 1 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 2, finger: 2 }
  ],
  'Gm': [
    { string: 6, fret: 3, finger: 2 },
    { string: 5, fret: 1, finger: 1 },
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 3, finger: 3 }
  ],
  'G#m': [
    { string: 6, fret: 4, finger: 2 },
    { string: 5, fret: 2, finger: 1 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 4, finger: 3 }
  ],
  'Am': [
    { string: 5, fret: 0, finger: 0 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 2, finger: 3 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'A#m': [
    { string: 6, fret: 6, finger: 4 },
    { string: 5, fret: 1, finger: 1 },
    { string: 4, fret: 3, finger: 2 },
    { string: 3, fret: 3, finger: 3 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'Bm': [
    { string: 6, fret: 2, finger: 1 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 4, finger: 4 },
    { string: 2, fret: 3, finger: 3 },
    { string: 1, fret: 2, finger: 1 }
  ],

  // 7th Chords
  'C7': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'C#7': [
    { string: 6, fret: 4, finger: 4 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 3, finger: 2 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'D7': [
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 2, finger: 1 }
  ],
  'D#7': [
    { string: 6, fret: 6, finger: 4 },
    { string: 5, fret: 6, finger: 3 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 3, finger: 2 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 3, finger: 2 }
  ],
  'E7': [
    { string: 6, fret: 0, finger: 0 },
    { string: 5, fret: 2, finger: 2 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'F7': [
    { string: 6, fret: 1, finger: 1 },
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 3, finger: 4 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'F#7': [
    { string: 6, fret: 2, finger: 1 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 3, finger: 2 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 2, finger: 2 }
  ],
  'G7': [
    { string: 6, fret: 3, finger: 2 },
    { string: 5, fret: 2, finger: 1 },
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 3, finger: 3 }
  ],
  'G#7': [
    { string: 6, fret: 4, finger: 2 },
    { string: 5, fret: 3, finger: 1 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 4, finger: 3 }
  ],
  'A7': [
    { string: 5, fret: 0, finger: 0 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'A#7': [
    { string: 6, fret: 6, finger: 4 },
    { string: 5, fret: 1, finger: 1 },
    { string: 4, fret: 3, finger: 2 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 3, finger: 3 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'B7': [
    { string: 6, fret: 2, finger: 1 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 4, finger: 4 },
    { string: 2, fret: 3, finger: 3 },
    { string: 1, fret: 2, finger: 1 }
  ],

  // Major 7th Chords
  'Cmaj7': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'C#maj7': [
    { string: 6, fret: 4, finger: 4 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 3, finger: 2 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'Dmaj7': [
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 2, finger: 3 },
    { string: 1, fret: 2, finger: 1 }
  ],
  'D#maj7': [
    { string: 6, fret: 6, finger: 4 },
    { string: 5, fret: 6, finger: 3 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 3, finger: 2 },
    { string: 2, fret: 3, finger: 3 },
    { string: 1, fret: 3, finger: 2 }
  ],
  'Emaj7': [
    { string: 6, fret: 0, finger: 0 },
    { string: 5, fret: 2, finger: 2 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'Fmaj7': [
    { string: 6, fret: 1, finger: 1 },
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'F#maj7': [
    { string: 6, fret: 2, finger: 1 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 3, finger: 2 },
    { string: 3, fret: 3, finger: 2 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 2, finger: 2 }
  ],
  'Gmaj7': [
    { string: 6, fret: 3, finger: 2 },
    { string: 5, fret: 2, finger: 1 },
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 2, finger: 2 }
  ],
  'G#maj7': [
    { string: 6, fret: 4, finger: 2 },
    { string: 5, fret: 3, finger: 1 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 3, finger: 3 }
  ],
  'Amaj7': [
    { string: 5, fret: 0, finger: 0 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'A#maj7': [
    { string: 6, fret: 6, finger: 4 },
    { string: 5, fret: 1, finger: 1 },
    { string: 4, fret: 3, finger: 2 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 3, finger: 3 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'Bmaj7': [
    { string: 6, fret: 2, finger: 1 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 3, finger: 2 },
    { string: 3, fret: 4, finger: 4 },
    { string: 2, fret: 4, finger: 4 },
    { string: 1, fret: 2, finger: 1 }
  ],

  // Minor 7th Chords
  'Cm7': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'C#m7': [
    { string: 6, fret: 4, finger: 4 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'Dm7': [
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'D#m7': [
    { string: 6, fret: 6, finger: 4 },
    { string: 5, fret: 6, finger: 3 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 3, finger: 2 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 2, finger: 2 }
  ],
  'Em7': [
    { string: 6, fret: 0, finger: 0 },
    { string: 5, fret: 2, finger: 2 },
    { string: 4, fret: 2, finger: 3 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'Fm7': [
    { string: 6, fret: 1, finger: 1 },
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 3, finger: 4 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'F#m7': [
    { string: 6, fret: 2, finger: 1 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 2, finger: 2 }
  ],
  'Gm7': [
    { string: 6, fret: 3, finger: 2 },
    { string: 5, fret: 1, finger: 1 },
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 3, finger: 3 }
  ],
  'G#m7': [
    { string: 6, fret: 4, finger: 2 },
    { string: 5, fret: 2, finger: 1 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 4, finger: 3 }
  ],
  'Am7': [
    { string: 5, fret: 0, finger: 0 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 2, finger: 3 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'A#m7': [
    { string: 6, fret: 6, finger: 4 },
    { string: 5, fret: 1, finger: 1 },
    { string: 4, fret: 3, finger: 2 },
    { string: 3, fret: 3, finger: 3 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 1, finger: 1 }
  ],
  'Bm7': [
    { string: 6, fret: 2, finger: 1 },
    { string: 5, fret: 4, finger: 3 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 4, finger: 4 },
    { string: 2, fret: 3, finger: 3 },
    { string: 1, fret: 2, finger: 1 }
  ],

  // Extended Chords
  'Cadd9': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 3, finger: 4 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'C6': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'Csus2': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'Csus4': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 3, finger: 4 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'C9': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'C11': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 1, finger: 1 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 }
  ],
  'C13': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 2, finger: 2 },
    { string: 1, fret: 0, finger: 0 }
  ]
};

// Additional extended chord shapes frequently used by the app
// These complement the main chordShapes above without modifying it
const extendedChordShapes = {
  // From example progression and common jazz/pop shapes
  'Cadd9': [
    { string: 5, fret: 3, finger: 3 }, // C
    { string: 4, fret: 2, finger: 2 }, // E
    { string: 3, fret: 0, finger: 0 }, // G
    { string: 2, fret: 3, finger: 4 }, // D (add9)
    { string: 1, fret: 0, finger: 0 }, // E
  ],
  'Bm7b5': [
    { string: 5, fret: 2, finger: 1 }, // B
    { string: 4, fret: 3, finger: 3 }, // D
    { string: 3, fret: 2, finger: 2 }, // F
    { string: 2, fret: 3, finger: 4 }, // A
  ],
  'E7': [
    { string: 6, fret: 0, finger: 0 },
    { string: 5, fret: 2, finger: 2 },
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 1, finger: 1 },
    { string: 2, fret: 0, finger: 0 },
    { string: 1, fret: 0, finger: 0 },
  ],
  'Am7': [
    { string: 5, fret: 0, finger: 0 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 0, finger: 0 },
  ],
  'Fmaj7': [
    { string: 6, fret: 1, finger: 1 }, // thumb/barre optional
    { string: 4, fret: 2, finger: 3 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 1, finger: 1 },
  ],
  'G6': [
    { string: 6, fret: 3, finger: 2 },
    { string: 5, fret: 2, finger: 1 }, // E (6)
    { string: 2, fret: 3, finger: 4 },
    { string: 1, fret: 3, finger: 3 },
  ],
  'Em9': [
    { string: 6, fret: 0, finger: 0 }, // E
    { string: 5, fret: 2, finger: 2 }, // F# (9)
    { string: 4, fret: 0, finger: 0 }, // E
    { string: 3, fret: 0, finger: 0 }, // G
    { string: 2, fret: 0, finger: 0 }, // B
    { string: 1, fret: 2, finger: 1 }, // F#
  ],
  'Dm7': [
    { string: 4, fret: 0, finger: 0 },
    { string: 3, fret: 2, finger: 2 },
    { string: 2, fret: 1, finger: 1 },
    { string: 1, fret: 1, finger: 1 },
  ],
  'G7sus4': [
    { string: 6, fret: 3, finger: 2 },
    { string: 5, fret: 5, finger: 4 }, // D
    { string: 4, fret: 3, finger: 1 }, // G
    { string: 3, fret: 5, finger: 4 }, // C (sus4)
    { string: 2, fret: 3, finger: 1 }, // D
    { string: 1, fret: 3, finger: 3 }, // G
  ],
  'Cmaj7': [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 3, fret: 0, finger: 0 },
    { string: 2, fret: 0, finger: 0 }, // B
    { string: 1, fret: 0, finger: 0 },
  ],
};

// Function to get chord shape by name
export const getChordShape = (chordName) => {
  // Normalize chord name (remove spaces, handle different formats)
  const normalized = chordName.replace(/\s+/g, '').replace(/[♯#]/g, '#').replace(/[♭b]/g, 'b');
  
  // Try exact match first
  if (chordShapes[normalized]) {
    return chordShapes[normalized];
  }
  // Try extended shapes
  if (extendedChordShapes[normalized]) {
    return extendedChordShapes[normalized];
  }
  
  // Try common variations
  const variations = [
    normalized,
    normalized.replace('maj', ''),
    normalized.replace('min', 'm'),
    normalized.replace('m', 'min'),
    normalized.replace('7', ''),
    normalized + '7',
    normalized.replace('add9', ''),
    normalized.replace('sus2', ''),
    normalized.replace('sus4', ''),
    normalized.replace('6', ''),
    normalized + '6'
  ];
  
  for (const variation of variations) {
    if (chordShapes[variation]) {
      return chordShapes[variation];
    }
  }
  
  return null;
};

// Function to check if chord exists in library
export const hasChordShape = (chordName) => {
  return getChordShape(chordName) !== null;
};
