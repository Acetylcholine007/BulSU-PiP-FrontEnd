import { Grid } from '@material-ui/core'
import React from 'react'
import NotificationCard from './NotificationCard'

function NotificationList({notifications}) {
    return (
        <Grid container spacing = {1}>
            {notifications.map((notification) => (
                <Grid item xs = {12}>
                    <NotificationCard notification = {notification} />
                </Grid>
            ))}
        </Grid>
    )
}

export default NotificationList
