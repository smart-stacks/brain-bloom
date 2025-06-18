import { Message, PeerProfile, Resource, AgentStatus, CrisisAlert, MoodEntry } from '../types';

// Mock API service to simulate backend responses
class MockApiService {
  private crisisKeywords = ['suicide', 'kill myself', 'end it all', 'no point', 'hurt myself'];

  async sendMessage(content: string): Promise<{ message: Message; crisisAlert?: CrisisAlert }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const hasCrisisKeywords = this.crisisKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );

    const responses = hasCrisisKeywords ? [
      "I hear that you're going through a really difficult time right now. Your feelings are valid, and I want you to know that help is available.",
      "I'm concerned about you. You don't have to go through this alone. There are people who want to help and support you.",
      "What you're feeling right now is temporary, even though it might not feel that way. Let's connect you with immediate support."
    ] : [
      "I understand you're reaching out. Can you tell me more about how you're feeling today?",
      "Thank you for sharing with me. It takes courage to talk about what you're experiencing.",
      "I'm here to listen and support you. What's been on your mind lately?",
      "How has your day been? Sometimes talking through our feelings can help us process them better."
    ];

    const aiMessage: Message = {
      id: Date.now().toString(),
      content: responses[Math.floor(Math.random() * responses.length)],
      sender: 'ai',
      timestamp: new Date(),
      type: hasCrisisKeywords ? 'crisis' : 'normal'
    };

    let crisisAlert: CrisisAlert | undefined;
    if (hasCrisisKeywords) {
      crisisAlert = {
        id: Date.now().toString(),
        level: 'high',
        message: 'Crisis indicators detected. Immediate support resources recommended.',
        timestamp: new Date(),
        actions: ['Call 988', 'Contact Emergency Services', 'Find Nearby Crisis Center']
      };
    }

    return { message: aiMessage, crisisAlert };
  }

  async getPeers(): Promise<PeerProfile[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: '1',
        avatar: '👨‍💼',
        description: 'Someone who understands anxiety and work stress. Here to listen.',
        matchPercentage: 92,
        isOnline: true,
        specialties: ['anxiety', 'work-stress', 'depression']
      },
      {
        id: '2',
        avatar: '👩‍🎓',
        description: 'College student supporting others through academic pressure and mental health.',
        matchPercentage: 87,
        isOnline: true,
        specialties: ['academic-stress', 'social-anxiety', 'self-esteem']
      },
      {
        id: '3',
        avatar: '🧑‍⚕️',
        description: 'Healthcare worker who knows the importance of mental wellness.',
        matchPercentage: 85,
        isOnline: false,
        specialties: ['burnout', 'trauma', 'grief']
      }
    ];
  }

  async getResources(location?: { lat: number; lng: number }): Promise<Resource[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
      {
        id: '1',
        name: 'Crisis Support Center',
        type: 'crisis_center',
        address: '123 Main St, San Francisco, CA',
        phone: '(555) 123-4567',
        rating: 4.8,
        availability: 'immediate',
        acceptsInsurance: true,
        latitude: 37.7749,
        longitude: -122.4194,
        specialties: ['crisis-intervention', 'suicide-prevention']
      },
      {
        id: '2',
        name: 'Dr. Sarah Johnson, LCSW',
        type: 'therapist',
        address: '456 Oak Ave, San Francisco, CA',
        phone: '(555) 987-6543',
        rating: 4.9,
        availability: 'within_week',
        acceptsInsurance: true,
        latitude: 37.7849,
        longitude: -122.4094,
        specialties: ['anxiety', 'depression', 'trauma']
      },
      {
        id: '3',
        name: 'Mindful Healing Support Group',
        type: 'support_group',
        address: '789 Pine St, San Francisco, CA',
        phone: '(555) 456-7890',
        rating: 4.7,
        availability: 'same_day',
        acceptsInsurance: false,
        latitude: 37.7649,
        longitude: -122.4294,
        specialties: ['group-therapy', 'mindfulness', 'coping-skills']
      }
    ];
  }

  async getAgentStatus(): Promise<AgentStatus[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
      {
        id: '1',
        name: 'Crisis Assessment Agent',
        status: 'active',
        currentTask: 'Analyzing conversation patterns...',
        responseTime: 0.8,
        successRate: 94.2
      },
      {
        id: '2',
        name: 'Resource Matching Agent',
        status: 'processing',
        currentTask: 'Finding nearby therapists...',
        responseTime: 1.2,
        successRate: 91.7
      },
      {
        id: '3',
        name: 'Peer Connection Agent',
        status: 'active',
        currentTask: 'Matching with support peers...',
        responseTime: 0.6,
        successRate: 88.9
      },
      {
        id: '4',
        name: 'Emergency Escalation Agent',
        status: 'idle',
        responseTime: 0.3,
        successRate: 99.1
      },
      {
        id: '5',
        name: 'Progress Tracking Agent',
        status: 'active',
        currentTask: 'Updating mood analytics...',
        responseTime: 1.0,
        successRate: 92.5
      }
    ];
  }

  async saveMoodEntry(mood: number, notes?: string): Promise<MoodEntry> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      id: Date.now().toString(),
      date: new Date(),
      mood,
      notes,
      triggers: notes ? this.extractTriggers(notes) : undefined
    };
  }

  private extractTriggers(notes: string): string[] {
    const commonTriggers = ['work', 'family', 'money', 'health', 'relationship', 'sleep'];
    return commonTriggers.filter(trigger => 
      notes.toLowerCase().includes(trigger)
    );
  }
}

export const mockApi = new MockApiService();