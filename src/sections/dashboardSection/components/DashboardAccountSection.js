import { Avatar, Button, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'

function DashboardAccountSection({user}) {
    return (
        <Grid container>
            <Grid item xs = {3} align = 'center'>
                <Avatar style = {{height: 150, width: 150}}></Avatar>
            </Grid>
            <Grid item xs = {9}>
                <Typography variant = 'h2'>Testing</Typography>
                <Divider />
                <Typography variant = 'h6'>{user.suc}</Typography>
                <Typography variant = 'h6'>{user.college}</Typography>
            </Grid>
            <Grid item xs = {6} align = 'center'>
                <Button variant = 'contained'>View Projects</Button>
            </Grid>
            <Grid item xs = {6} align = 'center'>
                <Button variant = 'contained'>Create Project</Button>
            </Grid>

        </Grid>
    )
}

export default DashboardAccountSection
