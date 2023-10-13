import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Row, Col, Collapse, Spinner, Alert, Badge } from "reactstrap";
import firebase from "../firebase.config";
import audio from './echoed-ding-459.mp3';
import "./chatbox.scss"
function Chatbox() {
  const [messages, setMessages] = useState([]);
  const scrollToViewItem = useRef();
  const [message, setMessage] = useState("");
  const [minimise, setMinimise] = useState(true); // minimise chat state false == minimised
  const [closeBox, setCloseBox] = useState(true); // close box or open it false == opened
  const [loading, setLoading] = useState(true);
  const [sendMsgError, setSendMsgError] = useState("");
  const [error, setError] = useState("");
  const [Navigate, setNavigate] = useState({
    message: "",
    path: "",
    valid: false,
  });
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const playAudio = (adminMessages) => {
    new Audio(audio).play();
    document.title = "ACM(" + adminMessages + ")"
  }
  const messagesHandler = (e) => {
    e.preventDefault();
    if (message === null || message === undefined || message.length === 0) {
      return null;
    } else {
      const fireRef = firebase
        .database()
        .ref("rooms")
        .child(currentUser.id+"/messages"); // default admins roomId
      fireRef.push(
        {
          message: message,
          sender: currentUser.id,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        },
        (err) => {
          if (err) {
            // error happend
            setSendMsgError(err);
          } else {
            setMessage("");
            scrollToViewItem.current.scrollIntoView({ behaviour: "smooth" });
            // add notification
            fireRef.parent.update({
              adminMessages:0,
              userMessages: firebase.database.ServerValue.increment(1),
              createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
          }
        }
      );
    }
  };
  const inputHandler = (e) => {
    setMessage(e.target.value);
  };
  const minimiseHandler = () => {
    setMinimise(!minimise);
  
    if(!minimise){
      firebase.database().ref("rooms").child(currentUser.id).update({
        adminMessages: 0,
      });
    }
   // document.getElementById("spand1"+id).childNodes[1].style="display:";
  };
  const openBoxHandler = () => {
    setCloseBox(true);
    setMinimise(true);
    
//document.getElementById("spand1"+id).childNodes[1].style="display:";
  };
  const closeBoxHandler = () => {
    setCloseBox(false);
    setMinimise(false);
   // document.getElementById("spand1"+id).childNodes[1].style="display:";
    // set Notification to 0
    firebase.database().ref("rooms").child(currentUser.id).update({
      adminMessages: 0,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      firebase.database()
        .ref("rooms")
        .child(currentUser.id)
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
              setMessages(exportedData);
              console.log(exportedData.adminMessages)
              exportedData.adminMessages > 0
                ?  playAudio(exportedData.adminMessages)   : (document.title = "ACM");
            } else {
              firebase.database()
              .ref("rooms")
              .child(currentUser.id)
              .set({
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                userId: currentUser.id,
                username: currentUser.nom + " " + currentUser.prenom,
                userMessages: 0,
                adminMessages: 0,
              });
            }
            setLoading(false);
          },
          (err) => {
            if (err) {
              setError(err.message);
            }
          }
        );
    }, 500);
    // eslint-disable-next-line
  }, []);
  if (Navigate.valid === true) {
    return (
      <Navigate
        to={{
          pathname: Navigate.path,
          state: { message: Navigate.message, path: "/" },
        }}
      />
    );
  }
  return (
    <div className="chat-box" >
      <button
        className="btn bbn btn-fab gradient float-right-bottom"
        onClick={closeBoxHandler}
        style={closeBox ? { display: "block",zIndex:1 } : { display: "none" }}
      >
        <i className="fas fa-inbox fa-2x"></i>{" "}
        {messages.adminMessages > 0 ? (
          <>
            <Badge
              color="danger"
              style={{ position: "absolute", top: "0px", right: "0px" }}
              pill
            >
              {messages.adminMessages}
            </Badge>
          </>
        ) : null}
      </button>
      <div
        className="chat-box"
        style={closeBox ? { display: "none" } : { display: "block" }}
      >
        <div className="content">
          <div className="header">
            <div className="actions text-right">
              <button className="btn" onClick={minimiseHandler}>
                <i
                  className={
                    "fas " +
                    (minimise ? "fa-window-minimize" : "fa-window-maximize")
                  }
                ></i>
              </button>
              <button className="btn" onClick={openBoxHandler}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          <Collapse isOpen={minimise}>
            <div className="messages-container">
              {
                // display this only if there is no messages
                loading === true ? (
                  <Spinner color="secondary" className="text-center" />
                ) : messages.messages.length === 0 ? (
                  <div className="empty-box">
                    <div className="subtitle">Nouveau message</div>
                  </div>
                ) : (
                  ""
                )
              }
              <ol className="messages">
              {
                (messages.messages ===null||messages.messages ===undefined)? null:(

                messages.messages.map( message => (
                  <li
                    key={Math.random() * 1000}
                    className={message.sender === currentUser.id ? "mine" : ""}
                  >
                    {message.message}
                  </li>
                )))
              }
                <li
                  className="mine"
                  ref={scrollToViewItem}
                  style={{ visibility: "hidden" }}
                ></li>
              </ol>
            </div>
            <div className="footer">
              <hr />
              {error.length > 0 && <Alert color="danger"> {error} </Alert>}
              {sendMsgError.length > 0 && (
                <Alert color="danger"> {sendMsgError} </Alert>
              )}
              <Row>
                <Col xs="10">
                  <form onSubmit={messagesHandler}>
                    <input
                      type="text"
                      name="message"
                      value={message}
                      onChange={inputHandler}
                      className="form-control"
                      placeholder="Demande d'aide"
                    />
                  </form>
                </Col>
                <Col xs="2">
                  <button className="btn" onClick={messagesHandler}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </Col>
              </Row>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
