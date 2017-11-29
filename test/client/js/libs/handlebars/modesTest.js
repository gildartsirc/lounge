"use strict";

const expect = require("chai").expect;
const modes = require("../../../../../client/js/libs/handlebars/modes");

describe("modes Handlebars helper", function() {
	it("should return a text mode based on symbol", function() {
		expect(modes("@")).to.equal("op");
	});

	it("should return no special mode when given an empty string", function() {
		expect(modes("")).to.equal("normal");
	});

	it("should return nothing if the symbol does not exist", function() {
		expect(modes("?")).to.be.undefined;
	});
});
