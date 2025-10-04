// Music theory data - comprehensive chord and scale definitions
export const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
export const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export const enharmonicToFlats = {"C#":"Db","D#":"Eb","F#":"Gb","G#":"Ab","A#":"Bb"};
export const enharmonicToSharps = {"Db":"C#","Eb":"D#","Gb":"F#","Ab":"G#","Bb":"A#"};

export const instrumentTuningPresets = {
  'Guitar': [4, 11, 7, 2, 9, 4],
  'Bass (4 strings)': [7, 2, 9, 4],
  'Bass (5 strings)': [7, 2, 9, 4, 11],
  'Ukulele': [9, 4, 0, 7]
};

// Helper functions
export const getNoteIndexByName = (name) => {
  let idx = notesFlat.indexOf(name);
  if (idx !== -1) return idx;
  return notesSharp.indexOf(name);
};

export const getNoteNameByIndex = (idx, acc) => {
  idx = ((idx % 12) + 12) % 12;
  return acc === 'sharps' ? notesSharp[idx] : notesFlat[idx];
};

// Helper function to build note maps for intervals
export const buildMapForIntervals = (intervals, acc = 'flats') => {
  const roots = acc === 'sharps' ? notesSharp : notesFlat;
  const map = {};
  roots.forEach((root) => {
    const rootIdx = getNoteIndexByName(root);
    map[root] = intervals.map(semi => getNoteNameByIndex(rootIdx + semi, acc));
  });
  return map;
};

