import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Input,
  div,
  Button,
  Tooltip,
} from "reactstrap";
import { Link, useParams, Navigate } from "react-router-dom";
import firebase from "../firebase.config";
import {  useLocation } from "react-router-dom";
import "./Chat.scss";

export default () => {
  let location = useLocation();
  
  const user=JSON.parse(localStorage.getItem("user"))
  let { id } = useParams();
  const [firebaseMessages, setFirebaseMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [backToolTip, setBackToolTip] = useState(false);
  const [message, setMessage] = useState("");
  const [sendMsgError, setSendMsgError] = useState("");
  const [Navigate, setNavigate] = useState({
    valid: false,
    message: "",
    path: "",
  });
  const endLine = useRef(null);
  const backToolTipHandler = () => {
    setBackToolTip(!backToolTip);
  };
  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  const scrollBottom = () => {
    endLine.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      
    });
  };

  const sendMessage = () => {
    if (message.length > 0) {
      firebase
        .database()
        .ref("rooms")
        .child(id + "/messages")
        .push(
          {
            message: message,
            sender: user.role_as,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
          },
          (err) => {
            if (err) {
              // error happend
              setSendMsgError(err);
            }
          }
        );
        if(user.role_as==="admin"){
          firebase
          .database()
          .ref('rooms')
          .child(id)
          .child('adminMessages')
          .set(firebase.database.ServerValue.increment(1))
        }
      setMessage("");
      if (location.pathname.indexOf("/admin/messages/")!=1) {
        scrollBottom();
      } 
    }
  };

  // get messages
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      firebase
        .database()
        .ref("rooms/" + id)
        .on(
          "value",
          (data) => {
            if (data.exists()) {
              // valid room
              let exportedData = data.exportVal();
              let messages = exportedData.messages;
              let arrayMsgs = [];
              for (const msg in messages) {
                messages[msg].id = msg;
                arrayMsgs.push(messages[msg]);
              }
              exportedData.messages = arrayMsgs;
              setFirebaseMessages(exportedData);
            } else {
              setNavigate({
                valid: true,
                message: "Impossible de trouver la conversation a partir l'id " + id,
                path: "/404",
              });
            }


            firebase
            .database()
            .ref('rooms')
            .child(id)
            .child('userMessages')
            .set(0)
            
            setLoading(false);   
            if (location.pathname.indexOf("/admin/messages/")!=1) {
              scrollBottom();
            } 
          },
          (err) => {
            if (err) {
              setError(err.message);
            }
          }
        );
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (Navigate.valid) {
    return (
      <Navigate
        to={{
          pathname: Navigate.path,
          state: { message: Navigate.message, path: "/admin/inbox/" + id },
        }}
      />
    );
  }
  return (
    <Container fluid={false}>
        <div className="back-arrow">
          <Link to="/admin/chatinbox" id="backToInbox">
            <i className="fas fa-long-arrow-alt-left fa-5x"></i>
          </Link>
          <Tooltip
            placement="top"
            isOpen={backToolTip}
            target="backToInbox"
            toggle={backToolTipHandler}
          >
            Retour
          </Tooltip>
        </div>
        <h2 className="mt-3">
          <Link to={"/admin/users/" + firebaseMessages.userId || ""}>
            {firebaseMessages.username || "Username"}
          </Link>
        </h2>
        <hr />
        <Container>
          <div className="messages"    style={location.pathname.indexOf("/admin/inbox/")!=1 ?{height: "400px"}:{height:"100px"}}>
            {error && <strong>Error: {error}</strong>}
            {loading && <span>List: Loading...</span>}
            {/*!loading && scrollBottom()*/}
            {!loading &&
              (firebaseMessages?.messages?.length === 0 ||
                firebaseMessages.messages === undefined) && (
                <h2 className="text-center text-success">
                  {"Nouveau client " + firebaseMessages.username}
                </h2>
              )}
            {firebaseMessages?.messages?.map((el) => (
              <div
                className={
                  "line " +
                  (el.sender != id ? "mine" : "")
                }
                key={el.id}
              >
                {el.message}
                <span className="message-date">
                  {new Date(el.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
            <div ref={endLine} style={{ float: "left", clear: "both" }}></div>
          </div>
          <hr className="my-3" />
          {sendMsgError.length > 0 ? (
            <h5 className="text-danger">
              <strong>Attendez-vous:</strong>
              &nbsp;{sendMsgError}
            </h5>
          ) : (
            ""
          )}
          <div>
            <Input
              placeholder="Envoyer un message"
              onChange={messageHandler}
              value={message}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Button color="primary" onClick={sendMessage}>
              <i className="fas fa-paper-plane"></i>
            </Button>
          </div>
        </Container>
    </Container>
  );
};
