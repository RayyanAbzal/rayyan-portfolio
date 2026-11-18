import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/*
 * Button for the site: 10px corners, 40px tall. `border border-transparent` is the base so that
 * forced-colors modes still draw an edge on the filled variants. Labels stay
 * on one line, and wrap (centred) below 360px instead of clipping.
 */
const buttonVariants = cva(
  "inline-flex min-h-10 max-w-full shrink-0 items-center justify-center gap-2 rounded-[10px] border border-transparent px-4 py-2.5 text-[0.90625rem] leading-none font-medium whitespace-nowrap transition-[scale,background-color,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none [&:not(:disabled):not([aria-disabled=true])]:active:scale-[0.97] max-[360px]:text-center max-[360px]:leading-tight max-[360px]:whitespace-normal [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-pine text-on-fill shadow-[var(--shadow)] hover:opacity-[0.88]",
        gold:
          "bg-on-panel text-panel hover:opacity-[0.88]",
        outline:
          "border-line-2 bg-paper text-ink hover:bg-paper-2",
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
