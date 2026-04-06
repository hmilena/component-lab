import type { Meta, StoryObj } from '@storybook/react';
import { DrawerDemo } from '../../demos/DrawerDemo';

const meta = {
  title: 'Demonstrations/Drawer',
  component: DrawerDemo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DrawerDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
