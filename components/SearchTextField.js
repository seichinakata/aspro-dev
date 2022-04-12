import React, { memo } from 'react'
import { TextField } from '@mui/material'
import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const SearchTextField = (props) => {
    return (
        <TextField
            {...props}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default memo(SearchTextField);