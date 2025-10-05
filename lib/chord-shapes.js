// Comprehensive chord shape library with real fretboard positions
// Format: { string: fret, finger } where string 1-6, fret 0-12, finger 1-4

// =====================
// 1) Static open shapes
// =====================
// Keep only representative open/common shapes that are NOT easily derived from barre templates.
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
// ==========================
// 2) Moveable template system
// ==========================
// One template per quality; transpose to any root.
// Offsets below are fret offsets from the base fret on the root string.
// rootString is either 6 (E-shape family) or 5 (A-shape family).

const standardTuningOpenNoteToIndex = {
  // Using semitone indices with C=0
  // E2, A2, D3, G3, B3, E4 → note names: E, A, D, G, B, E
  E: 4, A: 9, D: 2, G: 7, B: 11,
};

const noteNameToIndex = (note) => {
  const map = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8,
    'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
  };
  return map[note];
};

// Base moveable shapes by quality (E-shape and A-shape where appropriate)
// finger: 1 can indicate barre when multiple strings at same fret.
const baseMovableShapesByQuality = {
  // E-shape Major (like E major shape moved up with barre)
  major: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 1, finger: 2 },
      { string: 2, fretOffset: 0, finger: 1 },
      { string: 1, fretOffset: 0, finger: 1 }
    ]
  },
  // A-shape Major (alternative compact)
  A_major: {
    rootString: 5,
    offsets: [
      { string: 5, fretOffset: 0, finger: 1 },
      { string: 4, fretOffset: 2, finger: 3 },
      { string: 3, fretOffset: 2, finger: 4 },
      { string: 2, fretOffset: 2, finger: 2 },
      { string: 1, fretOffset: 0, finger: 1 }
    ]
  },
  // E-shape Minor
  minor: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 0, finger: 1 },
      { string: 2, fretOffset: 0, finger: 1 },
      { string: 1, fretOffset: 0, finger: 1 }
    ]
  },
  // A-shape Minor (alternative)
  A_minor: {
    rootString: 5,
    offsets: [
      { string: 5, fretOffset: 0, finger: 1 },
      { string: 4, fretOffset: 2, finger: 3 },
      { string: 3, fretOffset: 2, finger: 4 },
      { string: 2, fretOffset: 1, finger: 2 },
      { string: 1, fretOffset: 0, finger: 1 }
    ]
  },
  // E-shape Dominant 7
  '7': {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 0, finger: 1 },
      { string: 3, fretOffset: 1, finger: 2 },
      { string: 2, fretOffset: 0, finger: 1 },
      { string: 1, fretOffset: 0, finger: 1 }
    ]
  },
  // E-shape Minor 7
  m7: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 0, finger: 1 },
      { string: 2, fretOffset: 0, finger: 1 },
      { string: 1, fretOffset: 0, finger: 1 }
    ]
  },
  // E-shape Major 7 (common barre voicing)
  maj7: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 1, finger: 2 },
      { string: 3, fretOffset: 1, finger: 1 },
      { string: 2, fretOffset: 0, finger: 1 },
      { string: 1, fretOffset: 0, finger: 1 }
    ]
  },
  // Sus4 (E-shape variant)
  sus4: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 2, finger: 2 },
      { string: 2, fretOffset: 0, finger: 1 },
      { string: 1, fretOffset: 0, finger: 1 }
    ]
  },
  // Sus2 (E-shape variant)
  sus2: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 0, finger: 1 },
      { string: 2, fretOffset: 0, finger: 1 },
      { string: 1, fretOffset: 0, finger: 1 }
    ]
  },
  // 7sus4 (approximate as sus4 voicing with 7th omitted for playability)
  '7sus4': {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 2, finger: 2 },
      { string: 2, fretOffset: 0, finger: 1 },
    ]
  },
  // 9sus4 (treat as sus4 color; add9 usually voiced via melody/upper extension)
  '9sus4': {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 2, finger: 2 },
      { string: 2, fretOffset: 0, finger: 1 },
    ]
  },
  // Power (5) chord (root + 5th) - minimal fingering
  '5': {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 }
    ]
  },
  // Diminished triad (compact)
  dim: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 1, finger: 2 },
      { string: 4, fretOffset: 0, finger: 1 },
      { string: 3, fretOffset: 1, finger: 3 }
    ]
  },
  // Augmented triad (compact)
  aug: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 3, finger: 4 },
      { string: 4, fretOffset: 2, finger: 3 },
      { string: 3, fretOffset: 1, finger: 2 }
    ]
  },
  // Half-diminished (m7b5)
  m7b5: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 1, finger: 2 },
      { string: 4, fretOffset: 0, finger: 1 },
      { string: 3, fretOffset: 1, finger: 3 },
      { string: 2, fretOffset: 0, finger: 1 }
    ]
  },
  // Diminished 7 (symmetrical)
  dim7: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 1, finger: 2 },
      { string: 4, fretOffset: 2, finger: 3 },
      { string: 3, fretOffset: 1, finger: 4 }
    ]
  },
  // Sixth chords
  '6': {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 2, finger: 2 }
    ]
  },
  m6: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 0, finger: 1 },
      { string: 2, fretOffset: 2, finger: 4 }
    ]
  },
  // Add9/Add11/Add13 (use major base; upper extensions assumed in melody/voicing)
  add9: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 1, finger: 2 },
      { string: 2, fretOffset: 0, finger: 1 }
    ]
  },
  add11: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 1, finger: 2 },
      { string: 2, fretOffset: 0, finger: 1 }
    ]
  },
  add13: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 1, finger: 2 },
      { string: 2, fretOffset: 0, finger: 1 }
    ]
  },
  // 6add9 (use 6 shape base)
  '6add9': {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 2, finger: 2 }
    ]
  },
  m6add9: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 0, finger: 1 }
    ]
  },
  // 9 family (use 7/maj7/min7 base as approximations)
  '9': {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 0, finger: 1 },
      { string: 3, fretOffset: 1, finger: 2 },
      { string: 2, fretOffset: 0, finger: 1 }
    ]
  },
  m9: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 0, finger: 1 },
      { string: 2, fretOffset: 0, finger: 1 }
    ]
  },
  maj9: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 1, finger: 2 },
      { string: 3, fretOffset: 1, finger: 1 },
      { string: 2, fretOffset: 0, finger: 1 }
    ]
  },
  // 11 family
  '11': {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 0, finger: 1 },
      { string: 3, fretOffset: 2, finger: 4 }
    ]
  },
  m11: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 0, finger: 1 }
    ]
  },
  // 13 family
  '13': {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 0, finger: 1 },
      { string: 3, fretOffset: 2, finger: 4 }
    ]
  },
  m13: {
    rootString: 6,
    offsets: [
      { string: 6, fretOffset: 0, finger: 1 },
      { string: 5, fretOffset: 2, finger: 3 },
      { string: 4, fretOffset: 2, finger: 4 },
      { string: 3, fretOffset: 0, finger: 1 }
    ]
  },
  // Altered dominants (approximate E7 base; color tones implied)
  '7b9': {
    rootString: 6,
    offsets: [ { string: 6, fretOffset: 0, finger: 1 }, { string: 5, fretOffset: 2, finger: 3 }, { string: 4, fretOffset: 0, finger: 1 }, { string: 3, fretOffset: 1, finger: 2 } ]
  },
  '7#9': {
    rootString: 6,
    offsets: [ { string: 6, fretOffset: 0, finger: 1 }, { string: 5, fretOffset: 2, finger: 3 }, { string: 4, fretOffset: 0, finger: 1 }, { string: 3, fretOffset: 1, finger: 2 } ]
  },
  '7#11': {
    rootString: 6,
    offsets: [ { string: 6, fretOffset: 0, finger: 1 }, { string: 5, fretOffset: 2, finger: 3 }, { string: 4, fretOffset: 0, finger: 1 }, { string: 3, fretOffset: 2, finger: 4 } ]
  },
  '7b13': {
    rootString: 6,
    offsets: [ { string: 6, fretOffset: 0, finger: 1 }, { string: 5, fretOffset: 2, finger: 3 }, { string: 4, fretOffset: 0, finger: 1 }, { string: 3, fretOffset: 2, finger: 4 } ]
  },
  'maj7#11': {
    rootString: 6,
    offsets: [ { string: 6, fretOffset: 0, finger: 1 }, { string: 5, fretOffset: 2, finger: 3 }, { string: 4, fretOffset: 1, finger: 2 }, { string: 3, fretOffset: 2, finger: 4 } ]
  }
};

