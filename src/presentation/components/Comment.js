import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Comment = ({ comment, ReplayHanlder, deleteComment, IsReplyCheck }) => {
  const [replayInput, setReplayInput] = useState("");
  return (
    <>
      <div
        key={comment.id}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "2px",
          padding: "5px",
        }}
      >
        <Form.Text muted style={{ alignSelf: "center" }}>
          {comment?.message}
        </Form.Text>

        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => {
            deleteComment(comment.id);
          }}
        >
          DELETE
        </Button>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => IsReplyCheck(comment.id)}
        >
          REPLY
        </Button>
      </div>
      {comment?.isReplyClick && (
        <div>
          <div
            key={comment.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
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
              disabled={replayInput !== "" ? false : true}
              size="sm"
              variant="outline-primary"
              onClick={() => {
                ReplayHanlder(comment.id, replayInput);
                setReplayInput("");
              }}
            >
              REPLY
            </Button>
          </div>
        </div>
      )}
      {comment.replies.map((reply) => (
        <div key={reply.id} style={{ marginLeft: "50px" }}>
          <Comment
            comment={reply}
            ReplayHanlder={ReplayHanlder}
            deleteComment={deleteComment}
            IsReplyCheck={IsReplyCheck}
          />
        </div>
      ))}
    </>
  );
};

export default Comment;
