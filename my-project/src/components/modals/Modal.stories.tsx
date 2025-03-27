import Modal from "./Modal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Modal> = {
  title: "Modals/Modal",
  component: Modal,
  args: {
    isOpen: true,
    onClose: () => alert("close"),
    children: <div style={{ padding: 20 }}>Modal Content Here</div>,
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {};
