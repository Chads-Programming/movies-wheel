// @ts-ignore
import TailwindColor from "@videsk/tailwind-random-color";

const ColorPicker = new TailwindColor({
	colors: ["gray", "indigo", "red", "pink", "blue", "green"],
	range: [1, 4], // Between 100 and 400
	prefix: "bg", // Can be 'bg', 'text', etc.
});

export default function getRandomColorTailwind(): string {
	const color = ColorPicker.pick();
	return color;
}
