var diff;

export default function(a, opt) {
	if (a !== diff) {
		diff = a;
		return opt.fn(this);
	}

	return opt.inverse(this);
}
