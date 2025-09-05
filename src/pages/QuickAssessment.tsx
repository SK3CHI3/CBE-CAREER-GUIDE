import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Brain, CheckCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const QuickAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which subject do you find most interesting?",
      options: [
        { value: "math", label: "Mathematics" },
        { value: "science", label: "Science & Technology" },
        { value: "languages", label: "Languages (English/Kiswahili)" },
        { value: "social", label: "Social Studies" },
        { value: "arts", label: "Creative Arts & Sports" }
      ]
    },
    {
      id: 2,
      question: "What type of activities do you enjoy most?",
      options: [
        { value: "problem-solving", label: "Solving complex problems" },
        { value: "helping", label: "Helping and teaching others" },
        { value: "creating", label: "Creating and building things" },
        { value: "organizing", label: "Organizing and planning events" },
        { value: "performing", label: "Performing and entertaining" }
      ]
    },
    {
      id: 3,
      question: "In group projects, you usually:",
      options: [
        { value: "leader", label: "Take the leadership role" },
        { value: "researcher", label: "Do the research and analysis" },
        { value: "creative", label: "Handle the creative aspects" },
        { value: "coordinator", label: "Coordinate between team members" },
        { value: "presenter", label: "Present the final results" }
      ]
    },
    {
      id: 4,
      question: "Which work environment appeals to you most?",
      options: [
        { value: "office", label: "Modern office with technology" },
        { value: "outdoors", label: "Outdoor and field work" },
        { value: "lab", label: "Laboratory or research facility" },
        { value: "creative-space", label: "Creative studio or workshop" },
        { value: "community", label: "Community and social settings" }
      ]
    },
    {
      id: 5,
      question: "What motivates you most about a future career?",
      options: [
        { value: "money", label: "Good salary and financial security" },
        { value: "impact", label: "Making a positive impact on society" },
        { value: "recognition", label: "Recognition and prestige" },
        { value: "creativity", label: "Creative expression and innovation" },
        { value: "stability", label: "Job security and work-life balance" }
      ]
    }
  ];

  const careerSuggestions = {
    "math-problem-solving": ["Data Scientist", "Software Engineer", "Financial Analyst"],
    "science-creating": ["Biomedical Engineer", "Research Scientist", "Environmental Engineer"],
    "languages-helping": ["Teacher", "Translator", "Social Worker"],
    "social-organizing": ["Project Manager", "Human Resources", "Public Administrator"],
    "arts-performing": ["Graphic Designer", "Marketing Specialist", "Media Producer"]
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getCareerRecommendations = () => {
    // Simple matching logic based on first two answers
    const subject = answers[0] || 'math';
    const activity = answers[1] || 'problem-solving';
    const key = `${subject}-${activity}` as keyof typeof careerSuggestions;
    return careerSuggestions[key] || careerSuggestions["math-problem-solving"];
  };

  if (showResults) {
    const recommendations = getCareerRecommendations();
    
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <div className="pt-16 py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="shadow-card border-border/50">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 gradient-accent rounded-lg shadow-glow w-fit mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl">Your Career Recommendations</CardTitle>
                <CardDescription>
                  Based on your responses, here are some career paths that might interest you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {recommendations.map((career, index) => (
                    <Card key={index} className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">{career}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-success">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm">High demand in Kenya</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <h3 className="font-semibold mb-2">Want More Detailed Guidance?</h3>
                  <p className="text-muted-foreground mb-4">
                    Create an account for comprehensive career planning with AI counseling, 
                    performance tracking, and personalized recommendations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/register">
                      <Button className="gradient-primary">Create Free Account</Button>
                    </Link>
                    <Link to="/">
                      <Button variant="outline">Back to Home</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="pt-16 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-smooth">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Card className="shadow-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 gradient-primary rounded-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Quick Career Assessment</CardTitle>
                  <CardDescription>Question {currentQuestion + 1} of {questions.length}</CardDescription>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {questions[currentQuestion].question}
                </h3>
                
                <RadioGroup
                  value={answers[currentQuestion] || ''}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion]}
                  className="gradient-primary"
                >
                  {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuickAssessment;