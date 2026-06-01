## Quick Understanding

Sling Models are simple Java POJOs (Plain Old Java Objects) that automatically map JCR content and request data into Java objects. They're the bridge between your content in the JCR and your HTL templates. Instead of writing tedious code to extract values from resources, Sling Models do it automatically.

## What Is It?

Sling Models are annotation-driven Java classes that adapt AEM resources into usable Java objects. Key annotations include:

- `@Model` — Marks the class as a Sling Model
- `@ValueMapValue` — Injects a property value from the resource
- `@Inject` — Injects values from various sources (resource, request, etc.)
- `@ChildResource` — Maps a child resource to a nested model
- `@PostConstruct` — Method called after all injections are complete

Models are registered as OSGi services and adapt from `Resource` or `SlingHttpServletRequest`.

## Why Do We Need It?

Before Sling Models (pre-AEM 6.0), developers wrote code like this:

```java
// OLD WAY — terrible
String title = resource.getValueMap().get("title", String.class);
if (title == null) {
    title = page.getTitle();
}
```

Every component had repetitive, error-prone boilerplate. Sling Models eliminated this by using dependency injection. You simply declare what you need, and Sling provides it.

## What Happens In Real Projects?

**Model creation flow:**
1. A developer creates a component (e.g., "Product Card")
2. They define a Sling Model class with the properties the component needs
3. They annotate the class with `@Model(adaptables = Resource.class)`
4. The HTL template uses the model to access data
5. AEM handles all the injection automatically

**Testing:** Models are easy to unit test because they're plain Java objects with clear inputs and outputs.

**Evolution:** As components grow, models are updated. New fields are added, old ones are deprecated. The model pattern keeps changes clean and localized.

## How It Works

1. An HTTP request comes in for a page with a component
2. AEM's Sling engine finds the component's resource and HTL script
3. HTL encounters `data-sly-use.model="com.project.models.MyModel"` 
4. AEM creates the model by injecting values from the resource/request
5. The model's `@PostConstruct` method runs (if defined)
6. HTL accesses model properties, generating HTML
7. The model instance is discarded after the request completes

## Example

**Simple Sling Model:**

```java
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeroBannerModel {

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String backgroundImage;

    @ValueMapValue
    private boolean showButton;

    @ValueMapValue
    private String buttonText;

    @ValueMapValue
    private String buttonUrl;

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getBackgroundImage() { return backgroundImage; }
    public boolean isShowButton() { return showButton; }
    public String getButtonText() { return buttonText; }
    public String getButtonUrl() { return buttonUrl; }
}
```

**Nested model with child resources:**

```java
@Model(adaptables = Resource.class)
public class CardListModel {

    @ChildResource
    private List<CardItem> cards;

    public List<CardItem> getCards() { return cards; }

    @Model(adaptables = Resource.class)
    public static class CardItem {
        @ValueMapValue
        private String title;

        @ValueMapValue
        private String image;

        public String getTitle() { return title; }
        public String getImage() { return image; }
    }
}
```

## Common Confusions

**`@ValueMapValue` vs. `@Inject`:** `@ValueMapValue` injects from the resource's value map (simpler, more explicit). `@Inject` tries multiple sources (request attributes, resource, etc.). Prefer `@ValueMapValue` for component properties.

**`adaptables`:** The `adaptables` parameter in `@Model` tells AEM what this model can adapt from. `Resource.class` is most common for component models. `SlingHttpServletRequest.class` gives you access to request data.

**Optional vs. Required:** Using `defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL` means if a property is missing, the field gets a default value (null/false/0) instead of throwing an error. Always use OPTIONAL for component properties.

## Common Production Issues

**Field returns null in production:** The dialog field name doesn't match the model property name. Check that `name` in the dialog XML matches the Java field name.

**Model not found error:** The bundle containing the model isn't deployed or the OSGi component isn't active. Check `http://localhost:4502/system/console/bundles`.

**Performance issues:** Models with too many injected fields or nested models can slow down page rendering. Inject only what you need.

**Serialization problems:** Models that are used in JSON exports or Sling Model Exporter need proper annotations and getter methods.

## Best Practices

- Use `defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL` for all component models
- Name fields to match dialog property names exactly
- Keep models focused — one model per component
- Use nested models for structured content (child resources)
- Add unit tests for models with complex logic
- Use `@PostConstruct` for initialization logic (setting defaults, combining fields)
- Avoid injecting the request if you don't need it — it makes testing harder

## Architect's Note

**Sling Models are where you enforce your data contracts.** The model class is the contract between what authors configure in the dialog and what the template renders. A well-designed model:

- Has clear, typed properties
- Provides sensible defaults
- Handles missing data gracefully
- Is easy to test

I strongly recommend using Lombok (`@Getter`, `@Builder`) to reduce boilerplate in models. It's widely adopted in AEM projects and makes models much cleaner.

Also consider: **Sling Model Exporter** — it allows your models to be exported as JSON for headless use cases. Design your models with this in mind if you're building a headless or hybrid AEM architecture.

## Frequently Asked Questions

**Q: Can Sling Models access OSGi services?**
A: Yes, using `@Inject` or `@OSGiService` annotation. This is useful when your model needs data from another service.

**Q: Are Sling Models thread-safe?**
A: Yes, models are request-scoped. Each request creates its own model instance. Don't store shared state in model classes though.

**Q: When should I use `@PostConstruct`?**
A: Use it for logic that runs after injections are complete — like combining multiple fields, doing lookups, or setting computed values. Avoid complex business logic in `@PostConstruct`.

## Key Takeaways

- Sling Models auto-map JCR content to Java objects
- Use annotations instead of manual property extraction
- Always use OPTIONAL injection strategy for component properties
- Keep models focused, tested, and well-documented
- Models are the data contract between dialog and template

## Related Topics

- [Components](/topics/components)
- [HTL](/topics/htl)
- [OSGi](/topics/osgi)
