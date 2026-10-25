import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface DockProps {
  className?: string
  items: {
    icon: LucideIcon
    label: string
    onClick?: () => void
  }[]
}

interface DockIconButtonProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  className?: string
}

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, className }, ref) => (
    <motion.button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl p-0 text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-12 sm:w-12",
        className,
      )}
    >
      <Icon aria-hidden="true" className="block h-5 w-5 shrink-0" />
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {label}
      </span>
    </motion.button>
  ),
)
DockIconButton.displayName = "DockIconButton"

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    return (
      <div
        ref={ref}
        aria-label="Navegación rápida"
        className={cn("app-dock pointer-events-none fixed inset-x-0 bottom-4 z-[1100] flex justify-center px-3 pb-[env(safe-area-inset-bottom)]", className)}
      >
        <div className="pointer-events-auto inline-flex w-fit items-center justify-center rounded-2xl">
          <div
            className={cn(
              "flex w-fit items-center justify-center gap-1 rounded-2xl border border-border bg-background/90 p-2 shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl sm:gap-2 sm:p-2.5",
            )}
          >
            {items.map((item) => (
              <DockIconButton key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>
    )
  },
)
Dock.displayName = "Dock"

export { Dock }
