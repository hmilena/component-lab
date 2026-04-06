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
  "Navegação com botões e miniaturas clicáveis",
  "Render props — funciona com qualquer estrutura de dados",
  "Autoplay configurável",
  "Lightbox com teclado (← → ESC)",
  "Drag-to-scroll nas miniaturas do lightbox",
  "Clean view — esconde UI para ver só a imagem",
  "Sync automático da janela de miniaturas",
  "Touch support no mobile",
];

type ImageItem = (typeof IMAGES)[0];

export function GalleryDemo() {
  const { isOpen, initialIndex, open, close } = useLightboxGallery();

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Gallery & Lightbox
        </h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Galeria de imagens com miniaturas e lightbox full-screen.
        </p>
        <p className="mt-.5 text-sm block text-gray-500 leading-relaxed">
          Extraído do
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
          <p className="text-xs text-gray-400 mt-3">
            Clica na imagem principal para abrir o lightbox.
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
          Funcionalidades
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
