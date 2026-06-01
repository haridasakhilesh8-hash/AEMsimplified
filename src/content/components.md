## Quick Understanding

Components are the building blocks of every AEM page — think of them like LEGO bricks. A component is a reusable piece of functionality (like a button, carousel, or navigation) that authors can place on pages.

## What Is It?

An AEM Component is a collection of files that work together to render a piece of content on a web page. Each component typically includes:

- **HTL file** (`.html`) — The template that defines the HTML markup
- **Sling Model / Java class** — Backend logic that prepares data for the template
- **Dialog** (`.xml`) — Configuration interface that authors use to edit content
- **Client libraries** (`.css`/`.js`) — Styles and behaviors for the component

Components live under `/apps/<project>/components/` in the repository.

## Why Do We Need It?

Without components, every page would be a static HTML file. Components provide:

- **Reusability** — Build once, use across hundreds of pages
- **Author empowerment** — Content editors can build pages without developers
- **Consistency** — Every instance of a component looks and behaves the same way
- **Maintainability** — Fix a bug in one place, it's fixed everywhere
- **Separation of concerns** — Authors edit content, developers build components

## What Happens In Real Projects?

In enterprise AEM projects, the component library is your team's most valuable asset. Here's how it works day-to-day:

**Component planning:** Before writing code, teams plan the component library. You'll have atomic components (buttons, icons), composite components (cards, forms), and page-level components (header, footer).

**Component creation:** A developer creates the component structure, writes the HTL, implements the Sling Model, and designs the dialog. The component gets reviewed and tested.

**Authoring:** Content editors drag your component onto a page and fill in the dialog fields. The component renders on the publish instance for end users.

**Versioning:** Components evolve. You add new dialog fields, change markup, or deprecate old behavior — all while keeping backward compatibility.

## How It Works

1. An author opens a page in the AEM editor
2. They drag a component from the component browser onto the page
3. AEM creates a **node** in the JCR under the page with the component's resource type
4. The author opens the component's dialog and fills in content
5. When the page renders, AEM resolves the component's resource type to its scripts
6. The Sling Model prepares the data model
7. The HTL template generates HTML
8. The page is served to the end user (possibly through the Dispatcher cache)

## Example

Here's a simplified "Teaser" component:

**Component structure:**
```
/apps/myproject/components/teaser/
  ├── teaser.html           (HTL template)
  ├── _cq_dialog/
  │   └── .content.xml      (Author dialog)
  └── .content.xml          (Component definition)
```

**HTL template (`teaser.html`):**
```html
<div class="teaser" data-sly-use.teaser="com.myproject.models.TeaserModel">
  <h2 class="teaser__title">${teaser.title}</h2>
  <p class="teaser__description">${teaser.description}</p>
  <a href="${teaser.linkUrl}" class="teaser__cta">${teaser.linkText}</a>
</div>
```

**Sling Model (Java):**
```java
@Model(adaptables = Resource.class)
public class TeaserModel {
    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String linkUrl;

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getLinkUrl() { return linkUrl; }
}
```

## Common Confusions

**Component vs. Template:** A component is a building block. A template defines the page structure — which components are allowed, what the initial content is, and what layout is used.

**Resource type vs. Path:** The resource type (`myproject/components/teaser`) tells AEM which scripts to use. The resource path (`/content/we-retail/en/products/jcr:content/teaser`) tells AEM where the content is stored.

**Component inheritance:** Components can extend other components using `sling:resourceSuperType`. This is powerful but can create confusing hierarchies if overused.

## Common Production Issues

**Missing dependencies:** A component works locally but fails on publish because the Java model class wasn't included in the bundle.

**Dialog not saving:** The dialog field name doesn't match what the Sling Model expects. Double-check `name` properties in dialog XML against `@ValueMapValue` fields.

**Styling conflicts:** Components leak CSS because client libraries aren't properly scoped. Always namespace your CSS classes.

**Performance:** Components with too many request attributes or nested inclusions slow down page rendering. Cache what you can.

## Best Practices

- Name components descriptively: `teaser`, `carousel`, `product-card` — not `comp1`, `comp2`
- Keep dialogs clean — group related fields in tabs and sections
- Use meaningful field names that match your Java model properties
- Always provide component icons so authors can find them visually
- Write defensive HTL — handle null values gracefully
- Add component documentation in `cq:Panel` or README
- Version your components using semantic versioning in the package

## Architect's Note

**The component library is your project's API for content authors.** A well-designed component library makes authors productive. A poorly designed one creates support tickets and frustration.

Spend 80% of your component design time on the **dialog experience** — that's what authors interact with. The backend implementation is usually straightforward if the dialog is well-thought-out.

Pro tip: Create a "Component Design Document" before coding. It should include:
- What content does this component manage?
- What variations does it need? (e.g., small/medium/large hero)
- What are the business rules? (e.g., "description must be under 200 characters")
- What accessibility requirements must it meet?

## Frequently Asked Questions

**Q: How many components should a typical AEM project have?**
A: 30–50 well-designed components cover most enterprise needs. More components don't mean better — focus on flexibility and reusability.

**Q: Can one component extend another?**
A: Yes, using `sling:resourceSuperType`. The child component inherits scripts and dialogs from the parent. Use this sparingly — deep inheritance hierarchies are hard to debug.

**Q: What's the difference between a component and a core component?**
A: Core Components are Adobe's official set of standard components. You can use them as-is, extend them, or build your own from scratch. Most projects use a mix of both.

## Key Takeaways

- Components are reusable building blocks for AEM pages
- Every component = template + dialog + (optional) backend logic
- Design components from the author's perspective, not the developer's
- Keep component hierarchies flat — prefer composition over inheritance
- A good component library is the foundation of a successful AEM project

## Related Topics

- [Templates](/topics/templates)
- [Editable Templates](/topics/editable-templates)
- [HTL](/topics/htl)
- [Sling Models](/topics/sling-models)
