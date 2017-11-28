import $ from "jquery";
import socket from "../socket";
import render from "../render";
const chat = $("#chat");
import templates from "../../views";
const sidebar = $("#sidebar");

socket.on("join", function(data) {
	const id = data.network;
	const network = sidebar.find("#network-" + id);
	network.append(
		templates.chan({
			channels: [data.chan],
		})
	);
	chat.append(
		templates.chat({
			channels: [data.chan],
		})
	);
	render.renderChannel(data.chan);

	// Queries do not automatically focus, unless the user did a whois
	if (data.chan.type === "query" && !data.shouldOpen) {
		return;
	}

	sidebar.find(".chan")
		.sort(function(a, b) {
			return $(a).data("id") - $(b).data("id");
		})
		.last()
		.click();
});
