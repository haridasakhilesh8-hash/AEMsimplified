## Quick Understanding

Editable Templates are the modern way to create page blueprints in AEM. Unlike old static templates, they can be modified through the AEM UI without needing a developer to deploy XML files. They give more control to template authors and power users.

## What Is It?

Editable Templates (introduced in AEM 6.3) are template definitions stored under `/conf/` that can be edited through a dedicated template editor UI. They include:

- **Structure** — Locked page components that authors can't remove
- **Initial Content** — Content that appears when a new page is created
- **Policies** — Configuration rules for components (what styles, sizes, features are allowed)
- **Layout** — Responsive grid configuration for different breakpoints

They're controlled by a special template author (different from a content author) who designs the template structure.

## Why Do We Need It?

Static templates (the old way) had major problems:

- Changes required a developer to edit XML and redeploy
- No visual editing — you couldn't see what you were configuring
- Limited policy support — controlling component options was complex
- Hard to manage responsive layouts

Editable Templates solve all of this:
- Template authors can modify templates through a UI
- Changes are applied visually
- Policies give fine-grained control over components
- Built-in responsive grid support

## What Happens In Real Projects?

**Template author role:** In enterprise projects, someone (usually a senior developer or technical lead) manages templates. They use the Template Editor to:

1. Create new templates based on design requirements
2. Configure allowed components for different page sections
3. Set policies that control component behavior
4. Add default content like headers and footers

**Approval flow:** Template changes often go through a review process. When a template update passes, it's rolled out to existing pages.

**Versioning:** Template authors can create multiple versions of a template. For example, you might update the header design and test it on a few pages before rolling it out site-wide.

## How It Works

```
Template Editor Flow:
1. Open Template Editor from Tools > General > Templates
2. Create a new template or edit an existing one
3. Switch between Structure mode and Initial Content mode
4. In Structure mode: add locked components, configure policies
5. In Initial Content mode: add default content for new pages
6. Enable the template so authors can use it
7. (Optional) Roll out changes to existing pages
```

**Policy mechanism:** When you edit a component's policy in a template, you define:
- Allowed features (e.g., allowed heading levels for a Title component)
- Default styles and formatting
- Design options available to content authors
- Responsive behavior

## Example

**Creating a "Landing Page" template:**

1. Go to Tools → General → Templates → Create
2. Select a base template or start from scratch
3. Switch to Structure mode
4. Add a Header component to the top (locked — authors can't remove it)
5. Add a Layout Container for the main content area
6. Configure the Layout Container's policy:
   - Allowed components: Title, Text, Image, Button, Carousel
   - Allowed responsive breakpoints: Phone, Tablet, Desktop
7. Add a Footer component to the bottom (locked)
8. Switch to Initial Content mode
9. Add a default title and text in the main area
10. Save and enable the template

## Common Confusions

**Structure vs. Initial Content:** Structure components are locked and every page has them. Initial content appears when the page is created but can be edited or removed.

**Policies vs. Dialog:** Policies control what options are available for a component. The dialog is where authors use those options. Think of policies as "configure the configurator."

**Template vs. Layout Container:** The template defines the overall page structure. Layout Containers are components within the template that define regions where authors can add other components.

## Common Production Issues

**Policy changes not visible:** Authors report they can't see new dialog options. Solution: Check if the policy is properly applied to the right component and republish both the template and the policy.

**Layout breaks on certain devices:** The responsive grid configuration isn't matching the CSS breakpoints. Ensure the template's breakpoints match your CSS framework.

**Template rollout fails:** Existing pages fail to update. This usually happens because the page structure differs from the template. Create a rollout configuration to handle structural differences.

## Best Practices

- Use the Template Editor UI with caution — always make a backup of the template XML
- Name policies descriptively so you know which template and component they belong to
- Test templates on all device breakpoints before enabling them
- Document which policies affect which components
- Use template locking to prevent accidental changes by content authors
- Roll out template updates in batches — not all at once

## Architect's Note

**Editable Templates are one of AEM's strongest features, but they require discipline.** The flexibility of the Template Editor can lead to template sprawl — too many templates, too many policies, too much complexity.

Follow these rules:
- One template = one distinct page type. Don't create templates for minor variations
- Use policies to handle variations, not multiple templates
- Document each policy and why specific options are allowed or blocked
- Review the template library every quarter and archive unused templates
- Train template authors thoroughly — a misconfigured template affects every page using it

The most successful AEM projects treat their template library as a product that needs managing, not a one-time setup.

## Frequently Asked Questions

**Q: Can I convert a static template to an editable template?**
A: Yes, but it's not a simple flag flip. You'll need to recreate the template structure and migrate existing pages. Plan this carefully.

**Q: How do I restrict which paths a template can be used on?**
A: Use the `allowedPaths` property in the template's properties. For example, only allow the "Article" template under `/content/we-retail/en/blog/`.

**Q: Can editable templates have different versions?**
A: Not natively, but you can create template versions manually by copying the template definition and giving it a versioned name.

## Key Takeaways

- Editable Templates are the modern, UI-driven way to create page blueprints
- They separate structure (locked) from initial content (editable)
- Policies give fine-grained control over component options
- Templates need active management, not just setup-and-forget
- Always use Editable Templates for new AEM projects

## Related Topics

- [Templates](/topics/templates)
- [Components](/topics/components)
- [HTL](/topics/htl)
