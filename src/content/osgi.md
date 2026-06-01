## Quick Understanding

OSGi (Open Service Gateway Initiative) is the modular runtime that powers AEM. Think of it as a mini-operating system for Java. It manages how different Java modules (called "bundles") start, stop, communicate, and share services. Every piece of AEM code you write runs inside OSGi.

## What Is It?

OSGi provides a module system and service registry for Java applications. In AEM, OSGi handles:

- **Bundles** — JAR files with special metadata that declare what they provide and what they need
- **Services** — Java objects registered in the OSGi service registry that other bundles can find and use
- **Components** — OSGi-managed objects with lifecycle management (activate, modify, deactivate)
- **Declarative Services** — Annotations-based way to define OSGi components (@Component, @Service, @Reference)

Everything in AEM — from the page rendering engine to the replication agent to your custom code — runs as OSGi bundles.

## Why Do We Need It?

Java applications traditionally use monolithic JARs where everything is bundled together. This creates problems:

- No way to start/stop individual modules
- No control over module dependencies
- Difficult to update parts of the application without restarting everything
- No service registry — finding implementations requires hard-coded lookups

OSGi solves these problems by providing:
- **Module isolation** — Each bundle has its own classloader
- **Lifecycle management** — Start, stop, update bundles without restarting the JVM
- **Service registry** — Find and use services by interface, not implementation
- **Version management** — Multiple versions of the same package can coexist

## What Happens In Real Projects?

**Module structure:** A typical AEM project has multiple OSGi bundles organized by layer:
```
myproject.core     → Bundle with Java models, services, servlets
myproject.ui.apps  → Bundle with components, templates, dialogs
myproject.ui.config → Bundle with OSGi configurations
```

**Configuration:** Developers create OSGi configurations (`.cfg.json` files) that are deployed with the code. Operations teams adjust configurations in different environments using the AEM Web Console.

**Service communication:** Your Sling Model might need data from a search service. You inject the service using `@Reference` in an OSGi component, and OSGi wires everything together at runtime.

## How It Works

1. **Bundle installation:** When AEM starts, it loads bundles from `/system/console/bundles`
2. **Dependency resolution:** OSGi checks that all imported packages are available
3. **Component activation:** OSGi activates components that don't have unsatisfied references
4. **Service registration:** Components register services in the OSGi service registry
5. **Service consumption:** Other components use `@Reference` to consume services
6. **Configuration injection:** Active Config Admin provides configuration to components

If a dependency is missing, the bundle stays in "Resolved" state but doesn't activate. This prevents runtime errors and makes problems visible immediately.

## Example

**OSGi Component with Service:**

```java
package com.myproject.core.services;

@Component(service = SearchService.class, immediate = true)
public class SearchServiceImpl implements SearchService {

    @Reference
    private ResourceResolverFactory resolverFactory;

    @Activate
    @Modified
    protected void activate(Map<String, Object> config) {
        // Called when component starts or config changes
        this.apiKey = config.get("api.key");
    }

    @Override
    public SearchResults search(String query, int limit) {
        // Implementation using resolverFactory
    }
}
```

**Configuration (`com.myproject.core.services.SearchServiceImpl.cfg.json`):**
```json
{
  "api.key": "your-api-key-here",
  "search.limit": 10
}
```

## Common Confusions

**OSGi Component vs. Sling Model Component:** An OSGi component (annotated with `@Component`) is a Java object managed by the OSGi runtime. An AEM component is a collection of files that renders content. The naming overlap is confusing — always check the context.

**Service vs. Component:** In OSGi, a service is a registered interface that other bundles can find. A component is an OSGi-managed object that can provide and consume services. Components register services.

**@Reference vs. @Inject:** `@Reference` is OSGi — it injects an OSGi service into your component. `@Inject` is Sling — it injects values from the current request or resource.

## Common Production Issues

**Bundle not active:** A bundle stays in "Resolved" state. Check the bundle's imports — a missing package is preventing activation. Install the required bundle or lower the import version.

**Service not found:** Your `@Reference` isn't resolving. The service might not be started, or your filter criteria might not match. Check the Web Console service listing.

**Configuration not applying:** OSGi configurations are cached. Make sure you're targeting the correct PID and that the configuration is in the right run mode.

## Best Practices

- Separate interfaces from implementations — program against interfaces
- Use immediate components (`immediate = true`) for services that must start eagerly
- Use configuration admin for service settings — never hardcode values
- Add meaningful configuration descriptions and defaults
- Test configuration changes in lower environments before production
- Monitor bundle states in production

## Architect's Note

**OSGi is AEM's superpower that most developers barely understand.** You don't need to be an OSGi expert to be productive in AEM, but understanding the basics of bundles, services, and components will save you hours of debugging.

Key architectural decisions:
- How many bundles should your project have? Usually: one core bundle (models, services) + one for UI (components, dialogs)
- How should services communicate? Use interfaces everywhere. Never couple components to concrete implementations.
- How should configurations be managed? Use run-mode-specific config files in your codebase + environment-specific overrides in the Cloud Manager.

The OSGi console (`/system/console/bundles`) is your first stop when something isn't working in AEM. Learn to read it.

## Frequently Asked Questions

**Q: What's the difference between a bundle and a package?**
A: A bundle is a JAR file with OSGi metadata. A package is a Java package inside a bundle. A bundle exports packages (makes them available to others) and imports packages (needs them from other bundles).

**Q: Can I have multiple versions of the same package in OSGi?**
A: Yes. OSGi supports package versioning natively. Different bundles can use different versions of the same package. This is critical for upgrade scenarios.

**Q: How do I see what OSGi configurations are applied?**
A: Go to `/system/console/configMgr` in your AEM instance. You can search by PID or service name.

## Key Takeaways

- OSGi is the modular runtime that powers AEM
- Bundles = modules, services = functionality, components = managed objects
- Use annotations (@Component, @Service, @Reference) to work with OSGi
- OSGi handles lifecycle, dependencies, and configuration
- Always program against interfaces when using OSGi services

## Related Topics

- [Sling Models](/topics/sling-models)
- [Components](/topics/components)
- [Dispatcher](/topics/dispatcher)
