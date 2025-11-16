import { io } from "socket.io-client";
import { localhostURL } from "./localhostURL";

export const socket = io(`${localhostURL}/`, {
  ackTimeout: 10000,
  retries: 3,
});
