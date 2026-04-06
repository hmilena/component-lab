import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './Skeleton';

function SkeletonDemo() {
  return (
    <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Post card skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Skeleton height="200px" style={{ borderRadius: 12 }} />
        <Skeleton height="20px" width="70%" />
        <Skeleton height="14px" />
        <Skeleton height="14px" />
        <Skeleton height="14px" width="55%" />
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <Skeleton width="40px" height="40px" style={{ borderRadius: '50%' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Skeleton height="13px" width="40%" />
            <Skeleton height="11px" width="25%" />
          </div>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: 'Blog/Skeleton',
  component: SkeletonDemo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SkeletonDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleLine: Story = {
  render: () => <Skeleton width="300px" height="16px" />,
};

export const Avatar: Story = {
  render: () => <Skeleton width="48px" height="48px" style={{ borderRadius: '50%' }} />,
};
