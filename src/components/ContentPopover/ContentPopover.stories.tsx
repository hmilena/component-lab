import type { Meta, StoryObj } from '@storybook/react';
import { ContentPopoverDemo } from '../../demos/ContentPopoverDemo';

const meta = {
  title: 'Demonstrations/ContentPopover',
  component: ContentPopoverDemo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ContentPopoverDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
