import { Button, Container, Grid, Typography, Card, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom"; 

import { serverUrl } from "../../../utils/serverUrl";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import CommentList from "../components/CommentList";
import CommentModal from "../components/CommentModal";
import { fontSize } from "@material-ui/system";
import { classExpression } from "@babel/types";

const useStyles = makeStyles({
  txt:{
    padding: "10px"
  },
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  }
});


function ProjectViewer() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const {
    error,
    isPending,
    data: project,
  } = useFetch(`${serverUrl}projects?id=${id}`);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);

  const selectComment = (comment) => {
    setComment(comment);
    setOpen(true);
  }

  

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Can't view project" />}
      {isPending && <LoadingComponent />}
      {
        project && (
          <Container>
            <Grid container>
              <Grid item xs={9}>
                <Grid container>
                  <Grid item xs={12}>
                    <Card style = {{backgroundColor: 'maroon', padding: 10}}>
                      <Grid container>
                        <Grid item xs={11}>
                          <Typography 
                          variant="h3"
                          style={{fontWeight: 'bold',
                          color: 'white'}}
                          >{project[0].title}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            className={classes.root}
                            variant="contained"
                            size="med"
                            style={{marginTop: 10,
                            fontWeight: 'bold'}}
                            onClick={() => {
                              history.push(`/projects/${id}/edit`);
                            }}
                          >
                            Edit
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    style={{marginTop: 15,
                    color: "maroon",
                    fontWeight: 'bold'}}
                    variant="h4"
                    gutterBottom>Name of SUC:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    style={{marginTop: 15,
                    textDecorationLine: 'underline'}}
                    variant="h4"
                    gutterBottom>{project[0].obligationType}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>College/Campus/Office:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].proponent}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Address:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                    className={classes.txt} 
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].investmentReq}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Location of Project:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].implementationPeriod}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Priority Ranking:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].PAPLevel}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Categorization: checkbox</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Card 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline',
                    fontSize: 30}}
                    gutterBottom>{project[0].readiness}</Card>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Description:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].status}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Purpose:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                    className={classes.txt} 
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].remarks}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                    className={classes.txt} 
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Beneficiaries:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].address}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                    className={classes.txt} 
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Implementation Period:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Card 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline',
                    fontSize: 30}}
                    gutterBottom>{project[0].projectLocation}
                    </Card>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Proposed Project Cost:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                    className={classes.txt} 
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].categorization}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Name of Proponent:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].description}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Designation:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                    className={classes.txt} 
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].purpose}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Contact Information:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Card
                    className={classes.txt} 
                    variant="h4"
                    style={{textDecorationLine: 'underline',
                    fontSize: 30}}
                    gutterBottom>{project[0].beneficiary}
                    </Card>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Date Accomplished:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].proponentName}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                    className={classes.txt} 
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Received by:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].designation}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Designation:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].contactInformation}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{color: "maroon",
                    fontWeight: 'bold'}}
                    gutterBottom>Date Received:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography 
                    className={classes.txt}
                    variant="h4"
                    style={{textDecorationLine: 'underline'}}
                    gutterBottom>{project[0].dateAccomplished}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <CommentList comments={project[0].commentList} selectComment = {selectComment}/>
              </Grid>
            </Grid>
            
            <CommentModal open = {open} setOpen = {setOpen} comment = {comment} />
          </Container>
        )
      }
    </React.Fragment>
  );
}

export default ProjectViewer;
