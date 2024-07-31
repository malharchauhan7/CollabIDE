import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnection: true,
    reconnectionAttempt: "Infinity",
    timeout: 100000,
    transports: ["websocket"],
  };
  return io(import.meta.env.REACT_APP_BACKEND_URL, options);
};
