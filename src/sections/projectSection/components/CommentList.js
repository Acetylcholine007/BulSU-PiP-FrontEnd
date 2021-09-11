import {
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { Block } from "@material-ui/icons";
import React from "react";

function CommentList({ comments, selectComment, newComments }) {
  const useStyles = makeStyles(() => ({
    icon: {
      fontSize: "5em",
    },
    button: {
      textTransform: "none",
      margin: '10px 0px'
    },
  }));

  const classes = useStyles();
  return (
    <List dense>
      {comments.length == 0 && newComments.length == 0 && (
        <Grid container align="center">
          <Grid item xs={12} align="center">
            <Block className={classes.icon} color="action" />
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5">No comments to show</Typography>
          </Grid>
        </Grid>
      )}
      {comments.length !== 0 &&
        comments.map((comment) => (
          <Button
            className={classes.button}
            onClick={() => selectComment(comment)}
            key={comment.datetime}
            fullWidth
            variant="outlined"
          >
            <ListItem alignItems="flex-start" dense>
              <ListItemText
                primary={
                  <Typography variant="body1">{`${new Date(
                    comment.datetime
                  ).toDateString()}`}</Typography>
                }
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
          </Button>
        ))}
      {newComments.length !== 0 &&
        newComments.map((comment) => (
          <Button
            className={classes.button}
            onClick={() => selectComment(comment)}
            key={comment.datetime}
            variant="outlined"
          >
            <ListItem alignItems="flex-start" dense>
              <ListItemText
                primary={
                  <Typography variant="body1">{`${new Date(
                    comment.datetime
                  ).toDateString()}`}</Typography>
                }
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
          </Button>
        ))}
    </List>
  );
}

export default CommentList;
