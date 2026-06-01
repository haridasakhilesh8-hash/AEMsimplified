## Quick Understanding

Content Fragments are pieces of structured content that exist independently of pages. Think of them as "content atoms" — a product description, an author bio, a FAQ item — that can be written once and used everywhere. They're the foundation of AEM's headless CMS capabilities.

## What Is It?

A Content Fragment is a structured content item defined by a **Content Fragment Model** (a schema). Unlike regular components where content is tied to a page, Content Fragments:

- Live in `/content/dam/` (DAM — Digital Asset Manager)
- Are defined by a schema (Content Fragment Model)
- Can have multiple fields: text, numbers, booleans, enums, references
- Can be organized in folders with metadata
- Support versioning and workflows
- Can be delivered as JSON for headless consumption

## Why Do We Need It?

Traditional AEM pages embed content directly in components on pages. This creates problems:

- Same content duplicated across multiple pages
- Updating content requires editing every page
- Content can't be reused in different channels (mobile apps, IoT, third-party sites)
- No content governance — anyone can write anything

Content Fragments solve this by separating content creation from content delivery. Content authors create structured content once, and developers consume it through APIs or components.

## What Happens In Real Projects?

**Model design:** Content architects work with business stakeholders to design Content Fragment Models. A "Product" model might include: SKU, name, description, price, specifications, related products.

**Content creation:** Subject matter experts create Content Fragments based on these models. They fill in the fields without worrying about how the content looks.

**Content delivery:** Developers consume the fragments in multiple ways:
- Embedded in AEM pages via the Content Fragment component
- Delivered as JSON via AEM's GraphQL API
- Exported to other systems via REST API
- Used in mobile apps or microsites

**Governance:** Content Fragments go through approval workflows. A product description isn't published until marketing approves it.

## How It Works

1. An admin creates a Content Fragment Model (the schema) in Tools → Assets → Content Fragment Models
2. A content author creates a new Content Fragment based on that model
3. The author fills in the structured fields
4. The fragment is stored as structured data in the JCR under `/content/dam/`
5. A developer uses the fragment in a component or API
6. When the fragment is edited, it updates everywhere it's used

## Example

**Content Fragment Model ("Product"):**
```
Product Model
├── SKU (Text, required)
├── Product Name (Text, required)
├── Description (Multi-line Text)
├── Price (Number, required)
├── Currency (Enum: USD/EUR/GBP)
├── Available (Boolean, default: true)
├── Category (Fragment Reference)
└── Images (Content Reference, multiple)
```

**Using the fragment in HTL:**
```html
<div data-sly-use.product="com.myproject.models.ContentFragmentModel"
     data-sly-use.productContent="${product.contentFragment['/content/dam/myproject/products/shoe-123']}">
  <h1>${productContent.productName}</h1>
  <p>${productContent.description}</p>
  <span class="price">${productContent.currency} ${productContent.price}</span>
</div>
```

**GraphQL query for headless delivery:**
```graphql
{
  product(where: {sku: "SHOE-123"}) {
    productName
    description
    price
    currency
    category {
      title
    }
  }
}
```

## Common Confusions

**Content Fragment vs. Experience Fragment:** Content Fragments are **structured data** (like a database record). Experience Fragments are **structured HTML** (like a reusable page section). One is content, the other is presentation.

**Content Fragment vs. Asset:** Content Fragments live in the DAM like assets, but they're not assets. Assets are binary files (images, videos, PDFs). Content Fragments are structured text content.

**Headless vs. Hybrid:** Content Fragments can be used in traditional (headful) AEM pages AND in headless scenarios. They're not just for headless — they're for content reuse.

## Common Production Issues

**Fragment not appearing on page:** The fragment path is wrong or the content author hasn't published the fragment. Check the fragment's publication status.

**GraphQL query failing:** The Content Fragment Model isn't enabled for GraphQL. Go to Tools → Assets → GraphQL and enable the model.

**Performance with many fragments:** Querying hundreds of fragments in a single component can slow down page rendering. Add pagination and caching.

## Best Practices

- Design Content Fragment Models to match business concepts, not page layouts
- Keep models focused — a model should represent one entity (Product, Author, FAQ)
- Use validation rules to ensure data quality (required fields, formats)
- Use meaningful field names that match your frontend code
- Enable versioning and workflow for important content
- Cache fragment queries aggressively
- Use GraphQL for headless delivery, not the REST API

## Architect's Note

**Content Fragments are where AEM shines as a headless CMS.** If you're building a multi-channel content strategy, Content Fragments should be your primary content model.

Architectural decisions to make:
- **Model granularity:** How small should your fragments be? Too granular = too many fragments. Too coarse = not reusable.
- **Content relationships:** Use Fragment References to build content graphs (Product → Category → Brand).
- **Delivery model:** GraphQL for modern frontends, REST for legacy systems, Sling Model Exporter for AEM pages.
- **Localization:** Plan for multi-language content from day one. Each locale gets its own variant of the fragment.

The best content strategy treats fragments as a content API — design the API first, then build the authoring experience around it.

## Frequently Asked Questions

**Q: Can Content Fragments have images?**
A: Yes, using the Content Reference field type. The image remains in DAM as a separate asset; the fragment references it.

**Q: How do Content Fragments handle versions?**
A: Each fragment has version history. Authors can create snapshots, review changes, and roll back. Versions also integrate with AEM workflows for approval processes.

**Q: Can I nest Content Fragments?**
A: Yes, using Fragment References. A Product fragment can reference a Category fragment, which references a Department fragment — creating a content graph.

## Key Takeaways

- Content Fragments are structured content items stored in DAM
- They separate content creation from content delivery
- Content Fragment Models define the schema
- Fragments enable headless delivery via GraphQL
- Perfect for multi-channel content strategies

## Related Topics

- [Experience Fragments](/topics/experience-fragments)
- [AEM Cloud Service](/topics/aem-cloud-service)
