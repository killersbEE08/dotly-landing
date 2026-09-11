"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "xl";

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-amber text-ink hover:bg-amber-400 shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_8px_30px_-8px_rgba(255,193,7,0.55)] hover:shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_12px_40px_-8px_rgba(255,193,7,0.7)]",
  secondary:
    "border border-white/15 bg-white/[0.03] text-chalk hover:bg-white/[0.07] hover:border-white/25",
  ghost: "text-chalk-muted hover:text-chalk",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
  xl: "h-14 px-8 text-base",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

type ButtonProps = StyleProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type AnchorProps = StyleProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.as === "a") {
    const { variant: _v, size: _s, as: _a, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, as: _a, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
