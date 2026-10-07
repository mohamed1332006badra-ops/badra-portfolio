export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface LocalizedArray {
  en: string[];
  ar: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedString;
  tagline: LocalizedString;
  category: 'fullstack' | 'ai' | 'systems' | 'web';
  categoryLabel: LocalizedString;
  featured: boolean;
  technologies: string[];
  problem: LocalizedString;
  solution: LocalizedString;
  architecture: LocalizedString;
  challenges: LocalizedString;
  outcome: LocalizedString;
  status: 'production' | 'completed' | 'active-rd';
  demoUrl?: string;
  repoUrl?: string;
  hasCaseStudy: boolean;
}

export interface ArchitectureStep {
  step: string;
  title: LocalizedString;
  desc: LocalizedString;
}

export interface KeyDecision {
  decision: LocalizedString;
  rationale: LocalizedString;
}

export interface TechnicalChallenge {
  challenge: LocalizedString;
  resolution: LocalizedString;
}

export interface CaseStudy {
  id: string;
  projectId: string;
  title: LocalizedString;
  overview: LocalizedString;
  context: LocalizedString;
  problemStatement: LocalizedString;
  architectureSteps: ArchitectureStep[];
  keyDecisions: KeyDecision[];
  technicalChallenges: TechnicalChallenge[];
  metricsOrOutcome: LocalizedString;
  lessonsLearned: LocalizedString;
}

export interface EngineeringProofItem {
  id: string;
  technology: string;
  category: 'frontend' | 'backend' | 'ai' | 'infra' | 'database';
  role: LocalizedString;
  realUsage: LocalizedString;
  associatedProject: string;
  architecturalNote: LocalizedString;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: LocalizedString;
  summary: LocalizedString;
  problemSolved: LocalizedString;
  solutionApproach: LocalizedString;
  technologies: string[];
  deliverables: LocalizedArray;
  typicalTimeline: LocalizedString;
}

export interface LabExperiment {
  id: string;
  title: LocalizedString;
  badge: string;
  description: LocalizedString;
  category: 'systems' | 'ai' | 'performance';
  type: 'rate-limiter' | 'rag-pipeline' | 'latency-cache';
}

export interface ContactInquiry {
  name: string;
  email: string;
  phoneOrWhatsApp?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  description: string;
}

export interface AiProjectScopeRequest {
  prompt: string;
  projectType?: string;
  targetTimeline?: string;
}

export interface AiProjectScopeResult {
  summary: string;
  recommendedArchitecture: {
    frontend: string;
    backend: string;
    database: string;
    aiComponents?: string;
    hosting: string;
  };
  keyMilestones: Array<{
    phase: string;
    deliverables: string;
  }>;
  technicalRisks: string[];
  suggestedQuestions: string[];
}
