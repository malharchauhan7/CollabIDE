// eslint-disable-next-line no-unused-vars
import React from "react";
import Avatar from "react-avatar";
const Client = ({ username }) => {
  return (
    <div className="text-white flex flex-col items-center ">
      <Avatar name={username} size={40} round="15px" />
      <span className="my-[2px]">{username}</span>
    </div>
  );
};

export default Client;
