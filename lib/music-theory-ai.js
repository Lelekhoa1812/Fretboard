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
    const prompt = `Create a ${timeAvailable} practice plan for ${skillLevel} focusing on ${focusArea}.

    Return JSON:
    {
      "warmup": "5-minute warmup",
      "mainPractice": "Primary activity",
      "coolDown": "End with this",
      "nextSteps": "What to practice next"
    }`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'planning',
      complexity: 'low',
      temperature: 0.3
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
    const prompt = `Analyze ${scale} scale in ${key} for guitar.

    Return JSON:
    {
      "notes": ["C", "D", "E", "F", "G", "A", "B"],
      "pattern": "Scale pattern description",
      "fretboard": "Key positions on fretboard",
      "chords": ["Related chords"],
      "practice": "Practice exercise"
    }`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'analysis',
      complexity: 'low',
      temperature: 0.3
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
      complexity: 'low',
      temperature: 0.5
    });
  }

  // Analyze progression vibe and emotional journey
  static async analyzeProgressionVibe(progression, context = '', sessionId = null) {
    const prompt = `You are a passionate music analyst with deep understanding of emotional impact in chord progressions.

    **Chord Progression:** ${progression}
    **Context:** ${context}

    **Generate a rich, comprehensive vibe analysis (50-100 words):**

    ## **Emotional Journey**
    - Describe the complete emotional arc of this progression
    - What story does it tell? What mood does it create?
    - How does it make you feel when you hear it?
    - What emotional peaks and valleys does it create?

    ## **Creative Character**
    - What genre or style does this progression evoke?
    - What kind of song would this work for?
    - What imagery or scenes come to mind?
    - What time of day or season does it evoke?

    ## **Musical Personality**
    - What makes this progression unique or interesting?
    - What harmonic surprises or tensions does it create?
    - How does it compare to common progressions?
    - What musical colors and textures does it paint?

    ## **Artistic Vision**
    - What creative possibilities does this progression open up?
    - What kind of melody would work well over it?
    - What instruments or arrangements would enhance it?
    - What kind of lyrics or vocal style would complement it?

    ## **Practical Insights**
    - What makes this progression special for guitarists?
    - What techniques or approaches would bring it to life?
    - How can a player make the most of this progression?

    Be creative, poetic, and inspiring. Focus on the emotional and artistic impact while providing practical insights for guitarists.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'creative_analysis',
      complexity: 'medium',
      temperature: 0.5
    });
  }

  // Analyze individual chord in context
  static async analyzeIndividualChord(chord, progression, position, totalChords, context = '', sessionId = null) {
    const prompt = `Analyze chord "${chord}" in progression "${progression}".

    Return JSON:
    {
      "name": "${chord}",
      "emotion": "Brief emotion (2-3 words)",
      "impact": "Short role description",
      "explanation": "Concise explanation (1-2 sentences)",
      "alternatives": [
        {
          "chord": "Alternative Chord Name",
          "emotion": "Alternative's emotional character",
          "color": "#hexcolor",
          "reason": "Why this alternative works and what it brings"
        },
        {
          "chord": "Alternative Chord Name 2", 
          "emotion": "Alternative's emotional character",
          "color": "#hexcolor",
          "reason": "Why this alternative works and what it brings"
        },
        {
          "chord": "Alternative Chord Name 3",
          "emotion": "Alternative's emotional character", 
          "color": "#hexcolor",
          "reason": "Why this alternative works and what it brings"
        }
      ],
      "fretboardPositions": [
        {"fret": 0, "string": 5, "finger": 3},
        {"fret": 2, "string": 4, "finger": 1}
      ],
      "color": "#hexcolor"
    }

    **Guidelines:**
    - Make emotions vivid and specific to this chord's role
    - Explain the chord's emotional journey within the progression
    - For each alternative: include emotion, color, and reasoning
    - Choose colors that match emotional characters
    - Be specific about finger positions and string numbers
    - Focus on the chord's unique emotional contribution
    - Make alternatives feel like creative choices, not just substitutions`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'structured_analysis',
      complexity: 'medium',
      temperature: 0.6
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
    const prompt = `You are a passionate music instructor. Create a rich, concise summary that captures the chord's emotional essence and musical impact.

    **Chord:** ${chordName}
    **Context:** ${context}
    **Full Analysis:** ${fullResponse}

    **Create a compelling summary (60-80 words) that includes:**
    - The chord's emotional character and vibe
    - Its unique role in the progression
    - What makes it special or interesting
    - The feeling it creates
    - One practical insight for the player

    **Guidelines:**
    - Be emotionally descriptive and engaging
    - Use vivid, musical language
    - Capture the chord's personality
    - Explain why it works in this context
    - Include practical playing insight
    - Make it inspiring and instructional

    Return only the summary text, no additional formatting.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'summarization',
      complexity: 'medium',
      temperature: 0.7
    });
  }

  // Get chord shape from Llama for chords not in library
  static async getChordShapeFromLlama(chordName, sessionId = null) {
    const prompt = `You are a guitar instructor. Provide the fretboard positions for the chord "${chordName}".

    **Requirements:**
    - Return ONLY the hand positions in this exact format:
    - Format: "string:fret:finger,string:fret:finger,string:fret:finger,string:fret:finger,string:fret:finger"
    - Use 6 strings (1-6), frets 0-12, fingers 1-4
    - Provide the most common, playable shape
    - Include only essential notes (3-5 positions max)
    - No explanations, no additional text

    **Example format:**
    "5:3:3,4:2:2,3:0:0,2:1:1,1:0:0"

    Return ONLY the position string.`;

    return await nvidiaAPI.callNVIDIAAPI(prompt, {
      sessionId,
      taskType: 'chord_shape',
      complexity: 'low',
      temperature: 0.1
    });
  }
}
