import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, User, Users, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: `Your ${userType} account has been created. Please check your email to verify your account.`,
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle py-12 px-4">
      <div className="w-full max-w-2xl">
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
            <CardTitle className="text-2xl">Join CBE Career AI</CardTitle>
            <CardDescription>
              Choose your account type to get started with personalized career guidance
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

              {/* Student Registration */}
              <TabsContent value="student">
                <form onSubmit={(e) => handleSubmit(e, 'student')} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="school">School Name</Label>
                    <Input id="school" placeholder="Your school name" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="grade">Current Grade</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grade4">Grade 4</SelectItem>
                        <SelectItem value="grade5">Grade 5</SelectItem>
                        <SelectItem value="grade6">Grade 6</SelectItem>
                        <SelectItem value="grade7">Grade 7</SelectItem>
                        <SelectItem value="grade8">Grade 8</SelectItem>
                        <SelectItem value="grade9">Grade 9</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="teacherToken">Teacher Connection Token (Optional)</Label>
                    <Input id="teacherToken" placeholder="Enter token from your teacher" />
                  </div>
                  
                  <Button type="submit" className="w-full gradient-primary" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Student Account"}
                  </Button>
                </form>
              </TabsContent>

              {/* Teacher Registration */}
              <TabsContent value="teacher">
                <form onSubmit={(e) => handleSubmit(e, 'teacher')} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teacherFirstName">First Name</Label>
                      <Input id="teacherFirstName" placeholder="Jane" required />
                    </div>
                    <div>
                      <Label htmlFor="teacherLastName">Last Name</Label>
                      <Input id="teacherLastName" placeholder="Smith" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="teacherEmail">Email</Label>
                    <Input id="teacherEmail" type="email" placeholder="jane@school.co.ke" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="teacherSchool">School Name</Label>
                    <Input id="teacherSchool" placeholder="Your school name" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="teacherSubject">Primary Subject</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science & Technology</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="kiswahili">Kiswahili</SelectItem>
                        <SelectItem value="social">Social Studies</SelectItem>
                        <SelectItem value="creative">Creative Arts</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="teacherPassword">Password</Label>
                    <Input id="teacherPassword" type="password" required />
                  </div>
                  
                  <Button type="submit" className="w-full gradient-primary" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Teacher Account"}
                  </Button>
                </form>
              </TabsContent>

              {/* Admin Registration */}
              <TabsContent value="admin">
                <form onSubmit={(e) => handleSubmit(e, 'admin')} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adminFirstName">First Name</Label>
                      <Input id="adminFirstName" placeholder="Admin" required />
                    </div>
                    <div>
                      <Label htmlFor="adminLastName">Last Name</Label>
                      <Input id="adminLastName" placeholder="User" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="adminEmail">Email</Label>
                    <Input id="adminEmail" type="email" placeholder="admin@organization.co.ke" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input id="organization" placeholder="Ministry of Education" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="adminCode">Admin Access Code</Label>
                    <Input id="adminCode" placeholder="Special admin access code" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="adminPassword">Password</Label>
                    <Input id="adminPassword" type="password" required />
                  </div>
                  
                  <Button type="submit" className="w-full gradient-primary" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Admin Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link to="/signin" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;