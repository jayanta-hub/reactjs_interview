import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";

const App = () => {
  const [commentInput, setCommentInput] = useState("");
  const [replayInput, setReplayInput] = useState("");
  const [id, setId] = useState(1);
  const [isReplyClick, setIsReplyClick] = useState(false);
  const [commentMessage, setCommentMessage] = useState([]);
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const AddCommenthanlder = () => {
    let data = {
      id: small_id,
      message: commentInput,
      isReplyClick: false,
      replay: [],
    };
    setCommentMessage([...commentMessage, data]);
    setId((p) => p + 1);
    setCommentInput("");
  };
  const IsReplyCheck = (id) => {
    let filterData = commentMessage;
    filterData.forEach((value, inx) => {
      if (value.replay.length > 0) {
        value.replay.forEach((item, ind) => {
          filterData[inx].replay[ind].isReplyClick = false;
        });
      }
      if (value.id === id) {
        filterData[inx].isReplyClick = !value.isReplyClick;
      } else {
        console.log("ass");
        filterData[inx].isReplyClick = false;
      }
    });
    setCommentMessage(filterData);
    setIsReplyClick(!isReplyClick);
  };
  const IsSubReplyCheck = (id) => {
    let filterData = commentMessage;
    filterData.forEach((value, inx) => {
      if (value.replay.length > 0) {
        value.replay.forEach((item, ind) => {
          if (item.id === id) {
            filterData[inx].replay[ind].isReplyClick = !item.isReplyClick;
            filterData[inx].isReplyClick = false;
          } else {
            filterData[inx].replay[ind].isReplyClick = false;
            filterData[inx].isReplyClick = false;
          }
        });
      } else {
        console.log("ass");
        filterData[inx].isReplyClick = false;
      }
    });
    setCommentMessage(filterData);
    setIsReplyClick(!isReplyClick);
  };
  const ReplayHanlder = (id) => {
    let data = commentMessage;
    data?.forEach((item, index) => {
      if (item.id === id) {
        data[index].isReplyClick = !item.isReplyClick;
        data[index].replay.push({
          id: small_id,
          message: replayInput,
          isReplyClick: false,
          replay: [],
          parentId: id,
        });
      } else {
      }
    });
    setId((p) => p + 1);
    setCommentMessage([...data]);
  };
  const DeleteHanlder = (id) => {
    let filterData = commentMessage?.filter((item, index) => item.id !== id);
    setCommentMessage(filterData);
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="2"></Col>
        <Col md="auto" lg={8}>
          <Row className="mb-5">
            <Col lg={8}>
              <Form.Label htmlFor="inputPassword5">Comment Widget</Form.Label>
              <Form.Control
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                value={commentInput}
                onChange={(e) => {
                  setCommentInput(e.target.value);
                }}
              />
            </Col>
            <Col
              lg={4}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <Button
                variant="primary"
                onClick={AddCommenthanlder}
                disabled={commentInput !== "" ? false : true}
              >
                Add Comment
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              {commentMessage?.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "2px",
                        padding: "5px",
                        // backgroundColor: "red",
                      }}
                    >
                      <Form.Text muted style={{ alignSelf: "center" }}>
                        {item?.message}
                      </Form.Text>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          DeleteHanlder(item.id);
                        }}
                      >
                        DELETE
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => IsReplyCheck(item.id)}
                      >
                        REPLY
                      </Button>
                    </div>
                    {item?.isReplyClick ? (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "2px",
                          padding: "5px",
                          // backgroundColor: "red",
                        }}
                      >
                        <Form.Control
                          type="text"
                          id="inputPassword5"
                          aria-describedby="passwordHelpBlock"
                          value={replayInput}
                          onChange={(e) => {
                            setReplayInput(e.target.value);
                          }}
                        />

                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => ReplayHanlder(item.id)}
                        >
                          REPLY
                        </Button>
                      </div>
                    ) : null}
                    {item?.replay?.map((item) => {
                      return (
                        <>
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              gap: "2px",
                              padding: "5px",
                              marginLeft: "50px",
                              // backgroundColor: "red",
                            }}
                          >
                            <Form.Text muted style={{ alignSelf: "center" }}>
                              {item?.message}
                            </Form.Text>

                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => {
                                DeleteHanlder(item.id);
                              }}
                            >
                              DELETE
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => IsSubReplyCheck(item.id)}
                            >
                              REPLY
                            </Button>
                          </div>
                          {item?.isReplyClick ? (
                            <div
                              key={item.id}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "2px",
                                padding: "5px",
                                marginLeft: "50px",
                              }}
                            >
                              <Form.Control
                                type="text"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                value={replayInput}
                                onChange={(e) => {
                                  setReplayInput(e.target.value);
                                }}
                              />

                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => {}}
                              >
                                REPLY
                              </Button>
                            </div>
                          ) : null}
                        </>
                      );
                    })}
                  </>
                );
              })}
            </Col>
          </Row>
        </Col>
        <Col xs lg="2"></Col>
      </Row>
    </Container>
  );
};

export default App;
