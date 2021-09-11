import {
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  GridList,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  ListItem,
  Avatar,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Hidden,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  CardContent,
} from "@material-ui/core";
import {
  AddCircleOutline,
  Delete,
  Folder,
  FunctionsRounded,
} from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import React from "react";

function EditorForm2({
  form2Data,
  setForm2Data,
  checkerForm2,
  fileList,
  setFileList,
  signature,
  setSignature,
  oldFileList,
  setOldFileList,
  oldSignature,
  setOldSignature,
}) {
  const useStyles = makeStyles((theme) => ({
    field: {
      marginTop: 10,
      marginBottom: 10,
      display: "block",
    },
    button: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
    },
    paper: {
      padding: 0,
    },
    costBox: {
      justifyContent: "center",
      padding: 10,
      margin: "5px 0px 5px 0px",
    },
    card: {
      height: "15em",
      display: "flex",
      flexDirection: "column",
    },
    cardHeader: {
      backgroundColor: theme.palette.secondary.main,
    },
    cardContent: {
      flexGrow: 1,
      overflowY: "auto",
      padding: 5,
    },
    cardHeaderAction: {
      margin: "auto",
    },
    border: {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: theme.palette.grey[400],
      borderRadius: 3,
      padding: 10,
    },
  }));

  const classes = useStyles();

  const getSum = () => {
    var sum = 0;
    form2Data.proposedProjectCost.forEach(
      (item) => (sum += parseFloat(item.cost === "" ? "0" : item.cost))
    );
    return `Php ${sum.toFixed(2)}`;
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, projectLocation: e.target.value })
            }
            className={classes.field}
            label="Project Location"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.projectLocation.error}
            value={form2Data.projectLocation}
            helperText={
              checkerForm2.projectLocation.error
                ? checkerForm2.projectLocation.messages[0]
                : null
            }
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.border}>
            <FormControl component="fieldset" variant="outlined">
              <FormLabel component="legend">Categorization</FormLabel>
              <GridList cols={2} spacing={0} cellHeight="auto">
                <RadioGroup
                  aria-label="new"
                  name="cat1"
                  value={form2Data.categorization.new ? "new" : "expanded"}
                  onChange={(e) =>
                    setForm2Data(() => {
                      if (e.target.value === "new") {
                        form2Data.categorization.new = true;
                        form2Data.categorization.expanded = false;
                      } else {
                        form2Data.categorization.new = false;
                        form2Data.categorization.expanded = true;
                      }
                      return { ...form2Data };
                    })
                  }
                >
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label="New"
                  />
                  <FormControlLabel
                    value="expanded"
                    control={<Radio />}
                    label="Expanded/Revised"
                  />
                </RadioGroup>
                <RadioGroup
                  aria-label="infrastructure"
                  name="cat2"
                  value={
                    form2Data.categorization.infrastructure
                      ? "infrastructure"
                      : "nonInfrastructure"
                  }
                  onChange={(e) =>
                    setForm2Data(() => {
                      if (e.target.value === "infrastructure") {
                        form2Data.categorization.infrastructure = true;
                        form2Data.categorization.nonInfrastructure = false;
                      } else {
                        form2Data.categorization.infrastructure = false;
                        form2Data.categorization.nonInfrastructure = true;
                      }
                      return { ...form2Data };
                    })
                  }
                >
                  <FormControlLabel
                    value="infrastructure"
                    control={<Radio />}
                    label="Infrastructure"
                  />
                  <FormControlLabel
                    value="nonInfrastructure"
                    control={<Radio />}
                    label="Non-Infrastructure"
                  />
                </RadioGroup>
              </GridList>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, description: e.target.value })
            }
            className={classes.field}
            label="Description"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.description.error}
            value={form2Data.description}
            helperText={
              checkerForm2.description.error
                ? checkerForm2.description.messages[0]
                : null
            }
            multiline
            minRows={5}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, purpose: e.target.value })
            }
            className={classes.field}
            label="Purpose"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.purpose.error}
            value={form2Data.purpose}
            helperText={
              checkerForm2.purpose.error
                ? checkerForm2.purpose.messages[0]
                : null
            }
            multiline
            minRows={5}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, beneficiaries: e.target.value })
            }
            className={classes.field}
            label="Beneficiaries"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.beneficiaries.error}
            value={form2Data.beneficiaries}
            helperText={
              checkerForm2.beneficiaries.error
                ? checkerForm2.beneficiaries.messages[0]
                : null
            }
            multiline
            minRows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Toolbar style={{ padding: 0 }}>
            <Typography variant="h5">Proposed Project Cost</Typography>
            <Chip
              label={<Typography variant="h6">{`${getSum()}`}</Typography>}
              color="primary"
              icon={<FunctionsRounded />}
              style={{ marginLeft: "1em" }}
            />
          </Toolbar>
        </Grid>
        <Hidden mdUp>
          <Grid item xs={12}>
            <Grid container>
              {form2Data.proposedProjectCost.map((item, index) => (
                <Grid item xs={12} className={classes.costBox} component={Card}>
                  <DatePicker
                    autoOk
                    fullWidth
                    variant="inline"
                    inputVariant="outlined"
                    className={classes.field}
                    views={["year"]}
                    label={`Year ${index + 1}`}
                    value={item.year}
                    onChange={(e) => {
                      setForm2Data(() => {
                        form2Data.proposedProjectCost[index].year = e
                          .getFullYear()
                          .toString();
                        return {
                          ...form2Data,
                        };
                      });
                    }}
                  />
                  <TextField
                    onChange={(e) => {
                      setForm2Data(() => {
                        form2Data.proposedProjectCost[index].cost =
                          e.target.value;
                        return {
                          ...form2Data,
                        };
                      });
                    }}
                    className={classes.field}
                    label="Value"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={checkerForm2.proposedProjectCost[index].error}
                    value={item.cost}
                    helperText={
                      checkerForm2.proposedProjectCost[index].error
                        ? checkerForm2.proposedProjectCost[index].messages[0]
                        : null
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid item xs={12}>
            <Table>
              <TableBody>
                <TableRow>
                  {form2Data.proposedProjectCost.map((item, index) => (
                    <TableCell style={{ borderBottom: "none", padding: 10 }}>
                      <DatePicker
                        autoOk
                        fullWidth
                        variant="inline"
                        inputVariant="outlined"
                        className={classes.field}
                        views={["year"]}
                        label={`Year ${index + 1}`}
                        value={item.year}
                        onChange={(e) => {
                          setForm2Data(() => {
                            form2Data.proposedProjectCost[index].year = e
                              .getFullYear()
                              .toString();
                            return {
                              ...form2Data,
                            };
                          });
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {form2Data.proposedProjectCost.map((item, index) => (
                    <TableCell style={{ borderBottom: "none", padding: 10 }}>
                      <TextField
                        onChange={(e) => {
                          setForm2Data(() => {
                            form2Data.proposedProjectCost[index].cost =
                              e.target.value;
                            return {
                              ...form2Data,
                            };
                          });
                        }}
                        className={classes.field}
                        label="Value"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        error={checkerForm2.proposedProjectCost[index].error}
                        value={item.cost}
                        helperText={
                          checkerForm2.proposedProjectCost[index].error
                            ? checkerForm2.proposedProjectCost[index]
                                .messages[0]
                            : null
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" display="inline">
            Proponent Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                proponentName: {
                  ...form2Data.proponentName,
                  surname: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Surname"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.surName.error}
            value={form2Data.proponentName.surname}
            helperText={
              checkerForm2.surName.error
                ? checkerForm2.surName.messages[0]
                : null
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                proponentName: {
                  ...form2Data.proponentName,
                  firstName: e.target.value,
                },
              })
            }
            className={classes.field}
            label="First Name"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.firstName.error}
            value={form2Data.proponentName.firstName}
            helperText={
              checkerForm2.firstName.error
                ? checkerForm2.firstName.messages[0]
                : null
            }
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                proponentName: {
                  ...form2Data.proponentName,
                  middleInitial: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Middle Initial"
            variant="outlined"
            color="primary"
            fullWidth
            value={form2Data.proponentName.middleInitial}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, designation: e.target.value })
            }
            className={classes.field}
            label="Designation"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.designation.error}
            value={form2Data.designation}
            helperText={
              checkerForm2.designation.error
                ? checkerForm2.designation.messages[0]
                : null
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {
                  ...form2Data.contactInformation,
                  telNumber: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Telephone Number format: XXX-XXXX"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.telephoneNumber.error}
            value={form2Data.contactInformation.telNumber}
            helperText={
              checkerForm2.telephoneNumber.error
                ? checkerForm2.telephoneNumber.messages[0]
                : null
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {
                  ...form2Data.contactInformation,
                  email: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Email Address"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.email.error}
            value={form2Data.contactInformation.email}
            helperText={
              checkerForm2.email.error ? checkerForm2.email.messages[0] : null
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {
                  ...form2Data.contactInformation,
                  phoneNumber: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Phone Number format: 09XXXXXXXXX"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.phoneNumber.error}
            value={form2Data.contactInformation.phoneNumber}
            helperText={
              checkerForm2.phoneNumber.error
                ? checkerForm2.phoneNumber.messages[0]
                : null
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {
                  ...form2Data.contactInformation,
                  others: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Other contacts"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.contactInformation.others}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardHeader
              title="Upload Files"
              action={
                <React.Fragment>
                  <input
                    style={{ display: "none" }}
                    id="fileUpload"
                    multiple
                    type="file"
                    onChange={(e) =>
                      setFileList([
                        ...fileList,
                        ...Object.values(e.target.files),
                      ])
                    }
                  />
                  <label htmlFor="fileUpload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<AddCircleOutline />}
                    >
                      Upload
                    </Button>
                  </label>
                </React.Fragment>
              }
              className={classes.cardHeader}
              classes={{
                action: classes.cardHeaderAction,
              }}
            />
            <CardContent className={classes.cardContent}>
              <List className={classes.list}>
                {oldFileList.map((file, index) => (
                  <ListItem key={`${index}-old`}>
                    <ListItemAvatar>
                      <Avatar>
                        <Folder />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={file.title} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() =>
                          setOldFileList(() => {
                            var newList = [...oldFileList];
                            newList.splice(index, 1);
                            return newList;
                          })
                        }
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {fileList.map((file, index) => (
                  <ListItem key={`${index}-new`} dense>
                    <ListItemAvatar>
                      <Avatar>
                        <Folder />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={file.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() =>
                          setFileList(() => {
                            var newList = [...fileList];
                            newList.splice(index, 1);
                            return newList;
                          })
                        }
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardHeader
              title="Upload Signature"
              action={
                <React.Fragment>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="userSignature"
                    type="file"
                    onChange={(e) =>
                      setSignature(Object.values(e.target.files))
                    }
                  />
                  <label htmlFor="userSignature">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<AddCircleOutline />}
                    >
                      Upload
                    </Button>
                  </label>
                </React.Fragment>
              }
              className={classes.cardHeader}
              classes={{
                action: classes.cardHeaderAction,
              }}
            />
            <CardContent className={classes.cardContent}>
              <List>
                {oldSignature.map((file, index) => (
                  <ListItem key={`${index}-old`}>
                    <ListItemAvatar>
                      <Avatar>
                        <Folder />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={file.title} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => setOldSignature([])}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {signature.map((file, index) => (
                  <ListItem key={`${index}-new`}>
                    <ListItemAvatar>
                      <Avatar>
                        <Folder />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={file.name} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => setSignature([])}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditorForm2;
