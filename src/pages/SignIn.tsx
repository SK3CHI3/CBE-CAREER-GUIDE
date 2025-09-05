import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, User, Users, Shield, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: `Successfully signed in as ${userType}.`,
      });
      
      // Navigate to respective dashboard
      switch (userType) {
        case 'student':
          navigate('/dashboard/student');
          break;
        case 'teacher':
          navigate('/dashboard/teacher');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero py-12 px-4">
      <div className="w-full max-w-lg">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-smooth">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="shadow-card border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto p-3 gradient-primary rounded-lg shadow-glow w-fit mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your CBE Career AI account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="teacher" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Teacher
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              {/* Student Login */}
              <TabsContent value="student">
                <form onSubmit={(e) => handleSubmit(e, 'student')} className="space-y-4">
                  <div>
                    <Label htmlFor="studentEmail">Email</Label>
                    <Input 
                      id="studentEmail" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      defaultValue="demo.student@school.co.ke"
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="studentPassword">Password</Label>
                    <Input 
                      id="studentPassword" 
                      type="password" 
                      placeholder="••••••••"
                      defaultValue="demo123"
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full gradient-primary" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In as Student"}
                  </Button>
                </form>
              </TabsContent>

              {/* Teacher Login */}
              <TabsContent value="teacher">
                <form onSubmit={(e) => handleSubmit(e, 'teacher')} className="space-y-4">
                  <div>
                    <Label htmlFor="teacherEmail">Email</Label>
                    <Input 
                      id="teacherEmail" 
                      type="email" 
                      placeholder="teacher@school.co.ke"
                      defaultValue="demo.teacher@school.co.ke"
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="teacherPassword">Password</Label>
                    <Input 
                      id="teacherPassword" 
                      type="password" 
                      placeholder="••••••••"
                      defaultValue="demo123"
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full gradient-primary" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In as Teacher"}
                  </Button>
                </form>
              </TabsContent>

              {/* Admin Login */}
              <TabsContent value="admin">
                <form onSubmit={(e) => handleSubmit(e, 'admin')} className="space-y-4">
                  <div>
                    <Label htmlFor="adminEmail">Email</Label>
                    <Input 
                      id="adminEmail" 
                      type="email" 
                      placeholder="admin@organization.co.ke"
                      defaultValue="demo.admin@education.go.ke"
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="adminPassword">Password</Label>
                    <Input 
                      id="adminPassword" 
                      type="password" 
                      placeholder="••••••••"
                      defaultValue="demo123"
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full gradient-primary" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In as Admin"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
                  Forgot your password?
                </Link>
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <p className="font-medium mb-2">Demo Credentials:</p>
                <p className="text-muted-foreground">Use the pre-filled emails and password "demo123" to explore the platform.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;