import type {  StoryObj } from "@storybook/react";
import { createIcon } from "../07.Building Components/1.Icon/createIcon";
import { IconAdd } from "../07.Building Components/1.Icon/icons/IconAdd";
import { IconEmail } from "../07.Building Components/1.Icon/icons/IconEmail";


const meta = {
  title: "component/Icon",
  component: createIcon({content:''}),
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} ;

export default meta

type Story = StoryObj<typeof meta>;


export const Icons: Story = {
  args: {
    size: '1em',
    spin:true,
  },
  render: (args) => {
    return (
      <div className="flex gap-2">
        <IconAdd {...args} />
        <IconEmail {...args} />
      </div>
    );
  }
}