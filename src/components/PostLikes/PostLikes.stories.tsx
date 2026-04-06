import type { Meta, StoryObj } from '@storybook/react';
import PostLikes from './PostLikes';

// Mock fetch so likes persist in the demo without a real API
const mockFetch = () =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ likes_count: 43 }),
  } as Response);

const meta = {
  title: 'Blog/PostLikes',
  component: PostLikes,
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => {
      window.fetch = mockFetch as typeof fetch;
      return <Story />;
    },
  ],
} satisfies Meta<typeof PostLikes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    postId: 'demo-post-1',
    likesCount: 42,
    apiBase: '/api',
  },
};

export const Small: Story = {
  args: {
    postId: 'demo-post-2',
    likesCount: 128,
    apiBase: '/api',
    size: 'sm',
  },
};

export const NoLikes: Story = {
  args: {
    postId: 'demo-post-3',
    likesCount: 0,
    apiBase: '/api',
  },
};
