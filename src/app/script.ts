function easeInOutExpo(time: number, s: number, e: number, period: number) {

	if (time == 0) return s;
	if (time == period) return s + e;

	if ((time /= period / 2) < 1) return e / 2 * Math.pow(2, 10 * (time - 1)) + s;

	return e / 2 * (-Math.pow(2, -10 * --time) + 2) + s;

}

let player: NodeJS.Timeout;
const a = new Array<number>();

let speed: number, n: number, m: number, i = 0;

let countA = 0, countB = 0;

const svg = document.querySelector("svg") as SVGSVGElement;

function playListener() {

	if (i >= n) {

		clearInterval(player);

		(document.querySelector("#play") as HTMLButtonElement).style.display = "inline-block";
		(document.querySelector("#pause") as HTMLButtonElement).style.display = "none";

		return;

	}

	i++;

	(document.querySelector("#turn") as HTMLParagraphElement).innerHTML = `Turn: ${i.toString()}`;

	svg.innerHTML = "";

	const randomVal = document.createElementNS("http://www.w3.org/2000/svg", "text");
	const random = Math.floor(Math.random() * m);

	randomVal.setAttribute("x", "50");
	randomVal.setAttribute("y", "50");
	randomVal.setAttribute("text-anchor", "middle");
	randomVal.setAttribute("dominant-baseline", "middle");
	randomVal.setAttribute("font-size", "0");
	randomVal.dataset.easing = Date.now().toString();
	randomVal.innerHTML = `${random}`;


	svg.appendChild(randomVal);

	const animation = setInterval(() => {

		const time = Date.now() - Number(randomVal.dataset.easing);
		randomVal.setAttribute("font-size", easeInOutExpo(time, 0, 50, 500 / speed).toString());

		if (time >= 500 / speed) clearInterval(animation);

	}, 15);


	const rectangleA = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	const rectangleB = document.createElementNS("http://www.w3.org/2000/svg", "rect");

	rectangleA.setAttribute("x", "25");
	rectangleA.setAttribute("y", "75");
	rectangleA.setAttribute("width", "500");
	rectangleA.setAttribute("height", (Math.ceil(m / 10) * 50).toString());
	rectangleA.setAttribute("fill", "none");
	rectangleA.setAttribute("stroke", "black");

	rectangleB.setAttribute("x", "525");
	rectangleB.setAttribute("y", "75");
	rectangleB.setAttribute("width", "500");
	rectangleB.setAttribute("height", (Math.ceil(m / 10) * 50).toString());
	rectangleB.setAttribute("fill", "none");
	rectangleB.setAttribute("stroke", "black");

	svg.appendChild(rectangleA);
	svg.appendChild(rectangleB);

	for (let i = 0; i < m; i++) {

		const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

		// brake each 10 balls

		const cx = i % 10 * 50 + 50 + a[i] * 500;

		circle.setAttribute("cx", cx.toString());
		circle.setAttribute("cy", (100 + Math.floor(i / 10) * 50).toString());
		circle.setAttribute("r", "20");
		circle.setAttribute("fill", "none");
		circle.setAttribute("stroke", "black");
		circle.dataset.easing = Date.now().toString();

		const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

		text.setAttribute("x", cx.toString());
		text.setAttribute("y", (100 + Math.floor(i / 10) * 50).toString());
		text.setAttribute("text-anchor", "middle");
		text.setAttribute("dominant-baseline", "middle");
		text.setAttribute("font-size", "20");
		text.innerHTML = i.toString();

		svg.appendChild(circle);
		svg.appendChild(text);

		if (random == i) {

			if (a[i] == 0) {

				rectangleA.setAttribute("fill", "#ff000020");
				rectangleB.setAttribute("fill", "none");

				countA--;
				countB++;

			} else {

				rectangleB.setAttribute("fill", "#ff000020");
				rectangleA.setAttribute("fill", "none");

				countA++;
				countB--;

			}

			let aP = Math.round(countB * 1000 / m) / 10;
			let aPs = aP.toString()
			if (aP % 1 == 0) aPs = aPs + ".0";
			let bP = Math.round(countA * 1000 / m) / 10;
			let bPs = bP.toString()
			if (bP % 1 == 0) bPs = bPs + ".0";

			document.querySelector("#data")!!.innerHTML = `A: ${countA.toString()} (${aPs}%) B: ${countB.toString()} (${bPs}%)`

			a[i] = a[i] ? 0 : 1;

			const cx2 = i % 10 * 50 + 50 + a[i] * 500;

			const circle2 = circle.cloneNode() as SVGCircleElement;
			circle2.setAttribute("cx", cx2.toString());
			circle2.setAttribute("r", "0");
			circle2.setAttribute("fill", "#00ff0080");

			const text2 = text.cloneNode() as SVGTextElement;
			text2.innerHTML = i.toString();
			text2.setAttribute("x", cx2.toString());
			text2.setAttribute("font-size", "0");

			svg.appendChild(circle2);
			svg.appendChild(text2);

			const animation = setInterval(() => {

				const time = Date.now() - Number(circle.dataset.easing);
				circle.setAttribute("r", (20 - easeInOutExpo(time, 0, 20, 250 / speed)).toString());
				circle2.setAttribute("r", easeInOutExpo(time, 0, 20, 250 / speed).toString());
				text.setAttribute("font-size", (20 - easeInOutExpo(time, 0, 20, 250 / speed)).toString());
				text2.setAttribute("font-size", easeInOutExpo(time, 0, 20, 250 / speed).toString());

				if (time >= 250 / speed) clearInterval(animation);

			}, 15);

		}

	}

}

export default async function Script() {

	document.querySelector("#play")?.addEventListener("click", () => {

		(document.querySelector("#play") as HTMLButtonElement).style.display = "none";
		(document.querySelector("#pause") as HTMLButtonElement).style.display = "inline-block";

		n = Number((document.querySelector("#n") as HTMLInputElement).value);
		m = Number((document.querySelector("#m") as HTMLInputElement).value);

		countA = m;
		countB = 0;

		speed = Number((document.querySelector("#speed") as HTMLInputElement).value);

		a.length = m;
		a.fill(0);

		svg.setAttribute("width", ((10 * 50 + 50) * 2).toString());
		svg.setAttribute("height", (Math.ceil(m / 10) * 50 + 100).toString());

		player = setInterval(playListener, 600 / speed);

	});

	document.querySelector("#reset")?.addEventListener("click", () => {

		clearInterval(player);

		a.fill(0);

		i = 0;

		(document.querySelector("#play") as HTMLButtonElement).style.display = "inline-block";
		(document.querySelector("#pause") as HTMLButtonElement).style.display = "none";

	});

	document.querySelector("#pause")?.addEventListener("click", () => {

		clearInterval(player);

		(document.querySelector("#play") as HTMLButtonElement).style.display = "inline-block";
		(document.querySelector("#pause") as HTMLButtonElement).style.display = "none";

	});

}
