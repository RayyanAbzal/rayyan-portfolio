import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Project card. Visual treatment (hairline, radius, shadow, stretched link)
 * lives in the `.card` rules in app/styles/cards.css so schematic internals
 * and the card chrome stay in one place.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card" className={cn("card", className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("card-body", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="card-title" className={cn(className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="card-description" className={cn(className)} {...props} />
  )
}

export { Card, CardContent, CardTitle, CardDescription }
