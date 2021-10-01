import React from "react";
import { useHistory } from "react-router-dom";
import UserLogo from "./avatar.svg";
import {  Badge } from "reactstrap";
import "./UserChatRoom.scss";

export default function UserChatRoomLink(props) {
  let history = useHistory();
  const handleOnClick = () => history.push("/admin/messages/" + props.roomId);

  return (
    <>
   
      <div
        className={"user-chat-room " + (props.bgColor ? props.bgColor : "")}
        onClick={handleOnClick}
      >  {props.userMessages > 0 ? (
        <>
          <Badge
            color="danger"
            style={{ position: "absolute", top: "0px", right: "0px" }}
            pill
          >
            {props.userMessages}
          </Badge>
        </>
      ) : null}
        <div className="avatar">
       
          <img
            className="shadow-3"
            src={props.userLogo ? props.userLogo : UserLogo}
            alt="user img"
          />
        </div>
        <div className={"data " + (props.textColor ? props.textColor : "")}>
          <div className={"username " + (props.status ? props.status : "")}>
            {props.username ? props.username : "Username"}
          </div>
        </div>
      </div>
    </>
  );
}
