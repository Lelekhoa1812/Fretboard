import { nvidiaAPI } from './nvidia-api.js';

export class MusicTheoryAI {
  
  // Analyze chord progression
  static async analyzeChordProgression(chords, sessionId = null) {
    const prompt = `Analyze this chord progression: ${chords.join(' - ')}.

    Provide a detailed analysis including:
    1. Key signature and tonality
    2. Harmonic function of each chord (Tonic, Subdominant, Dominant)
    3. Voice leading suggestions
    4. Alternative chord substitutions
    5. Common progressions this resembles
    6. Difficulty level for guitar players

    Format the response in a clear, educational manner suitable for guitar learners.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'analysis',
      complexity: 'high',
      temperature: 0.7
    });
  }

  // Suggest scales for chords
  static async suggestScalesForChords(chords, sessionId = null) {
    const prompt = `Given these chords: ${chords.join(', ')}, suggest appropriate scales for improvisation.

    For each chord, provide:
    1. Primary scale (most common choice)
    2. Alternative scales (jazz, blues, modal options)
    3. Scale degree relationships
    4. Practical fingering tips for guitar
    5. Common licks or patterns to practice

    Focus on practical guitar applications and explain the theory behind each suggestion.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'reasoning',
      complexity: 'medium',
      temperature: 0.8
    });
  }

  // Explain music theory concepts
  static async explainMusicTheory(concept, sessionId = null) {
    const prompt = `Explain the music theory concept: "${concept}" in the context of guitar playing.

    Provide:
    1. Clear definition and basic explanation
    2. How it applies to guitar fretboard
    3. Visual examples or patterns
    4. Common mistakes to avoid
    5. Practice exercises to master the concept
    6. Related concepts to explore next

    Use simple language and include practical guitar examples.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'basic_explanation',
      complexity: 'low',
      temperature: 0.6
    });
  }

  // Generate practice recommendations
  static async generatePracticePlan(skillLevel, timeAvailable, focusArea, sessionId = null) {
    const prompt = `Create a personalized ${timeAvailable}-minute guitar practice session for a ${skillLevel} level player focusing on ${focusArea}.

    Include:
    1. Warm-up exercises (5-10 minutes)
    2. Main practice activities with specific goals
    3. Technique building exercises
    4. Music theory application
    5. Cool-down and review
    6. Progress tracking suggestions

    Make it practical, progressive, and enjoyable. Include specific chord progressions, scales, or songs to practice.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'planning',
      complexity: 'medium',
      temperature: 0.8
    });
  }

  // Interactive music theory tutor
  static async askMusicQuestion(question, context = '', sessionId = null) {
    const prompt = `You are an expert guitar and music theory tutor. Answer this question: "${question}"

    ${context ? `Context: ${context}` : ''}

    Provide:
    1. Direct answer to the question
    2. Explanation of the underlying theory
    3. Practical guitar applications
    4. Related concepts to explore
    5. Practice suggestions

    Be encouraging, clear, and focus on practical guitar playing.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'simple_chat',
      complexity: 'medium',
      temperature: 0.7
    });
  }

  // Analyze scale patterns
  static async analyzeScalePattern(scale, key, sessionId = null) {
    const prompt = `Analyze the ${scale} scale in the key of ${key} for guitar playing.

    Provide:
    1. Scale construction and intervals
    2. Fretboard patterns and positions
    3. Common fingerings and techniques
    4. Chord relationships and applications
    5. Improvisation tips and licks
    6. Practice exercises for mastery

    Focus on practical guitar applications and include specific fretboard positions.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'analysis',
      complexity: 'medium',
      temperature: 0.7
    });
  }

  // Get chord voicing suggestions
  static async suggestChordVoicings(chord, context = '', sessionId = null) {
    const prompt = `Suggest different voicings for the ${chord} chord on guitar.

    ${context ? `Context: ${context}` : ''}

    Provide:
    1. Open position voicings
    2. Barre chord variations
    3. Jazz/extended voicings
    4. Inversions and slash chords
    5. Fingering diagrams
    6. When to use each voicing
    7. Common progressions using these voicings

    Include practical tips for smooth chord changes.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'analysis',
      complexity: 'medium',
      temperature: 0.7
    });
  }
}
