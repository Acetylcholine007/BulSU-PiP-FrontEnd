import { Card, Typography } from '@material-ui/core'
import React from 'react'

function DashboardProjectCard({title, count}) {
    return (
        <Card>
            <Typography variant = 'h6'>{title}</Typography>
            <Typography variant = 'h3'>{count}</Typography>
        </Card>
    )
}

export default DashboardProjectCard
