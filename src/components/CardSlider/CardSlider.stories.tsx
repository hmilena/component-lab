import type { Meta, StoryObj } from '@storybook/react';
import { CardSliderDemo } from '../../demos/CardSliderDemo';

const meta = {
  title: 'Demonstrations/CardSlider',
  component: CardSliderDemo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardSliderDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
