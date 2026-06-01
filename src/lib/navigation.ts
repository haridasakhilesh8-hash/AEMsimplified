export interface NavItem {
  slug: string;
  title: string;
  badge?: string;
}

export interface NavCategory {
  id: string;
  title: string;
  icon: string;
  items: NavItem[];
}

export const navigation: NavCategory[] = [
  {
    id: 'fundamentals',
    title: 'AEM Fundamentals',
    icon: '🏗️',
    items: [
      { slug: 'architecture', title: 'Architecture' },
      { slug: 'jcr', title: 'JCR' },
      { slug: 'crxde', title: 'CRXDE' },
    ],
  },
  {
    id: 'development',
    title: 'Development',
    icon: '⚙️',
    items: [
      { slug: 'components', title: 'Components' },
      { slug: 'templates', title: 'Templates' },
      { slug: 'editable-templates', title: 'Editable Templates' },
      { slug: 'sling', title: 'Sling' },
      { slug: 'sling-models', title: 'Sling Models' },
      { slug: 'htl', title: 'HTL' },
      { slug: 'client-libraries', title: 'Client Libraries' },
      { slug: 'osgi', title: 'OSGi' },
    ],
  },
  {
    id: 'content',
    title: 'Content Management',
    icon: '📄',
    items: [
      { slug: 'content-fragments', title: 'Content Fragments' },
      { slug: 'experience-fragments', title: 'Experience Fragments' },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    icon: '🚀',
    items: [
      { slug: 'dispatcher', title: 'Dispatcher' },
      { slug: 'msm', title: 'MSM' },
      { slug: 'workflows', title: 'Workflows' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    icon: '☁️',
    items: [
      { slug: 'aem-cloud-service', title: 'AEM Cloud Service' },
      { slug: 'graphql', title: 'GraphQL' },
    ],
  },
];

export function getAllSlugs(): string[] {
  return navigation.flatMap((cat) => cat.items.map((item) => item.slug));
}

export function getTopicTitle(slug: string): string {
  for (const cat of navigation) {
    const item = cat.items.find((i) => i.slug === slug);
    if (item) return item.title;
  }
  return slug;
}

export function getCategoryForSlug(slug: string): NavCategory | undefined {
  return navigation.find((cat) => cat.items.some((i) => i.slug === slug));
}

export function getRelatedSlugs(slug: string): NavItem[] {
  const cat = getCategoryForSlug(slug);
  if (!cat) return [];
  return cat.items.filter((i) => i.slug !== slug).slice(0, 4);
}
