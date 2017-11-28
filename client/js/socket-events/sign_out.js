import socket from "../socket";
import storage from "../localStorage";

socket.on("sign-out", function() {
	storage.remove("token");
	location.reload();
});
