import { nvidiaAPI } from './nvidia-api.js';

export class ProgressTracker {
  constructor() {
    this.userProgress = new Map();
    this.analytics = new Map();
    this.insights = new Map();
    this.goals = new Map();
    this.milestones = new Map();
  }

  // Track user activity
  trackActivity(userId, activityData) {
    const progress = this.userProgress.get(userId) || {
      userId,
      totalPracticeTime: 0,
      sessionsCompleted: 0,
      chordsLearned: new Set(),
      scalesLearned: new Set(),
      songsCompleted: 0,
      accuracyHistory: [],
      speedHistory: [],
      techniqueHistory: [],
      dailyProgress: new Map(),
      weeklyProgress: new Map(),
      monthlyProgress: new Map(),
      streaks: {
        current: 0,
        longest: 0,
        lastPracticeDate: null
      },
      achievements: new Set(),
      goals: new Set(),
      milestones: new Set(),
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    // Update basic metrics
    progress.totalPracticeTime += activityData.duration || 0;
    progress.sessionsCompleted += 1;
    progress.lastUpdated = new Date();

    // Update learning progress
    if (activityData.chordsLearned) {
      activityData.chordsLearned.forEach(chord => progress.chordsLearned.add(chord));
    }

    if (activityData.scalesLearned) {
      activityData.scalesLearned.forEach(scale => progress.scalesLearned.add(scale));
    }

    if (activityData.songsCompleted) {
      progress.songsCompleted += activityData.songsCompleted;
    }

    // Update performance metrics
    if (activityData.accuracyScore !== undefined) {
      progress.accuracyHistory.push({
        score: activityData.accuracyScore,
        timestamp: new Date(),
        context: activityData.context || 'practice'
      });
    }

    if (activityData.speedScore !== undefined) {
      progress.speedHistory.push({
        score: activityData.speedScore,
        timestamp: new Date(),
        context: activityData.context || 'practice'
      });
    }

    if (activityData.techniqueScore !== undefined) {
      progress.techniqueHistory.push({
        score: activityData.techniqueScore,
        timestamp: new Date(),
        context: activityData.context || 'practice'
      });
    }

    // Update daily progress
    this.updateDailyProgress(progress, activityData);

    // Update streaks
    this.updateStreaks(progress);

    // Check for milestones
    this.checkMilestones(progress);

    // Generate insights
    this.generateInsights(userId, progress);

    this.userProgress.set(userId, progress);
    console.log('📊 Progress Tracker: Updated progress for user', userId);
  }

  // Update daily progress
  updateDailyProgress(progress, activityData) {
    const today = new Date().toDateString();
    const dailyData = progress.dailyProgress.get(today) || {
      date: today,
      practiceTime: 0,
      sessions: 0,
      chordsLearned: new Set(),
      scalesLearned: new Set(),
      songsCompleted: 0,
      accuracyScores: [],
      speedScores: [],
      techniqueScores: []
    };

    dailyData.practiceTime += activityData.duration || 0;
    dailyData.sessions += 1;

    if (activityData.chordsLearned) {
      activityData.chordsLearned.forEach(chord => dailyData.chordsLearned.add(chord));
    }

    if (activityData.scalesLearned) {
      activityData.scalesLearned.forEach(scale => dailyData.scalesLearned.add(scale));
    }

    if (activityData.songsCompleted) {
      dailyData.songsCompleted += activityData.songsCompleted;
    }

    if (activityData.accuracyScore !== undefined) {
      dailyData.accuracyScores.push(activityData.accuracyScore);
    }

    if (activityData.speedScore !== undefined) {
      dailyData.speedScores.push(activityData.speedScore);
    }

    if (activityData.techniqueScore !== undefined) {
      dailyData.techniqueScores.push(activityData.techniqueScore);
    }

    progress.dailyProgress.set(today, dailyData);
  }

  // Update practice streaks
  updateStreaks(progress) {
    const today = new Date();
    const lastPractice = progress.streaks.lastPracticeDate;

    if (!lastPractice) {
      progress.streaks.current = 1;
      progress.streaks.longest = 1;
    } else {
      const daysDiff = Math.floor((today - lastPractice) / (1000 * 60 * 60 * 24));

      if (daysDiff === 1) {
        // Consecutive day
        progress.streaks.current += 1;
        progress.streaks.longest = Math.max(progress.streaks.longest, progress.streaks.current);
      } else if (daysDiff === 0) {
        // Same day, no change
      } else {
        // Streak broken
        progress.streaks.current = 1;
      }
    }

    progress.streaks.lastPracticeDate = today;
  }

  // Check for milestones
  checkMilestones(progress) {
    const milestones = [
      {
        id: 'first_session',
        name: 'First Session',
        description: 'Completed your first practice session',
        condition: () => progress.sessionsCompleted >= 1,
        points: 10
      },
      {
        id: 'first_chord',
        name: 'First Chord',
        description: 'Learned your first chord',
        condition: () => progress.chordsLearned.size >= 1,
        points: 15
      },
      {
        id: 'chord_master_10',
        name: 'Chord Master (10)',
        description: 'Learned 10 different chords',
        condition: () => progress.chordsLearned.size >= 10,
        points: 50
      },
      {
        id: 'chord_master_20',
        name: 'Chord Master (20)',
        description: 'Learned 20 different chords',
        condition: () => progress.chordsLearned.size >= 20,
        points: 100
      },
      {
        id: 'scale_explorer',
        name: 'Scale Explorer',
        description: 'Learned 5 different scales',
        condition: () => progress.scalesLearned.size >= 5,
        points: 75
      },
      {
        id: 'song_completer',
        name: 'Song Completer',
        description: 'Completed your first song',
        condition: () => progress.songsCompleted >= 1,
        points: 50
      },
      {
        id: 'practice_streak_7',
        name: 'Week Warrior',
        description: 'Practiced for 7 consecutive days',
        condition: () => progress.streaks.current >= 7,
        points: 100
      },
      {
        id: 'practice_streak_30',
        name: 'Monthly Master',
        description: 'Practiced for 30 consecutive days',
        condition: () => progress.streaks.current >= 30,
        points: 500
      },
      {
        id: 'accuracy_master',
        name: 'Accuracy Master',
        description: 'Achieved 90% accuracy in practice',
        condition: () => this.calculateAverage(progress.accuracyHistory.map(h => h.score)) >= 0.9,
        points: 150
      },
      {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Achieved high speed with good accuracy',
        condition: () => this.calculateAverage(progress.speedHistory.map(h => h.score)) >= 0.8,
        points: 200
      }
    ];

    milestones.forEach(milestone => {
      if (!progress.milestones.has(milestone.id) && milestone.condition()) {
        progress.milestones.add(milestone.id);
        console.log('📊 Progress Tracker: Milestone achieved:', milestone.name);
      }
    });
  }

  // Generate AI-powered insights
  async generateInsights(userId, progress) {
    const prompt = `Analyze this guitar student's progress and provide personalized insights:

    Progress Data:
    - Total Practice Time: ${progress.totalPracticeTime} minutes
    - Sessions Completed: ${progress.sessionsCompleted}
    - Chords Learned: ${progress.chordsLearned.size}
    - Scales Learned: ${progress.scalesLearned.size}
    - Songs Completed: ${progress.songsCompleted}
    - Current Streak: ${progress.streaks.current} days
    - Longest Streak: ${progress.streaks.longest} days
    - Average Accuracy: ${this.calculateAverage(progress.accuracyHistory.map(h => h.score))}
    - Average Speed: ${this.calculateAverage(progress.speedHistory.map(h => h.score))}
    - Average Technique: ${this.calculateAverage(progress.techniqueHistory.map(h => h.score))}

    Recent Progress (Last 7 days):
    ${this.getRecentProgress(progress, 7)}

    Provide insights on:
    1. Strengths and areas of improvement
    2. Learning patterns and trends
    3. Practice consistency analysis
    4. Skill development recommendations
    5. Goal setting suggestions
    6. Motivation and encouragement

    Be specific, encouraging, and actionable.`;

    try {
      const result = await nvidiaAPI.callNVIDIAAPI(prompt, {
        taskType: 'analysis',
        complexity: 'high',
        temperature: 0.7
      });

      const insights = {
        userId,
        insights: result.response,
        generatedAt: new Date(),
        dataPoints: {
          totalPracticeTime: progress.totalPracticeTime,
          sessionsCompleted: progress.sessionsCompleted,
          chordsLearned: progress.chordsLearned.size,
          scalesLearned: progress.scalesLearned.size,
          songsCompleted: progress.songsCompleted,
          currentStreak: progress.streaks.current,
          averageAccuracy: this.calculateAverage(progress.accuracyHistory.map(h => h.score)),
          averageSpeed: this.calculateAverage(progress.speedHistory.map(h => h.score)),
          averageTechnique: this.calculateAverage(progress.techniqueHistory.map(h => h.score))
        }
      };

      this.insights.set(userId, insights);
      return insights;

    } catch (error) {
      console.error('📊 Progress Tracker: Failed to generate insights:', error);
      return this.getFallbackInsights(progress);
    }
  }

  // Get recent progress
  getRecentProgress(progress, days) {
    const recentDays = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateString = date.toDateString();
      const dailyData = progress.dailyProgress.get(dateString);

      if (dailyData) {
        recentDays.push({
          date: dateString,
          practiceTime: dailyData.practiceTime,
          sessions: dailyData.sessions,
          chordsLearned: dailyData.chordsLearned.size,
          scalesLearned: dailyData.scalesLearned.size,
          songsCompleted: dailyData.songsCompleted,
          averageAccuracy: this.calculateAverage(dailyData.accuracyScores),
          averageSpeed: this.calculateAverage(dailyData.speedScores),
          averageTechnique: this.calculateAverage(dailyData.techniqueScores)
        });
      }
    }

    return recentDays;
  }

