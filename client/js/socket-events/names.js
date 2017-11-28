import socket from "../socket";
import render from "../render";

socket.on("names", render.renderChannelUsers);
