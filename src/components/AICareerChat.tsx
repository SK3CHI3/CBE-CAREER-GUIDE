import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Loader2, Send, Bot, User, Sparkles, BookOpen, Target } from 'lucide-react'
import { deepseekAI, ChatMessage, CareerAssessmentData } from '@/lib/deepseek-ai'
import { useToast } from '@/hooks/use-toast'

interface AICareerChatProps {
  assessmentData?: CareerAssessmentData
  onRecommendationGenerated?: (recommendations: any[]) => void
  isQuickAssessment?: boolean
  className?: string
}

export const AICareerChat: React.FC<AICareerChatProps> = ({
  assessmentData,
  onRecommendationGenerated,
  isQuickAssessment = false,
  className = ''
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: isQuickAssessment 
        ? "Hello! I'm your AI Career Counselor. I'm here to help you discover career paths that match your interests and strengths based on Kenya's CBE curriculum. What would you like to know about your future career options?"
        : "Welcome back! I'm here to provide personalized career guidance based on your profile and Kenya's CBE curriculum. How can I help you today?",
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [isQuickAssessment])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setIsStreaming(true)

    try {
      // Create assistant message placeholder
      const assistantMessageId = `assistant-${Date.now()}`
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      // Stream the response
      await deepseekAI.generateStreamingResponse(
        userMessage.content,
        messages,
        (chunk: string) => {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          )
        },
        assessmentData
      )

    } catch (error) {
      console.error('Error generating response:', error)
      
      // Remove the placeholder message and add error message
      setMessages(prev => prev.slice(0, -1))
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to ask your question differently.",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
      
      toast({
        title: "Connection Error",
        description: "Unable to get AI response. Please check your internet connection and try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
      setIsStreaming(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const generateCareerRecommendations = async () => {
    if (!assessmentData) {
      toast({
        title: "No Assessment Data",
        description: "Please complete the career assessment first to get personalized recommendations.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      const recommendations = await deepseekAI.generateCareerRecommendations(assessmentData)
      
      if (onRecommendationGenerated) {
        onRecommendationGenerated(recommendations)
      }

      // Add recommendations to chat
      const recommendationMessage: ChatMessage = {
        id: `recommendations-${Date.now()}`,
        role: 'assistant',
        content: `Based on your assessment, here are my top career pathway recommendations:\n\n${
          recommendations.map((rec, index) => 
            `**${index + 1}. ${rec.pathway} - ${rec.track}** (${rec.matchPercentage}% match)\n${rec.reasoning}\n\n**Recommended Subjects:** ${rec.recommendedSubjects.join(', ')}\n**Career Opportunities:** ${rec.careerOpportunities.join(', ')}\n**Next Steps:** ${rec.nextSteps.join(', ')}\n`
          ).join('\n---\n\n')
        }`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, recommendationMessage])

      toast({
        title: "Recommendations Generated",
        description: `Generated ${recommendations.length} personalized career recommendations for you.`
      })

    } catch (error) {
      console.error('Error generating recommendations:', error)
      toast({
        title: "Error",
        description: "Failed to generate career recommendations. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedQuestions = [
    "What career paths are available in STEM?",
    "Which subjects should I choose for business careers?",
    "What are the job opportunities in Kenya for my interests?",
    "How do I prepare for university admission?",
    "What skills are most important for my chosen field?"
  ]

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Career Counselor
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by DeepSeek AI
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4 p-4">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isStreaming && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        {assessmentData && (
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={generateCareerRecommendations}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <Target className="h-3 w-3" />
              Get Career Recommendations
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Tell me about CBE career pathways")}
              className="flex items-center gap-1"
            >
              <BookOpen className="h-3 w-3" />
              Learn About CBE
            </Button>
          </div>
        )}

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your career options..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