  // Get fallback insights
  getFallbackInsights(progress) {
    const insights = {
      userId: progress.userId,
      insights: `Based on your progress:

**Strengths:**
- You've completed ${progress.sessionsCompleted} practice sessions
- Learned ${progress.chordsLearned.size} chords and ${progress.scalesLearned.size} scales
- Current practice streak: ${progress.streaks.current} days

**Areas for Improvement:**
- Focus on accuracy and technique
- Try to maintain consistent practice schedule
- Consider learning more scales for improvisation

**Recommendations:**
- Practice daily for better consistency
- Work on chord transitions
- Learn songs to apply your skills
- Use a metronome for timing practice

Keep up the great work! 🎸`,
      generatedAt: new Date(),
      dataPoints: {
        totalPracticeTime: progress.totalPracticeTime,
        sessionsCompleted: progress.sessionsCompleted,
        chordsLearned: progress.chordsLearned.size,
        scalesLearned: progress.scalesLearned.size,
        songsCompleted: progress.songsCompleted,
        currentStreak: progress.streaks.current
      }
    };

    return insights;
  }

  // Calculate average from array
  calculateAverage(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  }

  // Get user progress
  getUserProgress(userId) {
    return this.userProgress.get(userId);
  }

  // Get user insights
  getUserInsights(userId) {
    return this.insights.get(userId);
  }

