function extend(dest, src) {
	for (var k in src) {
		dest[k] = src[k];
	}
	return dest;
}

function repeat(item, n) {
	/* Return an array that contains 'item' 'n' times */
	var ret = [];
	for (var i = 0; i < n; ++i) {
		ret.push(item);
	}
	return ret;
}

function alternator() {
	/* Accepts a variable number of arrays.
	 *
	 * e.g. alternator([1,2,3,4], [10, 20, 30]) will return
	 * [1,10,2,20,3,30,40] and
	 *
	 * alternator([1,2,3,4], [10, 20]) will return
	 * [1,10,2,20,3,4]
	 *
	 * Basically, it tries to alternate between the various arrays
	 * if there are any remaining elements in any of them. Returns the
	 * alternated array.
	 */
	var nseq = arguments.length;
	var exhausted = false;
	var buff = [];
	var ctrs = repeat(0, nseq);

	while (!exhausted) {
		exhausted = true;
		for (var i = 0; i < nseq; ++i) {
			if (ctrs[i] < arguments[i].length) {
				// log_it('debug', "Adding to buff:", arguments[i][ctrs[i]]);
				buff.push(arguments[i][ctrs[i]]);
				ctrs[i] += 1;
				exhausted = false;
			}
		}
	}

	return buff;
}

function arguments_to_array(args) {
	return Array.prototype.slice.call(args, 0);
}

function map(a, f) {
	// Apply 'f' [with 2 arguments (element, index)] or call member function 'f' [with no arguments]
	var r = [ ];
	for (var i = 0; i < a.length; ++i) {
		if (typeof f == "function") {
			r.push(f(a[i], i));
		}
		else if (typeof f == "string") {
			r.push(a[i][f]());
		}
	}
	return r;
}

function sprintf(fmt_str) {
	// log_it('debug', "sprintf", arguments);
	var fs_parts = fmt_str.split("%s");
	var args = map(arguments_to_array(arguments).slice(1), 'toString');

	// log_it('debug', "fs_parts, args:", fs_parts, args);

	if (fs_parts.length != args.length + 1) {
		console.warn(sprintf("The number of arguments in your format string (%s)[%s] " + 
			"does NOT match the number of arguments passed [%s]", 
			fmt_str, fs_parts.length-1, args.length));
	}
	return alternator(fs_parts, args).join("");
}

function hitch(obj, proc) {
	return function() {
		return proc.apply(obj, arguments);
	};
}

function not(proc) {
	return function() {
		return !proc.apply(this, arguments);
	};
}

function get_keys(o) {
	var r = [ ];
	for (var k in o) {
		r.push(k);
	}
	return r;
}


exports.extend = extend;
exports.repeat = repeat;
exports.alternator = alternator;
exports.arguments_to_array = arguments_to_array;
exports.map = map;
exports.sprintf = sprintf;
exports.hitch = hitch;
exports.not    = not;
exports.get_keys = get_keys;
