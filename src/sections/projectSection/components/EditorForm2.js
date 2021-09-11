import {
  Button,
  Card,
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
  Paper,
  ListItem,
  Avatar,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { AddCircleOutline, Delete, Folder } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";

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
  const useStyles = makeStyles(() => ({
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
  }));

  const classes = useStyles();

  const getSum = () => {
    var sum = 0;
    form2Data.proposedProjectCost.forEach((item) => sum += parseFloat(item.cost === '' ? '0' : item.cost));
    return `Sum: ${sum}`
  }

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
          <FormControl component="fieldset">
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
                <FormControlLabel value="new" control={<Radio />} label="New" />
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
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" display="inline">
            Proposed Project Cost
          </Typography>
          <Typography variant="h6" display="outline" >
            {getSum()}
          </Typography>
        </Grid>
        {form2Data.proposedProjectCost.map((item, index) => (
          <Grid item xs={4}>
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
                    form2Data.proposedProjectCost[index].cost = e.target.value;
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
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" display="inline">
            Proponent Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
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
            label="Proponent Surname"
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
        <Grid item xs={12} md={3}>
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
            label="Proponent First Name"
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
        <Grid item xs={12} md={3}>
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
            label="Proponent Middle Initial"
            variant="outlined"
            color="primary"
            fullWidth
            value={form2Data.proponentName.middleInitial}
          />
        </Grid>
        <Grid item xs={12} md={3}>
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
        </Grid>
        <Grid item xs={6} align="center">
          <input
            style={{ display: "none" }}
            id="fileUpload"
            multiple
            type="file"
            onChange={(e) =>
              setFileList([...fileList, ...Object.values(e.target.files)])
            }
          />
          <label htmlFor="fileUpload">
            <Button
              variant="contained"
              component="span"
              startIcon={<AddCircleOutline />}
            >
              Upload Files
            </Button>
          </label>
          <Paper className={classes.paper}>
            <List>
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
                <ListItem key={`${index}-new`}>
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
          </Paper>
        </Grid>
        <Grid item xs={6} align="center">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="userSignature"
            type="file"
            onChange={(e) => setSignature(Object.values(e.target.files))}
          />
          <label htmlFor="userSignature">
            <Button
              variant="contained"
              component="span"
              startIcon={<AddCircleOutline />}
            >
              Upload Signature
            </Button>
          </label>
          <Paper className={classes.paper}>
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
                      onClick={() =>
                        setOldSignature([])
                      }
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
                    <IconButton
                      edge="end"
                      onClick={() =>
                        setSignature([])
                      }
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditorForm2;