const parseChordName = (chordName) => {
  const m = chordName.replace(/\s+/g, '').match(/^([A-G](?:#|b)?)(.*)$/);
  if (!m) return null;
  const root = m[1];
  let quality = m[2] || 'major';
  // Normalize quality aliases
  quality = quality
    .replace(/^M$/, 'major')
    .replace(/^maj$/, 'major')
    .replace(/^m$/, 'minor')
    .replace(/^min$/, 'minor')
    .replace(/^maj7$/, 'maj7')
    .replace(/^7sus4$/, '7sus4');
  return { root, quality };
};

const getBaseFretForRootOnString = (root, string) => {
  // string: 6..1 → open note names: 6:E, 5:A, 4:D, 3:G, 2:B, 1:E
  const stringOpen = string === 6 || string === 1 ? 'E' : string === 5 ? 'A' : string === 4 ? 'D' : string === 3 ? 'G' : 'B';
  const openIdx = standardTuningOpenNoteToIndex[stringOpen];
  const targetIdx = noteNameToIndex(root);
  if (openIdx == null || targetIdx == null) return 0;
  let delta = targetIdx - openIdx;
  while (delta < 0) delta += 12;
  return delta; // baseFret within first octave
};

const getMovableShapeFor = (root, quality) => {
  const shape = baseMovableShapesByQuality[quality];
  if (!shape) return null;
  const baseFret = getBaseFretForRootOnString(root, shape.rootString);
  const positions = shape.offsets.map(p => ({
    string: p.string,
    fret: baseFret + p.fretOffset,
    finger: p.finger
  })).filter(p => p.fret >= 0 && p.fret <= 12);
  if (positions.length === 0) return null;
  return positions;
};

// =====================
// Enhanced API
// =====================

export const getChordShapeV2 = (chordName) => {
  // Normalize chord name (remove spaces, handle different formats)
  const normalized = chordName.replace(/\s+/g, '').replace(/[♯#]/g, '#').replace(/[♭b]/g, 'b');

  // Try moveable shape first (preferred path)
  const parsed = parseChordName(normalized);
  if (parsed) {
    const movable = getMovableShapeFor(parsed.root, parsed.quality || 'major');
    if (movable) return movable;
  }

  // Fallback: static map
  if (chordShapes[normalized]) {
    return chordShapes[normalized];
  }

  // Try common variations in static map
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

export const hasChordShape = (chordName) => {
  return getChordShapeV2(chordName) !== null;
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
  const normalized = chordName.replace(/\s+/g, '').replace(/[♯#]/g, '#').replace(/[♭b]/g, 'b');
  // 1) Try moveable templates first
  const parsed = parseChordName(normalized);
  if (parsed) {
    const movable = getMovableShapeFor(parsed.root, parsed.quality || 'major');
    if (movable) return movable;
  }
  // 2) Try representative static open shapes
  if (chordShapes[normalized]) return chordShapes[normalized];
  // 3) Try extended known shapes
  if (extendedChordShapes[normalized]) return extendedChordShapes[normalized];
  // 4) Try common variations in static/extended
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
    if (chordShapes[variation]) return chordShapes[variation];
    if (extendedChordShapes[variation]) return extendedChordShapes[variation];
  }
  return null;
};

