import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import ReadingProgressBar from './ReadingProgressBar';

const LOREM = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique
senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
`.trim();

function ProgressBarDemo() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ReadingProgressBar targetRef={contentRef} readingTime={5} />
      <div ref={contentRef} style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px' }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Como construí o meu blog com React e WordPress headless</h1>
        {Array.from({ length: 18 }).map((_, i) => (
          <p key={i} className="text-gray-600 leading-relaxed mb-5 text-base">{LOREM}</p>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: 'Blog/ReadingProgressBar',
  component: ProgressBarDemo,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ProgressBarDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
