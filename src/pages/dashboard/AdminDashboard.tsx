import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  School, 
  TrendingUp, 
  Brain,
  BookOpen,
  Shield,
  Settings,
  LogOut,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const systemStats = {
    totalUsers: 12456,
    activeStudents: 8234,
    totalTeachers: 456,
    totalSchools: 89,
    assessmentsCompleted: 23456,
    aiInteractions: 45678,
    systemUptime: '99.8%',
    avgResponseTime: '1.2s'
  };

  const schoolsData = [
    {
      id: 1,
      name: 'Nairobi Primary School',
      location: 'Nairobi',
      students: 234,
      teachers: 12,
      status: 'active',
      lastActivity: '2 hours ago',
      performance: 87
    },
    {
      id: 2,
      name: 'Mombasa High School',
      location: 'Mombasa',
      students: 456,
      teachers: 24,
      status: 'active',
      lastActivity: '1 hour ago',
      performance: 92
    },
    {
      id: 3,
      name: 'Kisumu Academy',
      location: 'Kisumu',
      students: 189,
      teachers: 8,
      status: 'inactive',
      lastActivity: '2 days ago',
      performance: 78
    }
  ];

  const recentActivities = [
    { event: 'New school registration', details: 'Eldoret Secondary School joined', time: '30 minutes ago', type: 'school' },
    { event: 'System performance alert', details: 'Response time increased to 2.1s', time: '2 hours ago', type: 'alert' },
    { event: 'AI model update', details: 'Career recommendation model v2.1 deployed', time: '6 hours ago', type: 'system' },
    { event: 'Weekly report generated', details: 'Performance analytics for 89 schools', time: '1 day ago', type: 'report' }
  ];

  const systemAlerts = [
    { message: 'High server load detected', severity: 'warning', time: '1 hour ago' },
    { message: 'Database backup completed successfully', severity: 'success', time: '3 hours ago' },
    { message: 'User authentication service updated', severity: 'info', time: '6 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
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
                <p className="text-sm text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="gradient-primary text-white">
                System Status: Operational
              </Badge>
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
          <h2 className="text-3xl font-bold mb-2">System Administration 🛡️</h2>
          <p className="text-muted-foreground">Monitor and manage the CBE Career AI platform</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schools">Schools</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <School className="h-8 w-8 text-success" />
                    <div>
                      <p className="text-sm text-muted-foreground">Schools</p>
                      <p className="text-2xl font-bold">{systemStats.totalSchools}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-8 w-8 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assessments</p>
                      <p className="text-2xl font-bold">{systemStats.assessmentsCompleted.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Brain className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">AI Interactions</p>
                      <p className="text-2xl font-bold">{systemStats.aiInteractions.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.event}</p>
                        <p className="text-muted-foreground text-xs">{activity.details}</p>
                        <p className="text-muted-foreground text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.severity === 'warning' ? 'bg-destructive' :
                        alert.severity === 'success' ? 'bg-success' : 'bg-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schools Tab */}
          <TabsContent value="schools" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>School Management</CardTitle>
                    <CardDescription>Monitor and manage registered schools</CardDescription>
                  </div>
                  <Button className="gradient-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Add School
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>School Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Teachers</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schoolsData.map((school) => (
                        <TableRow key={school.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{school.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Last activity: {school.lastActivity}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{school.location}</TableCell>
                          <TableCell>{school.students}</TableCell>
                          <TableCell>{school.teachers}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{school.performance}%</span>
                              {school.performance >= 85 && (
                                <CheckCircle className="h-4 w-4 text-success" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={school.status === 'active' ? 'default' : 'secondary'}
                              className={school.status === 'active' ? 'bg-success' : ''}
                            >
                              {school.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">View</Button>
                              <Button size="sm" variant="ghost">Edit</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Students</p>
                      <p className="text-2xl font-bold">{systemStats.activeStudents.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-success" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Teachers</p>
                      <p className="text-2xl font-bold">{systemStats.totalTeachers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Admin Users</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>System Uptime</span>
                    <Badge className="bg-success">{systemStats.systemUptime}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Response Time</span>
                    <Badge variant="secondary">{systemStats.avgResponseTime}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Server Status</span>
                    <Badge className="bg-success">Healthy</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Database Status</span>
                    <Badge className="bg-success">Operational</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>AI System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>DeepSeek API</span>
                    <Badge className="bg-success">Connected</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Model Version</span>
                    <Badge variant="secondary">v2.1.3</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Accuracy</span>
                    <Badge className="bg-success">97.8%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Interactions</span>
                    <Badge variant="secondary">1,234</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;