import { Container, Typography } from "@material-ui/core";
import React from "react";
import CommentCard from "./CommentCard";

function CommentList({ comments }) {
  return (
    <Container>
    <Typography variant = 'h4'>Comments</Typography>
      {comments.map((comment) => (
        <CommentCard comment={comment} />
      ))}
    </Container>
  );
}

export default CommentList;
