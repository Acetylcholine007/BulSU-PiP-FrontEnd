import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

function CommentList({ comments, selectComment }) {
  const useStyles = makeStyles(() => ({
    card: {
      marginBottom: 10,
    },
  }));

  const classes = useStyles();

  return (
    <List>
      {comments.map((comment) => (
        <Card
          onClick={() => selectComment(comment)}
          className={classes.card}
          key={comment.datetime}
        >
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={`${comment.header} — ${new Date(
                comment.datetime
              ).toDateString()}`}
              secondary={
                <React.Fragment>
                  <Divider />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {comment.message}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </Card>
      ))}
    </List>
  );
}

export default CommentList;
