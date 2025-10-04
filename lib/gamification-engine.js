import { nvidiaAPI } from './nvidia-api.js';

export class GamificationEngine {
  constructor() {
    this.achievements = new Map();
    this.challenges = new Map();
    this.leaderboards = new Map();
    this.userStats = new Map();
    this.badges = new Map();
    this.initializeDefaultContent();
  }

  // Initialize default achievements, badges, and challenges
  initializeDefaultContent() {
    this.initializeAchievements();
    this.initializeBadges();
    this.initializeChallenges();
  }

  // Initialize achievement system
  initializeAchievements() {
    const achievements = [
      {
        id: 'first_chord',
        name: 'First Steps',
        description: 'Learn your first chord',
        icon: '🎸',
        points: 10,
        category: 'learning',
        requirement: { type: 'chords_learned', value: 1 }
      },
      {
        id: 'chord_master',
        name: 'Chord Master',
        description: 'Learn 20 different chords',
        icon: '🏆',
        points: 100,
        category: 'learning',
        requirement: { type: 'chords_learned', value: 20 }
      },
      {
        id: 'scale_explorer',
        name: 'Scale Explorer',
        description: 'Learn 5 different scales',
        icon: '🎵',
        points: 50,
        category: 'learning',
        requirement: { type: 'scales_learned', value: 5 }
      },
      {
        id: 'practice_streak_7',
        name: 'Week Warrior',
        description: 'Practice for 7 consecutive days',
        icon: '🔥',
        points: 75,
        category: 'consistency',
        requirement: { type: 'practice_streak', value: 7 }
      },
      {
        id: 'practice_streak_30',
        name: 'Monthly Master',
        description: 'Practice for 30 consecutive days',
        icon: '💎',
        points: 300,
        category: 'consistency',
        requirement: { type: 'practice_streak', value: 30 }
      },
      {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Achieve 90% accuracy at 120 BPM',
        icon: '⚡',
        points: 150,
        category: 'skill',
        requirement: { type: 'speed_accuracy', value: { speed: 120, accuracy: 0.9 } }
      },
      {
        id: 'perfectionist',
        name: 'Perfectionist',
        description: 'Achieve 95% accuracy in a practice session',
        icon: '✨',
        points: 200,
        category: 'skill',
        requirement: { type: 'accuracy', value: 0.95 }
      },
      {
        id: 'song_completer',
        name: 'Song Completer',
        description: 'Complete your first song',
        icon: '🎶',
        points: 50,
        category: 'achievement',
        requirement: { type: 'songs_completed', value: 1 }
      },
      {
        id: 'theory_scholar',
        name: 'Theory Scholar',
        description: 'Complete 10 music theory lessons',
        icon: '📚',
        points: 80,
        category: 'learning',
        requirement: { type: 'theory_lessons', value: 10 }
      },
      {
        id: 'social_butterfly',
        name: 'Social Butterfly',
        description: 'Share 5 practice sessions',
        icon: '🦋',
        points: 30,
        category: 'social',
        requirement: { type: 'shares', value: 5 }
      }
    ];

    achievements.forEach(achievement => {
      this.achievements.set(achievement.id, achievement);
    });
  }

  // Initialize badge system
  initializeBadges() {
    const badges = [
      {
        id: 'bronze_player',
        name: 'Bronze Player',
        description: 'Earn 100 points',
        icon: '🥉',
        requirement: { type: 'total_points', value: 100 }
      },
      {
        id: 'silver_player',
        name: 'Silver Player',
        description: 'Earn 500 points',
        icon: '🥈',
        requirement: { type: 'total_points', value: 500 }
      },
      {
        id: 'gold_player',
        name: 'Gold Player',
        description: 'Earn 1000 points',
        icon: '🥇',
        requirement: { type: 'total_points', value: 1000 }
      },
      {
        id: 'platinum_player',
        name: 'Platinum Player',
        description: 'Earn 2500 points',
        icon: '💎',
        requirement: { type: 'total_points', value: 2500 }
      },
      {
        id: 'early_bird',
        name: 'Early Bird',
        description: 'Practice before 8 AM',
        icon: '🌅',
        requirement: { type: 'early_practice', value: 5 }
      },
      {
        id: 'night_owl',
        name: 'Night Owl',
        description: 'Practice after 10 PM',
        icon: '🦉',
        requirement: { type: 'late_practice', value: 5 }
      },
      {
        id: 'weekend_warrior',
        name: 'Weekend Warrior',
        description: 'Practice on weekends',
        icon: '🏁',
        requirement: { type: 'weekend_practice', value: 10 }
      }
    ];

    badges.forEach(badge => {
      this.badges.set(badge.id, badge);
    });
  }

