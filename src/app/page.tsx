"use client";

import Cemuse from "@/component/cemuse";
import Subtitle from "@/component/subtitle";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {

	useEffect(() => {

		if ("once" in global) return;
		(global as any).once = true;

		import("./script").then(({ default: script }) => script());

	});

	return (
		<>

			<article>

				<div>

					<Cemuse><h1>EHRENFEST</h1></Cemuse>

					<Subtitle>Animation of Ehrenfest</Subtitle>

				</div>

				<label htmlFor="m">M: </label>
				<input type="number" min="0" id="m" placeholder="Amount of the balls" />

				<label htmlFor="n">N: </label>
				<input type="number" min="0" id="n" placeholder="Amount of the trials" />

				<label htmlFor="speed">Speed: </label>
				<input type="number" id="speed" defaultValue="1.00" />

				<br />

				<div className={styles.buttons}>

					<button id="play">Play</button>
					<button id="reset">Reset</button>
					<button id="pause" style={{ display: "none" }}>Pause</button>

				</div>

				<br />

				<p id="turn"></p>
				<p id="data"></p>

				<svg>

				</svg>

			</article>

		</>
	);

}
