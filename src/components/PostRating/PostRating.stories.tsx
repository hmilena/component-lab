import type { Meta, StoryObj } from '@storybook/react';
import PostRating from './PostRating';

const mockFetch = () =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ rating_total: 554, rating_count: 128 }),
  } as Response);

const meta = {
  title: 'Blog/PostRating',
  component: PostRating,
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => {
      window.fetch = mockFetch as typeof fetch;
      return <Story />;
    },
  ],
} satisfies Meta<typeof PostRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithRatings: Story = {
  args: {
    postId: 'demo-post-1',
    postTitle: 'Como eu fiz este componente',
    postUrl: 'https://blogdamia.com.br/post/1',
    ratingTotal: 549,
    ratingCount: 127,
    apiBase: '/api',
  },
};

export const NoRatings: Story = {
  args: {
    postId: 'demo-post-2',
    postTitle: 'Novo post',
    postUrl: 'https://blogdamia.com.br/post/2',
    ratingTotal: 0,
    ratingCount: 0,
    apiBase: '/api',
  },
};

export const Small: Story = {
  args: {
    ...WithRatings.args,
    postId: 'demo-post-3',
    size: 'sm',
  },
};
