import LoginModal from "./LoginModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LoginModal> = {
  title: "Modals/LoginModal",
  component: LoginModal,
  args: {
    isOpen: true,
    onClose: () => alert("login modal close"),
  },
};
export default meta;

type Story = StoryObj<typeof LoginModal>;

export const Default: Story = {};
