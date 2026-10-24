import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/*
 * Pill button for the site. `border border-transparent` is the base so that
 * forced-colors modes still draw an edge on the filled variants. Labels stay
 * on one line, and wrap (centred) below 360px instead of clipping.
 */
const buttonVariants = cva(
  "inline-flex max-w-full shrink-0 items-center justify-center gap-2.5 rounded-full border border-transparent px-[26px] py-[15px] text-base leading-none font-semibold whitespace-nowrap shadow-[0_1px_0_rgb(var(--ink-rgb)/0.04)] transition-[translate,scale,background-color,box-shadow] duration-150 ease-out select-none [&:not(:disabled):not([aria-disabled=true])]:active:scale-[0.96] max-[360px]:text-center max-[360px]:leading-tight max-[360px]:whitespace-normal [&_svg]:size-4 [&_svg]:shrink-0 motion-safe:hover:-translate-y-px",
  {
    variants: {
      variant: {
        default:
          "bg-pine text-on-fill hover:bg-pine-hover hover:shadow-[0_14px_28px_-16px_rgb(var(--pine-rgb)/0.55)]",
        gold:
          "bg-on-fill text-deep hover:bg-paper-2 hover:shadow-[0_14px_28px_-16px_rgb(0_0_0/0.5)]",
        outline:
          "border-line-2 bg-paper text-ink shadow-none hover:bg-paper-2 hover:shadow-[0_14px_28px_-18px_rgb(var(--ink-rgb)/0.6)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
