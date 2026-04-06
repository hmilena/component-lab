import type { Meta, StoryObj } from '@storybook/react';
import { InputPinDemo } from '../../demos/InputPinDemo';

const meta = {
  title: 'Demonstrations/InputPin',
  component: InputPinDemo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof InputPinDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