  // Initialize challenges
  initializeChallenges() {
    const challenges = [
      {
        id: 'daily_practice',
        name: 'Daily Practice',
        description: 'Practice for 30 minutes today',
        icon: '📅',
        points: 25,
        type: 'daily',
        requirement: { type: 'practice_time', value: 30 },
        active: true
      },
      {
        id: 'chord_challenge',
        name: 'Chord Challenge',
        description: 'Learn 3 new chords this week',
        icon: '🎸',
        points: 50,
        type: 'weekly',
        requirement: { type: 'chords_learned_week', value: 3 },
        active: true
      },
      {
        id: 'accuracy_challenge',
        name: 'Accuracy Challenge',
        description: 'Achieve 90% accuracy in practice',
        icon: '🎯',
        points: 40,
        type: 'session',
        requirement: { type: 'accuracy', value: 0.9 },
        active: true
      },
      {
        id: 'speed_challenge',
        name: 'Speed Challenge',
        description: 'Play at 100 BPM with 80% accuracy',
        icon: '⚡',
        points: 60,
        type: 'session',
        requirement: { type: 'speed_accuracy', value: { speed: 100, accuracy: 0.8 } },
        active: true
      }
    ];

    challenges.forEach(challenge => {
      this.challenges.set(challenge.id, challenge);
    });
  }

  // Update user stats
  updateUserStats(userId, activityData) {
    const stats = this.userStats.get(userId) || {
      totalPoints: 0,
      level: 1,
      practiceStreak: 0,
      totalPracticeTime: 0,
      chordsLearned: new Set(),
      scalesLearned: new Set(),
      songsCompleted: 0,
      achievements: new Set(),
      badges: new Set(),
      challengesCompleted: new Set(),
      lastPracticeDate: null,
      accuracyScores: [],
      speedScores: [],
      shares: 0,
      theoryLessons: 0
    };

    // Update basic stats
    stats.totalPracticeTime += activityData.duration || 0;
    stats.lastPracticeDate = new Date();

    if (activityData.chordsLearned) {
      activityData.chordsLearned.forEach(chord => stats.chordsLearned.add(chord));
    }

    if (activityData.scalesLearned) {
      activityData.scalesLearned.forEach(scale => stats.scalesLearned.add(scale));
    }

    if (activityData.songsCompleted) {
      stats.songsCompleted += activityData.songsCompleted;
    }

    if (activityData.accuracyScore) {
      stats.accuracyScores.push(activityData.accuracyScore);
    }

    if (activityData.speedScore) {
      stats.speedScores.push(activityData.speedScore);
    }

    if (activityData.shares) {
      stats.shares += activityData.shares;
    }

    if (activityData.theoryLessons) {
      stats.theoryLessons += activityData.theoryLessons;
    }

    // Update practice streak
    const today = new Date().toDateString();
    const lastPractice = stats.lastPracticeDate?.toDateString();
    
    if (lastPractice === today) {
      // Already practiced today, no change to streak
    } else if (lastPractice === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
      // Practiced yesterday, increment streak
      stats.practiceStreak += 1;
    } else {
      // Streak broken, reset to 1
      stats.practiceStreak = 1;
    }

    // Check for new achievements
    const newAchievements = this.checkAchievements(stats);
    newAchievements.forEach(achievement => {
      stats.achievements.add(achievement.id);
      stats.totalPoints += achievement.points;
    });

    // Check for new badges
    const newBadges = this.checkBadges(stats);
    newBadges.forEach(badge => {
      stats.badges.add(badge.id);
    });

    // Check for completed challenges
    const completedChallenges = this.checkChallenges(stats, activityData);
    completedChallenges.forEach(challenge => {
      stats.challengesCompleted.add(challenge.id);
      stats.totalPoints += challenge.points;
    });

    // Update level based on total points
    stats.level = Math.floor(stats.totalPoints / 100) + 1;

    this.userStats.set(userId, stats);

    return {
      newAchievements,
      newBadges,
      completedChallenges,
      updatedStats: stats
    };
  }

