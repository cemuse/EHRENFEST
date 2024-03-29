import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Cemuse from "@/component/cemuse";
import Link from "next/link";
import style from "./layout.module.css";
import { Center, Left, Right } from "@/component/align";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Cemuse",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" translate="no">

			<body className={sans.className}>

				<div className={style.main}>

					{children}
				
				</div>

				<footer className={style.footer}>

					<Cemuse>Cemuse</Cemuse> is being developed and grown by <Link href="https://twitter.com/@w_yama_can">Yama.can</Link>.

					<hr />

					<Right>

						<span className={style.title}><Cemuse>Cemuse</Cemuse></span>

						<br />

						© Yama.can 2024 All rights reserved.

					</Right>

				</footer>

			</body>

		</html>
	);
}
