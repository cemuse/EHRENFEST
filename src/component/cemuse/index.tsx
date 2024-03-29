import { ReactNode } from "react";
import style from "./cemuse.module.css";

export default function Cemuse({ children }: { children: ReactNode }) {

	return (
		<span className={style.cemuse}>{children}</span>
	)

}