import Link from "next/link";
import style from "./block-link.module.css";

export default function BlockLink({ href, target, children }: { href: string, target?: string, children: React.ReactNode }) {

	return <Link href={href} target={target} className={style.link}>{children}</Link>

}
