import React, { useState, useEffect } from "react";
import { Row, Col, Container, Input, Alert, Spinner } from "reactstrap";
import firebase from "../firebase.config";
import useInfiniteScroll from "react-infinite-scroll-hook";
import UserChatRoom from "./UserChatRoomLink";
import LoadingPage from "../loading/LoadingPage";
export default function Inbox() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [usernameSearch, setUsernameSearch] = useState("");
  const getRooms = (offset) => {
    setLoading(true);
    setTimeout(() => {
      firebase
        .database()
        .ref("rooms")
        .orderByKey()
        .startAt(offset || "0")
        .limitToFirst(16)
        .on(
          "value",
          (data) => {
            const table = [];
            data.forEach((e) => {
              let value = e.exportVal();
              value.chatRoom = e.key;
              table.push(value);
            });
            if (table.length <= 1) {
              setHasNextPage(false);
            } else {
              setHasNextPage(true);
            }
            delete rooms[rooms.length - 1]; // remove last element cuz it"s first one in the new added list
            setRooms(rooms.concat(table));
            setLoading(false);
          },
          (err) => {
            if (err) {
              setError(err.message);
            }
          }
        );
    }, 500);
  };

  useEffect(() => {
    getRooms();
    setTimeout(() => {
      setLoadingPage(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      getRooms(rooms[rooms.length - 1].chatRoom);
    },
    scrollContainer: "window",
  });
  if (loadingPage) {
    return <LoadingPage />;
  }
  return (
    <Container className="mt-4" style={{ position: "relative" }}>
      <Input
        type="text"
        placeholder="Recherche"
        value={usernameSearch}
        onChange={(e) => {
          setUsernameSearch(e.target.value);
        }}
      />
      {error && <Alert color="danger">{error}</Alert>}
      <Row>
        {rooms.length > 0 &&
          rooms
            .filter((room) => {
              return room.username
                .toString()
                .toLowerCase()
                .includes(usernameSearch);
            })
            .map((user, index) => (
              <Col key={user.chatRoom}>
                <UserChatRoom
                  roomId={user.chatRoom}
                  userLogo={user.photo}
                  username={user.username}
                 
                  status={user.status}
                  userMessages={user.userMessages}
                />
              </Col>
            ))}
        {rooms.length > 0 && <div ref={infiniteRef}></div>}
      </Row>
      {!hasNextPage && (
        <h4 className="text-center text-warning"> "vide" </h4>
      )}
      {loading && (
        <div
          style={{
            width: "100%",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <Spinner
            color="primary"
            style={{
              width: "100px",
              height: "100px",
              margin: "auto",
            }}
          />
        </div>
      )}
    </Container>
  );
}
