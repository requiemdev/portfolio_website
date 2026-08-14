type Props = {
  label: string;
  className?: string;
};

export default function BrandMark({ label, className = "" }: Props) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      {label}
    </span>
  );
}
