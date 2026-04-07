import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { Slot } from "@radix-ui/react-slot"

const buttonStyles = tv({
  base: "rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",

  variants: {
    size: {
      default: "px-3 py-2",
      icon: "p-2",
      "icon-sm": "p-1",
    },
  },

  defaultVariants: {
    size: "default",
  },
})

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean
  }

export const Button = ({ size, className, asChild, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : "button"

  return <Comp className={buttonStyles({ size, className })} {...props} />
}
