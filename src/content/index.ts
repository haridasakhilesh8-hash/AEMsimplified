import type { TopicContent } from './types';
import { components } from './components';
import { slingModels } from './sling-models';
import { htl } from './htl';
import { dispatcher } from './dispatcher';
import { contentFragments } from './content-fragments';
import { experienceFragments } from './experience-fragments';
import { osgi } from './osgi';
import { editableTemplates } from './editable-templates';
import { aemCloudService } from './aem-cloud-service';
import { templates } from './templates';
import { architecture, jcr, crxde, sling, clientLibraries, msm, workflows, graphql } from './stubs';

const contentMap: Record<string, TopicContent> = {
  'components': components,
  'sling-models': slingModels,
  'htl': htl,
  'dispatcher': dispatcher,
  'content-fragments': contentFragments,
  'experience-fragments': experienceFragments,
  'osgi': osgi,
  'editable-templates': editableTemplates,
  'aem-cloud-service': aemCloudService,
  'templates': templates,
  'architecture': architecture,
  'jcr': jcr,
  'crxde': crxde,
  'sling': sling,
  'client-libraries': clientLibraries,
  'msm': msm,
  'workflows': workflows,
  'graphql': graphql,
};

export function getTopicContent(slug: string): TopicContent | null {
  return contentMap[slug] || null;
}

export function getAllTopics(): TopicContent[] {
  return Object.values(contentMap);
}

export type { TopicContent };
