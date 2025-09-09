// CBE (Competency-Based Education) Curriculum Knowledge Base for Kenya
// Based on KICD curriculum framework and career pathways

export interface CBESubject {
  id: string
  name: string
  code: string
  description: string
  gradelevels: number[]
  isCore: boolean
  pathway?: CareerPathway
  track?: string
  competencies: string[]
  careerRelevance: string[]
}

export interface CareerPathway {
  id: string
  name: string
  description: string
  tracks: Track[]
  careerOpportunities: string[]
  entryRequirements: string[]
}

export interface Track {
  id: string
  name: string
  description: string
  subjects: string[]
  careerOutcomes: string[]
}

// CBE Career Pathways (Grade 10-12)
export const CBE_CAREER_PATHWAYS: CareerPathway[] = [
  {
    id: 'stem',
    name: 'STEM (Science, Technology, Engineering & Mathematics)',
    description: 'Focuses on scientific inquiry, technological innovation, engineering design, and mathematical reasoning',
    tracks: [
      {
        id: 'pure-sciences',
        name: 'Pure Sciences',
        description: 'Theoretical and research-oriented scientific disciplines',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
        careerOutcomes: [
          'Medical Doctor', 'Research Scientist', 'Pharmacist', 'Veterinarian',
          'Biotechnologist', 'Environmental Scientist', 'Physicist', 'Chemist'
        ]
      },
      {
        id: 'applied-sciences',
        name: 'Applied Sciences',
        description: 'Practical application of scientific principles',
        subjects: ['Computer Science', 'Home Science', 'Agriculture', 'Mathematics'],
        careerOutcomes: [
          'Software Developer', 'Data Scientist', 'Agricultural Engineer',
          'Food Scientist', 'Nutritionist', 'IT Specialist', 'Systems Analyst'
        ]
      },
      {
        id: 'technical-studies',
        name: 'Technical Studies',
        description: 'Hands-on technical and engineering skills',
        subjects: [
          'Aviation Technology', 'Building Construction', 'Electrical Technology',
          'Metal Work', 'Power Mechanics', 'Woodwork', 'Media Technology',
          'Marine and Fisheries Technology'
        ],
        careerOutcomes: [
          'Civil Engineer', 'Electrical Engineer', 'Mechanical Engineer',
          'Architect', 'Pilot', 'Marine Engineer', 'Media Producer', 'Technician'
        ]
      }
    ],
    careerOpportunities: [
      'Engineering', 'Medicine', 'Technology', 'Research', 'Aviation',
      'Agriculture', 'Construction', 'Manufacturing', 'Energy'
    ],
    entryRequirements: [
      'Strong performance in Mathematics and Sciences',
      'Logical thinking and problem-solving skills',
      'Interest in innovation and technology'
    ]
  },
  {
    id: 'social-sciences',
    name: 'Social Sciences',
    description: 'Study of human society, behavior, and social relationships',
    tracks: [
      {
        id: 'humanities',
        name: 'Humanities',
        description: 'Study of human culture, history, and society',
        subjects: ['History & Government', 'Geography', 'Religious Studies', 'Philosophy'],
        careerOutcomes: [
          'Lawyer', 'Diplomat', 'Historian', 'Political Scientist',
          'Social Worker', 'Journalist', 'Teacher', 'Civil Servant'
        ]
      },
      {
        id: 'business-studies',
        name: 'Business Studies',
        description: 'Commerce, entrepreneurship, and business management',
        subjects: ['Business Studies', 'Economics', 'Accounting', 'Entrepreneurship'],
        careerOutcomes: [
          'Business Manager', 'Entrepreneur', 'Accountant', 'Economist',
          'Marketing Manager', 'Financial Analyst', 'Banker', 'Consultant'
        ]
      },
      {
        id: 'languages',
        name: 'Languages & Communication',
        description: 'Language skills and communication competencies',
        subjects: ['English', 'Kiswahili', 'French', 'German', 'Arabic'],
        careerOutcomes: [
          'Translator', 'Interpreter', 'Journalist', 'Editor',
          'Communications Specialist', 'Diplomat', 'Teacher', 'Writer'
        ]
      }
    ],
    careerOpportunities: [
      'Law', 'Government', 'Business', 'Education', 'Media',
      'International Relations', 'Social Work', 'Banking'
    ],
    entryRequirements: [
      'Strong communication skills',
      'Interest in human behavior and society',
      'Critical thinking abilities'
    ]
  },
  {
    id: 'arts-sports',
    name: 'Arts & Sports Science',
    description: 'Creative arts, physical education, and sports science',
    tracks: [
      {
        id: 'creative-arts',
        name: 'Creative Arts',
        description: 'Visual and performing arts',
        subjects: ['Art & Design', 'Music', 'Drama', 'Media Studies'],
        careerOutcomes: [
          'Artist', 'Musician', 'Actor', 'Designer', 'Filmmaker',
          'Photographer', 'Art Director', 'Creative Director'
        ]
      },
      {
        id: 'sports-science',
        name: 'Sports Science',
        description: 'Physical education and sports management',
        subjects: ['Physical Education', 'Sports Science', 'Health Education'],
        careerOutcomes: [
          'Sports Coach', 'Physical Therapist', 'Sports Manager',
          'Fitness Trainer', 'Sports Journalist', 'Recreation Director'
        ]
      }
    ],
    careerOpportunities: [
      'Entertainment', 'Sports', 'Media', 'Design', 'Fitness',
      'Recreation', 'Arts Management', 'Creative Industries'
    ],
    entryRequirements: [
      'Creative abilities and artistic talent',
      'Physical fitness and coordination',
      'Passion for arts or sports'
    ]
  }
]

