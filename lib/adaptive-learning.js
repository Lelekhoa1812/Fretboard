import { nvidiaAPI } from './nvidia-api.js';

export class AdaptiveLearning {
  constructor() {
    this.userProfiles = new Map();
    this.learningPaths = new Map();
    this.progressData = new Map();
    this.skillLevels = ['beginner', 'intermediate', 'advanced'];
    this.learningStyles = ['visual', 'auditory', 'kinesthetic', 'mixed'];
  }

  // Create or update user profile
  createUserProfile(userId, initialData = {}) {
    const profile = {
      userId,
      skillLevel: initialData.skillLevel || 'beginner',
      learningStyle: initialData.learningStyle || 'mixed',
      interests: initialData.interests || ['rock', 'pop', 'blues'],
      practiceTime: initialData.practiceTime || 30, // minutes per session
      goals: initialData.goals || ['learn basic chords', 'play songs'],
      strengths: [],
      weaknesses: [],
      preferences: {
        difficulty: 'moderate',
        feedbackFrequency: 'high',
        gamification: true,
        socialFeatures: false
      },
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    this.userProfiles.set(userId, profile);
    console.log('🎯 Adaptive Learning: Created profile for user', userId);
    return profile;
  }

  // Update user progress
  updateProgress(userId, activityData) {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      console.error('🎯 Adaptive Learning: User profile not found');
      return;
    }

    const progress = this.progressData.get(userId) || {
      totalPracticeTime: 0,
      sessionsCompleted: 0,
      chordsLearned: new Set(),
      scalesLearned: new Set(),
      songsCompleted: 0,
      accuracyScores: [],
      speedScores: [],
      techniqueScores: [],
      lastActivity: null
    };

    // Update progress data
    progress.totalPracticeTime += activityData.duration || 0;
    progress.sessionsCompleted += 1;
    progress.lastActivity = new Date();

    if (activityData.chordsLearned) {
      activityData.chordsLearned.forEach(chord => progress.chordsLearned.add(chord));
    }

    if (activityData.scalesLearned) {
      activityData.scalesLearned.forEach(scale => progress.scalesLearned.add(scale));
    }

    if (activityData.songsCompleted) {
      progress.songsCompleted += activityData.songsCompleted;
    }

    if (activityData.accuracyScore) {
      progress.accuracyScores.push(activityData.accuracyScore);
    }

    if (activityData.speedScore) {
      progress.speedScores.push(activityData.speedScore);
    }

    if (activityData.techniqueScore) {
      progress.techniqueScores.push(activityData.techniqueScore);
    }

    this.progressData.set(userId, progress);

    // Update user profile based on progress
    this.updateUserProfile(userId, progress);

    console.log('🎯 Adaptive Learning: Updated progress for user', userId);
  }

  // Update user profile based on progress
  updateUserProfile(userId, progress) {
    const profile = this.userProfiles.get(userId);
    if (!profile) return;

    // Update skill level based on progress
    const avgAccuracy = this.calculateAverage(progress.accuracyScores);
    const totalChords = progress.chordsLearned.size;
    const totalScales = progress.scalesLearned.size;

    if (avgAccuracy > 0.9 && totalChords > 20 && totalScales > 5) {
      profile.skillLevel = 'advanced';
    } else if (avgAccuracy > 0.7 && totalChords > 10 && totalScales > 3) {
      profile.skillLevel = 'intermediate';
    } else {
      profile.skillLevel = 'beginner';
    }

    // Update strengths and weaknesses
    profile.strengths = this.identifyStrengths(progress);
    profile.weaknesses = this.identifyWeaknesses(progress);

    profile.lastUpdated = new Date();
    this.userProfiles.set(userId, profile);
  }

  // Calculate average from array
  calculateAverage(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  }

  // Identify user strengths
  identifyStrengths(progress) {
    const strengths = [];

    if (this.calculateAverage(progress.accuracyScores) > 0.8) {
      strengths.push('accuracy');
    }

    if (this.calculateAverage(progress.speedScores) > 0.7) {
      strengths.push('speed');
    }

    if (this.calculateAverage(progress.techniqueScores) > 0.8) {
      strengths.push('technique');
    }

    if (progress.chordsLearned.size > 15) {
      strengths.push('chord knowledge');
    }

    if (progress.scalesLearned.size > 5) {
      strengths.push('scale knowledge');
    }

    return strengths;
  }

  // Identify user weaknesses
  identifyWeaknesses(progress) {
    const weaknesses = [];

    if (this.calculateAverage(progress.accuracyScores) < 0.6) {
      weaknesses.push('accuracy');
    }

    if (this.calculateAverage(progress.speedScores) < 0.5) {
      weaknesses.push('speed');
    }

    if (this.calculateAverage(progress.techniqueScores) < 0.6) {
      weaknesses.push('technique');
    }

    if (progress.chordsLearned.size < 5) {
      weaknesses.push('chord knowledge');
    }

    if (progress.scalesLearned.size < 2) {
      weaknesses.push('scale knowledge');
    }

    return weaknesses;
  }

