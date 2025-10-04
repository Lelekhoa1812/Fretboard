# Fretboard

Interactive fretboard explorer for guitar, bass (4/5), and ukulele. Visualize notes, chords, and scales, filter by string groups and fret ranges, and learn with an animated, responsive UI.

## Features

- Notes: show single or multiple note positions across the fretboard.
- Chords: major, minor, 7, m7, maj7, sus2, sus4, add9, m7b5, 6, m6, dim, aug, dim7, 9, m9, maj9, 11, 13.
- Scales: major, minor, modes (preview), pentatonic major/minor, blues (A/E examples).
- Instruments: Guitar, Bass (4/5), Ukulele with preset tunings.
- Accidental toggle: flats/sharps.
- Fretboard options: number of frets, show-all-notes, show-multiple-notes.
- Voicing filters: limit chord visualizations by string set and fret range.

## Using the app

1. Select an instrument and choose Search by: Notes, Chords, or Scales.
2. Notes mode: hover note names to highlight positions. Enable "Show multiple notes" to reveal all instances on hover.
3. Chords mode: pick a chord quality, then hover a root name to view chord tones. Adjust Strings and Fret range to focus on specific voicings.
4. Scales mode: pick a scale set and hover a root to view scale tones.

## Development

- Tech: vanilla HTML/CSS/JS.
- Entry files: `index.html`, `styles.css`, `app.js`.
- Data definitions: chord and scale tone maps live in `app.js`.

## Roadmap

- Add complete mode sets for all roots and modes (Ionian through Locrian).
- Expand blues and pentatonic to all roots automatically.
- Add playback (WebAudio) and metronome for ear training.
- Save/share presets and last-used settings.

## Demo

Live: https://lelekhoa1812.github.io/Fretboard/legacy/
