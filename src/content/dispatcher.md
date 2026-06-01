## Quick Understanding

The Dispatcher is AEM's caching and load-balancing layer. It sits in front of AEM's publish instances and serves cached content to end users. Think of it as a high-performance reverse proxy that makes your AEM site fast and resilient. It's almost always Apache HTTP Server + Dispatcher module.

## What Is It?

The Dispatcher is a module for Apache HTTP Server that provides:

- **Caching** — Serves static HTML pages from disk instead of hitting AEM
- **Security filtering** — Blocks malicious requests before they reach AEM
- **Load balancing** — Distributes traffic across multiple publish instances
- **URL rewriting** — Clean URLs, redirects, and access control
- **Sticky sessions** — Ensures users stay on the same publish instance during editing

The Dispatcher is NOT a separate product — it's a C module that runs inside Apache HTTP Server.

## Why Do We Need It?

AEM is a content management system, not a high-performance web server. Without the Dispatcher:

- Every page request hits AEM, consuming CPU and memory
- A single traffic spike could bring down your publish instance
- There's no security layer between the internet and your AEM instance
- You can't do SSL termination or HTTP/2

The Dispatcher handles 95%+ of requests from its cache. AEM only processes requests when content has changed. This makes AEM sites fast and cost-effective at scale.

## What Happens In Real Projects?

**Setup:** DevOps or infrastructure teams configure the Dispatcher on Apache HTTP Server instances. This is usually automated through configuration management (Ansible, Chef) or Cloud Manager pipelines.

**Configuration management:** Dispatcher configurations are version-controlled and deployed through CI/CD. Teams maintain different configs for dev, stage, and production.

**Cache invalidation:** When a content author publishes a page, the AEM replication agent sends a flush request to the Dispatcher. The Dispatcher invalidates the affected pages. The next visitor gets a fresh page served from the cache again.

**Monitoring:** Operations teams monitor Dispatcher health, cache hit ratios, and flush requests. A low cache hit ratio indicates configuration problems.

## How It Works

```
User Request Flow:
1. User visits https://www.example.com/products
2. Apache receives the request
3. Dispatcher checks if /products is in the cache
4a. Cache HIT → Serve the cached HTML file directly (no AEM involvement)
4b. Cache MISS → Forward request to AEM publish instance
5. AEM renders the page and returns the HTML
6. Dispatcher stores the response in the cache
7. Dispatcher serves the response to the user

Cache Invalidation Flow:
1. Author publishes or unpublishes a page
2. Replication agent sends flush request to the Dispatcher
3. Dispatcher removes the affected page(s) from the cache
4. Next request for that page is a cache miss → re-fetched from AEM
```

## Example

**Basic Dispatcher configuration (`dispatcher.any`):**

```
/name "myproject-dispatcher"
/farms {
  $farm {
    /virtualhosts {
      "www.example.com"
      "example.com"
    }
    /cache {
      /docroot "C:/Users/Dispatcher/httpd-root/cache"
      /statfile "C:/Users/Dispatcher/httpd-root/cache/httpd.stat"
      /statfileslevel "2"
      /rules {
        /0000 { /glob "*" /type "deny" }
        /0001 { /glob "/content/example/**" /type "allow" }
      }
      /invalidate {
        /0000 { /glob "*" /type "deny" }
        /0001 { /glob "/content/example/**" /type "allow" }
      }
    }
    /filters {
      /0000 { /glob "*" /type "deny" }
      /0001 { /glob "/content/example/*.html" /type "allow" }
      /0002 { /glob "/etc.clientlibs/*" /type "allow" }
      /0003 { /glob "/content/dam/example/*" /type "allow" }
    }
  }
}
```

## Common Confusions

**Dispatcher vs. CDN:** The Dispatcher caches at the server level. A CDN (Content Delivery Network) caches at the edge (geographically distributed). In production, you typically use both: CDN → Dispatcher → AEM Publish.

**Cache invalidation vs. flush:** Invalidation marks content as stale (removes it from cache). Flush forcefully removes content. Invalidation is automatic on publish. Flush is manual (used for troubleshooting).

**Dispatcher flush agents:** Flush agents are configured on the AEM Author instance. They send HTTP requests to the Dispatcher when content is published. The Dispatcher's `/invalidate` rules control which paths can trigger invalidation.

## Common Production Issues

**Cache not invalidating:** Pages show old content. Check that flush agents are running and that the Dispatcher can receive invalidation requests. Verify firewall rules.

**Cache hit ratio too low:** Too many cache misses. Check cache rules — you might be excluding important paths. Also check if session-based content is bypassing cache.

**Dispatcher returning 404 for valid pages:** The request is being filtered. Check `/filter` rules in `dispatcher.any`. A deny rule might be blocking legitimate requests.

**Cache poisoning:** Malicious requests generate unwanted cached content. Ensure your `allowedPaths` are strict and that `/invalidate` rules require authentication.

## Best Practices

- Keep cache rules as broad as possible, then use exceptions for dynamic content
- Set `statfileslevel` appropriately (usually 1-3 depending on content depth)
- Use `gracePeriod` for high-traffic sites so expired pages still serve stale content instead of failing
- Configure health checks to detect when publish instances are down
- Enable Gzip compression in Apache for cached content
- Monitor cache hit ratio — it should be above 90% for well-tuned configurations
- Always filter out CRX access, system paths, and sensitive URLs in production

## Architect's Note

**The Dispatcher is your first line of defense and your performance bottleneck.** Most AEM performance issues trace back to Dispatcher configuration. Here's my advice:

- **Start strict with filters, then relax as needed.** It's easier to allow something than to realize you've been exposed.
- **Cache everything by default, then exclude dynamic pieces.** Components that show user-specific content (cart, profile) should be excluded from cache.
- **Use multiple farms for different site sections** (e.g., one farm for public content, one for authenticated content).
- **Test flush scenarios in non-production** — know exactly what happens when you publish a page, activate a tree, or do a full flush.

A well-configured Dispatcher is invisible. A poorly-configured Dispatcher causes random 404s, stale content, and performance issues that are hard to diagnose.

## Frequently Asked Questions

**Q: Can I use Nginx instead of Apache for the Dispatcher?**
A: The Dispatcher is an Apache module (`.so` file). It only runs on Apache HTTP Server. However, you can use Nginx as a reverse proxy in front of Apache.

**Q: Does the Dispatcher work with AEM Cloud Service?**
A: Yes, but Adobe manages the Dispatcher layer. You provide the configuration files, and Adobe's Cloud Manager deploys them.

**Q: How do I manually flush the Dispatcher cache?**
A: You can use the AEM Touch UI (Tools → Deployment → Replication) or send an HTTP request to the flush agent endpoint.

## Key Takeaways

- The Dispatcher is Apache HTTP Server + caching module in front of AEM Publish
- It serves 95%+ of requests from cache — critical for performance
- Cache invalidation happens automatically when content is published
- Filter rules are your security layer — start strict and relax as needed
- Monitor cache hit ratio as your primary performance metric

## Related Topics

- [AEM Cloud Service](/topics/aem-cloud-service)
- [Components](/topics/components)
