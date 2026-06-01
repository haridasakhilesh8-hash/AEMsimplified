## Quick Understanding

HTL (HTML Template Language) — formerly called Sightly — is AEM's templating language. It's designed to write secure, logic-free HTML templates. Instead of mixing Java code into your HTML (like JSP did), HTL provides a clean syntax for accessing data, repeating elements, and including other components.

## What Is It?

HTL is an HTML5-compliant templating language with a simple set of attributes. It's the default and recommended templating language for AEM components. Key features:

- **Data access** — Use `${expression}` syntax to access model properties
- **Blocks** — Conditionally render elements with `data-sly-*` attributes
- **Security** — Automatic XSS protection based on context
- **No logic** — HTL intentionally has no programming constructs. Logic belongs in the Sling Model.

## Why Do We Need It?

Before HTL, AEM used JSP (Java Server Pages). JSP allowed developers to embed Java code directly in templates, leading to:

- Spaghetti code — Java logic mixed with HTML
- Security vulnerabilities — Developers had to manually escape output
- Designer-unfriendly — Unreadable `<% %>` tags everywhere
- Hard to debug — Logic bugs in templates were difficult to trace

HTL solves these problems by enforcing **separation of concerns**: templates handle presentation, models handle logic.

## What Happens In Real Projects?

**Development flow:**
1. A developer creates a Sling Model with backend logic
2. They create an HTL file that uses the model
3. The HTL keeps everything HTML-compatible
4. Frontend developers can work on HTL without knowing Java
5. The build process validates HTL syntax

**Real usage:** Most HTL templates are simple — they display a title, iterate over a list, or conditionally show elements. Complex logic is always pushed to the model.

## How It Works

HTL uses special `data-sly-*` attributes. These attributes are evaluated on the server side and removed from the HTML sent to the browser.

**Core attributes:**
- `data-sly-use` — Use a model or template
- `data-sly-list` — Iterate over a collection
- `data-sly-test` — Conditionally render an element
- `data-sly-include` — Include another template
- `data-sly-element` — Change the HTML element
- `data-sly-attribute` — Set HTML attributes dynamically
- `data-sly-unwrap` — Remove the wrapper element but keep its content

**Expression language:**
- `${model.property}` — Access model properties
- `${'text' @ i18n}` — Internationalize text
- `@{'/path/to/page.html'}` — Generate an AEM-friendly URL

## Example

**Basic HTL component template:**

```html
<div data-sly-use.hero="com.myproject.models.HeroBannerModel"
     class="hero-banner ${hero.backgroundClass}">

  <h1 class="hero-banner__title">${hero.title}</h1>

  <p class="hero-banner__description" data-sly-test="${hero.description}">
    ${hero.description}
  </p>

  <a href="${hero.linkUrl}"
     class="hero-banner__cta"
     data-sly-test="${hero.showButton}">
    ${hero.buttonText}
  </a>
</div>
```

**Iteration example:**

```html
<ul data-sly-use.cardList="com.myproject.models.CardListModel"
    class="card-list">
  <li data-sly-repeat.card="${cardList.cards}" class="card-list__item">
    <h3>${card.title}</h3>
    <p>${card.description}</p>
  </li>
</ul>
```

**Context-specific escaping:**
```html
<!-- HTL escapes automatically based on context -->
<p>${text}</p>           <!-- HTML context → escapes HTML -->
<p title="${text}"></p>  <!-- Attribute context → escapes attributes -->
<script>${json}</script> <!-- Script context → escapes for JavaScript -->
<style>${css}</style>    <!-- Style context → escapes for CSS -->
```

## Common Confusions

**`data-sly-repeat` vs. `data-sly-list`:** Both iterate. `data-sly-repeat` repeats the element for each item. `data-sly-list` creates a new scope but keeps the outer element. Use `data-sly-repeat` for simple list items, `data-sly-list` when you need access to the iteration status.

**Global vs. Local models:** A model declared with `data-sly-use` is scoped to the element and its children. It's NOT available outside that element. Use data-sly-use on a parent container for broader scope.

**`${}` vs `${}` inside strings:** You can't nest expressions. HTL doesn't support `${'prefix ${dynamic} suffix'}`. Use display context or format in the model instead.

## Common Production Issues

**HTL compilation errors:** The build fails because of syntax errors. Run `mvn clean install site` locally to catch HTL errors early.

**Model not found in template:** The `data-sly-use` path doesn't match the fully qualified class name. Double-check the classpath and package.

**Unescaped XSS:** While HTL provides automatic escaping, using `@ context='unsafe'` bypasses protection. Only use this when absolutely necessary and manually sanitize the output.

## Best Practices

- Keep HTL files focused on presentation — zero business logic
- Use `data-sly-test` for conditional rendering, not inline `if` expressions
- Always use model getters, never access resource properties directly in HTL
- Write semantic HTML in your HTL templates
- Name HTL files the same as your component
- Use `data-sly-unwrap` to keep markup clean when you only need a container for logic
- Always check for null with `data-sly-test` before displaying optional content

## Architect's Note

**HTL is intentionally limited, and that's the point.** The language is designed to prevent you from writing logic in templates. If you find yourself wanting more features in HTL, that's a signal that your model needs better design.

Common mistakes architects see:
- Complex ternary expressions in `${}` — put this in the model
- Empty string checks in HTL — add a `isNotEmpty()` method to the model
- Formatting dates in HTL — pre-format in the model
- Accessing JCR properties directly — always use a model

HTL templates should be so simple that a frontend developer can read them. If they can't, refactor.

## Frequently Asked Questions

**Q: Can I use HTL with other frameworks like React?**
A: HTL is for server-side AEM rendering. For headless AEM with React, you'd use AEM's Content Services or GraphQL API instead of HTL.

**Q: Is HTL case-sensitive?**
A: Yes. `data-sly-use`, `data-sly-test`, `data-sly-list` — all lower case. Property names in expressions are also case-sensitive.

**Q: How do I comment in HTL?**
A: Use standard HTML comments or the HTL-specific `${'<!-- comment -->' @ context='comment'}` syntax.

## Key Takeaways

- HTL is AEM's secure, logic-free templating language
- Use `data-sly-*` attributes for all template logic
- Never put business logic in HTL — use models
- HTL provides automatic XSS protection
- Keep templates simple enough for frontend developers to read

## Related Topics

- [Components](/topics/components)
- [Sling Models](/topics/sling-models)
- [Templates](/topics/templates)
