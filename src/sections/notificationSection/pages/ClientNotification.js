import { Container, Grid } from "@material-ui/core";
import NotificationList from "../components/NotificationList";

function ClientNotification() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <NotificationList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ClientNotification;
