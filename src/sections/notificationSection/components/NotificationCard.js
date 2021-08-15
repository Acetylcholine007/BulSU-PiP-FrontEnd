import { Avatar, Card, Grid, Typography } from '@material-ui/core'
import React from 'react'

function NotificationCard({notification}) {
    return (
        <Card>
            <Grid container>
                <Grid item xs = {1}>
                    <Avatar></Avatar>
                </Grid>
                <Grid item xs = {11}>
                    <Typography variant = 'h4'>{notification.header}</Typography>
                </Grid>
            </Grid>
        </Card>
    )
}

export default NotificationCard
