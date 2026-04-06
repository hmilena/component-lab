import { useRef } from "react";
import ReadingProgressBar from "../components/ReadingProgressBar/ReadingProgressBar";

export function ReadingProgressBarDemo() {
  const contentRef = useRef<HTMLDivElement>(null);

  const features = [
    "Fixed at the top of the viewport",
    "Tracks scroll position relative to a target element",
    "Animated progress bar with linear-gradient",
    "Optimized with scroll event listener",
    "Clean-up on unmount",
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-10">
      <ReadingProgressBar targetRef={contentRef} readingTime={5} />

      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Reading Progress Bar
        </h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Progress bar that tracks the reading depth of an article.
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
          Demo (Scroll to see)
        </h2>
        <div
          ref={contentRef}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 prose prose-slate"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <h3>The Future of the Web</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam
            varius, turpis et commodo pharetra, est eros bibendum elit, nec
            luctus magna felis sollicitudin mauris. Integer in mauris eu nibh
            euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec
            lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu
            tempor congue, eros est euismod turpis, id tincidunt sapien risus a
            quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque
            malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget,
            consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet,
            felis nisl adipiscing sapien, sed pretium diam manisl eget egestas.
            Fugiat dapibus, tellus ac cursus commodo, mauris sit condimena nibh,
            ut hendrerit nisi quamm r nisi.
          </p>
          <p>
            Praesent ac sem eget est egestas volutpat. Nam pretium turpis et
            arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet
            iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu,
            accumsan a, consectetuer eget, posuere ut, mauris. Praesent
            adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy
            metus. Vestibulum volutpat pretium libero. Cras id nisl. Suspendisse
            in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus
            luctus magna.
          </p>
          <p>
            Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem,
            at interdum magna augue eget diam. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae; Morbi
            lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel
            mi sit amet augue congue elementum. Morbi in ipsum sit amet pede
            facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel,
            egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut
            ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis
            est pulvinar ullamcorper. Nulla facilisi.
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">
          ↑ The bar appears at the TOP of the page when scrolling this box ↑
        </p>
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
