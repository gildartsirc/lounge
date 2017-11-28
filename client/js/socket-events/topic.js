import $ from "jquery";
import socket from "../socket";
import helpers_parse from "../libs/handlebars/parse";

socket.on("topic", function(data) {
	const topic = $("#chan-" + data.chan).find(".header .topic");
	topic.html(helpers_parse(data.topic));
	// .attr() is safe escape-wise but consider the capabilities of the attribute
	topic.attr("title", data.topic);
});
