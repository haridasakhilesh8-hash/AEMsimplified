## Quick Understanding

Experience Fragments are reusable page sections (like headers, footers, or promotional banners) that can be created once and used across multiple pages or even multiple sites. Unlike Content Fragments (which are structured data), Experience Fragments contain formatted HTML with styling and components.

## What Is It?

An Experience Fragment is a reusable set of content and components that:

- Is created independently of any page
- Contains fully formatted content with components, images, and styling
- Can have multiple **variations** (e.g., Summer promo, Winter promo)
- Can be embedded in pages or exported to Adobe Target for personalization
- Lives under `/content/experience-fragments/`
- Supports its own template and components

## Why Do We Need It?

Marketing teams often need the same content in multiple places — a promotional banner on the homepage, product pages, and the blog. Without Experience Fragments:

- Content gets manually copied to every page
- Updates require editing every page individually
- Inconsistencies creep in
- A/B testing the same content in different places is complex

Experience Fragments solve this: create once, use everywhere, update in one place.

## What Happens In Real Projects?

**Marketing campaigns:** The marketing team creates a seasonal promotion as an Experience Fragment. They add an image, headline, and CTA button. The fragment is embedded on the homepage, all product pages, and the checkout page.

**Personalization:** The marketing team creates multiple variations of the promo — one for returning visitors, one for new visitors. They link these to an Adobe Target activity for personalization.

**Multi-site management:** An Experience Fragment created for the US site is reused on the EU and APAC sites with localized variations.

## How It Works

1. **Creation:** An author creates an Experience Fragment using the Experience Fragment template
2. **Authoring:** They add components, text, images — just like building a page section
3. **Variations:** They create variations for different scenarios (different languages, audiences, campaigns)
4. **Embedding:** They use the Experience Fragment component to embed the fragment in any page
5. **Export:** (Optional) They export the fragment to Adobe Target for testing
6. **Updates:** When the fragment changes, all pages using it reflect the change immediately

## Example

**Creating a "Summer Sale" Experience Fragment:**

1. Go to Experience Fragments → Create → Experience Fragment
2. Select the "Promotion" template
3. Title: "Summer Sale Banner 2026"
4. Add a Hero Image component with summer-themed imagery
5. Add a Title: "Summer Sale — Up to 50% Off"
6. Add a Button: "Shop Now" linking to `/shop/summer`
7. Create variations: "Desktop View", "Mobile View", "Email Campaign"
8. Save and publish

**Embedding in a page:**
```
1. Open any AEM page
2. Add the "Experience Fragment" component
3. Browse or search for your "Summer Sale Banner" fragment
4. Select the variation to display
5. Done — the banner appears on your page
```

## Common Confusions

**Experience Fragment vs. Content Fragment:** Experience Fragments contain **presentation** (HTML, components, styling). Content Fragments contain **structured data** (text, numbers, references). XF = formatted output, CF = raw data.

**Experience Fragment vs. Reference Component:** A regular component can include a reference to another component. Experience Fragments are a dedicated feature with built-in management, variations, and Target integration.

**Embedded vs. Referenced:** When you use an Experience Fragment on a page, the content is rendered from the fragment source. Changes to the fragment automatically appear on all pages that reference it.

## Common Production Issues

**Fragment not appearing on target pages:** The fragment isn't published. Experience Fragments must be published separately from the pages that use them.

**Styling conflicts:** The Experience Fragment's styles clash with the host page's styles. Ensure your fragment components use scoped CSS or BEM naming.

**Performance impact:** Many Experience Fragments on a single page increase rendering time. Use the Dispatcher cache for pages with embedded fragments.

## Best Practices

- Use Experience Fragments for content that appears on 3+ pages
- Create variations for different channels, not minor layout tweaks
- Keep fragments focused on one marketing message
- Use meaningful naming conventions for easy searching
- Leverage Folder organization to manage large numbers of fragments
- Test fragments in their target pages before publishing
- Review and archive unused fragments regularly

## Architect's Note

**Experience Fragments bridge the gap between content management and marketing optimization.** They're one of AEM's most loved features because they give marketing teams control without requiring developer involvement.

Strategic uses:
- **Campaign management:** Create campaign-specific fragments that can be A/B tested
- **Site-wide components:** Headers, footers, promo bars that need centralized management
- **Multi-brand consistency:** Same fragment structure, different brand variations
- **Personalization:** Integrate with Adobe Target for audience-specific content

The key architectural decision is: **Does this content need presentation or just data?** If it needs presentation (styling, images, layout), use Experience Fragments. If it just needs data (text, numbers, references), use Content Fragments.

## Frequently Asked Questions

**Q: Can Experience Fragments have sub-fragments?**
A: Yes, you can nest Experience Fragments within other Experience Fragments. Use this sparingly — it creates tight coupling.

**Q: How do Experience Fragments work with Adobe Target?**
A: AEM can export Experience Fragment variations as HTML offers to Adobe Target. This enables A/B testing without development effort.

**Q: Can I use Experience Fragments in a headless setup?**
A: Yes, via the AEM REST API. The fragment is returned as structured JSON that can be consumed by any frontend.

## Key Takeaways

- Experience Fragments are reusable, formatted page sections
- They support variations for different channels or audiences
- Great for campaign management and site-wide components
- Integrate with Adobe Target for personalization
- Use XF for presentation content, CF for structured data

## Related Topics

- [Content Fragments](/topics/content-fragments)
- [Components](/topics/components)
- [Templates](/topics/templates)