  // Get progress summary
  getProgressSummary(userId) {
    const progress = this.userProgress.get(userId);
    if (!progress) return null;

    return {
      totalPracticeTime: progress.totalPracticeTime,
      sessionsCompleted: progress.sessionsCompleted,
      chordsLearned: progress.chordsLearned.size,
      scalesLearned: progress.scalesLearned.size,
      songsCompleted: progress.songsCompleted,
      currentStreak: progress.streaks.current,
      longestStreak: progress.streaks.longest,
      averageAccuracy: this.calculateAverage(progress.accuracyHistory.map(h => h.score)),
      averageSpeed: this.calculateAverage(progress.speedHistory.map(h => h.score)),
      averageTechnique: this.calculateAverage(progress.techniqueHistory.map(h => h.score)),
      milestones: progress.milestones.size,
      lastUpdated: progress.lastUpdated
    };
  }

  // Get progress trends
  getProgressTrends(userId, period = 'week') {
    const progress = this.userProgress.get(userId);
    if (!progress) return null;

    const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
    const recentProgress = this.getRecentProgress(progress, days);

    return {
      period,
      data: recentProgress,
      trends: {
        practiceTime: this.calculateTrend(recentProgress.map(d => d.practiceTime)),
        accuracy: this.calculateTrend(recentProgress.map(d => d.averageAccuracy)),
        speed: this.calculateTrend(recentProgress.map(d => d.averageSpeed)),
        technique: this.calculateTrend(recentProgress.map(d => d.averageTechnique))
      }
    };
  }

