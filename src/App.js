import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import Comment from "./presentation/components/Comment";
const App = () => {
  const [commentInput, setCommentInput] = useState("");
  const [isReplyClick, setIsReplyClick] = useState(false);
  const [commentMessage, setCommentMessage] = useState([]);
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const AddCommenthanlder = () => {
    let newComment = {
      id: small_id,
      message: commentInput,
      isReplyClick: false,
      replies: [],
    };
    setCommentMessage((prevComments) => [...prevComments, newComment]);
    setCommentInput("");
  };
  const IsReplyCheck = (id) => {
    const updateIsReplyCheck = (comments) => {
      return comments.map((comment) => {
        if (comment.id === id) {
          if (comment.replies.length > 0) {
            return {
              ...comment,
              isReplyClick: !comment.isReplyClick,
              replies: updateIsReplyCheck(comment.replies),
            };
          }
          return {
            ...comment,
            isReplyClick: !comment.isReplyClick,
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            isReplyClick: false,
            replies: updateIsReplyCheck(comment.replies),
          };
        }
        if (comment.id !== id) {
          return {
            ...comment,
            isReplyClick: false,
          };
        }

        return comment;
      });
    };
    setCommentMessage(updateIsReplyCheck(commentMessage));
    setIsReplyClick(!isReplyClick);
  };
  const ReplayHanlder = (id, text) => {
    const newReply = {
      id: small_id,
      message: text,
      isReplyClick: false,
      replies: [],
    };

    const updateComments = (commentMessage) => {
      return commentMessage.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            isReplyClick: !comment.isReplyClick,
            replies: [...comment.replies, newReply],
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateComments(comment.replies),
          };
        }
        return comment;
      });
    };
    setCommentMessage((prevComments) => updateComments(prevComments));
  };
  const deleteComment = (commentId) => {
    const deleteCommentRecursive = (comments) => {
      return comments.filter((comment) => {
        if (comment.id === commentId) {
          return false;
        }
        if (comment.replies.length > 0) {
          comment.replies = deleteCommentRecursive(comment.replies);
        }
        return true;
      });
    };
    setCommentMessage(deleteCommentRecursive);
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={0} md={0} lg={2}></Col>
        <Col xs={12} md={12} lg={8}>
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
                    <Comment
                      comment={item}
                      ReplayHanlder={ReplayHanlder}
                      deleteComment={deleteComment}
                      IsReplyCheck={IsReplyCheck}
                    />
                  </>
                );
              })}
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={0} lg={2}></Col>
      </Row>
    </Container>
  );
};

export default App;
