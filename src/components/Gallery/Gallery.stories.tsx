import type { Meta, StoryObj } from '@storybook/react';
import Gallery from './Gallery';

const IMAGES = [
  { id: 1, src: 'https://picsum.photos/seed/arch1/800/500',  thumb: 'https://picsum.photos/seed/arch1/120/80',  alt: 'Architecture 1' },
  { id: 2, src: 'https://picsum.photos/seed/arch2/800/500',  thumb: 'https://picsum.photos/seed/arch2/120/80',  alt: 'Architecture 2' },
  { id: 3, src: 'https://picsum.photos/seed/arch3/800/500',  thumb: 'https://picsum.photos/seed/arch3/120/80',  alt: 'Architecture 3' },
  { id: 4, src: 'https://picsum.photos/seed/arch4/800/500',  thumb: 'https://picsum.photos/seed/arch4/120/80',  alt: 'Architecture 4' },
  { id: 5, src: 'https://picsum.photos/seed/arch5/800/500',  thumb: 'https://picsum.photos/seed/arch5/120/80',  alt: 'Architecture 5' },
  { id: 6, src: 'https://picsum.photos/seed/arch6/800/500',  thumb: 'https://picsum.photos/seed/arch6/120/80',  alt: 'Architecture 6' },
];

const meta = {
  title: 'Blog/Gallery',
  component: Gallery,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: IMAGES,
    renderMain: (item: typeof IMAGES[0]) => (
      <img src={item.src} alt={item.alt} />
    ),
    renderThumb: (item: typeof IMAGES[0]) => (
      <img src={item.thumb} alt={item.alt} />
    ),
  },
};

export const WithoutThumbs: Story = {
  args: {
    ...Default.args,
    showThumbs: false,
  },
};

export const WithAutoplay: Story = {
  args: {
    ...Default.args,
    autoplay: true,
  },
};
