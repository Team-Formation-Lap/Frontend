import ResumeUploadModal from "./ResumeUploadModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ResumeUploadModal> = {
  title: "Modals/ResumeUploadModal",
  component: ResumeUploadModal,
  args: {
    isOpen: true,
    onClose: () => alert("resume upload modal close"),
  },
};
export default meta;

type Story = StoryObj<typeof ResumeUploadModal>;

export const Default: Story = {};
