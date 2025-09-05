import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  BookOpen, 
  MessageCircle, 
  BarChart3, 
  Shield,
  CheckCircle,
  Star,
  Quote,
  Play,
  Globe,
  Award,
  Lightbulb,
  Heart,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-education-light.jpg';

const HomeImproved = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Career Counseling',
      description: 'Get personalized career advice from our advanced AI system trained specifically on CBE curriculum and the dynamic Kenyan job market.',
      highlight: 'Smart Guidance'
    },
    {
      icon: Target,
      title: 'Performance Analytics',
      description: 'Track your academic progress across all CBE subjects with detailed analytics and actionable insights for improvement.',
      highlight: 'Track Progress'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Market Data',
      description: 'Access up-to-date job market trends and salary insights to make informed career decisions for your future.',
      highlight: 'Market Intelligence'
    },
    {
      icon: Users,
      title: 'Teacher Collaboration',
      description: 'Seamless integration allowing teachers to monitor student progress and provide targeted support where needed.',
      highlight: 'Team Work'
    },
    {
      icon: Globe,
      title: 'Local & Global Opportunities',
      description: 'Discover career paths both within Kenya and internationally, with insights into global market demands.',
      highlight: 'Expand Horizons'
    },
    {
      icon: Award,
      title: 'Certification Ready',
      description: 'Prepare for various certifications and qualifications that align with your chosen career path.',
      highlight: 'Get Certified'
    }
  ];

  const stats = [
    { label: 'Students Empowered', value: '15K+', icon: Users },
    { label: 'Career Paths Mapped', value: '300+', icon: Target },
    { label: 'Partner Schools', value: '750+', icon: BookOpen },
    { label: 'Success Stories', value: '98%', icon: Heart }
  ];

  const testimonials = [
    {
      name: 'Grace Wanjiku',
      role: 'Grade 8 Student, Nairobi',
      quote: 'CBE Career AI helped me discover my passion for environmental science. The AI counselor understood my interests and showed me career paths I never knew existed!',
      avatar: 'GW'
    },
    {
      name: 'John Mwangi',
      role: 'Grade 9 Student, Mombasa',
      quote: 'I was confused about my future, but the platform matched my math skills with exciting tech careers. Now I know exactly what to focus on!',
      avatar: 'JM'
    },
    {
      name: 'Ms. Sarah Kiprotich',
      role: 'Mathematics Teacher',
      quote: 'This platform transformed how I support my students. I can now track their progress and provide personalized guidance like never before.',
      avatar: 'SK'
    }
  ];

  const benefits = [
    { title: 'Personalized Learning Paths', desc: 'Tailored recommendations based on your unique strengths and interests' },
    { title: 'Real-Time Progress Tracking', desc: 'Monitor your academic journey with detailed performance analytics' },
    { title: 'Career Market Intelligence', desc: 'Stay informed about job market trends and salary expectations in Kenya' },
    { title: 'AI-Powered Guidance', desc: 'Get instant answers to your career questions from our intelligent counselor' },
    { title: 'Teacher Integration', desc: 'Seamless collaboration between students, teachers, and parents' },
    { title: 'Future-Ready Skills', desc: 'Focus on skills that will be in demand in the evolving job market' }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      {/* Hero Section - Enhanced */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="gradient-primary text-white px-4 py-2 text-sm font-medium">
                  ✨ CBE Kenya Approved Platform
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Discover Your
                  <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                    Dream Career
                  </span>
                  <span className="text-4xl md:text-5xl text-muted-foreground">
                    with AI Guidance
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Unlock your potential with personalized AI-powered career guidance, 
                  performance tracking, and real-time job market insights designed 
                  specifically for Kenyan CBE students.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/quick-assessment">
                  <Button size="lg" className="gradient-primary shadow-glow text-white px-8 py-6 text-lg">
                    <Zap className="mr-2 h-5 w-5" />
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-primary/30 hover:bg-primary/5">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-10 animate-pulse" />
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Kenyan students using AI career guidance" 
                  className="w-full h-auto rounded-2xl shadow-card"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need for 
              <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Career Success
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform combines cutting-edge AI technology with deep understanding 
              of the Kenyan education system and job market to guide your career journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:shadow-soft transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 gradient-primary opacity-5 rounded-full -translate-y-10 translate-x-10" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Options - Enhanced */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-primary border-primary/20">
              Get Started Today
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your 
              <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Career Journey
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start with a quick assessment or dive deep with our comprehensive career analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="relative overflow-hidden group hover:shadow-soft transition-all duration-300 border-2 border-primary/20 hover:border-primary/40">
              <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Quick Assessment</CardTitle>
                  </div>
                  <Badge className="bg-success text-white">Free</Badge>
                </div>
                <CardDescription className="text-base">
                  Get instant career suggestions in under 5 minutes. Perfect for exploring your options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Personality & interest assessment',
                    'Basic career recommendations',
                    'General market overview',
                    'Instant results'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/quick-assessment" className="block">
                  <Button className="w-full py-6 text-lg" variant="outline">
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Take Quick Assessment
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden group hover:shadow-soft transition-all duration-300 border-2 border-accent/30 hover:border-accent/50">
              <div className="absolute top-0 left-0 w-full h-1 gradient-accent" />
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Comprehensive Analysis</CardTitle>
                  </div>
                  <Badge className="gradient-accent text-white">Recommended</Badge>
                </div>
                <CardDescription className="text-base">
                  Complete career analysis with ongoing tracking and personalized AI guidance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Full CBE performance analysis',
                    'AI-powered career counseling',
                    'Progress tracking & updates',
                    'Teacher collaboration tools',
                    'Market intelligence reports',
                    'Personalized learning paths'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="block">
                  <Button className="w-full gradient-accent text-white py-6 text-lg shadow-glow">
                    <Star className="mr-2 h-5 w-5" />
                    Start Comprehensive Journey
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Students 
              <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Are Saying
              </span>
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-soft border-primary/10">
              <CardContent className="p-8">
                <div className="text-center">
                  <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
                  <blockquote className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                      {testimonials[activeTestimonial].avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{testimonials[activeTestimonial].name}</p>
                      <p className="text-muted-foreground">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial ? 'bg-primary' : 'bg-primary/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Shape Your Future?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of Kenyan students who are already using AI to discover 
            their perfect career paths and build successful futures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                <Users className="mr-2 h-5 w-5" />
                Join Free Today
              </Button>
            </Link>
            <Link to="/quick-assessment">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                <Brain className="mr-2 h-5 w-5" />
                Try Quick Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeImproved;