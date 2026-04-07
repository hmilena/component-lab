import PostLikes from "../components/PostLikes/PostLikes";
import PostRating from "../components/PostRating/PostRating";

// Mock fetch — simula API sem backend
const originalFetch = window.fetch;
window.fetch = ((url: string, options?: RequestInit) => {
  if (typeof url === "string" && url.includes("/like")) {
    return Promise.resolve(
      new Response(JSON.stringify({ likes_count: 43 }), { status: 200 }),
    );
  }
  if (typeof url === "string" && url.includes("/rate")) {
    return Promise.resolve(
      new Response(JSON.stringify({ rating_total: 554, rating_count: 128 }), {
        status: 200,
      }),
    );
  }
  return originalFetch(url, options);
}) as typeof fetch;

const likesFeatures = [
  "Toggle like/unlike",
  "Optimistic update with rollback on error",
  "localStorage persistence — prevents double voting",
  "Sparkle animation on like",
  "ARIA: aria-pressed, aria-live",
  "Small (sm) variant for compact spaces",
];

const ratingFeatures = [
  "Half-star display (e.g., 4.5 ★)",
  "Hover preview before voting",
  "Optimistic update with rollback",
  "localStorage — prevents double voting",
  "Schema.org aggregateRating for SEO",
  "Keyboard navigation (Enter / Space)",
];

export function PostInteractionsDemo() {
  return (
    <div className="mx-auto space-y-10">
      <div>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Likes and ratings for blog posts with optimistic UI and persistence.
        </p>
        <p className="mt-.5 text-sm block text-gray-500 leading-relaxed">
          Extracted from
          <a
            href="https://blogdamia.com.br"
            target="_blank"
            className="text-blue-500 ml-1 underline"
          >
            www.blogdamia.com.br
          </a>
        </p>
      </div>

      {/* PostLikes */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Post Likes
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
          <div className="flex items-center gap-8 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 mb-2">Default (md)</p>
              <PostLikes postId="demo-1" likesCount={42} apiBase="/api" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-2">Small (sm)</p>
              <PostLikes
                postId="demo-2"
                likesCount={128}
                apiBase="/api"
                size="sm"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-2">No likes</p>
              <PostLikes postId="demo-3" likesCount={0} apiBase="/api" />
            </div>
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          {likesFeatures.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xs"
            >
              <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
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

      {/* PostRating */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Post Rating
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
          <div className="flex items-start gap-10 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 mb-2">With votes (4.3 ★)</p>
              <PostRating
                postId="demo-r1"
                postTitle="Demo Post"
                postUrl="https://example.com"
                ratingTotal={549}
                ratingCount={127}
                apiBase="/api"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-2">No votes</p>
              <PostRating
                postId="demo-r2"
                postTitle="New Post"
                postUrl="https://example.com"
                ratingTotal={0}
                ratingCount={0}
                apiBase="/api"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-2">Small (sm)</p>
              <PostRating
                postId="demo-r3"
                postTitle="Demo Post"
                postUrl="https://example.com"
                ratingTotal={549}
                ratingCount={127}
                apiBase="/api"
                size="sm"
              />
            </div>
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          {ratingFeatures.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xs"
            >
              <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
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
