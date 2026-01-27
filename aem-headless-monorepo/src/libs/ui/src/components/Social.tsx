import Link from "next/link";

export interface SocialProps {
  iconFontClassName?: string;
}

export default async function Social({ iconFontClassName = '' }: SocialProps) {
  return (
    <div className="">
      <Link href="#facebookwknd" className={iconFontClassName + " inline-block w-10 h-10 bg-black hover:bg-yellow text-amber-50 pt-1"}>{"\ue902"}</Link>
      <Link href="#twitter/" className={iconFontClassName + " inline-block w-10 h-10 bg-black hover:bg-yellow text-amber-50 pt-1"}>{"\ue901"}</Link>
      <Link href="#instagram/" className={iconFontClassName + " inline-block w-10 h-10 bg-black hover:bg-yellow text-amber-50 pt-1"}>{"\ue903"}</Link>
    </div>
  )
}
