interface MaterialIconProps {
  children: string;
  className?: string;
}

export function MaterialIcon({ children, className = "" }: MaterialIconProps) {
  return <span className={`material-symbols-outlined ${className}`} aria-hidden="true">{children}</span>;
}
