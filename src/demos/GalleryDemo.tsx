import Gallery from "../components/Gallery/Gallery";
import GalleryLightbox from "../components/GalleryLightbox/GalleryLightbox";
import { useLightboxGallery } from "../hooks/useLightboxGallery";

const IMAGES = [
  {
    id: 1,
    src: "https://picsum.photos/seed/arch1/800/500",
    thumb: "https://picsum.photos/seed/arch1/120/80",
    alt: "Architecture 1",
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/arch2/800/500",
    thumb: "https://picsum.photos/seed/arch2/120/80",
    alt: "Architecture 2",
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/arch3/800/500",
    thumb: "https://picsum.photos/seed/arch3/120/80",
    alt: "Architecture 3",
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/arch4/800/500",
    thumb: "https://picsum.photos/seed/arch4/120/80",
    alt: "Architecture 4",
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/arch5/800/500",
    thumb: "https://picsum.photos/seed/arch5/120/80",
    alt: "Architecture 5",
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/arch6/800/500",
    thumb: "https://picsum.photos/seed/arch6/120/80",
    alt: "Architecture 6",
  },
];

const features = [
  "Navigation with buttons and clickable thumbnails",
  "Render props — works with any data structure",
  "Configurable autoplay",
  "Keyboard-supported lightbox (← → ESC)",
  "Drag-to-scroll on lightbox thumbnails",
  "Clean view — hides UI to focus on image",
  "Automatic thumbnail window sync",
  "Touch support for mobile",
];

type ImageItem = (typeof IMAGES)[0];

export function GalleryDemo() {
  const { isOpen, initialIndex, open, close } = useLightboxGallery();

  return (
    <div className="mx-auto space-y-10">
      <div>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Image gallery with thumbnails and full-screen lightbox.
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
          Gallery
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <Gallery
            items={IMAGES}
            renderMain={(item: ImageItem) => (
              <img
                src={item.src}
                alt={item.alt}
                onClick={() => open(IMAGES.findIndex((i) => i.id === item.id))}
                style={{ cursor: "zoom-in" }}
              />
            )}
            renderThumb={(item: ImageItem) => (
              <img src={item.thumb} alt={item.alt} />
            )}
          />
          <p className="text-xs text-gray-400 mt-3 text-center">
            Click the main image to open the lightbox.
          </p>
        </div>
      </section>

      <GalleryLightbox
        items={IMAGES}
        isOpen={isOpen}
        initialIndex={initialIndex}
        onClose={close}
        renderMain={(item: ImageItem) => <img src={item.src} alt={item.alt} />}
        renderThumb={(item: ImageItem) => (
          <img src={item.thumb} alt={item.alt} />
        )}
      />

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