// CBE Subjects with detailed information
export const CBE_SUBJECTS: CBESubject[] = [
  // Core subjects (Grades 1-12)
  {
    id: 'mathematics',
    name: 'Mathematics',
    code: 'MATH',
    description: 'Mathematical reasoning, problem-solving, and quantitative analysis',
    gradelevels: [1,2,3,4,5,6,7,8,9,10,11,12],
    isCore: true,
    competencies: [
      'Number operations', 'Algebraic thinking', 'Geometric reasoning',
      'Data analysis', 'Problem solving', 'Mathematical communication'
    ],
    careerRelevance: [
      'Engineering', 'Finance', 'Data Science', 'Research', 'Technology',
      'Architecture', 'Economics', 'Statistics'
    ]
  },
  {
    id: 'english',
    name: 'English',
    code: 'ENG',
    description: 'English language communication, literature, and literacy',
    gradelevels: [1,2,3,4,5,6,7,8,9,10,11,12],
    isCore: true,
    competencies: [
      'Reading comprehension', 'Writing skills', 'Oral communication',
      'Literary analysis', 'Critical thinking', 'Language use'
    ],
    careerRelevance: [
      'Journalism', 'Law', 'Education', 'Communications', 'Literature',
      'Public Relations', 'Translation', 'Media'
    ]
  },
  {
    id: 'kiswahili',
    name: 'Kiswahili',
    code: 'KIS',
    description: 'Kiswahili language, literature, and cultural studies',
    gradelevels: [1,2,3,4,5,6,7,8,9,10,11,12],
    isCore: true,
    competencies: [
      'Language proficiency', 'Cultural understanding', 'Communication',
      'Literature appreciation', 'Writing skills', 'Oral expression'
    ],
    careerRelevance: [
      'Education', 'Translation', 'Media', 'Cultural Studies',
      'Government', 'Tourism', 'International Relations'
    ]
  },
  // STEM Subjects
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY',
    description: 'Study of matter, energy, and their interactions',
    gradelevels: [9,10,11,12],
    isCore: false,
    pathway: CBE_CAREER_PATHWAYS[0], // STEM
    track: 'pure-sciences',
    competencies: [
      'Scientific inquiry', 'Mathematical modeling', 'Experimental design',
      'Data analysis', 'Problem solving', 'Critical thinking'
    ],
    careerRelevance: [
      'Engineering', 'Research', 'Technology', 'Medicine', 'Aviation',
      'Energy', 'Telecommunications', 'Space Science'
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHEM',
    description: 'Study of matter, chemical reactions, and molecular interactions',
    gradelevels: [9,10,11,12],
    isCore: false,
    pathway: CBE_CAREER_PATHWAYS[0], // STEM
    track: 'pure-sciences',
    competencies: [
      'Chemical analysis', 'Laboratory skills', 'Molecular understanding',
      'Safety procedures', 'Data interpretation', 'Scientific method'
    ],
    careerRelevance: [
      'Medicine', 'Pharmacy', 'Chemical Engineering', 'Research',
      'Manufacturing', 'Environmental Science', 'Forensics', 'Agriculture'
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    code: 'BIO',
    description: 'Study of living organisms and life processes',
    gradelevels: [9,10,11,12],
    isCore: false,
    pathway: CBE_CAREER_PATHWAYS[0], // STEM
    track: 'pure-sciences',
    competencies: [
      'Biological systems understanding', 'Scientific investigation',
      'Data collection and analysis', 'Laboratory techniques',
      'Environmental awareness', 'Health and safety'
    ],
    careerRelevance: [
      'Medicine', 'Veterinary', 'Biotechnology', 'Environmental Science',
      'Agriculture', 'Research', 'Public Health', 'Conservation'
    ]
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    code: 'COMP',
    description: 'Computing, programming, and digital technology',
    gradelevels: [9,10,11,12],
    isCore: false,
    pathway: CBE_CAREER_PATHWAYS[0], // STEM
    track: 'applied-sciences',
    competencies: [
      'Programming', 'Problem solving', 'Computational thinking',
      'Digital literacy', 'System design', 'Data management'
    ],
    careerRelevance: [
      'Software Development', 'Data Science', 'Cybersecurity',
      'AI/ML Engineering', 'Web Development', 'Game Development',
      'IT Support', 'System Administration'
    ]
  }
  // Additional subjects would be added here...
]

// Career guidance prompts and context
export const CBE_CAREER_CONTEXT = `
You are an expert career counselor specializing in Kenya's Competency-Based Education (CBE) curriculum. 

KEY CBE INFORMATION:
- CBE has 3 main career pathways starting from Grade 10: STEM, Social Sciences, and Arts & Sports Science
- Students choose their pathway at the end of Grade 9 (around age 14-15)
- Each pathway has multiple tracks with specific subjects and career outcomes
- The system emphasizes competency development over rote learning

CAREER PATHWAYS:
1. STEM: Pure Sciences, Applied Sciences, Technical Studies
2. Social Sciences: Humanities, Business Studies, Languages
3. Arts & Sports: Creative Arts, Sports Science

Your role is to:
- Understand student interests, strengths, and aspirations
- Provide personalized career guidance based on CBE pathways
- Explain subject combinations and their career implications
- Consider Kenyan job market and opportunities
- Be encouraging and supportive while being realistic
- Ask follow-up questions to better understand the student

Always provide specific, actionable advice relevant to the Kenyan context and CBE system.
`
