import "./BrandMark.css";

export type BrandMarkProps = {
  iconSrc: string;
  wordmark: string;
};

export function BrandMark({ iconSrc, wordmark }: BrandMarkProps) {
  return (
    <div className="brand-mark">
      <img
        className="brand-mark__icon"
        src={iconSrc}
        alt=""
        decoding="async"
        aria-hidden
      />
      <span className="brand-mark__wordmark">{wordmark}</span>
    </div>
  );
}