// Comprehensive chord definitions from original app.js
export const chordDefinitions = {
  'major': {
    intervals: [0, 4, 7],
    name: 'Major',
    notes: {
      'C': ['C', 'E', 'G'],
      'Db': ['Db', 'F', 'Ab'],
      'D': ['D', 'F#', 'A'],
      'Eb': ['Eb', 'G', 'Bb'],
      'E': ['E', 'G#', 'B'],
      'F': ['F', 'A', 'C'],
      'F#': ['F#', 'A#', 'C#'],
      'G': ['G', 'B', 'D'],
      'Ab': ['Ab', 'C', 'Eb'],
      'A': ['A', 'C#', 'E'],
      'Bb': ['Bb', 'D', 'F'],
      'B': ['B', 'D#', 'F#']
    }
  },
  'minor': {
    intervals: [0, 3, 7],
    name: 'Minor',
    notes: {
      'C': ['C', 'Eb', 'G'],
      'Db': ['Db', 'E', 'Ab'],
      'D': ['D', 'F', 'A'],
      'Eb': ['Eb', 'Gb', 'Bb'],
      'E': ['E', 'G', 'B'],
      'F': ['F', 'Ab', 'C'],
      'F#': ['F#', 'A', 'C#'],
      'G': ['G', 'Bb', 'D'],
      'Ab': ['Ab', 'B', 'Eb'],
      'A': ['A', 'C', 'E'],
      'Bb': ['Bb', 'Db', 'F'],
      'B': ['B', 'D', 'F#']
    }
  },
  '7': {
    intervals: [0, 4, 7, 10],
    name: 'Dominant 7th',
    notes: {
      'C': ['C', 'E', 'G', 'Bb'],
      'Db': ['Db', 'F', 'Ab', 'B'],
      'D': ['D', 'F#', 'A', 'C'],
      'Eb': ['Eb', 'G', 'Bb', 'Db'],
      'E': ['E', 'G#', 'B', 'D'],
      'F': ['F', 'A', 'C', 'Eb'],
      'F#': ['F#', 'A#', 'C#', 'E'],
      'G': ['G', 'B', 'D', 'F'],
      'Ab': ['Ab', 'C', 'Eb', 'Gb'],
      'A': ['A', 'C#', 'E', 'G'],
      'Bb': ['Bb', 'D', 'F', 'Ab'],
      'B': ['B', 'D#', 'F#', 'A']
    }
  },
  'm7': {
    intervals: [0, 3, 7, 10],
    name: 'Minor 7th',
    notes: {
      'C': ['C', 'Eb', 'G', 'Bb'],
      'Db': ['Db', 'E', 'Ab', 'B'],
      'D': ['D', 'F', 'A', 'C'],
      'Eb': ['Eb', 'Gb', 'Bb', 'Db'],
      'E': ['E', 'G', 'B', 'D'],
      'F': ['F', 'Ab', 'C', 'Eb'],
      'F#': ['F#', 'A', 'C#', 'E'],
      'G': ['G', 'Bb', 'D', 'F'],
      'Ab': ['Ab', 'B', 'Eb', 'Gb'],
      'A': ['A', 'C', 'E', 'G'],
      'Bb': ['Bb', 'Db', 'F', 'Ab'],
      'B': ['B', 'D', 'F#', 'A']
    }
  },
  'maj7': {
    intervals: [0, 4, 7, 11],
    name: 'Major 7th',
    notes: {
      'C': ['C', 'E', 'G', 'B'],
      'Db': ['Db', 'F', 'Ab', 'C'],
      'D': ['D', 'F#', 'A', 'C#'],
      'Eb': ['Eb', 'G', 'Bb', 'D'],
      'E': ['E', 'G#', 'B', 'D#'],
      'F': ['F', 'A', 'C', 'E'],
      'F#': ['F#', 'A#', 'C#', 'F'],
      'G': ['G', 'B', 'D', 'F#'],
      'Ab': ['Ab', 'C', 'Eb', 'G'],
      'A': ['A', 'C#', 'E', 'G#'],
      'Bb': ['Bb', 'D', 'F', 'A'],
      'B': ['B', 'D#', 'F#', 'A#']
    }
  },
  'sus2': {
    intervals: [0, 2, 7],
    name: 'Sus2',
    notes: {
      'C': ['C', 'D', 'G'],
      'Db': ['Db', 'Eb', 'Ab'],
      'D': ['D', 'E', 'A'],
      'Eb': ['Eb', 'F', 'Bb'],
      'E': ['E', 'F#', 'B'],
      'F': ['F', 'G', 'C'],
      'F#': ['F#', 'G#', 'C#'],
      'G': ['G', 'A', 'D'],
      'Ab': ['Ab', 'Bb', 'Eb'],
      'A': ['A', 'B', 'E'],
      'Bb': ['Bb', 'C', 'F'],
      'B': ['B', 'C#', 'F#']
    }
  },
  'sus4': {
    intervals: [0, 5, 7],
    name: 'Sus4',
    notes: {
      'C': ['C', 'F', 'G'],
      'Db': ['Db', 'Gb', 'Ab'],
      'D': ['D', 'G', 'A'],
      'Eb': ['Eb', 'Ab', 'Bb'],
      'E': ['E', 'A', 'B'],
      'F': ['F', 'Bb', 'C'],
      'F#': ['F#', 'B', 'C#'],
      'G': ['G', 'C', 'D'],
      'Ab': ['Ab', 'Db', 'Eb'],
      'A': ['A', 'D', 'E'],
      'Bb': ['Bb', 'Eb', 'F'],
      'B': ['B', 'E', 'F#']
    }
  },
  'dim': {
    intervals: [0, 3, 6],
    name: 'Diminished',
    notes: {
      'C': ['C', 'Eb', 'Gb'],
      'Db': ['Db', 'E', 'G'],
      'D': ['D', 'F', 'Ab'],
      'Eb': ['Eb', 'Gb', 'A'],
      'E': ['E', 'G', 'Bb'],
      'F': ['F', 'Ab', 'B'],
      'F#': ['F#', 'A', 'C'],
      'G': ['G', 'Bb', 'Db'],
      'Ab': ['Ab', 'B', 'D'],
      'A': ['A', 'C', 'Eb'],
      'Bb': ['Bb', 'Db', 'E'],
      'B': ['B', 'D', 'F']
    }
  },
  'aug': {
    intervals: [0, 4, 8],
    name: 'Augmented',
    notes: {
      'C': ['C', 'E', 'G#'],
      'Db': ['Db', 'F', 'A'],
      'D': ['D', 'F#', 'A#'],
      'Eb': ['Eb', 'G', 'B'],
      'E': ['E', 'G#', 'C'],
      'F': ['F', 'A', 'C#'],
      'F#': ['F#', 'A#', 'D'],
      'G': ['G', 'B', 'D#'],
      'Ab': ['Ab', 'C', 'E'],
      'A': ['A', 'C#', 'F'],
      'Bb': ['Bb', 'D', 'F#'],
      'B': ['B', 'D#', 'G']
    }
  },
  '5': {
    intervals: [0, 7],
    name: 'Power Chord',
    notes: {
      'C': ['C', 'G'],
      'Db': ['Db', 'Ab'],
      'D': ['D', 'A'],
      'Eb': ['Eb', 'Bb'],
      'E': ['E', 'B'],
      'F': ['F', 'C'],
      'F#': ['F#', 'C#'],
      'G': ['G', 'D'],
      'Ab': ['Ab', 'Eb'],
      'A': ['A', 'E'],
      'Bb': ['Bb', 'F'],
      'B': ['B', 'F#']
    }
  },
  'add9': {
    intervals: [0, 4, 7, 14],
    name: 'Add9',
    notes: {
      'C': ['C', 'E', 'G', 'D'],
      'Db': ['Db', 'F', 'Ab', 'Eb'],
      'D': ['D', 'F#', 'A', 'E'],
      'Eb': ['Eb', 'G', 'Bb', 'F'],
      'E': ['E', 'G#', 'B', 'F#'],
      'F': ['F', 'A', 'C', 'G'],
      'F#': ['F#', 'A#', 'C#', 'G#'],
      'G': ['G', 'B', 'D', 'A'],
      'Ab': ['Ab', 'C', 'Eb', 'Bb'],
      'A': ['A', 'C#', 'E', 'B'],
      'Bb': ['Bb', 'D', 'F', 'C'],
      'B': ['B', 'D#', 'F#', 'C#']
    }
  },
  'm7b5': {
    intervals: [0, 3, 6, 10],
    name: 'Minor 7b5',
    notes: {
      'C': ['C', 'Eb', 'Gb', 'Bb'],
      'Db': ['Db', 'E', 'G', 'B'],
      'D': ['D', 'F', 'Ab', 'C'],
      'Eb': ['Eb', 'Gb', 'A', 'Db'],
      'E': ['E', 'G', 'Bb', 'D'],
      'F': ['F', 'Ab', 'B', 'Eb'],
      'F#': ['F#', 'A', 'C', 'E'],
      'G': ['G', 'Bb', 'Db', 'F'],
      'Ab': ['Ab', 'B', 'D', 'Gb'],
      'A': ['A', 'C', 'Eb', 'G'],
      'Bb': ['Bb', 'Db', 'E', 'Ab'],
      'B': ['B', 'D', 'F', 'A']
    }
  },
  '6': {
    intervals: [0, 4, 7, 9],
    name: '6th',
    notes: {
      'C': ['C', 'E', 'G', 'A'],
      'Db': ['Db', 'F', 'Ab', 'Bb'],
      'D': ['D', 'F#', 'A', 'B'],
      'Eb': ['Eb', 'G', 'Bb', 'C'],
      'E': ['E', 'G#', 'B', 'C#'],
      'F': ['F', 'A', 'C', 'D'],
      'F#': ['F#', 'A#', 'C#', 'D#'],
      'G': ['G', 'B', 'D', 'E'],
      'Ab': ['Ab', 'C', 'Eb', 'F'],
      'A': ['A', 'C#', 'E', 'F#'],
      'Bb': ['Bb', 'D', 'F', 'G'],
      'B': ['B', 'D#', 'F#', 'G#']
    }
  },
  'm6': {
    intervals: [0, 3, 7, 9],
    name: 'Minor 6th',
    notes: {
      'C': ['C', 'Eb', 'G', 'A'],
      'Db': ['Db', 'E', 'Ab', 'Bb'],
      'D': ['D', 'F', 'A', 'B'],
      'Eb': ['Eb', 'Gb', 'Bb', 'C'],
      'E': ['E', 'G', 'B', 'C#'],
      'F': ['F', 'Ab', 'C', 'D'],
      'F#': ['F#', 'A', 'C#', 'D#'],
      'G': ['G', 'Bb', 'D', 'E'],
      'Ab': ['Ab', 'B', 'Eb', 'F'],
      'A': ['A', 'C', 'E', 'F#'],
      'Bb': ['Bb', 'Db', 'F', 'G'],
      'B': ['B', 'D', 'F#', 'G#']
    }
  },
  'dim7': {
    intervals: [0, 3, 6, 9],
    name: 'Diminished 7th',
    notes: {
      'C': ['C', 'Eb', 'Gb', 'A'],
      'Db': ['Db', 'E', 'G', 'Bb'],
      'D': ['D', 'F', 'Ab', 'B'],
      'Eb': ['Eb', 'Gb', 'A', 'C'],
      'E': ['E', 'G', 'Bb', 'Db'],
      'F': ['F', 'Ab', 'B', 'D'],
      'F#': ['F#', 'A', 'C', 'Eb'],
      'G': ['G', 'Bb', 'Db', 'E'],
      'Ab': ['Ab', 'B', 'D', 'F'],
      'A': ['A', 'C', 'Eb', 'Gb'],
      'Bb': ['Bb', 'Db', 'E', 'G'],
      'B': ['B', 'D', 'F', 'Ab']
    }
  },
  '9': {
    intervals: [0, 4, 7, 10, 14],
    name: '9th',
    notes: {
      'C': ['C', 'E', 'G', 'Bb', 'D'],
      'Db': ['Db', 'F', 'Ab', 'B', 'Eb'],
      'D': ['D', 'F#', 'A', 'C', 'E'],
      'Eb': ['Eb', 'G', 'Bb', 'Db', 'F'],
      'E': ['E', 'G#', 'B', 'D', 'F#'],
      'F': ['F', 'A', 'C', 'Eb', 'G'],
      'F#': ['F#', 'A#', 'C#', 'E', 'G#'],
      'G': ['G', 'B', 'D', 'F', 'A'],
      'Ab': ['Ab', 'C', 'Eb', 'Gb', 'Bb'],
      'A': ['A', 'C#', 'E', 'G', 'B'],
      'Bb': ['Bb', 'D', 'F', 'Ab', 'C'],
      'B': ['B', 'D#', 'F#', 'A', 'C#']
    }
  },
  'm9': {
    intervals: [0, 3, 7, 10, 14],
    name: 'Minor 9th',
    notes: {
      'C': ['C', 'Eb', 'G', 'Bb', 'D'],
      'Db': ['Db', 'E', 'Ab', 'B', 'Eb'],
      'D': ['D', 'F', 'A', 'C', 'E'],
      'Eb': ['Eb', 'Gb', 'Bb', 'Db', 'F'],
      'E': ['E', 'G', 'B', 'D', 'F#'],
      'F': ['F', 'Ab', 'C', 'Eb', 'G'],
      'F#': ['F#', 'A', 'C#', 'E', 'G#'],
      'G': ['G', 'Bb', 'D', 'F', 'A'],
      'Ab': ['Ab', 'B', 'Eb', 'Gb', 'Bb'],
      'A': ['A', 'C', 'E', 'G', 'B'],
      'Bb': ['Bb', 'Db', 'F', 'Ab', 'C'],
      'B': ['B', 'D', 'F#', 'A', 'C#']
    }
  },
  'maj9': {
    intervals: [0, 4, 7, 11, 14],
    name: 'Major 9th',
    notes: {
      'C': ['C', 'E', 'G', 'B', 'D'],
      'Db': ['Db', 'F', 'Ab', 'C', 'Eb'],
      'D': ['D', 'F#', 'A', 'C#', 'E'],
      'Eb': ['Eb', 'G', 'Bb', 'D', 'F'],
      'E': ['E', 'G#', 'B', 'D#', 'F#'],
      'F': ['F', 'A', 'C', 'E', 'G'],
      'F#': ['F#', 'A#', 'C#', 'F', 'G#'],
      'G': ['G', 'B', 'D', 'F#', 'A'],
      'Ab': ['Ab', 'C', 'Eb', 'G', 'Bb'],
      'A': ['A', 'C#', 'E', 'G#', 'B'],
      'Bb': ['Bb', 'D', 'F', 'A', 'C'],
      'B': ['B', 'D#', 'F#', 'A#', 'C#']
    }
  },
  '11': {
    intervals: [0, 4, 7, 10, 14, 17],
    name: '11th',
    notes: {
      'C': ['C', 'E', 'G', 'Bb', 'D', 'F'],
      'Db': ['Db', 'F', 'Ab', 'B', 'Eb', 'Gb'],
      'D': ['D', 'F#', 'A', 'C', 'E', 'G'],
      'Eb': ['Eb', 'G', 'Bb', 'Db', 'F', 'Ab'],
      'E': ['E', 'G#', 'B', 'D', 'F#', 'A'],
      'F': ['F', 'A', 'C', 'Eb', 'G', 'Bb'],
      'F#': ['F#', 'A#', 'C#', 'E', 'G#', 'B'],
      'G': ['G', 'B', 'D', 'F', 'A', 'C'],
      'Ab': ['Ab', 'C', 'Eb', 'Gb', 'Bb', 'Db'],
      'A': ['A', 'C#', 'E', 'G', 'B', 'D'],
      'Bb': ['Bb', 'D', 'F', 'Ab', 'C', 'Eb'],
      'B': ['B', 'D#', 'F#', 'A', 'C#', 'E']
    }
  },
  'm11': {
    intervals: [0, 3, 7, 10, 14, 17],
    name: 'Minor 11th',
    notes: {
      'C': ['C', 'Eb', 'G', 'Bb', 'D', 'F'],
      'Db': ['Db', 'E', 'Ab', 'B', 'Eb', 'Gb'],
      'D': ['D', 'F', 'A', 'C', 'E', 'G'],
      'Eb': ['Eb', 'Gb', 'Bb', 'Db', 'F', 'Ab'],
      'E': ['E', 'G', 'B', 'D', 'F#', 'A'],
      'F': ['F', 'Ab', 'C', 'Eb', 'G', 'Bb'],
      'F#': ['F#', 'A', 'C#', 'E', 'G#', 'B'],
      'G': ['G', 'Bb', 'D', 'F', 'A', 'C'],
      'Ab': ['Ab', 'B', 'Eb', 'Gb', 'Bb', 'Db'],
      'A': ['A', 'C', 'E', 'G', 'B', 'D'],
      'Bb': ['Bb', 'Db', 'F', 'Ab', 'C', 'Eb'],
      'B': ['B', 'D', 'F#', 'A', 'C#', 'E']
    }
  },
  '13': {
    intervals: [0, 4, 7, 10, 14, 21],
    name: '13th',
    notes: {
      'C': ['C', 'E', 'G', 'Bb', 'D', 'A'],
      'Db': ['Db', 'F', 'Ab', 'B', 'Eb', 'Bb'],
      'D': ['D', 'F#', 'A', 'C', 'E', 'B'],
      'Eb': ['Eb', 'G', 'Bb', 'Db', 'F', 'C'],
      'E': ['E', 'G#', 'B', 'D', 'F#', 'C#'],
      'F': ['F', 'A', 'C', 'Eb', 'G', 'D'],
      'F#': ['F#', 'A#', 'C#', 'E', 'G#', 'D#'],
      'G': ['G', 'B', 'D', 'F', 'A', 'E'],
      'Ab': ['Ab', 'C', 'Eb', 'Gb', 'Bb', 'F'],
      'A': ['A', 'C#', 'E', 'G', 'B', 'F#'],
      'Bb': ['Bb', 'D', 'F', 'Ab', 'C', 'G'],
      'B': ['B', 'D#', 'F#', 'A', 'C#', 'G#']
    }
  },
  'm13': {
    intervals: [0, 3, 7, 10, 14, 21],
    name: 'Minor 13th',
    notes: {
      'C': ['C', 'Eb', 'G', 'Bb', 'D', 'A'],
      'Db': ['Db', 'E', 'Ab', 'B', 'Eb', 'Bb'],
      'D': ['D', 'F', 'A', 'C', 'E', 'B'],
      'Eb': ['Eb', 'Gb', 'Bb', 'Db', 'F', 'C'],
      'E': ['E', 'G', 'B', 'D', 'F#', 'C#'],
      'F': ['F', 'Ab', 'C', 'Eb', 'G', 'D'],
      'F#': ['F#', 'A', 'C#', 'E', 'G#', 'D#'],
      'G': ['G', 'Bb', 'D', 'F', 'A', 'E'],
      'Ab': ['Ab', 'B', 'Eb', 'Gb', 'Bb', 'F'],
      'A': ['A', 'C', 'E', 'G', 'B', 'F#'],
      'Bb': ['Bb', 'Db', 'F', 'Ab', 'C', 'G'],
      'B': ['B', 'D', 'F#', 'A', 'C#', 'G#']
    }
  },
  '7b9': {
    intervals: [0, 4, 7, 10, 13],
    name: '7b9',
    notes: {
      'C': ['C', 'E', 'G', 'Bb', 'Db'],
      'Db': ['Db', 'F', 'Ab', 'B', 'D'],
      'D': ['D', 'F#', 'A', 'C', 'Eb'],
      'Eb': ['Eb', 'G', 'Bb', 'Db', 'E'],
      'E': ['E', 'G#', 'B', 'D', 'F'],
      'F': ['F', 'A', 'C', 'Eb', 'Gb'],
      'F#': ['F#', 'A#', 'C#', 'E', 'G'],
      'G': ['G', 'B', 'D', 'F', 'Ab'],
      'Ab': ['Ab', 'C', 'Eb', 'Gb', 'A'],
      'A': ['A', 'C#', 'E', 'G', 'Bb'],
      'Bb': ['Bb', 'D', 'F', 'Ab', 'B'],
      'B': ['B', 'D#', 'F#', 'A', 'C']
    }
  },
  '7#9': {
    intervals: [0, 4, 7, 10, 15],
    name: '7#9',
    notes: {
      'C': ['C', 'E', 'G', 'Bb', 'D#'],
      'Db': ['Db', 'F', 'Ab', 'B', 'E'],
      'D': ['D', 'F#', 'A', 'C', 'F'],
      'Eb': ['Eb', 'G', 'Bb', 'Db', 'F#'],
      'E': ['E', 'G#', 'B', 'D', 'G'],
      'F': ['F', 'A', 'C', 'Eb', 'G#'],
      'F#': ['F#', 'A#', 'C#', 'E', 'A'],
      'G': ['G', 'B', 'D', 'F', 'A#'],
      'Ab': ['Ab', 'C', 'Eb', 'Gb', 'B'],
      'A': ['A', 'C#', 'E', 'G', 'C'],
      'Bb': ['Bb', 'D', 'F', 'Ab', 'C#'],
      'B': ['B', 'D#', 'F#', 'A', 'D']
    }
  },
  '7#11': {
    intervals: [0, 4, 7, 10, 18],
    name: '7#11',
    notes: {
      'C': ['C', 'E', 'G', 'Bb', 'F#'],
      'Db': ['Db', 'F', 'Ab', 'B', 'G'],
      'D': ['D', 'F#', 'A', 'C', 'G#'],
      'Eb': ['Eb', 'G', 'Bb', 'Db', 'A'],
      'E': ['E', 'G#', 'B', 'D', 'A#'],
      'F': ['F', 'A', 'C', 'Eb', 'B'],
      'F#': ['F#', 'A#', 'C#', 'E', 'C'],
      'G': ['G', 'B', 'D', 'F', 'C#'],
      'Ab': ['Ab', 'C', 'Eb', 'Gb', 'D'],
      'A': ['A', 'C#', 'E', 'G', 'D#'],
      'Bb': ['Bb', 'D', 'F', 'Ab', 'E'],
      'B': ['B', 'D#', 'F#', 'A', 'F']
    }
  },
  '7b13': {
    intervals: [0, 4, 7, 10, 20],
    name: '7b13',
    notes: {
      'C': ['C', 'E', 'G', 'Bb', 'Ab'],
      'Db': ['Db', 'F', 'Ab', 'B', 'A'],
      'D': ['D', 'F#', 'A', 'C', 'Bb'],
      'Eb': ['Eb', 'G', 'Bb', 'Db', 'B'],
      'E': ['E', 'G#', 'B', 'D', 'C'],
      'F': ['F', 'A', 'C', 'Eb', 'C#'],
      'F#': ['F#', 'A#', 'C#', 'E', 'D'],
      'G': ['G', 'B', 'D', 'F', 'D#'],
      'Ab': ['Ab', 'C', 'Eb', 'Gb', 'E'],
      'A': ['A', 'C#', 'E', 'G', 'F'],
      'Bb': ['Bb', 'D', 'F', 'Ab', 'F#'],
      'B': ['B', 'D#', 'F#', 'A', 'G']
    }
  },
  'maj7#11': {
    intervals: [0, 4, 7, 11, 18],
    name: 'Major 7#11',
    notes: {
      'C': ['C', 'E', 'G', 'B', 'F#'],
      'Db': ['Db', 'F', 'Ab', 'C', 'G'],
      'D': ['D', 'F#', 'A', 'C#', 'G#'],
      'Eb': ['Eb', 'G', 'Bb', 'D', 'A'],
      'E': ['E', 'G#', 'B', 'D#', 'A#'],
      'F': ['F', 'A', 'C', 'E', 'B'],
      'F#': ['F#', 'A#', 'C#', 'F', 'C'],
      'G': ['G', 'B', 'D', 'F#', 'C#'],
      'Ab': ['Ab', 'C', 'Eb', 'G', 'D'],
      'A': ['A', 'C#', 'E', 'G#', 'D#'],
      'Bb': ['Bb', 'D', 'F', 'A', 'E'],
      'B': ['B', 'D#', 'F#', 'A#', 'F']
    }
  },
  // Additional chord types from original app.js
  'add11': {
    intervals: [0, 4, 7, 17],
    name: 'Add11',
    notes: buildMapForIntervals([0, 4, 7, 17], 'flats')
  },
  'add13': {
    intervals: [0, 4, 7, 21],
    name: 'Add13',
    notes: buildMapForIntervals([0, 4, 7, 21], 'flats')
  },
  '6add9': {
    intervals: [0, 4, 7, 9, 14],
    name: '6add9',
    notes: buildMapForIntervals([0, 4, 7, 9, 14], 'flats')
  },
  'm6add9': {
    intervals: [0, 3, 7, 9, 14],
    name: 'Minor 6add9',
    notes: buildMapForIntervals([0, 3, 7, 9, 14], 'flats')
  },
  '7sus4': {
    intervals: [0, 5, 7, 10],
    name: '7sus4',
    notes: buildMapForIntervals([0, 5, 7, 10], 'flats')
  },
  '9sus4': {
    intervals: [0, 5, 7, 10, 14],
    name: '9sus4',
    notes: buildMapForIntervals([0, 5, 7, 10, 14], 'flats')
  }
};

