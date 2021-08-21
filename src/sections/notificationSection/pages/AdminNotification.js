import { Container, Grid } from "@material-ui/core";
import NotificationList from "../components/NotificationList";

function AdminNotification() {
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

export default AdminNotification
