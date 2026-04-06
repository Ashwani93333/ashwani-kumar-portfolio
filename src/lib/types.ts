
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  link?: string;
  github?: string;
  createdAt: number;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  tags: string[];
  publishedAt: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt: number;
}

export interface ProfileData {
  name: string;
  bio: string;
  avatarUrl: string;
  resumeUrl: string;
  skills: string[];
  achievements: string[];
}
