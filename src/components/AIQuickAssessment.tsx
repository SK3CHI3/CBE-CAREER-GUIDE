import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Brain, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Sparkles,
  BookOpen,
  Target,
  Users,
  Lightbulb
} from 'lucide-react'
import { CareerAssessmentData } from '@/lib/deepseek-ai'
import { AICareerChat } from './AICareerChat'

interface AssessmentQuestion {
  id: string
  type: 'multiple-choice' | 'checkbox' | 'text' | 'rating'
  question: string
  options?: string[]
  category: 'interests' | 'strengths' | 'preferences' | 'aspirations' | 'personality'
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'grade-level',
    type: 'multiple-choice',
    question: 'What grade are you currently in?',
    options: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Completed Secondary'],
    category: 'preferences'
  },
  {
    id: 'interests',
    type: 'checkbox',
    question: 'What activities do you enjoy most? (Select all that apply)',
    options: [
      'Solving math problems',
      'Reading and writing',
      'Science experiments',
      'Art and drawing',
      'Playing sports',
      'Using computers/technology',
      'Helping others',
      'Leading group activities',
      'Music and performing',
      'Building or fixing things',
      'Learning about history',
      'Business and entrepreneurship'
    ],
    category: 'interests'
  },
  {
    id: 'favorite-subjects',
    type: 'checkbox',
    question: 'Which subjects do you perform best in or enjoy most?',
    options: [
      'Mathematics',
      'English',
      'Kiswahili',
      'Physics',
      'Chemistry',
      'Biology',
      'History & Government',
      'Geography',
      'Business Studies',
      'Computer Studies',
      'Art & Design',
      'Music',
      'Physical Education',
      'Agriculture'
    ],
    category: 'strengths'
  },
  {
    id: 'strengths',
    type: 'checkbox',
    question: 'What are your strongest skills?',
    options: [
      'Analytical thinking',
      'Creative problem solving',
      'Communication',
      'Leadership',
      'Teamwork',
      'Technical skills',
      'Artistic abilities',
      'Physical coordination',
      'Memory and recall',
      'Organization',
      'Public speaking',
      'Critical thinking'
    ],
    category: 'strengths'
  },
  {
    id: 'work-environment',
    type: 'multiple-choice',
    question: 'What type of work environment appeals to you most?',
    options: [
      'Office or indoor setting',
      'Laboratory or research facility',
      'Outdoors or field work',
      'Creative studio or workshop',
      'Hospital or healthcare facility',
      'School or educational institution',
      'Business or corporate environment',
      'Community or social service center'
    ],
    category: 'preferences'
  },
  {
    id: 'career-aspirations',
    type: 'text',
    question: 'What career or profession have you always dreamed of pursuing? (Be specific if possible)',
    category: 'aspirations'
  },
  {
    id: 'personality',
    type: 'multiple-choice',
    question: 'Which best describes your personality?',
    options: [
      'Analytical and logical',
      'Creative and artistic',
      'Social and outgoing',
      'Practical and hands-on',
      'Caring and helpful',
      'Ambitious and competitive',
      'Curious and investigative',
      'Organized and detail-oriented'
    ],
    category: 'personality'
  },
  {
    id: 'learning-style',
    type: 'multiple-choice',
    question: 'How do you learn best?',
    options: [
      'Reading and studying theory',
      'Hands-on practice and experiments',
      'Group discussions and collaboration',
      'Visual aids and demonstrations',
      'Real-world applications',
      'Independent research',
      'Step-by-step instructions',
      'Creative projects'
    ],
    category: 'preferences'
  }
]

export const AIQuickAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [assessmentData, setAssessmentData] = useState<CareerAssessmentData | null>(null)

  const currentQuestion = ASSESSMENT_QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      completeAssessment()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const completeAssessment = () => {
    // Process answers into CareerAssessmentData format
    const processedData: CareerAssessmentData = {
      gradeLevel: answers['grade-level'] ? parseInt(answers['grade-level'].replace('Grade ', '')) : undefined,
      interests: answers['interests'] || [],
      favoriteSubjects: answers['favorite-subjects'] || [],
      strengths: answers['strengths'] || [],
      careerAspirations: answers['career-aspirations'] ? [answers['career-aspirations']] : [],
      personalityTraits: answers['personality'] ? [answers['personality']] : [],
      learningStyle: answers['learning-style'],
      extracurricularActivities: []
    }

    setAssessmentData(processedData)
    setIsCompleted(true)
  }

  const renderQuestion = () => {
    const currentAnswer = answers[currentQuestion.id]

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <RadioGroup
            value={currentAnswer || ''}
            onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
          >
            {currentQuestion.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case 'checkbox':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={currentAnswer?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    const current = currentAnswer || []
                    if (checked) {
                      handleAnswer(currentQuestion.id, [...current, option])
                    } else {
                      handleAnswer(currentQuestion.id, current.filter((item: string) => item !== option))
                    }
                  }}
                />
                <Label htmlFor={option} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )

      case 'text':
        return (
          <Textarea
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[100px]"
          />
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    const answer = answers[currentQuestion.id]
    if (!answer) return false
    
    if (currentQuestion.type === 'checkbox') {
      return Array.isArray(answer) && answer.length > 0
    }
    
    if (currentQuestion.type === 'text') {
      return typeof answer === 'string' && answer.trim().length > 0
    }
    
    return true
  }

  if (isCompleted && assessmentData) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Assessment Complete!
            </CardTitle>
            <p className="text-muted-foreground">
              Great job! Now let's explore your career options with our AI counselor.
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AICareerChat 
              assessmentData={assessmentData}
              isQuickAssessment={true}
              className="h-[600px]"
            />
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assessmentData.gradeLevel && (
                  <div>
                    <Label className="text-sm font-medium">Grade Level</Label>
                    <p className="text-sm text-muted-foreground">Grade {assessmentData.gradeLevel}</p>
                  </div>
                )}
                
                {assessmentData.interests && assessmentData.interests.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Top Interests</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {assessmentData.interests.slice(0, 3).map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {assessmentData.favoriteSubjects && assessmentData.favoriteSubjects.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Favorite Subjects</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {assessmentData.favoriteSubjects.slice(0, 3).map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Ask specific questions about career paths</p>
                <p>• Explore different CBE pathways</p>
                <p>• Learn about subject combinations</p>
                <p>• Get advice on next steps</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              AI Career Assessment
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </CardTitle>
            <Badge variant="outline">
              {currentStep + 1} of {ASSESSMENT_QUESTIONS.length}
            </Badge>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {currentQuestion.question}
            </h3>
            {renderQuestion()}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2"
            >
              {currentStep === ASSESSMENT_QUESTIONS.length - 1 ? (
                <>
                  Complete Assessment
                  <CheckCircle className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