  // Generate personalized learning plan
  async generateLearningPlan(userId, focusArea = null) {
    const profile = this.userProfiles.get(userId);
    const progress = this.progressData.get(userId);

    if (!profile) {
      console.error('🎯 Adaptive Learning: User profile not found');
      return null;
    }

    const prompt = `Create a personalized guitar learning plan for a ${profile.skillLevel} level player.

    User Profile:
    - Skill Level: ${profile.skillLevel}
    - Learning Style: ${profile.learningStyle}
    - Interests: ${profile.interests.join(', ')}
    - Practice Time: ${profile.practiceTime} minutes per session
    - Goals: ${profile.goals.join(', ')}
    - Strengths: ${profile.strengths.join(', ')}
    - Weaknesses: ${profile.weaknesses.join(', ')}

    Progress Data:
    - Total Practice Time: ${progress?.totalPracticeTime || 0} minutes
    - Chords Learned: ${progress?.chordsLearned.size || 0}
    - Scales Learned: ${progress?.scalesLearned.size || 0}
    - Average Accuracy: ${this.calculateAverage(progress?.accuracyScores || [])}
    - Average Speed: ${this.calculateAverage(progress?.speedScores || [])}

    Focus Area: ${focusArea || 'general improvement'}

    Create a comprehensive learning plan that includes:
    1. Warm-up exercises (5-10 minutes)
    2. Main practice activities with specific goals
    3. Technique building exercises
    4. Music theory application
    5. Cool-down and review
    6. Progress tracking suggestions

    Make it practical, progressive, and enjoyable. Include specific chord progressions, scales, or songs to practice.
    Adapt the plan to their skill level and focus on their weaknesses while building on their strengths.`;

    try {
      const result = await nvidiaAPI.callNVIDIAAPI(prompt, {
        taskType: 'planning',
        complexity: 'high',
        temperature: 0.8
      });

      const learningPlan = {
        userId,
        plan: result.response,
        focusArea: focusArea || 'general improvement',
        difficulty: profile.skillLevel,
        estimatedDuration: profile.practiceTime,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      };

      this.learningPaths.set(userId, learningPlan);
      console.log('🎯 Adaptive Learning: Generated learning plan for user', userId);
      return learningPlan;

    } catch (error) {
      console.error('🎯 Adaptive Learning: Failed to generate learning plan:', error);
      return this.generateFallbackPlan(profile, progress);
    }
  }

  // Generate fallback learning plan
  generateFallbackPlan(profile, progress) {
    const basicPlan = {
      userId: profile.userId,
      plan: `# Personalized Guitar Learning Plan

## Warm-up (5-10 minutes)
- Finger exercises and stretches
- Basic scale practice
- Chord transitions

## Main Practice (${profile.practiceTime - 15} minutes)
- Focus on ${profile.weaknesses.length > 0 ? profile.weaknesses[0] : 'basic techniques'}
- Practice ${profile.skillLevel === 'beginner' ? 'open chords' : 'barre chords'}
- Work on ${profile.interests[0]} style playing

## Cool-down (5 minutes)
- Review what you learned
- Plan next practice session
- Reflect on progress`,
      focusArea: 'general improvement',
      difficulty: profile.skillLevel,
      estimatedDuration: profile.practiceTime,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };

    return basicPlan;
  }

  // Get personalized recommendations
  async getPersonalizedRecommendations(userId, type = 'general') {
    const profile = this.userProfiles.get(userId);
    const progress = this.progressData.get(userId);

    if (!profile) return [];

    const prompt = `Provide personalized recommendations for a ${profile.skillLevel} guitar player.

    User Profile:
    - Skill Level: ${profile.skillLevel}
    - Learning Style: ${profile.learningStyle}
    - Interests: ${profile.interests.join(', ')}
    - Strengths: ${profile.strengths.join(', ')}
    - Weaknesses: ${profile.weaknesses.join(', ')}

    Recommendation Type: ${type}

    Provide 5-7 specific, actionable recommendations that:
    1. Build on their strengths
    2. Address their weaknesses
    3. Match their interests and skill level
    4. Are practical and achievable
    5. Include specific exercises or songs

    Format as a numbered list with clear, actionable items.`;

    try {
      const result = await nvidiaAPI.callNVIDIAAPI(prompt, {
        taskType: 'reasoning',
        complexity: 'medium',
        temperature: 0.7
      });

      return result.response;

    } catch (error) {
      console.error('🎯 Adaptive Learning: Failed to get recommendations:', error);
      return this.getFallbackRecommendations(profile, type);
    }
  }

  // Get fallback recommendations
  getFallbackRecommendations(profile, type) {
    const recommendations = [];

    if (profile.skillLevel === 'beginner') {
      recommendations.push(
        "Practice basic open chords (C, G, Am, F, D, Em) daily",
        "Work on smooth chord transitions",
        "Learn basic strumming patterns",
        "Practice with a metronome to improve timing"
      );
    } else if (profile.skillLevel === 'intermediate') {
      recommendations.push(
        "Learn barre chords and their variations",
        "Practice scales in different positions",
        "Work on fingerpicking techniques",
        "Learn songs in your preferred genre"
      );
    } else {
      recommendations.push(
        "Master advanced techniques like sweep picking",
        "Learn complex chord progressions",
        "Practice improvisation and soloing",
        "Study music theory and harmony"
      );
    }

    return recommendations.join('\n');
  }

  // Get user profile
  getUserProfile(userId) {
    return this.userProfiles.get(userId);
  }

  // Get user progress
  getUserProgress(userId) {
    return this.progressData.get(userId);
  }

  // Get learning path
  getLearningPath(userId) {
    return this.learningPaths.get(userId);
  }

  // Check if learning path needs update
  shouldUpdateLearningPath(userId) {
    const path = this.learningPaths.get(userId);
    if (!path) return true;

    const now = new Date();
    return now > path.expiresAt;
  }
}

// Export singleton instance
export const adaptiveLearning = new AdaptiveLearning();
