import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'

import DashboardNotificationCard from './DashboardNotificationCard';

function DashboardNotifSection({notifications}) {
    return (
        <Grid container spacing = {1}>
            <Grid item xs = {9}>
                <Typography variant = 'h3'>Notifications</Typography>
            </Grid>
            <Grid item xs = {3}>
                <Button variant = 'outlined'>View All</Button>
            </Grid>
            <Grid item xs = {12}>
                {notifications.map((notification) => (
                    <DashboardNotificationCard notification = {notification}/>
                ))}
            </Grid>
        </Grid>
    )
}

export default DashboardNotifSection