// Scale definitions
export const scaleDefinitions = {
  'major': {
    intervals: [0, 2, 4, 5, 7, 9, 11],
    name: 'Major',
    notes: {
      'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
      'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
      'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
      'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
      'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
      'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
      'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
      'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
      'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
      'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
      'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
    }
  },
  'minor': {
    intervals: [0, 2, 3, 5, 7, 8, 10],
    name: 'Minor',
    notes: {
      'C': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
      'Db': ['Db', 'Eb', 'E', 'Gb', 'Ab', 'A', 'B'],
      'D': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
      'Eb': ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'B', 'Db'],
      'E': ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
      'F': ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
      'F#': ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
      'G': ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
      'Ab': ['Ab', 'Bb', 'B', 'Db', 'Eb', 'E', 'Gb'],
      'A': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      'Bb': ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'],
      'B': ['B', 'C#', 'D', 'E', 'F#', 'G', 'A']
    }
  },
  'pentatonicMajor': {
    intervals: [0, 2, 4, 7, 9],
    name: 'Major Pentatonic',
    notes: {
      'C': ['C', 'D', 'E', 'G', 'A'],
      'Db': ['Db', 'Eb', 'F', 'Ab', 'Bb'],
      'D': ['D', 'E', 'F#', 'A', 'B'],
      'Eb': ['Eb', 'F', 'G', 'Bb', 'C'],
      'E': ['E', 'F#', 'G#', 'B', 'C#'],
      'F': ['F', 'G', 'A', 'C', 'D'],
      'F#': ['F#', 'G#', 'A#', 'C#', 'D#'],
      'G': ['G', 'A', 'B', 'D', 'E'],
      'Ab': ['Ab', 'Bb', 'C', 'Eb', 'F'],
      'A': ['A', 'B', 'C#', 'E', 'F#'],
      'Bb': ['Bb', 'C', 'D', 'F', 'G'],
      'B': ['B', 'C#', 'D#', 'F#', 'G#']
    }
  },
  'pentatonicMinor': {
    intervals: [0, 3, 5, 7, 10],
    name: 'Minor Pentatonic',
    notes: {
      'C': ['C', 'Eb', 'F', 'G', 'Bb'],
      'Db': ['Db', 'E', 'Gb', 'Ab', 'B'],
      'D': ['D', 'F', 'G', 'A', 'C'],
      'Eb': ['Eb', 'Gb', 'Ab', 'Bb', 'Db'],
      'E': ['E', 'G', 'A', 'B', 'D'],
      'F': ['F', 'Ab', 'Bb', 'C', 'Eb'],
      'F#': ['F#', 'A', 'B', 'C#', 'E'],
      'G': ['G', 'Bb', 'C', 'D', 'F'],
      'Ab': ['Ab', 'B', 'Db', 'Eb', 'Gb'],
      'A': ['A', 'C', 'D', 'E', 'G'],
      'Bb': ['Bb', 'Db', 'Eb', 'F', 'Ab'],
      'B': ['B', 'D', 'E', 'F#', 'A']
    }
  },
  'blues': {
    intervals: [0, 3, 5, 6, 7, 10],
    name: 'Blues',
    notes: {
      'C': ['C', 'Eb', 'F', 'Gb', 'G', 'Bb'],
      'Db': ['Db', 'E', 'Gb', 'G', 'Ab', 'B'],
      'D': ['D', 'F', 'G', 'Ab', 'A', 'C'],
      'Eb': ['Eb', 'Gb', 'Ab', 'A', 'Bb', 'Db'],
      'E': ['E', 'G', 'A', 'Bb', 'B', 'D'],
      'F': ['F', 'Ab', 'Bb', 'B', 'C', 'Eb'],
      'F#': ['F#', 'A', 'B', 'C', 'C#', 'E'],
      'G': ['G', 'Bb', 'C', 'Db', 'D', 'F'],
      'Ab': ['Ab', 'B', 'Db', 'D', 'Eb', 'Gb'],
      'A': ['A', 'C', 'D', 'Eb', 'E', 'G'],
      'Bb': ['Bb', 'Db', 'Eb', 'E', 'F', 'Ab'],
      'B': ['B', 'D', 'E', 'F', 'F#', 'A']
    }
  },
  'modes': {
    intervals: [0, 2, 4, 5, 7, 9, 11], // Ionian (Major)
    name: 'Modes',
    notes: {
      'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
      'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
      'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
      'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
      'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
      'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
      'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
      'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
      'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
      'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
      'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
    }
  }
};

