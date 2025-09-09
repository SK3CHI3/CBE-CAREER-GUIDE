import { CBE_CAREER_CONTEXT, CBE_CAREER_PATHWAYS } from './cbe-curriculum'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export interface CareerAssessmentData {
  interests?: string[]
  strengths?: string[]
  gradeLevel?: number
  favoriteSubjects?: string[]
  careerAspirations?: string[]
  personalityTraits?: string[]
  learningStyle?: string
  extracurricularActivities?: string[]
}

export interface CareerRecommendation {
  pathway: string
  track: string
  matchPercentage: number
  reasoning: string
  recommendedSubjects: string[]
  careerOpportunities: string[]
  nextSteps: string[]
}

class DeepSeekAIService {
  private apiKey: string
  private baseUrl: string = 'https://api.deepseek.com'

  constructor() {
    this.apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || ''
    if (!this.apiKey) {
      console.warn('DeepSeek API key not found. Please set VITE_DEEPSEEK_API_KEY in your environment variables.')
    }
  }

  private async makeRequest(messages: ChatMessage[], stream: boolean = false) {
    if (!this.apiKey) {
      throw new Error('DeepSeek API key is not configured')
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        stream,
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(`DeepSeek API error: ${error.error?.message || response.statusText}`)
    }

    return response
  }

  async generateCareerGuidance(
    userMessage: string, 
    conversationHistory: ChatMessage[] = [],
    assessmentData?: CareerAssessmentData
  ): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(assessmentData)
    
    const messages: ChatMessage[] = [
      {
        id: 'system',
        role: 'system',
        content: systemPrompt,
        timestamp: new Date()
      },
      ...conversationHistory,
      {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      }
    ]

    const response = await this.makeRequest(messages)
    const data = await response.json()
    
