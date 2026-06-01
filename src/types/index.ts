export interface TopicMeta {
  slug: string;
  title: string;
  description: string;
  category: TopicCategory;
  order: number;
  version: string;
  lastReviewed: string;
  tags: string[];
}

export interface TopicContent {
  meta: TopicMeta;
  content: string;
}

export interface TopicCategory {
  id: string;
  title: string;
  topics: TopicMeta[];
}

export interface Section {
  id: string;
  title: string;
  level: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
