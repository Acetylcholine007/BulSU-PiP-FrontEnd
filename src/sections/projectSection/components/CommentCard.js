import { Card, Typography } from '@material-ui/core'
import React from 'react'

function CommentCard({comment}) {
    return (
        <Card style = {{margin: '10px 0px 10px 0px'}}>
            <Typography variant = 'h5'>{comment}</Typography>
        </Card>
    )
}

export default CommentCard
