export interface TechSkill {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'cloud' | 'ai_data';
  level: 'Expert' | 'Advanced' | 'Proficient';
  yearsOfExp: number;
  iconName: string;
  description: string;
  productionHighlights: string[];
  architecturalPatterns: string[];
  codeSample?: {
    title: string;
    language: string;
    code: string;
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  category: string;
  clientOrDomain: string;
  year: string;
  scale: string;
  summary: string;
  liveUrl?: string;
  githubUrl?: string;
  challenge: {
    context: string;
    painPoints: string[];
    constraints: string[];
  };
  architecturalSolution: {
    coreApproach: string;
    keyDecisions: {
      decision: string;
      rationale: string;
      alternativeConsidered: string;
    }[];
    diagramSteps: {
      step: number;
      name: string;
      desc: string;
      component: string;
      highlightZone?: string;
    }[];
  };
  tradeoffs: {
    accepted: string;
    mitigation: string;
  }[];
  metrics: {
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
  }[];
  techStackIds: string[];
  deliverables: string[];
}

export interface ArchitectureTenet {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  ruleOfThumb: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  badge: string;
  highlights: string[];
  architecturesLed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  notes?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  status: string;
}

