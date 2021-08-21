import { Avatar, Card, Grid, Typography, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    avatr: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginLeft: theme.spacing(2.5),
        marginTop: theme.spacing(2),
      },
    }));

function NotificationCard({notification, selectNotification}) {
    const classes = useStyles();
    return (
        <Card onClick = {() => selectNotification(notification)}>
            <Grid container>
                <Grid item xs = {1}>
                    <Avatar className={classes.avatr}>
                    </Avatar>
                </Grid>
                <Grid item xs = {11} >
                    <Typography variant = 'h4'>{notification.header}</Typography>
                    <Typography>{notification.message}</Typography>
                </Grid>
            </Grid>
        </Card>
    )
}

export default NotificationCard
