import { useRef } from "react";
import ReadingProgressBar from "../components/ReadingProgressBar/ReadingProgressBar";

export function ReadingProgressBarDemo() {
  const contentRef = useRef<HTMLDivElement>(null);

  const features = [
    "Tracks scroll position relative to a target element",
    "Calculates progress from element's own scrollTop",
    "Animated progress bar with linear-gradient",
    "Optimized with scroll event listener",
    "Clean-up on unmount",
  ];

  return (
    <div className="mx-auto space-y-10">
      <div>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Progress bar that tracks the reading depth of an article.
        </p>
        <p className="mt-0.5 text-sm text-gray-500 leading-relaxed">
          Extracted from{" "}
          <a
            href="https://blogdamia.com.br"
            target="_blank"
            className="text-blue-500 underline"
          >
            www.blogdamia.com.br
          </a>
        </p>
      </div>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Demo — scroll the article below
        </h2>

        {/* Article card — progress bar sticks to the top of the scrollable area */}
        <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div
            ref={contentRef}
            className="bg-white"
            style={{ maxHeight: "480px", overflowY: "auto" }}
          >
            <ReadingProgressBar targetRef={contentRef} readingTime={6} sticky />
            <div className="p-8 prose prose-slate">
            <h3>The Future of the Web: How Modern Technologies Are Reshaping the Internet</h3>

            <p>
              The web has come a long way since Tim Berners-Lee published his proposal for an
              information management system in 1989. What started as a simple network of
              interlinked documents has evolved into a global platform that powers everything
              from social networks and e-commerce to real-time collaboration and artificial
              intelligence applications. Today, the web is not just a place to consume
              information — it is a living, breathing infrastructure that underpins modern
              civilization.
            </p>

            <h4>Component-Based Architecture</h4>
            <p>
              One of the most transformative shifts in web development over the past decade has
              been the rise of component-based architectures. Libraries like React, Vue, and
              Svelte have fundamentally changed how developers think about building user
              interfaces. Instead of working with entire pages, developers now compose
              applications from small, reusable, and self-contained pieces called components.
            </p>
            <p>
              This paradigm shift brings with it enormous benefits: code reuse, better
              testability, easier maintenance, and a cleaner separation of concerns. A button
              component defined once can be used hundreds of times across an application with
              consistent behavior and styling. A form component can encapsulate all its
              validation logic internally, exposing only a clean interface to the outside world.
            </p>
            <p>
              The mental model changes too. Rather than thinking in pages, developers think in
              trees of components, each managing its own state and lifecycle. This leads to more
              predictable applications and makes it far easier to reason about what the UI will
              look like given a certain set of inputs.
            </p>

            <h4>The Rise of the Edge</h4>
            <p>
              Traditional web architectures relied on centralized servers — usually located in
              a handful of data centers around the world. A user in São Paulo making a request
              to a server in Virginia would experience noticeable latency simply due to the
              physical distance the data had to travel. Content delivery networks (CDNs) helped
              by caching static assets closer to users, but dynamic content remained slow.
            </p>
            <p>
              Edge computing changes this equation dramatically. By distributing compute
              workloads across hundreds of points of presence worldwide, edge platforms allow
              server-side logic to run mere milliseconds away from the end user. Personalized
              content, authentication, A/B testing, and geolocation-based responses can all
              happen at the edge without ever hitting a central origin server.
            </p>
            <p>
              Platforms like Cloudflare Workers, Vercel Edge Functions, and Deno Deploy have
              made edge computing accessible to any developer. The implications for performance
              are profound: applications that once required hundreds of milliseconds of
              server-side processing can now respond in under 50ms, anywhere in the world.
            </p>

            <h4>Web Performance as a Core Value</h4>
            <p>
              For years, performance was treated as an afterthought — something to optimize
              once a product was feature-complete. That attitude has changed dramatically.
              Research consistently shows that every 100ms of additional latency costs
              e-commerce sites roughly 1% in revenue. Google's Core Web Vitals have made
              performance a direct ranking signal in search results. Users, now accustomed to
              near-instant experiences on native apps, have little patience for slow websites.
            </p>
            <p>
              Modern performance optimization is multidimensional. It encompasses network-level
              optimizations like HTTP/3 and resource hints, rendering strategies like
              server-side rendering and incremental static regeneration, image optimization
              through modern formats like WebP and AVIF, and JavaScript bundle splitting to
              ensure users only download the code they actually need.
            </p>
            <p>
              Tools like Lighthouse, WebPageTest, and the Chrome DevTools Performance panel
              give developers unprecedented visibility into exactly where time is being spent.
              The culture around performance has shifted: it is now a first-class concern,
              measured continuously in CI/CD pipelines and monitored in production through
              real user monitoring (RUM).
            </p>

            <h4>Accessibility Is Not Optional</h4>
            <p>
              The web was designed from its inception to be universal — accessible to everyone,
              regardless of device, location, or ability. In practice, however, accessibility
              has often been deprioritized in favor of speed-to-market. The result is a web
              that remains unnecessarily difficult or impossible to use for the estimated one
              billion people worldwide who live with some form of disability.
            </p>
            <p>
              Semantic HTML, ARIA attributes, keyboard navigation, sufficient color contrast,
              and screen reader support are not just nice-to-haves — in many jurisdictions,
              they are legal requirements. The Web Content Accessibility Guidelines (WCAG),
              now at version 2.2, provide a comprehensive framework for making web content
              accessible to the widest possible audience.
            </p>
            <p>
              Encouragingly, accessibility is increasingly being treated as a design constraint
              from the very beginning of a project rather than a checklist to tick off before
              launch. Tools like axe, Storybook's a11y addon, and browser extensions that
              simulate various visual impairments make it easier than ever to catch
              accessibility issues early in the development process.
            </p>

            <h4>The AI-Augmented Developer</h4>
            <p>
              Perhaps the most significant disruption on the horizon for web development is the
              integration of artificial intelligence into the development workflow itself. AI
              coding assistants can now generate boilerplate, suggest completions, explain
              unfamiliar code, identify bugs, and even write tests. For routine tasks, the
              productivity gains are substantial.
            </p>
            <p>
              But AI is not replacing developers — it is changing what developers spend their
              time on. With AI handling the mechanical parts of coding, developers are freed to
              focus on higher-level concerns: system design, user experience, performance
              architecture, and the subtle judgment calls that require deep contextual
              understanding of a product and its users.
            </p>
            <p>
              The developers who will thrive in this new landscape are those who can
              effectively collaborate with AI tools — knowing when to trust their suggestions,
              when to push back, and how to critically evaluate generated code for correctness,
              security, and maintainability.
            </p>

            <h4>Looking Ahead</h4>
            <p>
              The web of tomorrow will be faster, more accessible, more intelligent, and more
              distributed than anything we have seen before. WebAssembly will bring
              near-native performance to browser-based applications. WebGPU will open up
              GPU-accelerated computing directly in the browser. Progressive Web Apps will
              continue to close the gap with native applications.
            </p>
            <p>
              Through all of this change, the fundamental values of the web remain constant:
              openness, interoperability, and universal access. The developers and designers
              who build the web carry a profound responsibility — and a remarkable opportunity
              — to shape how billions of people experience and interact with the digital world.
            </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Features
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xs"
            >
              <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.354 2.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L3.5 6.793l4.146-4.147a.5.5 0 01.708 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
