import { Card, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'

function DashboardNotificationCard({notification}) {
    return (
        <Grid container style = {{marginTop: 10, marginBottom: 10}}>
            <Grid item xs = {1}>
                <Divider orientation = 'vertical' variant = 'inset'/>
            </Grid>
            <Grid item xs = {11}>
                <Typography variant = 'body1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, animi. Provident ab doloremque nihil amet rerum blanditiis dicta vel tempore, qui magni ipsa autem aliquid dolor minima voluptas officia corporis.</Typography>
                {/*notification.message*/}
            </Grid>
        </Grid>
    )
}

export default DashboardNotificationCard
