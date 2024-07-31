// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import toast from "react-hot-toast";
import logo from "./../assets/mainlogo.png";
import Client from "./../components/Client";
import Button from "@mui/material/Button";
import Editor from "./../components/Editor";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const [clients, setClients] = useState([]);

  const reactNavigator = useNavigate();
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      //Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
        }
      );

      // Listening for disconnected

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.CODE_CHANGE);
        socketRef.current.off(ACTIONS.LANGUAGE_CHANGE);
      }
    };
  }, []);

  if (!location.state) {
    <Navigate to="/" />;
  }

  return (
    <div className="mainwrap h-screen grid grid-cols-[110px_1fr] sm:grid-cols-[200px_1fr] ">
      <div className="aside-page bg-[#141414]  shadow-lg  h-svw p-4 flex flex-col">
        <div className="aside-inner flex-1">
          <div className="logo">
            <img src={logo} alt="logo" className="my-7 w-56 sm:w-auto" />
          </div>
          <h2 className="text-white font-semibold my-4 font-sans text-sm md:text-lg">
            Connected
          </h2>
          <div className="  flex align-center flex-wrap gap-3 ">
            {clients.map((client) => (
              <Client username={client.username} key={client.socketId} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button variant="outlined">COPY ROOM ID</Button>
          <Button variant="contained" color="error">
            Leave
          </Button>
        </div>
      </div>
      <div>
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
