import Link from "next/link";
import style from "./continuous-link.module.css";

export default function ContinuousLink({
	children,
	target,
	href,
}: Readonly<{
	children: React.ReactNode,
	target?: string,
	href: string,
}>) {
	return (
		<Link href={href} target={target} className={style.link}>
			{children}
		</Link>
	);
}