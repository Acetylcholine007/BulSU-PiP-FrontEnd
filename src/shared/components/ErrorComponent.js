import { Typography } from '@material-ui/core'
import React from 'react'

function ErrorComponent({message}) {
    return (
        <Typography variant = 'h3'>{message}</Typography>
    )
}

export default ErrorComponent
