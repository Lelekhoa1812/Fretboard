import { nvidiaAPI } from './nvidia-api.js';

export class AudioAnalyzer {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.isRecording = false;
    this.audioData = [];
    this.callbacks = {
      onChordDetected: null,
      onTimingFeedback: null,
      onPitchFeedback: null,
      onTechniqueFeedback: null
    };
  }

  // Initialize audio context and microphone
  async initialize() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.8;

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);

      console.log('🎵 Audio Analyzer: Initialized successfully');
      return true;
    } catch (error) {
      console.error('🎵 Audio Analyzer: Initialization failed:', error);
      return false;
    }
  }

  // Start real-time audio analysis
  startAnalysis() {
    if (!this.analyser) {
      console.error('🎵 Audio Analyzer: Not initialized');
      return;
    }

    this.isRecording = true;
    this.analyzeAudio();
    console.log('🎵 Audio Analyzer: Started real-time analysis');
  }

  // Stop audio analysis
  stopAnalysis() {
    this.isRecording = false;
    console.log('🎵 Audio Analyzer: Stopped analysis');
  }

  // Main audio analysis loop
  analyzeAudio() {
    if (!this.isRecording) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    // Analyze audio data
    this.analyzeFrequencyData(dataArray);
    this.analyzeTiming();
    this.analyzeTechnique();

    // Continue analysis
    requestAnimationFrame(() => this.analyzeAudio());
  }

  // Analyze frequency data for chord detection
  analyzeFrequencyData(dataArray) {
    const frequencies = this.getFrequencies(dataArray);
    const detectedChord = this.detectChord(frequencies);
    
    if (detectedChord && this.callbacks.onChordDetected) {
      this.callbacks.onChordDetected(detectedChord);
    }
  }

  // Get frequency peaks from audio data
  getFrequencies(dataArray) {
    const frequencies = [];
    const sampleRate = this.audioContext.sampleRate;
    const binSize = sampleRate / (this.analyser.fftSize * 2);

    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i] > 128) { // Threshold for significant frequency
        frequencies.push({
          frequency: i * binSize,
          amplitude: dataArray[i]
        });
      }
    }

    return frequencies;
  }

  // Detect chord from frequency analysis
  detectChord(frequencies) {
    // Basic chord detection based on frequency peaks
    // This is a simplified version - in production, you'd use more sophisticated algorithms
    
    const fundamentalFreqs = frequencies
      .filter(f => f.frequency > 80 && f.frequency < 1000)
      .sort((a, b) => b.amplitude - a.amplitude)
      .slice(0, 6);

    if (fundamentalFreqs.length < 3) return null;

    // Map frequencies to notes
    const notes = fundamentalFreqs.map(f => this.frequencyToNote(f.frequency));
    
    // Basic chord recognition
    const chord = this.identifyChord(notes);
    
    return chord ? {
      chord,
      confidence: this.calculateConfidence(fundamentalFreqs),
      timestamp: Date.now()
    } : null;
  }

  // Convert frequency to note
  frequencyToNote(frequency) {
    const A4 = 440;
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const semitone = Math.round(12 * Math.log2(frequency / A4)) + 9;
    const octave = Math.floor(semitone / 12) + 4;
    const noteIndex = ((semitone % 12) + 12) % 12;
    
    return {
      note: noteNames[noteIndex],
      octave,
      frequency
    };
  }

  // Identify chord from notes
  identifyChord(notes) {
    const noteNames = notes.map(n => n.note.replace('#', ''));
    
    // Basic major chord detection
    const majorChords = {
      'C': ['C', 'E', 'G'],
      'D': ['D', 'F#', 'A'],
      'E': ['E', 'G#', 'B'],
      'F': ['F', 'A', 'C'],
      'G': ['G', 'B', 'D'],
      'A': ['A', 'C#', 'E'],
      'B': ['B', 'D#', 'F#']
    };

    for (const [root, chordNotes] of Object.entries(majorChords)) {
      if (chordNotes.every(note => noteNames.includes(note))) {
        return `${root}maj`;
      }
    }

    // Basic minor chord detection
    const minorChords = {
      'Am': ['A', 'C', 'E'],
      'Bm': ['B', 'D', 'F#'],
      'Cm': ['C', 'D#', 'G'],
      'Dm': ['D', 'F', 'A'],
      'Em': ['E', 'G', 'B'],
      'Fm': ['F', 'G#', 'C'],
      'Gm': ['G', 'A#', 'D']
    };

    for (const [chord, chordNotes] of Object.entries(minorChords)) {
      if (chordNotes.every(note => noteNames.includes(note))) {
        return chord;
      }
    }

    return null;
  }

  // Calculate confidence score
  calculateConfidence(frequencies) {
    const totalAmplitude = frequencies.reduce((sum, f) => sum + f.amplitude, 0);
    const avgAmplitude = totalAmplitude / frequencies.length;
    return Math.min(avgAmplitude / 255, 1);
  }

  // Analyze timing and rhythm
  analyzeTiming() {
    // This would analyze timing patterns and provide feedback
    // For now, we'll provide a basic implementation
    
    if (this.callbacks.onTimingFeedback) {
      const timingData = {
        tempo: this.estimateTempo(),
        isInTime: true, // This would be calculated from actual analysis
        feedback: "Good timing! Keep it up!"
      };
      
      this.callbacks.onTimingFeedback(timingData);
    }
  }

  // Estimate tempo from audio
  estimateTempo() {
    // Simplified tempo estimation
    // In production, you'd use more sophisticated beat detection
    return 120; // Default tempo
  }

  // Analyze playing technique
  analyzeTechnique() {
    if (this.callbacks.onTechniqueFeedback) {
      const techniqueData = {
        clarity: this.assessClarity(),
        dynamics: this.assessDynamics(),
        feedback: "Technique looks good! Focus on smooth transitions."
      };
      
      this.callbacks.onTechniqueFeedback(techniqueData);
    }
  }

  // Assess audio clarity
  assessClarity() {
    // Simplified clarity assessment
    return 0.8; // 0-1 scale
  }

  // Assess dynamics
  assessDynamics() {
    // Simplified dynamics assessment
    return 0.7; // 0-1 scale
  }

  // Set callback functions
  setCallbacks(callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  // Get AI-powered analysis of playing
  async getAIAnalysis(audioData, context = '') {
    const prompt = `Analyze this guitar playing audio data and provide feedback:

    Audio Context: ${context}
    Frequency Data: ${JSON.stringify(audioData.slice(0, 10))} // First 10 data points
    
    Provide feedback on:
    1. Chord accuracy and recognition
    2. Timing and rhythm
    3. Technique and clarity
    4. Areas for improvement
    5. Practice recommendations
    
    Be encouraging and specific in your feedback.`;

    try {
      const result = await nvidiaAPI.callNVIDIAAPI(prompt, {
        taskType: 'analysis',
        complexity: 'medium',
        temperature: 0.7
      });

      return result.response;
    } catch (error) {
      console.error('🎵 Audio Analyzer: AI analysis failed:', error);
      return "Audio analysis is temporarily unavailable. Keep practicing!";
    }
  }

  // Cleanup resources
  cleanup() {
    this.stopAnalysis();
    if (this.microphone) {
      this.microphone.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Export singleton instance
export const audioAnalyzer = new AudioAnalyzer();
