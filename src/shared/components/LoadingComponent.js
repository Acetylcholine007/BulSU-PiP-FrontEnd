import { Container } from '@material-ui/core'
import React from 'react'
import spinner from 'react-spinkit'

function LoadingComponent() {
    return (
        <Container align = 'center'>
            <spinner name="chasing-dots" color="coral"/>
        </Container>
    )
}

export default LoadingComponent
