"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type GlowVariant = "cyan" | "orange" | "purple" | "neutral" | "flat";
type IconVariant = "cyan" | "orange" | "purple" | "green";
type CardLayout = "vertical" | "horizontal";

interface GlowCardProps {
  /** Card accent color / glow variant */
  variant?: GlowVariant;
  /** Optional icon element shown in the icon slot */
  icon?: ReactNode;
  /** Icon slot color variant */
  iconVariant?: IconVariant;
  /** Card heading text */
  title?: string;
  /** Card body text — or pass children directly */
  body?: string;
  /** Horizontal icon layout (icon left, content right) */
  layout?: CardLayout;
  /** Extra CSS class names */
  className?: string;
  /** Disable hover lift animation */
  noHover?: boolean;
  /** Pass arbitrary children instead of title/body */
  children?: ReactNode;
  /** Optional click handler */
  onClick?: () => void;
  /** HTML role override */
  role?: string;
  /** aria-label for the card */
  "aria-label"?: string;
}

export default function GlowCard({
  variant = "cyan",
  icon,
  iconVariant = "cyan",
  title,
  body,
  layout = "vertical",
  className = "",
  noHover = false,
  children,
  onClick,
  role,
  "aria-label": ariaLabel,
}: GlowCardProps) {
  const variantClass =
    variant === "orange"
      ? "card--orange"
      : variant === "neutral"
      ? "card--neutral"
      : variant === "flat"
      ? "card--flat"
      : "";

  const layoutClass = layout === "horizontal" ? "card--hrow" : "";

  const cardClass = ["card", variantClass, layoutClass, className]
    .filter(Boolean)
    .join(" ");

  const hoverProps = noHover
    ? {}
    : {
        whileHover: { y: -4 },
        transition: { duration: 0.25, ease: "easeOut" as const },
      };

  return (
    <motion.div
      className={cardClass}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      style={{ cursor: onClick ? "pointer" : undefined }}
      {...hoverProps}
    >
      {icon && (
        <div className={`card__icon card__icon--${iconVariant}`} aria-hidden="true">
          {icon}
        </div>
      )}

      {layout === "horizontal" ? (
        <div className="card__content">
          {title && <p className="card__title">{title}</p>}
          {body && <p className="card__body">{body}</p>}
          {children}
        </div>
      ) : (
        <>
          {title && <p className="card__title">{title}</p>}
          {body && <p className="card__body">{body}</p>}
          {children}
        </>
      )}
    </motion.div>
  );
}
