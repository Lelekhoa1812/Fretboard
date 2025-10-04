import { nvidiaAPI } from './nvidia-api.js';

export class MusicGenerator {
  constructor() {
    this.audioContext = null;
    this.generators = new Map();
    this.backingTracks = new Map();
    this.isPlaying = false;
    this.currentTrack = null;
  }

  // Initialize audio context
  async initialize() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log('🎵 Music Generator: Initialized successfully');
      return true;
    } catch (error) {
      console.error('🎵 Music Generator: Initialization failed:', error);
      return false;
    }
  }

  // Generate AI-powered backing track
  async generateBackingTrack(chordProgression, options = {}) {
    const {
      style = 'pop',
      tempo = 120,
      key = 'C',
      timeSignature = '4/4',
      duration = 60, // seconds
      instruments = ['drums', 'bass', 'piano'],
      complexity = 'medium'
    } = options;

    const prompt = `Generate a detailed backing track arrangement for this chord progression: ${chordProgression.join(' - ')}

    Style: ${style}
    Tempo: ${tempo} BPM
    Key: ${key}
    Time Signature: ${timeSignature}
    Duration: ${duration} seconds
    Instruments: ${instruments.join(', ')}
    Complexity: ${complexity}

    Provide a detailed arrangement including:
    1. Drum pattern (kick, snare, hi-hat)
    2. Bass line with specific notes
    3. Chord voicings for piano/guitar
    4. Melodic elements
    5. Dynamic changes
    6. Fill patterns
    7. Intro and outro suggestions

    Format the response as a structured arrangement that can be used to generate audio.`;

    try {
      const result = await nvidiaAPI.callNVIDIAAPI(prompt, {
        taskType: 'planning',
        complexity: 'high',
        temperature: 0.8
      });

      const arrangement = this.parseArrangement(result.response);
      const backingTrack = await this.createBackingTrack(arrangement, options);
      
      console.log('🎵 Music Generator: Generated backing track');
      return backingTrack;

    } catch (error) {
      console.error('🎵 Music Generator: Failed to generate backing track:', error);
      return this.createFallbackTrack(chordProgression, options);
    }
  }

  // Parse AI-generated arrangement
  parseArrangement(aiResponse) {
    // This would parse the AI response into a structured arrangement
    // For now, we'll create a basic structure
    return {
      drums: this.generateDrumPattern(),
      bass: this.generateBassLine(),
      chords: this.generateChordVoicings(),
      melody: this.generateMelody(),
      structure: {
        intro: 4,
        verse: 16,
        chorus: 8,
        bridge: 8,
        outro: 4
      }
    };
  }

  // Create backing track from arrangement
  async createBackingTrack(arrangement, options) {
    if (!this.audioContext) {
      await this.initialize();
    }

    const track = {
      id: `track_${Date.now()}`,
      arrangement,
      options,
      duration: options.duration || 60,
      createdAt: new Date(),
      audioBuffer: null
    };

    // Generate audio buffer
    track.audioBuffer = await this.generateAudioBuffer(arrangement, options);
    
    this.backingTracks.set(track.id, track);
    return track;
  }

  // Generate audio buffer from arrangement
  async generateAudioBuffer(arrangement, options) {
    const sampleRate = this.audioContext.sampleRate;
    const duration = options.duration || 60;
    const bufferLength = sampleRate * duration;
    const audioBuffer = this.audioContext.createBuffer(2, bufferLength, sampleRate);

    // Generate different instrument tracks
    const drumTrack = this.generateDrumAudio(arrangement.drums, options);
    const bassTrack = this.generateBassAudio(arrangement.bass, options);
    const chordTrack = this.generateChordAudio(arrangement.chords, options);

    // Mix tracks together
    for (let channel = 0; channel < 2; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
      
      for (let i = 0; i < bufferLength; i++) {
        let sample = 0;
        
        // Add drum track
        if (drumTrack[i]) sample += drumTrack[i] * 0.3;
        
        // Add bass track
        if (bassTrack[i]) sample += bassTrack[i] * 0.4;
        
        // Add chord track
        if (chordTrack[i]) sample += chordTrack[i] * 0.3;
        
        // Apply simple compression
        sample = Math.tanh(sample * 0.8);
        
        channelData[i] = sample;
      }
    }

    return audioBuffer;
  }

  // Generate drum pattern
  generateDrumPattern() {
    return {
      kick: [1, 0, 0, 0, 1, 0, 0, 0], // Basic kick pattern
      snare: [0, 0, 1, 0, 0, 0, 1, 0], // Basic snare pattern
      hihat: [1, 1, 1, 1, 1, 1, 1, 1]  // Basic hi-hat pattern
    };
  }

  // Generate bass line
  generateBassLine() {
    return {
      notes: ['C2', 'E2', 'G2', 'A2'], // Basic bass line
      rhythm: [1, 1, 1, 1] // Quarter notes
    };
  }

  // Generate chord voicings
  generateChordVoicings() {
    return {
      voicings: [
        { chord: 'C', notes: ['C3', 'E3', 'G3', 'C4'] },
        { chord: 'Am', notes: ['A2', 'C3', 'E3', 'A3'] },
        { chord: 'F', notes: ['F2', 'A2', 'C3', 'F3'] },
        { chord: 'G', notes: ['G2', 'B2', 'D3', 'G3'] }
      ]
    };
  }

  // Generate melody
  generateMelody() {
    return {
      notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
      rhythm: [0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 1]
    };
  }

  // Generate drum audio
  generateDrumAudio(drumPattern, options) {
    const sampleRate = this.audioContext.sampleRate;
    const duration = options.duration || 60;
    const bufferLength = sampleRate * duration;
    const audio = new Float32Array(bufferLength);

    const tempo = options.tempo || 120;
    const beatDuration = (60 / tempo) * sampleRate;
    const patternLength = drumPattern.kick.length;

    for (let i = 0; i < bufferLength; i++) {
      const beatIndex = Math.floor(i / beatDuration) % patternLength;
      
      // Generate kick drum
      if (drumPattern.kick[beatIndex]) {
        const kickFreq = 60; // Low frequency for kick
        const kickEnvelope = Math.exp(-i / (sampleRate * 0.1));
        audio[i] += Math.sin(2 * Math.PI * kickFreq * i / sampleRate) * kickEnvelope * 0.3;
      }
      
      // Generate snare drum
      if (drumPattern.snare[beatIndex]) {
        const snareFreq = 200; // Higher frequency for snare
        const snareEnvelope = Math.exp(-i / (sampleRate * 0.05));
        audio[i] += Math.sin(2 * Math.PI * snareFreq * i / sampleRate) * snareEnvelope * 0.2;
      }
      
      // Generate hi-hat
      if (drumPattern.hihat[beatIndex]) {
        const hihatFreq = 8000; // High frequency for hi-hat
        const hihatEnvelope = Math.exp(-i / (sampleRate * 0.01));
        audio[i] += Math.sin(2 * Math.PI * hihatFreq * i / sampleRate) * hihatEnvelope * 0.1;
      }
    }

    return audio;
  }

  // Generate bass audio
  generateBassAudio(bassLine, options) {
    const sampleRate = this.audioContext.sampleRate;
    const duration = options.duration || 60;
    const bufferLength = sampleRate * duration;
    const audio = new Float32Array(bufferLength);

    const tempo = options.tempo || 120;
    const beatDuration = (60 / tempo) * sampleRate;

    for (let i = 0; i < bufferLength; i++) {
      const beatIndex = Math.floor(i / beatDuration) % bassLine.notes.length;
      const note = bassLine.notes[beatIndex];
      const frequency = this.noteToFrequency(note);
      
      if (frequency > 0) {
        const envelope = Math.sin(Math.PI * (i % beatDuration) / beatDuration);
        audio[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * envelope * 0.4;
      }
    }

    return audio;
  }

  // Generate chord audio
  generateChordAudio(chordVoicings, options) {
    const sampleRate = this.audioContext.sampleRate;
    const duration = options.duration || 60;
    const bufferLength = sampleRate * duration;
    const audio = new Float32Array(bufferLength);

    const tempo = options.tempo || 120;
    const beatDuration = (60 / tempo) * sampleRate;
    const chordDuration = beatDuration * 4; // 4 beats per chord

    for (let i = 0; i < bufferLength; i++) {
      const chordIndex = Math.floor(i / chordDuration) % chordVoicings.voicings.length;
      const chord = chordVoicings.voicings[chordIndex];
      
      // Generate chord by adding multiple frequencies
      chord.notes.forEach(note => {
        const frequency = this.noteToFrequency(note);
        if (frequency > 0) {
          const envelope = Math.sin(Math.PI * (i % chordDuration) / chordDuration);
          audio[i] += Math.sin(2 * Math.PI * frequency * i / sampleRate) * envelope * 0.2;
        }
      });
    }

    return audio;
  }

  // Convert note to frequency
  noteToFrequency(note) {
    const noteMap = {
      'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31,
      'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47,
      'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61,
      'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23,
      'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
      'C5': 523.25
    };
    
    return noteMap[note] || 0;
  }

  // Play backing track
  async playBackingTrack(trackId) {
    const track = this.backingTracks.get(trackId);
    if (!track || !track.audioBuffer) {
      console.error('🎵 Music Generator: Track not found or no audio buffer');
      return false;
    }

    if (this.isPlaying) {
      this.stopBackingTrack();
    }

    try {
      const source = this.audioContext.createBufferSource();
      source.buffer = track.audioBuffer;
      source.connect(this.audioContext.destination);
      source.start();

      this.currentTrack = { source, trackId };
      this.isPlaying = true;

      console.log('🎵 Music Generator: Started playing track', trackId);
      return true;

    } catch (error) {
      console.error('🎵 Music Generator: Failed to play track:', error);
      return false;
    }
  }

  // Stop backing track
  stopBackingTrack() {
    if (this.currentTrack && this.currentTrack.source) {
      this.currentTrack.source.stop();
      this.currentTrack = null;
      this.isPlaying = false;
      console.log('🎵 Music Generator: Stopped playing track');
    }
  }

  // Get available backing tracks
  getAvailableTracks() {
    return Array.from(this.backingTracks.values());
  }

  // Create fallback track
  createFallbackTrack(chordProgression, options) {
    const track = {
      id: `fallback_${Date.now()}`,
      arrangement: {
        drums: this.generateDrumPattern(),
        bass: this.generateBassLine(),
        chords: this.generateChordVoicings(),
        melody: this.generateMelody(),
        structure: { intro: 4, verse: 16, chorus: 8, bridge: 8, outro: 4 }
      },
      options,
      duration: options.duration || 60,
      createdAt: new Date(),
      audioBuffer: null
    };

    this.backingTracks.set(track.id, track);
    return track;
  }

  // Generate AI-powered practice exercises
  async generatePracticeExercises(skillLevel, focusArea, duration = 30) {
    const prompt = `Generate personalized guitar practice exercises for a ${skillLevel} level player.

    Focus Area: ${focusArea}
    Duration: ${duration} minutes
    Skill Level: ${skillLevel}

    Create a structured practice session including:
    1. Warm-up exercises (5-10 minutes)
    2. Technique drills (10-15 minutes)
    3. Chord/scale practice (10-15 minutes)
    4. Song practice (10-15 minutes)
    5. Cool-down (5 minutes)

    For each exercise, provide:
    - Specific instructions
    - Tempo recommendations
    - Repetition count
    - Progression tips
    - Common mistakes to avoid

    Make it engaging and progressive for the skill level.`;

    try {
      const result = await nvidiaAPI.callNVIDIAAPI(prompt, {
        taskType: 'planning',
        complexity: 'medium',
        temperature: 0.8
      });

      return result.response;

    } catch (error) {
      console.error('🎵 Music Generator: Failed to generate exercises:', error);
      return this.getFallbackExercises(skillLevel, focusArea, duration);
    }
  }

  // Get fallback exercises
  getFallbackExercises(skillLevel, focusArea, duration) {
    const exercises = {
      beginner: {
        warmup: "Finger exercises and basic stretches (5 minutes)",
        technique: "Basic chord transitions (10 minutes)",
        practice: "Open chord practice (10 minutes)",
        song: "Simple song practice (10 minutes)",
        cooldown: "Review and reflection (5 minutes)"
      },
      intermediate: {
        warmup: "Scale practice and finger exercises (5 minutes)",
        technique: "Barre chord practice (10 minutes)",
        practice: "Scale patterns and arpeggios (10 minutes)",
        song: "Intermediate song practice (10 minutes)",
        cooldown: "Review and plan next session (5 minutes)"
      },
      advanced: {
        warmup: "Advanced finger exercises (5 minutes)",
        technique: "Complex chord progressions (10 minutes)",
        practice: "Advanced scales and modes (10 minutes)",
        song: "Advanced song practice (10 minutes)",
        cooldown: "Review and set new goals (5 minutes)"
      }
    };

    return exercises[skillLevel] || exercises.beginner;
  }

  // Cleanup resources
  cleanup() {
    this.stopBackingTrack();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Export singleton instance
export const musicGenerator = new MusicGenerator();
