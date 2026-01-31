import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Accordion',
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  args: {
    items: [
      { title: 'Item 1', content: 'Content for item 1' },
      { title: 'Item 2', content: 'Content for item 2' },
    ],
  },
};
