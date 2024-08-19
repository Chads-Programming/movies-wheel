export default function getPosterImage(
	poster_path: string,
	size: string = "w220_and_h330_face",
) {
	return `https://image.tmdb.org/t/p/${size}/${poster_path}`;
}
