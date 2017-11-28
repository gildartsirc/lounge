import $ from "jquery";
import renderPreview from "../renderPreview";
import socket from "../socket";
import utils from "../utils";

socket.on("msg:preview", function(data) {
	// Previews are not as important, we can wait longer for them to appear
	utils.requestIdleCallback(() => renderPreview(data.preview, $("#msg-" + data.id)), 6000);
});