// Helper functions
export const toPreferredAccidental = (root, acc) => {
  return acc === 'sharps' ? (enharmonicToSharps[root] || root) : (enharmonicToFlats[root] || root);
};

export const getSelectedChordMap = (chordQuality, accidentals) => {
  const definition = chordDefinitions[chordQuality];
  if (!definition) return chordDefinitions['major'].notes;
  
  // Convert to preferred accidentals
  const map = {};
  Object.keys(definition.notes).forEach(root => {
    const convertedRoot = toPreferredAccidental(root, accidentals);
    map[convertedRoot] = definition.notes[root].map(note => 
      toPreferredAccidental(note, accidentals)
    );
  });
  return map;
};

export const getSelectedScaleMap = (scaleFamily, accidentals) => {
  const definition = scaleDefinitions[scaleFamily];
  if (!definition) return scaleDefinitions['major'].notes;
  
  // Convert to preferred accidentals
  const map = {};
  Object.keys(definition.notes).forEach(root => {
    const convertedRoot = toPreferredAccidental(root, accidentals);
    map[convertedRoot] = definition.notes[root].map(note => 
      toPreferredAccidental(note, accidentals)
    );
  });
  return map;
};

// Critical missing function from original app.js
export const resolveRootInMap = (root, map) => {
  if (map[root]) return root;
  if (map[enharmonicToFlats[root]]) return enharmonicToFlats[root];
  if (map[enharmonicToSharps[root]]) return enharmonicToSharps[root];
  return undefined;
};