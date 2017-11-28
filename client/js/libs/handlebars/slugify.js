import escape from "css.escape";

export default function(orig) {
	return escape(orig.toLowerCase());
}
