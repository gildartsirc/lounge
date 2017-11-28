import emojiRegex from "emoji-regex";
const regex = emojiRegex();

export default function findEmoji(text) {
	const result = [];
	let match;

	while ((match = regex.exec(text))) {
		result.push({
			start: match.index,
			end: match.index + match[0].length,
			emoji: match[0],
		});
	}

	return result;
}
