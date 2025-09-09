import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { AIQuickAssessment } from '@/components/AIQuickAssessment';

const QuickAssessment = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="pt-16 py-12 px-4">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-smooth">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <AIQuickAssessment />
        </div>
      </div>
    </div>
  );
};

export default QuickAssessment;