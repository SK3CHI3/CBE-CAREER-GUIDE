import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  BookOpen, 
  TrendingUp, 
  MessageCircle, 
  Target, 
  Award,
  BarChart3,
  Calendar,
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState('mathematics');

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', score: 85, trend: '+5%' },
    { id: 'science', name: 'Science & Technology', score: 78, trend: '+3%' },
    { id: 'english', name: 'English', score: 82, trend: '+2%' },
    { id: 'kiswahili', name: 'Kiswahili', score: 75, trend: '+1%' },
    { id: 'social', name: 'Social Studies', score: 88, trend: '+7%' },
    { id: 'creative', name: 'Creative Arts', score: 92, trend: '+4%' }
  ];

  const careerRecommendations = [
    { title: 'Data Scientist', match: '95%', demand: 'High', salary: 'KES 80K - 150K' },
    { title: 'Software Engineer', match: '88%', demand: 'Very High', salary: 'KES 60K - 120K' },
    { title: 'Digital Marketing', match: '82%', demand: 'High', salary: 'KES 45K - 90K' }
  ];

  const recentActivities = [
    { action: 'Completed Mathematics Assessment', time: '2 hours ago', type: 'assessment' },
    { action: 'AI Chat: Career guidance session', time: '1 day ago', type: 'chat' },
    { action: 'Updated performance data', time: '3 days ago', type: 'update' },
    { action: 'Teacher feedback received', time: '5 days ago', type: 'feedback' }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-primary rounded-lg shadow-glow">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">CBE Career AI</h1>
                <p className="text-sm text-muted-foreground">Student Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
          <p className="text-muted-foreground">Here's your learning progress and career insights</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 gradient-primary rounded-lg">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Grade</p>
                      <p className="text-2xl font-bold text-gradient">B+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 gradient-accent rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Improvement</p>
                      <p className="text-2xl font-bold text-accent">+12%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success rounded-lg">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Goals Met</p>
                      <p className="text-2xl font-bold text-success">8/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Dashboard */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Subject Performance
                </CardTitle>
                <CardDescription>Track your progress across all CBE subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{subject.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{subject.score}%</span>
                            <Badge variant="secondary" className="text-xs">
                              {subject.trend}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={subject.score} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Chat Interface */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI Career Counselor
                </CardTitle>
                <CardDescription>Get personalized career guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 rounded-lg p-4">
                    <p className="text-sm">
                      "I'm strongest in Mathematics and Creative Arts. What career combinations should I explore?"
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm">
                      Based on your strengths in Math and Creative Arts, consider careers in Game Development, 
                      UX/UI Design, or Digital Marketing Analytics. These fields combine analytical thinking 
                      with creativity and are growing rapidly in Kenya's digital economy.
                    </p>
                  </div>
                  <Button className="w-full gradient-primary">
                    Continue Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Career Recommendations */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Career Matches</CardTitle>
                <CardDescription>Based on your performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {careerRecommendations.map((career, index) => (
                  <div key={index} className="border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{career.title}</h4>
                      <Badge className="gradient-primary text-xs">{career.match}</Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Demand:</span>
                        <span className="text-success">{career.demand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Salary:</span>
                        <span>{career.salary}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  Explore More Careers
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-muted-foreground text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="shadow-card border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg">Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Take Subject Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat with AI Counselor
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Set Learning Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;