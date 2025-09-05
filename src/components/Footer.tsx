import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 gradient-primary rounded-lg shadow-glow">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">CBE Career AI</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Empowering Kenyan students under the CBE curriculum with AI-powered career guidance 
              and personalized learning paths for a brighter future.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-smooth" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-smooth" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-smooth" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/quick-assessment" className="text-muted-foreground hover:text-primary transition-smooth">Quick Assessment</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-smooth">Career Paths</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth">About CBE</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-primary transition-smooth">Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@cbecareerai.co.ke</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 CBE Career AI. All rights reserved. Built for Kenyan students with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;