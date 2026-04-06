import type { Meta, StoryObj } from '@storybook/react';
import { useLightboxGallery } from '../../hooks/useLightboxGallery';
import GalleryLightbox from './GalleryLightbox';

const IMAGES = [
  { id: 1, src: 'https://picsum.photos/seed/lb1/1200/800', thumb: 'https://picsum.photos/seed/lb1/120/80', alt: 'Photo 1' },
  { id: 2, src: 'https://picsum.photos/seed/lb2/1200/800', thumb: 'https://picsum.photos/seed/lb2/120/80', alt: 'Photo 2' },
  { id: 3, src: 'https://picsum.photos/seed/lb3/1200/800', thumb: 'https://picsum.photos/seed/lb3/120/80', alt: 'Photo 3' },
  { id: 4, src: 'https://picsum.photos/seed/lb4/1200/800', thumb: 'https://picsum.photos/seed/lb4/120/80', alt: 'Photo 4' },
  { id: 5, src: 'https://picsum.photos/seed/lb5/1200/800', thumb: 'https://picsum.photos/seed/lb5/120/80', alt: 'Photo 5' },
  { id: 6, src: 'https://picsum.photos/seed/lb6/1200/800', thumb: 'https://picsum.photos/seed/lb6/120/80', alt: 'Photo 6' },
  { id: 7, src: 'https://picsum.photos/seed/lb7/1200/800', thumb: 'https://picsum.photos/seed/lb7/120/80', alt: 'Photo 7' },
  { id: 8, src: 'https://picsum.photos/seed/lb8/1200/800', thumb: 'https://picsum.photos/seed/lb8/120/80', alt: 'Photo 8' },
];

function LightboxDemo() {
  const { isOpen, initialIndex, open, close } = useLightboxGallery();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <p className="text-sm text-gray-500 mb-4">Clica numa foto para abrir o lightbox. Navega com ← →, fecha com ESC ou ✕.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {IMAGES.map((img, i) => (
          <button
            key={img.id}
            onClick={() => open(i)}
            style={{ padding: 0, border: 'none', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}
          >
            <img src={img.thumb} alt={img.alt} style={{ width: '100%', height: 80, objectFit: 'cover', display: 'block' }} />
          </button>
        ))}
      </div>
      <GalleryLightbox
        items={IMAGES}
        isOpen={isOpen}
        initialIndex={initialIndex}
        onClose={close}
        renderMain={(item: typeof IMAGES[0]) => (
          <img src={item.src} alt={item.alt} />
        )}
        renderThumb={(item: typeof IMAGES[0]) => (
          <img src={item.thumb} alt={item.alt} />
        )}
      />
    </div>
  );
}

const meta = {
  title: 'Blog/GalleryLightbox',
  component: LightboxDemo,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LightboxDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
