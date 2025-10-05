import { MusicTheoryAI } from '../../lib/music-theory-ai.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      type, 
      data, 
      sessionId 
    } = req.body;

    console.log('🎵 Music Analysis API: Request received', { type, data, sessionId });

    let result;

    switch (type) {
      case 'chord-progression':
        console.log('🎵 Music Analysis API: Processing chord progression analysis');
        result = await MusicTheoryAI.analyzeChordProgression(
          data.chords, 
          sessionId
        );
        break;

      case 'scale-suggestions':
        console.log('🎵 Music Analysis API: Processing scale suggestions');
        result = await MusicTheoryAI.suggestScalesForChords(
          data.chords, 
          sessionId
        );
        break;

      case 'explain-concept':
        console.log('🎵 Music Analysis API: Processing concept explanation');
        result = await MusicTheoryAI.explainMusicTheory(
          data.concept, 
          sessionId
        );
        break;

      case 'practice-plan':
        console.log('🎵 Music Analysis API: Processing practice plan generation');
        try {
          result = await Promise.race([
            MusicTheoryAI.generatePracticePlan(
              data.skillLevel,
              data.timeAvailable,
              data.focusArea,
              sessionId
            ),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
          ]);
        } catch (error) {
          console.error('Practice plan generation failed:', error);
          result = {
            response: JSON.stringify({
              warmup: "5-minute finger exercises and chord changes",
              mainPractice: `Practice ${data.focusArea} for 20 minutes`,
              coolDown: "Play a simple song you know",
              nextSteps: "Focus on smooth chord transitions"
            }),
            model: 'fallback',
            usage: { prompt_tokens: 0, total_tokens: 0, completion_tokens: 0 }
          };
        }
        break;

      case 'ask-question':
        console.log('🎵 Music Analysis API: Processing question');
        result = await MusicTheoryAI.askMusicQuestion(
          data.question,
          data.context || '',
          sessionId
        );
        break;

      case 'scale-analysis':
        console.log('🎵 Music Analysis API: Processing scale analysis');
        try {
          result = await Promise.race([
            MusicTheoryAI.analyzeScalePattern(
              data.scale,
              data.key,
              sessionId
            ),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
          ]);
        } catch (error) {
          console.error('Scale analysis failed:', error);
          result = {
            response: JSON.stringify({
              notes: ["C", "D", "E", "F", "G", "A", "B"],
              pattern: `${data.scale} scale pattern`,
              fretboard: "Practice on frets 0-12",
              chords: ["Related chords"],
              practice: "Play scale up and down slowly"
            }),
            model: 'fallback',
            usage: { prompt_tokens: 0, total_tokens: 0, completion_tokens: 0 }
          };
        }
        break;

      case 'chord-voicings':
        console.log('🎵 Music Analysis API: Processing chord voicings');
        result = await MusicTheoryAI.suggestChordVoicings(
          data.chord,
          data.context,
          sessionId
        );
        break;

      case 'fretboard-guidance':
        console.log('🎵 Music Analysis API: Processing fretboard guidance');
        result = await MusicTheoryAI.provideFretboardGuidance(
          data.context,
          sessionId
        );
        break;

      case 'progression-vibe':
        console.log('🎵 Music Analysis API: Processing progression vibe analysis');
        result = await MusicTheoryAI.analyzeProgressionVibe(
          data.progression,
          data.context,
          sessionId
        );
        break;

      case 'chord-analysis':
        console.log('🎵 Music Analysis API: Processing individual chord analysis');
        result = await MusicTheoryAI.analyzeIndividualChord(
          data.chord,
          data.progression,
          data.position,
          data.totalChords,
          data.context,
          sessionId
        );
        break;

      case 'generate-progression-examples':
        console.log('🎵 Music Analysis API: Processing progression examples generation');
        result = await MusicTheoryAI.generateProgressionExamples(
          data.context,
          data.userStyle,
          sessionId
        );
        break;

      case 'summarize-analysis':
        console.log('🎵 Music Analysis API: Processing analysis summarization');
        result = await MusicTheoryAI.summarizeAnalysis(
          data.fullResponse,
          data.chordName,
          data.context,
          sessionId
        );
        break;

      default:
        console.error('🎵 Music Analysis API: Invalid analysis type:', type);
        return res.status(400).json({ error: 'Invalid analysis type' });
    }

    console.log('🎵 Music Analysis API: Analysis completed successfully', { 
      model: result.model, 
      usage: result.usage,
      responseLength: result.response?.length 
    });

    res.status(200).json({
      success: true,
      data: result.response,
      model: result.model,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('🎵 Music Analysis API Error:', error);
    console.error('🎵 Music Analysis API Error Stack:', error.stack);
    res.status(500).json({ 
      error: 'Analysis failed', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
