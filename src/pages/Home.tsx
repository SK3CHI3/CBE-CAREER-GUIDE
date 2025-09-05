import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Target, TrendingUp, Users, BookOpen, MessageCircle, BarChart3, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-education.jpg';

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: 'AI Career Counselor',
      description: 'Get personalized career advice from our advanced AI system trained on CBE curriculum and Kenyan job market data.',
      gradient: 'gradient-primary'
    },
    {
      icon: Target,
      title: 'Performance Tracking',
      description: 'Monitor your academic progress across all CBE subjects and identify areas for improvement.',
      gradient: 'gradient-accent'
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Access real-time job market data and predicted career opportunities in Kenya.',
      gradient: 'gradient-primary'
    },
    {
      icon: Users,
      title: 'Teacher Collaboration',
      description: 'Enable teachers to track student progress and provide targeted support.',
      gradient: 'gradient-accent'
    }
  ];

  const stats = [
    { label: 'Students Helped', value: '10K+' },
    { label: 'Career Paths', value: '200+' },
    { label: 'Schools Partner', value: '500+' },
    { label: 'Success Rate', value: '95%' }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI Education Technology" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 gradient-accent text-white">CBE Kenya Approved</Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Your AI-Powered 
                  <span className="text-gradient block">Career Guide</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                  Discover your perfect career path with personalized AI guidance, 
                  performance tracking, and real-time job market insights tailored 
                  for Kenyan CBE students.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/quick-assessment">
                  <Button size="lg" className="gradient-primary shadow-glow w-full sm:w-auto">
                    Take Quick Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/20">
                    Create Account
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse" />
                <Card className="relative shadow-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      AI Career Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <p className="text-sm">Hi! I'm excelling in Mathematics and Science. What career paths should I consider?</p>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm">Based on your strengths, I recommend exploring Engineering, Data Science, or Medical fields. Kenya has growing opportunities in tech and healthcare...</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">CBE Career AI?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines advanced AI technology with deep understanding 
              of the Kenyan education system and job market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.gradient} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Options */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your <span className="text-gradient">Career Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the assessment type that works best for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="relative overflow-hidden group hover:shadow-glow transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Quick Assessment</CardTitle>
                  <Badge variant="secondary">Free</Badge>
                </div>
                <CardDescription>
                  Get instant career suggestions in under 5 minutes. No account required.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Basic personality assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Interest-based recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    General career overview
                  </li>
                </ul>
                <Link to="/quick-assessment" className="block">
                  <Button className="w-full" variant="outline">
                    Take Quick Assessment
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden group hover:shadow-glow transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 gradient-accent" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Comprehensive Assessment</CardTitle>
                  <Badge className="gradient-accent text-white">Recommended</Badge>
                </div>
                <CardDescription>
                  Detailed analysis with ongoing tracking and AI guidance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    Complete CBE performance analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    AI-powered career counseling
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    Progress tracking & updates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    Teacher collaboration tools
                  </li>
                </ul>
                <Link to="/register" className="block">
                  <Button className="w-full gradient-accent">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;