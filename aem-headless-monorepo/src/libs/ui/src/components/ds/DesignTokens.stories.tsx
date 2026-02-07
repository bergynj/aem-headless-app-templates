import type { Meta, StoryObj } from '@storybook/react';
import { DesignTokens } from './DesignTokens';

const meta: Meta<typeof DesignTokens> = {
  title: 'Design System/Tokens',
  component: DesignTokens,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DesignTokens>;

export const Default: Story = {};
