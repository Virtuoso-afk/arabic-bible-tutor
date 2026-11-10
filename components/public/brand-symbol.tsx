type BrandSymbolProps = { className?: string };

export function BrandSymbol({ className = "" }: BrandSymbolProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 44 44">
      <path d="M8 28c4-11 12-17 27-17" />
      <path d="M10 34c8-3 16-2 24 3" />
      <circle cx="33" cy="11" r="4" />
      <circle cx="10" cy="34" r="4" />
    </svg>
  );
}
