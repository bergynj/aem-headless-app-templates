import Link from "next/link";
import { cn } from "../../lib/utils";

export interface SocialProps {
  iconFontClassName?: string;
  className?: string;
}

export default function Social({ iconFontClassName = '', className }: SocialProps) {
  const socialLinkClass = cn(
    iconFontClassName,
    "inline-flex items-center justify-center w-10 h-10 bg-[var(--color-navy)] text-white hover:bg-[var(--color-primary-blue)] transition-colors rounded-full"
  );

  return (
    <div className={cn("flex space-x-2", className)}>
      <Link href="#facebookwknd" className={socialLinkClass} aria-label="Facebook">{"\ue902"}</Link>
      <Link href="#twitter/" className={socialLinkClass} aria-label="Twitter">{"\ue901"}</Link>
      <Link href="#instagram/" className={socialLinkClass} aria-label="Instagram">{"\ue903"}</Link>
    </div>
  )
}