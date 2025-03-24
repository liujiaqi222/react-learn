import type { Meta, StoryObj } from "@storybook/react";

import { Calendar,  } from "../04.React Calendar/2.calendar component/Calendar";
import dayjs from "dayjs";

const meta = {
  title: "component/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Value: Story = {
  args: {
    value: dayjs(Date.now()),
  },
};


export const Locale: Story = {
  args: {
    value: dayjs(Date.now()),
    locale: "en-US",
  },
};