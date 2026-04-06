import type { Meta, StoryObj } from '@storybook/react';
import { DropdownSubmenuDemo } from '../../demos/DropdownSubmenuDemo';

const meta = {
  title: 'Demonstrations/DropdownSubmenu',
  component: DropdownSubmenuDemo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DropdownSubmenuDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
