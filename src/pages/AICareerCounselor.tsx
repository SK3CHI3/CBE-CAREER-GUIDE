import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bot, 
  MessageSquare, 
  Target, 
  BookOpen, 
  TrendingUp,
  User,
  GraduationCap,
  Sparkles
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { AICareerChat } from '@/components/AICareerChat'
import { CareerAssessmentData } from '@/lib/deepseek-ai'
import { useToast } from '@/hooks/use-toast'

const AICareerCounselor: React.FC = () => {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const [assessmentData, setAssessmentData] = useState<CareerAssessmentData | null>(null)
  const [recommendations, setRecommendations] = useState<any[]>([])

  // Build assessment data from user profile and student data
  useEffect(() => {
    if (profile) {
      const data: CareerAssessmentData = {
        gradeLevel: undefined, // Would come from student record
        interests: [], // Would come from user's saved interests
        favoriteSubjects: [], // Would come from performance data
        strengths: [], // Would come from assessments
        careerAspirations: [], // Would come from user profile
        personalityTraits: [],
        learningStyle: undefined,
        extracurricularActivities: []
      }
      setAssessmentData(data)
    }
  }, [profile])

  const handleRecommendationGenerated = (newRecommendations: any[]) => {
    setRecommendations(newRecommendations)
    toast({
      title: "New Recommendations",
      description: `Generated ${newRecommendations.length} career recommendations based on your profile.`
    })
  }

  const quickStartQuestions = [
    "What are the best career paths for my grade level?",
    "Which subjects should I focus on for STEM careers?",
    "What are the job opportunities in Kenya for my interests?",
    "How can I prepare for university admission?",
    "What skills are most important for my chosen field?",
    "Tell me about CBE career pathways",
    "What careers have high demand in Kenya?",
    "How do I choose between different career tracks?"
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            AI Career Counselor
          </h1>
          <p className="text-muted-foreground mt-2">
            Get personalized career guidance powered by AI and Kenya's CBE curriculum
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Powered by DeepSeek AI
        </Badge>
      </div>

      {/* User Profile Summary */}
      {profile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Grade Level</p>
                  <p className="font-medium">
                    Secondary School Student
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">School</p>
                  <p className="font-medium">Not specified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Career Interest</p>
                  <p className="font-medium">Exploring options</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Chat Interface */}
            <div className="lg:col-span-3">
              <AICareerChat 
                assessmentData={assessmentData || undefined}
                onRecommendationGenerated={handleRecommendationGenerated}
                className="h-[600px]"
              />
            </div>

            {/* Quick Start Panel */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Start</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Try asking these questions:
                  </p>
                  {quickStartQuestions.slice(0, 6).map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-2 text-xs"
                      onClick={() => {
                        // This would trigger the chat input
                        // Implementation depends on how you want to handle this
                      }}
                    >
                      {question}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Be specific about your interests</p>
                  <p>• Ask about subject combinations</p>
                  <p>• Inquire about career prospects</p>
                  <p>• Get advice on next steps</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {recommendations.length > 0 ? (
            <div className="grid gap-6">
              {recommendations.map((rec, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">
                        {rec.pathway} - {rec.track}
                      </CardTitle>
                      <Badge variant="secondary">
                        {rec.matchPercentage}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{rec.reasoning}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Recommended Subjects</h4>
                        <div className="flex flex-wrap gap-1">
                          {rec.recommendedSubjects.map((subject: string) => (
                            <Badge key={subject} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Career Opportunities</h4>
                        <div className="flex flex-wrap gap-1">
                          {rec.careerOpportunities.map((career: string) => (
                            <Badge key={career} variant="secondary" className="text-xs">
                              {career}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Next Steps</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {rec.nextSteps.map((step: string, stepIndex: number) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Recommendations Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Chat with the AI counselor to get personalized career recommendations
                </p>
                <Button onClick={() => {
                  // Switch to chat tab
                  const chatTab = document.querySelector('[value="chat"]') as HTMLElement
                  chatTab?.click()
                }}>
                  Start Chatting
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  CBE Career Pathways
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-primary">STEM</h4>
                  <p className="text-sm text-muted-foreground">
                    Science, Technology, Engineering & Mathematics
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-primary">Social Sciences</h4>
                  <p className="text-sm text-muted-foreground">
                    Humanities, Business Studies, Languages
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-primary">Arts & Sports</h4>
                  <p className="text-sm text-muted-foreground">
                    Creative Arts, Sports Science
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  High-Demand Careers in Kenya
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Software Developer</li>
                  <li>• Data Scientist</li>
                  <li>• Healthcare Professional</li>
                  <li>• Agricultural Engineer</li>
                  <li>• Renewable Energy Specialist</li>
                  <li>• Digital Marketing Specialist</li>
                  <li>• Financial Analyst</li>
                  <li>• Environmental Scientist</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AICareerCounselor
