import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Download, 
  Search, 
  Plus, 
  Brain,
  BookOpen,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Settings,
  LogOut,
  Filter,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const students = [
    {
      id: 1,
      name: 'John Mwangi',
      grade: 'Grade 8A',
      overallScore: 85,
      lastAssessment: '2 days ago',
      status: 'active',
      subjects: { math: 88, science: 82, english: 87 },
      careerPath: 'Engineering'
    },
    {
      id: 2,
      name: 'Mary Akinyi',
      grade: 'Grade 8A',
      overallScore: 92,
      lastAssessment: '1 day ago',
      status: 'active',
      subjects: { math: 95, science: 89, english: 92 },
      careerPath: 'Medicine'
    },
    {
      id: 3,
      name: 'David Kipchoge',
      grade: 'Grade 8B',
      overallScore: 78,
      lastAssessment: '5 days ago',
      status: 'needs-attention',
      subjects: { math: 72, science: 80, english: 82 },
      careerPath: 'Business'
    },
    {
      id: 4,
      name: 'Grace Wanjiku',
      grade: 'Grade 7A',
      overallScore: 88,
      lastAssessment: '3 days ago',
      status: 'active',
      subjects: { math: 85, science: 87, english: 92 },
      careerPath: 'Creative Arts'
    }
  ];

  const classStats = {
    totalStudents: 45,
    activeStudents: 42,
    averageScore: 83,
    improvementRate: 15,
    assessmentsCompleted: 38
  };

  const recentActivities = [
    { student: 'John Mwangi', action: 'Completed Mathematics Assessment', score: 88, time: '2 hours ago' },
    { student: 'Mary Akinyi', action: 'AI Career Consultation', score: null, time: '4 hours ago' },
    { student: 'David Kipchoge', action: 'Updated Performance Profile', score: null, time: '1 day ago' },
    { student: 'Grace Wanjiku', action: 'Completed Science Assessment', score: 87, time: '2 days ago' }
  ];

  const generateConnectionToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedClass === 'all' || student.grade === selectedClass)
  );

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
                <p className="text-sm text-muted-foreground">Teacher Dashboard</p>
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
          <h2 className="text-3xl font-bold mb-2">Welcome, Ms. Jane Wanjiru 👩‍🏫</h2>
          <p className="text-muted-foreground">Manage your students' progress and career development</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{classStats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-success">{classStats.activeStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl font-bold text-accent">{classStats.averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Assessments</p>
                  <p className="text-2xl font-bold">{classStats.assessmentsCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Improvement</p>
                  <p className="text-2xl font-bold text-success">+{classStats.improvementRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Student Management
                    </CardTitle>
                    <CardDescription>Monitor and manage your students' progress</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button size="sm" className="gradient-primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Student
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="all">All Classes</option>
                    <option value="Grade 8A">Grade 8A</option>
                    <option value="Grade 8B">Grade 8B</option>
                    <option value="Grade 7A">Grade 7A</option>
                  </select>
                </div>

                {/* Students Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Overall Score</TableHead>
                        <TableHead>Career Path</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Last assessment: {student.lastAssessment}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{student.overallScore}%</span>
                              {student.overallScore >= 85 && (
                                <CheckCircle className="h-4 w-4 text-success" />
                              )}
                              {student.overallScore < 75 && (
                                <AlertCircle className="h-4 w-4 text-destructive" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{student.careerPath}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={student.status === 'active' ? 'default' : 'destructive'}
                              className={student.status === 'active' ? 'bg-success' : ''}
                            >
                              {student.status === 'active' ? 'Active' : 'Needs Attention'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Connection Token */}
            <Card className="shadow-card border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg">Student Connection</CardTitle>
                <CardDescription>Generate token for student registration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                    {generateConnectionToken()}
                  </div>
                  <Button className="w-full gradient-accent" size="sm">
                    Generate New Token
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Share this token with students to connect their accounts
                  </p>
                </div>
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
                      <p className="font-medium">{activity.student}</p>
                      <p className="text-muted-foreground">{activity.action}</p>
                      {activity.score && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Score: {activity.score}%
                        </Badge>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Reports
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Class Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;