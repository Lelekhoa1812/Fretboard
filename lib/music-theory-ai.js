import { nvidiaAPI } from './nvidia-api.js';

export class MusicTheoryAI {
  
  // Analyze chord progression
  static async analyzeChordProgression(chords, sessionId = null) {
    const prompt = `Analyze the chord progression ${chords.join(' - ')} for guitar. Include key signature, fretboard positions, music theory, and practice tips. Provide a comprehensive analysis with sections for Quick Analysis, Fretboard Guidance, Music Theory, Chord Progressions & Variations, Creative Applications, and Next Steps. Be specific, encouraging, and focus on practical guitar applications.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'ask-question',
      complexity: 'medium',
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
    const prompt = `You are an expert guitar and music theory tutor with deep knowledge of fretboard navigation, chord relationships, and musical expression. 

    **Current Context:** ${context || 'User is interacting with a virtual guitar fretboard'}

    **User Question:** "${question}"

    **Instructions:**
    - If the user asks about selecting chords, provide SPECIFIC fretboard guidance and suggest meaningful chord progressions
    - When discussing chords, always mention their emotional impact and harmonic function
    - Include practical fretboard positions and fingerings
    - Suggest chord progressions that work well together
    - Explain the music theory behind your suggestions
    - Be concise but comprehensive - avoid generic responses
    - Use markdown formatting for better readability
    - Focus on actionable advice that enhances their fretboard experience

    **Response Format:**
    Use markdown with headers, bullet points, and emphasis. Include:
    - **Quick Answer** (2-3 sentences)
    - **Fretboard Guidance** (specific positions/fingerings)
    - **Music Theory** (why it works)
    - **Chord Progressions** (suggested sequences)
    - **Emotional Impact** (mood/feeling of the music)
    - **Next Steps** (what to try next)

    Be encouraging, specific, and focus on practical guitar playing that enhances their virtual fretboard experience.`;

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

  // Fretboard navigation and chord selection guidance
  static async provideFretboardGuidance(context = '', sessionId = null) {
    const prompt = `You are a guitar fretboard expert helping someone navigate a virtual guitar fretboard.

    **Context:** ${context}

    **Provide comprehensive fretboard guidance using markdown formatting:**

    **Fretboard Navigation Basics**
    - How to read fret numbers and string positions
    - Understanding the relationship between frets and semitones
    - Visual patterns that make navigation easier

    **Smart Chord Selection Strategy**
    - Start with basic open chords (C, G, Am, F, D, Em)
    - How to build chord progressions that sound good together
    - Understanding chord relationships and voice leading

    **Music Theory for Fretboard**
    - How chords relate to scales
    - Understanding chord qualities (major, minor, diminished, augmented)
    - Circle of fifths and chord progressions

    **Practical Tips**
    - Finger placement and technique
    - Common chord shapes and their variations
    - How to transition smoothly between chords

    **Next Steps**
    - Specific chords to try first
    - Practice exercises for fretboard mastery
    - How to use the virtual fretboard effectively

    Be encouraging, specific, and focus on actionable advice that enhances their virtual fretboard experience.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'basic_explanation',
      complexity: 'medium',
      temperature: 0.7
    });
  }

  // Analyze progression vibe and emotional journey
  static async analyzeProgressionVibe(progression, context = '', sessionId = null) {
    const prompt = `You are a music analyst. Create a CONCISE vibe analysis for this chord progression.

    **Chord Progression:** ${progression}
    **Context:** ${context}

    **Generate a brief, impactful vibe analysis (max 3 sentences):**

    Focus on:
    - The overall emotional character
    - What genre/style it evokes
    - One key musical insight

    **Requirements:**
    - Maximum 3 sentences
    - Focus on emotional impact
    - Use simple, direct language
    - Be inspiring but concise
    - NO technical jargon

    **Example format:**
    "This progression creates a dreamy, romantic atmosphere perfect for ballads. The smooth voice leading creates a sense of longing and nostalgia. It's ideal for emotional storytelling and intimate performances."

    Return only the concise analysis.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'creative_analysis',
      complexity: 'low',
      temperature: 0.3
    });
  }

  // Analyze individual chord in context
  static async analyzeIndividualChord(chord, progression, position, totalChords, context = '', sessionId = null) {
    const prompt = `You are a guitar instructor analyzing a specific chord within a chord progression.

    **Chord:** ${chord}
    **Position:** ${position} of ${totalChords} in progression: ${progression}
    **Context:** ${context}

    **Return JSON only:**
    {
      "name": "${chord}",
      "emotion": "2-3 word emotion",
      "impact": "Brief role",
      "explanation": "1-2 sentences max",
      "alternatives": ["Alt1", "Alt2", "Alt3"],
      "fretboardPositions": [
        {"fret": 0, "string": 5, "finger": 3},
        {"fret": 2, "string": 4, "finger": 1}
      ],
      "color": "#00baba"
    }`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'structured_analysis',
      complexity: 'low',
      temperature: 0.3
    });
  }

  // Generate creative chord progression examples
  static async generateProgressionExamples(context = '', userStyle = '', sessionId = null) {
    const prompt = `You are a creative music composer generating diverse chord progression examples.

    **Context:** ${context}
    **User Style:** ${userStyle}

    **Generate 4 unique chord progression examples in JSON format:**

    [
      {
        "name": "Creative Name",
        "progression": "Chord1 - Chord2 - Chord3 - Chord4",
        "description": "Brief description of the vibe and style"
      },
      {
        "name": "Another Style",
        "progression": "Chord1 - Chord2 - Chord3 - Chord4 - Chord5",
        "description": "Brief description of the vibe and style"
      },
      {
        "name": "Different Genre",
        "progression": "Chord1 - Chord2 - Chord3",
        "description": "Brief description of the vibe and style"
      },
      {
        "name": "Unique Character",
        "progression": "Chord1 - Chord2 - Chord3 - Chord4 - Chord5 - Chord6",
        "description": "Brief description of the vibe and style"
      }
    ]

    **Guidelines:**
    - Make each progression unique and creative
    - Use diverse chord types (major, minor, 7th, sus, add, etc.)
    - Create different moods and styles
    - Make names creative and descriptive
    - Keep descriptions concise but evocative
    - Ensure progressions are musically valid
    - Vary the length of progressions (3-6 chords)
    - Include both simple and complex examples

    Return ONLY the JSON array, no additional text.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'creative_generation',
      complexity: 'high',
      temperature: 0.9
    });
  }

  // Summarize verbose AI analysis using Llama
  static async summarizeAnalysis(fullResponse, chordName, context = '', sessionId = null) {
    const prompt = `You are a music instructor. Create an ULTRA-CONCISE summary of this chord analysis.

    **Chord:** ${chordName}
    **Full Analysis:** ${fullResponse}

    **Requirements:**
    - MAXIMUM 15 words
    - ONE sentence only
    - Focus on the chord's emotional impact
    - Use simple, direct language
    - NO technical jargon
    - NO explanations

    **Examples of good summaries:**
    - "Hopeful and bright, creates uplifting energy"
    - "Dark and mysterious, adds tension"
    - "Warm and romantic, perfect for ballads"
    - "Jazzy and sophisticated, adds color"

    Return ONLY the summary sentence. No additional text.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'summarization',
      complexity: 'low',
      temperature: 0.1
    });
  }
}
