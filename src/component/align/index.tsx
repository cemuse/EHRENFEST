import style from "./align.module.css";

export function Left({ children }: { children: React.ReactNode }) {

	return <div className={style.left}>{children}</div>;

}

export function Center({ children }: { children: React.ReactNode }) {

	return <div className={style.center}>{children}</div>;

}

export function Right({ children }: { children: React.ReactNode }) {

	return <div className={style.right}>{children}</div>;

}
