export interface BenefitItem {
  id: string;
  title: string;
  description: string;
}

export interface BonusItem {
  id: string;
  number: number;
  title: string;
  description: string;
  originalPrice: number;
  tag: string;
  image?: string;
  fallbackImage?: string;
}

export interface DrillItem {
  id: string;
  category: string;
  title: string;
  description: string;
  objective: string;
  organization: string;
  development: string[];
  variations: string[];
  // SVG positioning elements for drawing the soccer pitch diagram
  players: { x: number; y: number; team: 'red' | 'blue' | 'cone' | 'ball'; label?: string }[];
  lines: { x1: number; y1: number; x2: number; y2: number; type: 'pass' | 'run' | 'dribble' }[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  achievement: string;
  avatarSeed: string;
  avatarUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}


