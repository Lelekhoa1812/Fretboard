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

    let result;

    switch (type) {
      case 'chord-progression':
        result = await MusicTheoryAI.analyzeChordProgression(
          data.chords, 
          sessionId
        );
        break;

      case 'scale-suggestions':
        result = await MusicTheoryAI.suggestScalesForChords(
          data.chords, 
          sessionId
        );
        break;

      case 'explain-concept':
        result = await MusicTheoryAI.explainMusicTheory(
          data.concept, 
          sessionId
        );
        break;

      case 'practice-plan':
        result = await MusicTheoryAI.generatePracticePlan(
          data.skillLevel,
          data.timeAvailable,
          data.focusArea,
          sessionId
        );
        break;

      case 'ask-question':
        result = await MusicTheoryAI.askMusicQuestion(
          data.question,
          data.context,
          sessionId
        );
        break;

      case 'scale-analysis':
        result = await MusicTheoryAI.analyzeScalePattern(
          data.scale,
          data.key,
          sessionId
        );
        break;

      case 'chord-voicings':
        result = await MusicTheoryAI.suggestChordVoicings(
          data.chord,
          data.context,
          sessionId
        );
        break;

      default:
        return res.status(400).json({ error: 'Invalid analysis type' });
    }

    res.status(200).json({
      success: true,
      data: result.response,
      model: result.model,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Music analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      message: error.message 
    });
  }
}
