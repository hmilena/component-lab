import Skeleton from "../components/Skeleton/Skeleton";

const features = [
  "Animated shimmer with pure CSS",
  "Configurable width and height",
  "Accepts inline style for special cases",
  "Compose any loading layout",
];

export function SkeletonDemo() {
  return (
    <div className="mx-auto space-y-10">
      <div>
        <p className="mt-2 text-sm block text-gray-500 leading-relaxed">
          Loading placeholder with shimmer animation.
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

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Demo — Post card
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div
            style={{
              maxWidth: 360,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Skeleton height="200px" style={{ borderRadius: 12 }} />
            <Skeleton height="20px" width="70%" />
            <Skeleton height="14px" />
            <Skeleton height="14px" />
            <Skeleton height="14px" width="55%" />
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 4,
                alignItems: "center",
              }}
            >
              <Skeleton
                width="40px"
                height="40px"
                style={{ borderRadius: "50%" }}
              />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <Skeleton height="13px" width="40%" />
                <Skeleton height="11px" width="25%" />
              </div>
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
