import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const buttonStyles = tv({
  base: "rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 disabled:pointer-events-none disabled:opacity-50",

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

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonStyles>

export const Button = ({ size, className, ...props }: ButtonProps) => {
  return <button className={buttonStyles({ size, className })} {...props} />
}
