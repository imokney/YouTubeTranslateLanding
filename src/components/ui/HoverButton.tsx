import React from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  text: string;
  className?: string;

  // Если передан href — рендерим <a>, иначе <button>
  href?: string;
  target?: string;
  rel?: string;

  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export default function InteractiveHoverButton({
  text,
  className,
  href,
  target,
  rel,
  onClick,
  type = "button",
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden " +
    "rounded-2xl border border-orange-300 " +
    "px-4 py-2 " +
    "text-orange-700 " +
    "transition-colors duration-300 " +
    "hover:bg-orange-50 " +
    "dark:border-orange-500/40 dark:text-orange-300 dark:hover:bg-orange-500/10 " +
    "focus:outline-none";




  const inner = (
    <>
      {/* “Точка”, которая раздувается и становится фоном */}
    <span
      aria-hidden
      className="
        absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2
        rounded-full bg-orange-600
        transition-transform duration-300 ease-out
        group-hover:scale-[80]
      "
    />


      {/* Состояние по умолчанию */}
      <span className="relative z-10 flex items-center gap-2">
        <span className="relative z-10 pr-5 whitespace-nowrap transition-all duration-600 group-hover:-translate-x-4 group-hover:opacity-0">
          {text}
        </span>

      </span>

      {/* Состояние при hover */}
      <span
        className={cx(
          "absolute inset-0 z-20 flex items-center justify-center gap-2",
          "translate-x-12 opacity-0 transition-all duration-300",
          "text-white",
          "group-hover:translate-x-0 group-hover:opacity-100"
        )}
      >
        <span className="whitespace-nowrap">{text}</span>
        <ArrowRight className="h-4 w-4" />
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        onClick={onClick as any}
        className={cx(base, className)}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick as any} className={cx(base, className)}>
      {inner}
    </button>
  );
}
