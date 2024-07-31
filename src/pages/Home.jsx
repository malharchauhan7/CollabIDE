// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import logo from "./../assets/logo.png";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a New Room");
  };
  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("RoomID & Username is Required");
      return;
    }

    //Redirect,using state we can pass data to this page to editorpage
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handlerInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="w-full h-screen">
        <div className="w-[90%] md:w-[50%] lg:w-[30%] h-auto absolute p-5 top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-[#1c1c1c] shadow-2xl rounded-2xl overflow-hidden">
          <div className="flex items-center justify-center flex-col mb-5">
            <img alt="" src={logo} className="w-[70px] m-3" />
            <h2 className="text-3xl font-semibold font-mono text-zinc-200 mt-2">
              CollabIDE
            </h2>
          </div>
          <div className="flex flex-col m-2 gap-5 ">
            <TextField
              id="outlined-basic"
              label="ROOM ID"
              variant="outlined"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              onKeyUp={handlerInputEnter}
            />
            <TextField
              id="outlined-basic"
              label="USERNAME"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={handlerInputEnter}
            />
            <Button variant="contained" color="primary" onClick={joinRoom}>
              Join
            </Button>
            <span className="text-md text-center">
              {"If You don't have an Invite then create "}
              <a
                onClick={createNewRoom}
                href=""
                className=" text-[#00ffc6] hover:opacity-80 hover:underline transition-all font-semibold"
              >
                New Room
              </a>
            </span>
          </div>
        </div>
        <footer className="fixed bottom-0 items-center justify-center left-[50%]  -translate-x-[50%] -translate-y-[50%]">
          <div>
            Build by{" "}
            <a
              target="_blank"
              href="https://github.com/malharchauhan7"
              className="text-[#42A5F5] text-bold hover:opacity-80 transition-all font-bold"
            >
              Malhar
            </a>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Home;
