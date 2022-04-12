import React from 'react'
import { Typography } from '@mui/material'

const Upload = () => {

    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
                Upload
            </Typography>
        </>
    )
}

export default Upload