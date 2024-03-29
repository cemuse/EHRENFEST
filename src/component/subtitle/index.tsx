import style from "./subtitle.module.css";

export default function Subtitle({ children }: { children: React.ReactNode }) {

	return <p className={style.subtitle}>{children}</p>

}
