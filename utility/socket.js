import { io } from "socket.io-client";
import { localhostURL } from "./localhostURL";

export const socket = io(`${localhostURL}/`, {
  transports: ["websocket"],
  ackTimeout: 10000,
  retries: 3,
});
