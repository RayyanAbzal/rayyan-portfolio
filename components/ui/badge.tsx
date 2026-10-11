import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/*
 * Site badges: stack chips on case pages, preview-panel status badges
 * (dark ground, so text stays at .55 alpha or above) and the small tags
 * and outline chip inside the card schematics.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full",
  {
    variants: {
      variant: {
        chip: "bg-bg-2 px-3 py-1.5 text-sm text-ink-2",
        tag: "justify-self-start bg-pine px-[7px] py-px text-[0.65625rem] text-paper",
        outline:
          "border border-pine-2 px-2 py-0.5 font-normal text-pine-2",
        green:
          "bg-[rgb(47_94_62/0.5)] px-[9px] py-0.5 text-[0.6875rem] text-ok-on-dark",
        amber:
          "bg-[rgb(193_122_42/0.3)] px-[9px] py-0.5 text-[0.6875rem] text-warn-on-dark",
        dim: "bg-[rgb(var(--cream)/0.08)] px-[9px] py-0.5 text-[0.6875rem] text-[rgb(var(--cream)/0.55)]",
      },
    },
    defaultVariants: {
      variant: "chip",
    },
  }
)

function Badge({
  className,
  variant = "chip",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
