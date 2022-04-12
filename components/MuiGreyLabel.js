import React from 'react'
import { Typography } from '@mui/material'

const MuiGreyLabel = ({ children, bold = false }) => {
    // color: rgba(0, 0, 0, 0.6);
    return (
        <Typography
            variant="h7"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: bold ? 'bold' : '' }}
        >
            {children}
        </Typography>
    )
}

export default MuiGreyLabel