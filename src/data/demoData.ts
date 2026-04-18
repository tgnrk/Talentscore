import type { Candidate } from '../types';

export const DEFAULT_JOB_DESCRIPTION = `Senior Full-Stack Engineer

About the Role:
We're looking for an experienced full-stack engineer to join our product team and help build the next generation of our HR technology platform.

Requirements:
- 5+ years experience in web development
- Strong proficiency in React, TypeScript, and Node.js
- Experience with Python and FastAPI or Django
- Database design (PostgreSQL, MongoDB)
- Cloud services (AWS or GCP)
- CI/CD pipelines and DevOps practices
- Strong communication and team collaboration skills

Nice to Have:
- Machine learning experience
- Experience with microservices architecture
- Kubernetes and Docker expertise
- Previous experience in HR tech or SaaS products`;

export const demoCandidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.example',
    location: 'London, UK',
    experienceYears: 7,
    skills: [
      'React',
      'TypeScript',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Kubernetes',
      'GraphQL',
      'CI/CD',
    ],
    matchedSkills: [
      'React',
      'TypeScript',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Kubernetes',
      'CI/CD',
    ],
    missingSkills: ['MongoDB', 'Machine Learning'],
    score: 91,
    verdict: 'STRONG_YES',
    strengths: [
      'Exceptional React/TS proficiency',
      'Strong Python/FastAPI backend delivery',
      'Top-tier UK company track record (Deliveroo, Monzo, BBC)',
      'Cloud-native experience with AWS, Docker, and Kubernetes',
    ],
    concerns: ['No MongoDB in recent roles', 'No demonstrated ML experience'],
    interviewQuestions: [
      {
        category: 'Technical',
        question:
          'We use PostgreSQL heavily but also MongoDB for certain document workloads. How would you approach learning MongoDB patterns if you joined, and what is one trade-off you would watch for?',
        rationale:
          'Tests willingness to close the MongoDB gap without overstating current depth.',
      },
      {
        category: 'Technical',
        question:
          'Describe how you would design a FastAPI service that needs to scale reads under bursty traffic while keeping PostgreSQL healthy.',
        rationale: 'Validates depth on FastAPI + Postgres, which is core to the role.',
      },
      {
        category: 'Experience',
        question:
          'Tell me about a time you improved reliability or performance for a production React + API stack. What metrics guided you?',
        rationale: 'Checks senior delivery judgment across the full stack.',
      },
      {
        category: 'Behavioral',
        question:
          'Deliveroo and Monzo are high-pace environments. How do you balance speed with code quality when stakeholders push for shipping?',
        rationale: 'Culture and working-style signal for a product engineering team.',
      },
      {
        category: 'Culture Fit',
        question:
          'HR tech platforms often involve sensitive employee data. How do you think about security and privacy when building features?',
        rationale: 'Relevant for SaaS in the people space; complements the ML gap topic.',
      },
    ],
    workHistory: [
      {
        title: 'Senior Software Engineer',
        company: 'Deliveroo',
        period: '2022–Present',
        description: 'Full-stack product work on high-scale consumer experiences.',
      },
      {
        title: 'Full-Stack Developer',
        company: 'Monzo Bank',
        period: '2019–2022',
        description: 'Banking-grade services with strong reliability requirements.',
      },
      {
        title: 'Junior Developer',
        company: 'BBC Digital',
        period: '2017–2019',
        description: 'Foundation in modern web delivery for large public audiences.',
      },
    ],
    education: [
      {
        degree: 'MSc Computer Science',
        institution: 'Imperial College London',
      },
    ],
    summary:
      'Seasoned full-stack engineer with deep React/TypeScript and Python/FastAPI experience across UK scale-ups and public-sector digital. Strong cloud-native delivery with AWS, Docker, Kubernetes, and CI/CD.',
    aiRecommendation:
      'Recommend advancing Sarah to a final round. She maps extremely well to the core stack and seniority bar, with only secondary gaps (MongoDB, ML) that are coachable for this role.',
    scores: {
      overall: 91,
      skills: 94,
      experience: 92,
      education: 88,
      culture: 86,
    },
    radarScores: {
      technical: 95,
      communication: 88,
      leadership: 82,
      problemSolving: 93,
      adaptability: 90,
    },
  },
  {
    id: 'cand-2',
    name: 'James Okafor',
    email: 'james.okafor@email.example',
    location: 'Manchester, UK',
    experienceYears: 4,
    skills: [
      'React',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Git',
      'Python',
      'HTML/CSS',
      'REST APIs',
    ],
    matchedSkills: ['React', 'JavaScript', 'Python', 'MongoDB'],
    missingSkills: [
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Kubernetes',
      'CI/CD',
    ],
    score: 64,
    verdict: 'MAYBE',
    strengths: [
      'Solid React fundamentals',
      'Hands-on MongoDB experience',
      'Shows initiative via freelance delivery',
      'Comfortable with Node/Express APIs',
    ],
    concerns: [
      'Below 5+ years experience for the stated bar',
      'Missing TypeScript',
      'Limited evidence of cloud and DevOps (AWS, Docker, K8s, CI/CD)',
      'No FastAPI/PostgreSQL depth highlighted',
    ],
    interviewQuestions: [
      {
        category: 'Technical',
        question:
          'How would you migrate a medium-sized React codebase from JavaScript to TypeScript? What is the first PR you would ship?',
        rationale: 'Directly addresses the TypeScript gap.',
      },
      {
        category: 'Technical',
        question:
          'Compare PostgreSQL vs MongoDB for a transactional HR workflow with audits and reporting. Where would you choose each?',
        rationale: 'Tests database design depth beyond MongoDB-only experience.',
      },
      {
        category: 'Experience',
        question:
          'Describe a production bug or outage you debugged end-to-end. How did you narrow it down between frontend and backend?',
        rationale: 'Seniority signal despite fewer years—judgment under pressure.',
      },
      {
        category: 'Technical',
        question:
          'Have you worked with CI/CD or cloud deployments? If limited, how would you learn AWS foundations quickly on a product team?',
        rationale: 'Surfaces honesty on infra gaps while checking learning velocity.',
      },
      {
        category: 'Culture Fit',
        question:
          'We collaborate closely with recruiters and PMs. How do you get clarity when requirements feel ambiguous?',
        rationale: 'Maps to communication expectations in HR tech products.',
      },
    ],
    workHistory: [
      {
        title: 'Frontend Developer',
        company: 'AO.com',
        period: '2022–Present',
        description: 'Building customer-facing web experiences.',
      },
      {
        title: 'Junior Developer (Freelance)',
        company: 'Independent',
        period: '2020–2022',
        description: 'Self-directed delivery across small business projects.',
      },
    ],
    education: [
      {
        degree: 'BSc Software Engineering',
        institution: 'University of Manchester',
      },
    ],
    summary:
      'Frontend-leaning full-stack developer with React/Node strengths and MongoDB usage. Good potential, but several core requirements (TypeScript, Postgres, cloud/DevOps) need validation or upskilling.',
    aiRecommendation:
      'Consider a technical screen focused on TypeScript and backend depth. Proceed only if he demonstrates fast ramp on Postgres/AWS/CI/CD—or adjust level/mentorship plan.',
    scores: {
      overall: 64,
      skills: 58,
      experience: 60,
      education: 72,
      culture: 74,
    },
    radarScores: {
      technical: 55,
      communication: 70,
      leadership: 52,
      problemSolving: 63,
      adaptability: 76,
    },
  },
  {
    id: 'cand-3',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.example',
    location: 'Birmingham, UK',
    experienceYears: 6,
    skills: [
      'React',
      'TypeScript',
      'Python',
      'Django',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Terraform',
      'Redis',
      'GraphQL',
      'Team Leadership',
    ],
    matchedSkills: [
      'React',
      'TypeScript',
      'Python',
      'PostgreSQL',
      'AWS',
      'Docker',
    ],
    missingSkills: ['FastAPI', 'Node.js', 'Kubernetes', 'CI/CD pipelines'],
    interviewQuestions: [
      {
        category: 'Technical',
        question:
          'Our services are increasingly FastAPI-based. How would you approach building a new endpoint with strict validation, observability, and test coverage coming from a Django background?',
        rationale: 'Checks framework transfer and API rigor.',
      },
      {
        category: 'Technical',
        question:
          'Where have you used Kubernetes—or if not, how would you containerize and roll out a multi-service change safely?',
        rationale: 'Directly probes the K8s gap with a practical lens.',
      },
      {
        category: 'Technical',
        question:
          'The role mentions Node.js in places. What is your comfort integrating a Node service with a Python API ecosystem?',
        rationale: 'Surfaces honest Node depth while mapping to team topology.',
      },
      {
        category: 'Experience',
        question:
          'As a lead, tell me about a time you improved team throughput without sacrificing quality. What changed?',
        rationale: 'Leverages leadership strength; culture fit for scaling teams.',
      },
      {
        category: 'Behavioral',
        question:
          'CI/CD can be noisy. How do you decide which pipelines and checks are “must-have” vs “nice-to-have”?',
        rationale: 'Targets the CI/CD detail gap with senior judgment.',
      },
    ],
    strengths: [
      'Strong full-stack delivery with React + TypeScript',
      'Meaningful leadership experience',
      'AWS certified with Terraform/Docker usage',
      'Enterprise + scale-up mix (JLR, Gymshark, Capgemini)',
    ],
    concerns: [
      'Django vs FastAPI alignment',
      'Kubernetes not clearly demonstrated',
      'CI/CD depth not explicit in recent highlights',
    ],
    score: 82,
    verdict: 'YES',
    workHistory: [
      {
        title: 'Lead Developer',
        company: 'Gymshark',
        period: '2023–Present',
        description: 'Leading engineering delivery for digital commerce initiatives.',
      },
      {
        title: 'Full-Stack Engineer',
        company: 'Jaguar Land Rover Digital',
        period: '2021–2023',
        description: 'Enterprise software engineering with reliability constraints.',
      },
      {
        title: 'Software Developer',
        company: 'Capgemini',
        period: '2020–2021',
        description: 'Consulting delivery across client engineering engagements.',
      },
    ],
    education: [
      {
        degree: 'BEng Computer Engineering',
        institution: 'University of Birmingham',
      },
      {
        degree: 'AWS Solutions Architect — Associate',
        institution: 'Amazon Web Services (Certification)',
        year: '',
      },
    ],
    summary:
      'Strong senior full-stack profile with leadership, AWS depth, and solid React/TypeScript + Python + Postgres experience. Minor mismatches on FastAPI/Kubernetes/CI/CD narrative, but overall a credible hire with coaching paths.',
    aiRecommendation:
      'Recommend interview loop with a heavier FastAPI + DevOps deep dive. Strong hire likelihood if K8s/CI/CD gaps are narrower than the CV suggests.',
    scores: {
      overall: 82,
      skills: 84,
      experience: 86,
      education: 78,
      culture: 88,
    },
    radarScores: {
      technical: 86,
      communication: 84,
      leadership: 92,
      problemSolving: 85,
      adaptability: 83,
    },
  },
  {
    id: 'cand-4',
    name: 'Tom Wilson',
    email: 'tom.wilson@email.example',
    location: 'Leeds, UK (Remote)',
    experienceYears: 3,
    skills: [
      'Python',
      'Django',
      'FastAPI',
      'PostgreSQL',
      'SQL',
      'Pandas',
      'Docker',
      'Linux',
      'Git',
    ],
    matchedSkills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    missingSkills: [
      'React',
      'TypeScript',
      'Node.js',
      'AWS',
      'Kubernetes',
      'CI/CD',
      'Frontend',
    ],
    score: 45,
    verdict: 'NO',
    strengths: [
      'Strong Python/FastAPI orientation',
      'Good database/SQL fundamentals',
      'Maths background supports analytical work',
      'Docker/Linux comfort for backend workflows',
    ],
    concerns: [
      'No frontend experience for a full-stack role',
      'Below 5+ years for stated senior bar',
      'Limited cloud/Kubernetes/CI/CD signals',
      'Role requires React/TypeScript/Node emphasis',
    ],
    interviewQuestions: [
      {
        category: 'Technical',
        question:
          'If you had 30 days to contribute to a React feature, how would you structure your learning to avoid becoming a bottleneck?',
        rationale: 'Tests realism about the frontend gap without dismissing growth.',
      },
      {
        category: 'Technical',
        question:
          'Walk through how you would secure and version a FastAPI service deployed to production. What would you instrument first?',
        rationale: 'Keeps interview fair by probing an area of real strength.',
      },
      {
        category: 'Experience',
        question:
          'Tell me about the most complex API you built. How did you model data and handle failures?',
        rationale: 'Validates seniority signals on backend-only trajectory.',
      },
      {
        category: 'Behavioral',
        question:
          'This role partners tightly with designers on UX. How have you collaborated with frontend teams before?',
        rationale: 'Highlights mismatch risk for a frontend-heavy product team.',
      },
      {
        category: 'Culture Fit',
        question:
          'What kind of team environment helps you do your best work when expectations span both product polish and platform reliability?',
        rationale: 'Assesses fit if considering a different role level/track.',
      },
    ],
    workHistory: [
      {
        title: 'Backend Developer',
        company: 'Sky Betting & Gaming',
        period: '2023–Present',
        description: 'Backend services supporting regulated betting products.',
      },
      {
        title: 'Data Intern',
        company: 'NHS Digital',
        period: '2022–2023',
        description: 'Data-focused internship experience in public sector tech.',
      },
    ],
    education: [
      {
        degree: 'BSc Mathematics',
        institution: 'University of Leeds',
      },
    ],
    summary:
      'Capable backend engineer with FastAPI/Postgres strengths, but a poor match for this specific full-stack job description due to missing frontend stack and overall experience level versus requirements.',
    aiRecommendation:
      'Not recommended for this Senior Full-Stack requisition. Could be a fit for backend-heavy roles or junior/mid full-stack with structured frontend upskilling.',
    scores: {
      overall: 45,
      skills: 38,
      experience: 42,
      education: 70,
      culture: 62,
    },
    radarScores: {
      technical: 58,
      communication: 65,
      leadership: 40,
      problemSolving: 68,
      adaptability: 55,
    },
  },
];