    return data.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.'
  }

  async generateStreamingResponse(
    userMessage: string,
    conversationHistory: ChatMessage[] = [],
    onChunk: (chunk: string) => void,
    assessmentData?: CareerAssessmentData
  ): Promise<void> {
    const systemPrompt = this.buildSystemPrompt(assessmentData)
    
    const messages: ChatMessage[] = [
      {
        id: 'system',
        role: 'system',
        content: systemPrompt,
        timestamp: new Date()
      },
      ...conversationHistory,
      {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      }
    ]

    const response = await this.makeRequest(messages, true)
    
    if (!response.body) {
      throw new Error('No response body received')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    try {
      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            
            if (data === '[DONE]') {
              return
            }

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices[0]?.delta?.content
              
              if (content) {
                onChunk(content)
              }
            } catch (e) {
              // Skip invalid JSON lines
              continue
            }
          }
        }
      }
    } finally {
      reader.releaseLock()
    }
  }

  async generateCareerRecommendations(assessmentData: CareerAssessmentData): Promise<CareerRecommendation[]> {
    const prompt = this.buildCareerRecommendationPrompt(assessmentData)
    
    const messages: ChatMessage[] = [
      {
        id: 'system',
        role: 'system',
        content: CBE_CAREER_CONTEXT + '\n\nYou must respond with a valid JSON array of career recommendations.',
        timestamp: new Date()
      },
      {
        id: 'user',
        role: 'user',
        content: prompt,
        timestamp: new Date()
      }
    ]

    const response = await this.makeRequest(messages)
    const data = await response.json()
    const content = data.choices[0]?.message?.content || '[]'

    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      const jsonString = jsonMatch ? jsonMatch[0] : '[]'
      return JSON.parse(jsonString)
    } catch (error) {
      console.error('Failed to parse career recommendations:', error)
      return this.generateFallbackRecommendations(assessmentData)
    }
  }

  private buildSystemPrompt(assessmentData?: CareerAssessmentData): string {
    let prompt = CBE_CAREER_CONTEXT

    if (assessmentData) {
      prompt += '\n\nSTUDENT CONTEXT:\n'
      
      if (assessmentData.gradeLevel) {
        prompt += `- Grade Level: ${assessmentData.gradeLevel}\n`
      }
      
      if (assessmentData.interests?.length) {
        prompt += `- Interests: ${assessmentData.interests.join(', ')}\n`
      }
      
      if (assessmentData.strengths?.length) {
        prompt += `- Strengths: ${assessmentData.strengths.join(', ')}\n`
      }
      
      if (assessmentData.favoriteSubjects?.length) {
        prompt += `- Favorite Subjects: ${assessmentData.favoriteSubjects.join(', ')}\n`
      }
      
      if (assessmentData.careerAspirations?.length) {
        prompt += `- Career Aspirations: ${assessmentData.careerAspirations.join(', ')}\n`
      }
    }

    prompt += '\n\nProvide personalized, encouraging, and practical career guidance based on this information.'
    
    return prompt
  }

  private buildCareerRecommendationPrompt(assessmentData: CareerAssessmentData): string {
    return `
Based on the following student assessment data, provide 3 career pathway recommendations in JSON format:

Student Data:
${JSON.stringify(assessmentData, null, 2)}

Available CBE Pathways:
${JSON.stringify(CBE_CAREER_PATHWAYS, null, 2)}

Return a JSON array with this structure:
[
  {
    "pathway": "pathway_name",
    "track": "track_name", 
    "matchPercentage": 85,
    "reasoning": "Detailed explanation of why this pathway fits",
    "recommendedSubjects": ["subject1", "subject2"],
    "careerOpportunities": ["career1", "career2"],
    "nextSteps": ["step1", "step2"]
  }
]

Consider the student's interests, strengths, and aspirations. Provide realistic match percentages and practical next steps.
    `
  }

  private generateFallbackRecommendations(assessmentData: CareerAssessmentData): CareerRecommendation[] {
    // Fallback recommendations based on simple logic
    const recommendations: CareerRecommendation[] = []

    // STEM recommendation
    if (assessmentData.favoriteSubjects?.some(subject => 
      ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'].includes(subject)
    )) {
      recommendations.push({
        pathway: 'STEM',
        track: 'Pure Sciences',
        matchPercentage: 75,
        reasoning: 'Your interest in science and mathematics subjects suggests a strong fit for STEM careers.',
        recommendedSubjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
        careerOpportunities: ['Engineer', 'Doctor', 'Scientist', 'Researcher'],
        nextSteps: ['Focus on mathematics and sciences', 'Consider science competitions', 'Explore university programs']
      })
    }

    // Social Sciences recommendation
    if (assessmentData.interests?.some(interest => 
      ['helping others', 'leadership', 'communication', 'business'].includes(interest.toLowerCase())
    )) {
      recommendations.push({
        pathway: 'Social Sciences',
        track: 'Business Studies',
        matchPercentage: 70,
        reasoning: 'Your interest in helping others and leadership suggests social sciences could be a good fit.',
        recommendedSubjects: ['Business Studies', 'Economics', 'History & Government'],
        careerOpportunities: ['Lawyer', 'Business Manager', 'Teacher', 'Social Worker'],
        nextSteps: ['Develop communication skills', 'Join debate club', 'Consider internships']
      })
    }

    // Arts recommendation
    if (assessmentData.interests?.some(interest => 
      ['art', 'music', 'creativity', 'sports', 'design'].includes(interest.toLowerCase())
    )) {
      recommendations.push({
        pathway: 'Arts & Sports Science',
        track: 'Creative Arts',
        matchPercentage: 65,
        reasoning: 'Your creative interests suggest you might thrive in arts and creative fields.',
        recommendedSubjects: ['Art & Design', 'Music', 'Drama'],
        careerOpportunities: ['Artist', 'Designer', 'Musician', 'Actor'],
        nextSteps: ['Build a portfolio', 'Join arts clubs', 'Explore creative programs']
      })
    }

    return recommendations.length > 0 ? recommendations : [
      {
        pathway: 'General',
        track: 'Exploration',
        matchPercentage: 50,
        reasoning: 'Based on the information provided, I recommend exploring different subjects to discover your interests.',
        recommendedSubjects: ['Mathematics', 'English', 'Science'],
        careerOpportunities: ['Various opportunities available'],
        nextSteps: ['Take career assessments', 'Talk to career counselors', 'Explore different subjects']
      }
    ]
  }
}

export const deepseekAI = new DeepSeekAIService()
