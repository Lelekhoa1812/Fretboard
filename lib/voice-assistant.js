import { nvidiaAPI } from './nvidia-api.js';

export class VoiceAssistant {
  constructor() {
    this.recognition = null;
    this.synthesis = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.commands = new Map();
    this.callbacks = {
      onCommand: null,
      onError: null,
      onStart: null,
      onEnd: null
    };
    this.initializeSpeechAPIs();
    this.initializeCommands();
  }

  // Initialize speech recognition and synthesis
  initializeSpeechAPIs() {
    // Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.callbacks.onStart) this.callbacks.onStart();
        console.log('🎤 Voice Assistant: Started listening');
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log('🎤 Voice Assistant: Heard:', transcript);
        this.processCommand(transcript);
      };

      this.recognition.onerror = (event) => {
        console.error('🎤 Voice Assistant: Recognition error:', event.error);
        this.isListening = false;
        if (this.callbacks.onError) this.callbacks.onError(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.callbacks.onEnd) this.callbacks.onEnd();
        console.log('🎤 Voice Assistant: Stopped listening');
      };
    }

    // Speech Synthesis
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }
  }

  // Initialize voice commands
  initializeCommands() {
    this.commands.set('analyze chord', {
      action: 'analyze_chord',
      description: 'Analyze the current chord selection',
      keywords: ['analyze', 'chord', 'analysis']
    });

    this.commands.set('show scales', {
      action: 'show_scales',
      description: 'Show scales for current chord',
      keywords: ['show', 'scales', 'scale']
    });

    this.commands.set('practice plan', {
      action: 'practice_plan',
      description: 'Generate a practice plan',
      keywords: ['practice', 'plan', 'routine']
    });

    this.commands.set('music theory', {
      action: 'music_theory',
      description: 'Explain music theory concept',
      keywords: ['theory', 'explain', 'music']
    });

    this.commands.set('help', {
      action: 'help',
      description: 'Show available voice commands',
      keywords: ['help', 'commands', 'what can you do']
    });

    this.commands.set('stop', {
      action: 'stop',
      description: 'Stop current action',
      keywords: ['stop', 'cancel', 'quit']
    });

    this.commands.set('repeat', {
      action: 'repeat',
      description: 'Repeat last response',
      keywords: ['repeat', 'again', 'say again']
    });

    this.commands.set('next', {
      action: 'next',
      description: 'Move to next item',
      keywords: ['next', 'continue', 'forward']
    });

    this.commands.set('previous', {
      action: 'previous',
      description: 'Move to previous item',
      keywords: ['previous', 'back', 'go back']
    });
  }

  // Start listening for voice commands
  startListening() {
    if (!this.recognition) {
      console.error('🎤 Voice Assistant: Speech recognition not supported');
      return false;
    }

    if (this.isListening) {
      console.log('🎤 Voice Assistant: Already listening');
      return false;
    }

    try {
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('🎤 Voice Assistant: Failed to start listening:', error);
      return false;
    }
  }

  // Stop listening
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  // Process voice command
  processCommand(transcript) {
    const command = this.findMatchingCommand(transcript);
    
    if (command) {
      console.log('🎤 Voice Assistant: Executing command:', command.action);
      
      if (this.callbacks.onCommand) {
        this.callbacks.onCommand(command.action, transcript);
      }
      
      // Provide audio feedback
      this.speak(`Executing ${command.description}`);
    } else {
      console.log('🎤 Voice Assistant: Command not recognized:', transcript);
      this.speak("I didn't understand that command. Try saying 'help' for available commands.");
    }
  }

  // Find matching command based on transcript
  findMatchingCommand(transcript) {
    const words = transcript.split(' ');
    
    for (const [key, command] of this.commands) {
      const keywords = command.keywords;
      const matchCount = keywords.filter(keyword => 
        words.some(word => word.includes(keyword) || keyword.includes(word))
      ).length;
      
      if (matchCount >= 2) { // Require at least 2 keyword matches
        return command;
      }
    }
    
    return null;
  }

  // Speak text using speech synthesis
  speak(text, options = {}) {
    if (!this.synthesis) {
      console.error('🎤 Voice Assistant: Speech synthesis not supported');
      return;
    }

    if (this.isSpeaking) {
      this.synthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice options
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 0.8;
    
    // Try to use a pleasant voice
    const voices = this.synthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.lang.startsWith('en')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      console.log('🎤 Voice Assistant: Started speaking');
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      console.log('🎤 Voice Assistant: Finished speaking');
    };

    utterance.onerror = (event) => {
      console.error('🎤 Voice Assistant: Speech error:', event.error);
      this.isSpeaking = false;
    };

    this.synthesis.speak(utterance);
  }

  // Stop speaking
  stopSpeaking() {
    if (this.synthesis && this.isSpeaking) {
      this.synthesis.cancel();
    }
  }

  // Set callback functions
  setCallbacks(callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  // Get available commands
  getAvailableCommands() {
    return Array.from(this.commands.values());
  }

  // Generate AI-powered voice response
  async generateVoiceResponse(command, context = '') {
    const prompt = `Generate a natural, conversational response for a voice assistant helping with guitar learning.

    Command: ${command}
    Context: ${context}
    
    The response should be:
    1. Conversational and friendly
    2. Concise (under 50 words)
    3. Helpful and encouraging
    4. Natural for speech synthesis
    5. Include relevant guitar learning tips
    
    Examples:
    - For chord analysis: "I'll analyze those chords for you. Let me check the harmonic relationships and suggest some improvements."
    - For practice plan: "I'll create a personalized practice routine based on your skill level. This will help you improve efficiently."
    - For music theory: "Let me explain that music theory concept in simple terms. Understanding theory will make you a better guitarist."`;

    try {
      const result = await nvidiaAPI.callNVIDIAAPI(prompt, {
        taskType: 'simple_chat',
        complexity: 'low',
        temperature: 0.8
      });

      return result.response;

    } catch (error) {
      console.error('🎤 Voice Assistant: Failed to generate response:', error);
      return this.getFallbackResponse(command);
    }
  }

  // Get fallback response
  getFallbackResponse(command) {
    const responses = {
      'analyze_chord': "I'll analyze those chords for you. Let me check the harmonic relationships.",
      'show_scales': "I'll show you scales that work with those chords. This will help with improvisation.",
      'practice_plan': "I'll create a practice plan tailored to your skill level and goals.",
      'music_theory': "Let me explain that music theory concept. Understanding theory makes you a better guitarist.",
      'help': "I can help you analyze chords, show scales, create practice plans, and explain music theory. Just ask!",
      'stop': "Stopping current action. How else can I help you?",
      'repeat': "I'll repeat that information for you.",
      'next': "Moving to the next item.",
      'previous': "Going back to the previous item."
    };

    return responses[command] || "I'm here to help with your guitar learning. What would you like to know?";
  }

  // Check if voice features are supported
  isSupported() {
    return !!(this.recognition && this.synthesis);
  }

  // Get voice status
  getStatus() {
    return {
      isListening: this.isListening,
      isSpeaking: this.isSpeaking,
      isSupported: this.isSupported(),
      availableCommands: this.getAvailableCommands().length
    };
  }

  // Add custom command
  addCommand(key, command) {
    this.commands.set(key, command);
  }

  // Remove command
  removeCommand(key) {
    this.commands.delete(key);
  }

  // Get command help text
  getCommandHelp() {
    const commands = this.getAvailableCommands();
    let helpText = "Available voice commands:\n\n";
    
    commands.forEach(command => {
      helpText += `• "${command.keywords.join(' ')}" - ${command.description}\n`;
    });
    
    return helpText;
  }

  // Cleanup resources
  cleanup() {
    this.stopListening();
    this.stopSpeaking();
  }
}

// Export singleton instance
export const voiceAssistant = new VoiceAssistant();