  // Calculate trend (positive, negative, or stable)
  calculateTrend(values) {
    if (values.length < 2) return 'stable';
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = this.calculateAverage(firstHalf);
    const secondAvg = this.calculateAverage(secondHalf);
    
    const change = (secondAvg - firstAvg) / firstAvg;
    
    if (change > 0.1) return 'positive';
    if (change < -0.1) return 'negative';
    return 'stable';
  }

  // Set user goal
  setGoal(userId, goalData) {
    const goal = {
      id: `goal_${Date.now()}`,
      userId,
      title: goalData.title,
      description: goalData.description,
      target: goalData.target,
      current: goalData.current || 0,
      unit: goalData.unit || 'count',
      deadline: goalData.deadline,
      createdAt: new Date(),
      completed: false
    };

    this.goals.set(goal.id, goal);
    console.log('📊 Progress Tracker: Set goal for user', userId);
    return goal;
  }

  // Update goal progress
  updateGoalProgress(goalId, progress) {
    const goal = this.goals.get(goalId);
    if (!goal) return false;

    goal.current = progress;
    goal.completed = goal.current >= goal.target;

    if (goal.completed) {
      console.log('📊 Progress Tracker: Goal completed:', goal.title);
    }

    this.goals.set(goalId, goal);
    return goal;
  }

  // Get user goals
  getUserGoals(userId) {
    return Array.from(this.goals.values()).filter(goal => goal.userId === userId);
  }

  // Export progress data
  exportProgressData(userId) {
    const progress = this.userProgress.get(userId);
    if (!progress) return null;

    return {
      userId,
      exportDate: new Date(),
      summary: this.getProgressSummary(userId),
      trends: this.getProgressTrends(userId, 'month'),
      insights: this.getUserInsights(userId),
      goals: this.getUserGoals(userId),
      rawData: {
        dailyProgress: Array.from(progress.dailyProgress.entries()),
        accuracyHistory: progress.accuracyHistory,
        speedHistory: progress.speedHistory,
        techniqueHistory: progress.techniqueHistory
      }
    };
  }

  // Cleanup old data
  cleanupOldData(daysToKeep = 365) {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
    
    for (const [userId, progress] of this.userProgress) {
      // Clean up old daily progress
      for (const [date, data] of progress.dailyProgress) {
        if (new Date(date) < cutoffDate) {
          progress.dailyProgress.delete(date);
        }
      }

      // Clean up old history data
      progress.accuracyHistory = progress.accuracyHistory.filter(h => h.timestamp > cutoffDate);
      progress.speedHistory = progress.speedHistory.filter(h => h.timestamp > cutoffDate);
      progress.techniqueHistory = progress.techniqueHistory.filter(h => h.timestamp > cutoffDate);

      this.userProgress.set(userId, progress);
    }

    console.log('📊 Progress Tracker: Cleaned up old data');
  }
}

// Export singleton instance
export const progressTracker = new ProgressTracker();
