## Quick Understanding

A template is a blueprint for creating pages. It defines the initial structure, allowed components, and default content. Think of it like a document template in Microsoft Word — you open it, fill in your content, and get a consistent result.

## What Is It?

In AEM, a template defines:

- **Page structure** — What components are already on the page when created
- **Allowed components** — Which components authors can add to different parts of the page
- **Policies** — What configuration options are available for each component (like which image sizes are allowed)
- **Initial content** — Default text, images, and settings for the page

There are two types of templates in AEM:
- **Static templates** — The old way (pre-AEM 6.3)
- **Editable templates** — The modern way (AEM 6.3+)

## Why Do We Need It?

Templates enforce consistency across the website. Without templates:

- Every page could look completely different
- Authors could add components that break the design
- You'd need custom code to restrict what authors can do
- New pages would start empty every time

Templates allow you to define once — "a product page has a header, breadcrumb, product details, and footer" — and every product page automatically follows that structure.

## What Happens In Real Projects?

In enterprise projects, templates are planned during the design phase:

**Template discovery:** The UX team provides wireframes for different page types: Article Page, Product Page, Landing Page, etc. Each wireframe becomes a template.

**Template implementation:** A developer creates each template using the Editable Template editor or XML definitions. They configure:
- Which layout container goes where
- Which components are allowed in each container
- What the default styling looks like
- What initial content the page starts with

**Author training:** Authors learn which template to use for different scenarios. "Use the Article template for blog posts, the Product template for product pages."

**Evolution:** Templates get updated over time. New components get added to allowed lists. Old policies get refined.

## How It Works

1. An author creates a new page and selects a template
2. AEM creates a page with all the structure defined in the template
3. The author adds and edits content within the constraints of the template
4. The template policies control what authors can configure
5. When the page renders, the template's structure and policies determine the output

Template policies are stored separately from page content. This means when you update a policy (e.g., adding a new allowed image size), all pages using that template automatically get the update.

## Example

**Template structure for an "Article Page":**
```
/conf/myproject/settings/wcm/templates/article-page/
  ├── initial/
  │   └── jcr:content/         (Initial page structure)
  │       ├── header
  │       ├── breadcrumb
  │       ├── main/
  │       │   ├── title
  │       │   ├── content
  │       │   └── related-articles
  │       └── footer
  ├── policies/                 (Component policies)
  │   ├── title-policy
  │   ├── content-policy
  │   └── related-policy
  └── structure/               (Locked page structure)
```

The initial content defines what's on the page when created. The structure defines parts that can't be changed. Policies define what options authors have for each component.

## Common Confusions

**Template vs. Page:** A template is the blueprint. A page is an instance created from that blueprint. Changing the template doesn't change existing pages unless you explicitly roll out the changes.

**Editable vs. Static templates:** Static templates are XML files under `/apps/`. Editable templates are stored under `/conf/` and can be modified through the UI. Always use Editable Templates for new projects.

**Template vs. Component:** A template defines the page structure (which components, where). A component is an individual building block placed on the page.

## Common Production Issues

**Template not showing up:** The template isn't allowed under the selected parent page. Check the `allowedPaths` property on the template.

**Components missing from allowed list:** A component isn't showing in the component browser. Either it's not in the template's allowed components list, or there's a problem with the component definition.

**Policy changes not applying:** Authors can't see new dialog options. Policies are cached. Try invalidating the template cache or republishing.

## Best Practices

- Use Editable Templates for all new projects
- Create separate templates for distinct page types
- Keep template policies organized with clear naming
- Use `allowedPaths` to control where templates can be used
- Version your templates before making major changes
- Document what each template is for and when to use it
- Train authors on which templates to use for different scenarios

## Architect's Note

**Templates are where design meets development.** The template design determines what authors can and can't do. Too restrictive and authors feel handcuffed. Too permissive and the site looks inconsistent.

I recommend this approach:
- Start with 3–5 core templates (Article, Product, Landing, Search, Error)
- Add more templates only when there's a clear design need
- Use Layout Container components to give authors flexibility within constraints
- Review templates quarterly to see if they need updates based on author feedback

The best templates are the ones authors don't have to think about — they just work.

## Frequently Asked Questions

**Q: Can I have multiple templates for the same page type?**
A: Yes, but avoid it. Multiple templates for the same purpose confuse authors. Use one well-designed template with multiple layout options instead.

**Q: What happens to existing pages when I update a template?**
A: Editable Template changes apply only to new pages by default. Existing pages need a template rollout to receive updates.

**Q: Can templates inherit from other templates?**
A: Not directly. But you can use components as building blocks to create reusable patterns across templates.

## Key Takeaways

- Templates are page blueprints that control structure, allowed components, and policies
- Always use Editable Templates for new projects
- Templates enforce consistency without handcuffing authors
- Plan templates during the design phase
- Keep template counts small and focused

## Related Topics

- [Components](/topics/components)
- [Editable Templates](/topics/editable-templates)
- [HTL](/topics/htl)
