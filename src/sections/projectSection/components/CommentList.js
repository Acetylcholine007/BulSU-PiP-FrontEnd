import { Container, Typography } from "@material-ui/core";
import React from "react";
import CommentCard from "./CommentCard";

function CommentList({ comments, selectComment }) {
  return (
    <Container>
      <Typography variant="h4">Comments</Typography>
      {comments.map((comment) => (
        <div onClick={() => selectComment(comment)}>
          <CommentCard comment={comment} />
        </div>
      ))}
    </Container>
  );
}

export default CommentList;
