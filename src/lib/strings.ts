export function capitalizeFirstLetter(string: string) {
	if (!string) return string; // Check if the string is empty or null
	return string.charAt(0).toUpperCase() + string.slice(1);
}