  // Check for new achievements
  checkAchievements(stats) {
    const newAchievements = [];

    for (const [id, achievement] of this.achievements) {
      if (stats.achievements.has(id)) continue;

      if (this.checkRequirement(achievement.requirement, stats)) {
        newAchievements.push(achievement);
      }
    }

    return newAchievements;
  }

  // Check for new badges
  checkBadges(stats) {
    const newBadges = [];

    for (const [id, badge] of this.badges) {
      if (stats.badges.has(id)) continue;

      if (this.checkRequirement(badge.requirement, stats)) {
        newBadges.push(badge);
      }
    }

    return newBadges;
  }

  // Check for completed challenges
  checkChallenges(stats, activityData) {
    const completedChallenges = [];

    for (const [id, challenge] of this.challenges) {
      if (!challenge.active || stats.challengesCompleted.has(id)) continue;

      if (this.checkRequirement(challenge.requirement, stats, activityData)) {
        completedChallenges.push(challenge);
      }
    }

    return completedChallenges;
  }

  // Check if requirement is met
  checkRequirement(requirement, stats, activityData = {}) {
    switch (requirement.type) {
      case 'chords_learned':
        return stats.chordsLearned.size >= requirement.value;
      
      case 'scales_learned':
        return stats.scalesLearned.size >= requirement.value;
      
      case 'practice_streak':
        return stats.practiceStreak >= requirement.value;
      
      case 'speed_accuracy':
        const speedData = activityData.speedData || {};
        return speedData.speed >= requirement.value.speed && 
               speedData.accuracy >= requirement.value.accuracy;
      
      case 'accuracy':
        const accuracy = this.calculateAverage(stats.accuracyScores);
        return accuracy >= requirement.value;
      
      case 'songs_completed':
        return stats.songsCompleted >= requirement.value;
      
      case 'theory_lessons':
        return stats.theoryLessons >= requirement.value;
      
      case 'shares':
        return stats.shares >= requirement.value;
      
      case 'total_points':
        return stats.totalPoints >= requirement.value;
      
      case 'early_practice':
        const earlyHour = new Date().getHours();
        return earlyHour < 8 && activityData.duration > 0;
      
      case 'late_practice':
        const lateHour = new Date().getHours();
        return lateHour >= 22 && activityData.duration > 0;
      
      case 'weekend_practice':
        const day = new Date().getDay();
        return (day === 0 || day === 6) && activityData.duration > 0;
      
      case 'chords_learned_week':
        // This would need to track weekly progress
        return stats.chordsLearned.size >= requirement.value;
      
      case 'practice_time':
        return activityData.duration >= requirement.value;
      
      default:
        return false;
    }
  }

  // Calculate average from array
  calculateAverage(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  }

  // Get user stats
  getUserStats(userId) {
    return this.userStats.get(userId);
  }

  // Get leaderboard
  getLeaderboard(category = 'total_points', limit = 10) {
    const users = Array.from(this.userStats.entries())
      .map(([userId, stats]) => ({
        userId,
        ...stats,
        totalPoints: stats.totalPoints,
        level: stats.level,
        practiceStreak: stats.practiceStreak
      }))
      .sort((a, b) => b[category] - a[category])
      .slice(0, limit);

    return users;
  }

  // Get available challenges
  getAvailableChallenges(userId) {
    const stats = this.userStats.get(userId);
    if (!stats) return [];

    return Array.from(this.challenges.values())
      .filter(challenge => challenge.active && !stats.challengesCompleted.has(challenge.id));
  }

  // Get user achievements
  getUserAchievements(userId) {
    const stats = this.userStats.get(userId);
    if (!stats) return [];

    return Array.from(stats.achievements)
      .map(id => this.achievements.get(id))
      .filter(Boolean);
  }

  // Get user badges
  getUserBadges(userId) {
    const stats = this.userStats.get(userId);
    if (!stats) return [];

    return Array.from(stats.badges)
      .map(id => this.badges.get(id))
      .filter(Boolean);
  }

  // Generate AI-powered encouragement
  async generateEncouragement(userId, activityData) {
    const stats = this.userStats.get(userId);
    if (!stats) return "Keep up the great work!";

    const prompt = `Generate encouraging feedback for a guitar student based on their progress:

    User Stats:
    - Level: ${stats.level}
    - Total Points: ${stats.totalPoints}
    - Practice Streak: ${stats.practiceStreak} days
    - Chords Learned: ${stats.chordsLearned.size}
    - Scales Learned: ${stats.scalesLearned.size}
    - Recent Accuracy: ${this.calculateAverage(stats.accuracyScores.slice(-5))}
    - Recent Speed: ${this.calculateAverage(stats.speedScores.slice(-5))}

    Recent Activity:
    - Duration: ${activityData.duration || 0} minutes
    - Accuracy: ${activityData.accuracyScore || 0}
    - Speed: ${activityData.speedScore || 0}

    Provide encouraging, specific feedback that:
    1. Acknowledges their progress
    2. Highlights specific improvements
    3. Motivates continued practice
    4. Suggests next steps
    5. Celebrates achievements

    Keep it positive, specific, and motivating. Use emojis appropriately.`;

    try {
      const result = await nvidiaAPI.callNVIDIAAPI(prompt, {
        taskType: 'simple_chat',
        complexity: 'low',
        temperature: 0.8
      });

      return result.response;

    } catch (error) {
      console.error('🎮 Gamification: Failed to generate encouragement:', error);
      return this.getFallbackEncouragement(stats, activityData);
    }
  }

  // Get fallback encouragement
  getFallbackEncouragement(stats, activityData) {
    const encouragements = [
      "Great job! Keep practicing! 🎸",
      "You're making excellent progress! ⭐",
      "Every practice session makes you better! 🚀",
      "Your dedication is paying off! 💪",
      "Amazing work! Keep it up! 🌟"
    ];

    return encouragements[Math.floor(Math.random() * encouragements.length)];
  }

  // Create custom challenge
  createCustomChallenge(userId, challengeData) {
    const challenge = {
      id: `custom_${Date.now()}`,
      name: challengeData.name,
      description: challengeData.description,
      icon: challengeData.icon || '🎯',
      points: challengeData.points || 25,
      type: 'custom',
      requirement: challengeData.requirement,
      active: true,
      createdBy: userId,
      createdAt: new Date()
    };

    this.challenges.set(challenge.id, challenge);
    return challenge;
  }

  // Get progress summary
  getProgressSummary(userId) {
    const stats = this.userStats.get(userId);
    if (!stats) return null;

    return {
      level: stats.level,
      totalPoints: stats.totalPoints,
      practiceStreak: stats.practiceStreak,
      achievements: stats.achievements.size,
      badges: stats.badges.size,
      challengesCompleted: stats.challengesCompleted.size,
      nextLevelPoints: (stats.level * 100) - stats.totalPoints,
      accuracy: this.calculateAverage(stats.accuracyScores),
      speed: this.calculateAverage(stats.speedScores)
    };
  }
}

// Export singleton instance
export const gamificationEngine = new GamificationEngine();
