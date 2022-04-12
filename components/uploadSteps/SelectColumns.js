import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Typography } from '@mui/material'
import Paper from "@mui/material/Paper";
import { Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

import { boxesIntersect, useSelectionContainer } from '@air/react-drag-to-select';
import MouseSelection from '../MouseSelection';
import theme from '../../src/theme';

const Item = ({ children, key, selected }) => {
    return (
        <div
            key={key}
            style={{ padding: '0.5rem 1rem', border: '1px solid', width: 'auto' }}
            className={`element${selected ? ' selected' : ''}`}
        >
            {children}
        </div>
    )
}

const SelectColumns = ({
    page = true,
    csvColumns,
    setCsvColumns,
    allowProceed,
    setAllowProceed
}) => {
    // const [selectionBox, setSelectionBox] = useState([]);
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const selectableItems = useRef([]);

    useEffect(() => {
        page && setAllowProceed(false);
        setSelectedIndexes([])
        // setSelectionBox(columns)
        const elementsContainer = document.getElementById('elements-container');
        if (elementsContainer) {
            Array.from(elementsContainer.childNodes).forEach((item) => {
                //@ts-ignore
                const { left, top, width, height } = item.getBoundingClientRect();
                selectableItems.current.push({
                    left,
                    top,
                    width,
                    height,
                });
            });
        }
    }, []);

    useEffect(() => {
        // do not allow to proceed if there's no selected csv column
        if (!csvColumns.find(node => node.selected)) return setAllowProceed(false);
        // else
        page && setAllowProceed(true);
    }, [csvColumns])

    const handleSelectionStart = useCallback((box) => {
        setSelectedIndexes([])
    }, [selectableItems])

    const handleSelectionChange = useCallback((box) => {
        const indexesToSelect = [];
        selectableItems.current.forEach((item, index) => {
            if (!boxesIntersect(box, item)) return;
            indexesToSelect.push(index);

            const col = csvColumns.find((element, i) => i == index);
            if (!col) return;
            // col.selected = true;
            handleToggle(col, true)
        });

        setSelectedIndexes(indexesToSelect);
    }, [selectableItems])

    const handleToggle = (col, force = false) => {

        const newColumns = [...csvColumns]
        const column = newColumns.find(node => node === col)
        if (!column) return;

        if (page) column.selected = force ? true : !column.selected;
        if (!page) column.mapped = force ? true : !column.mapped;
        // console.log('toggle', column)
        setCsvColumns(newColumns);
    }

    const isSelected = (col) => {
        if (page) return col.selected;
        return col.mapped;
    }
    // console.log(columns)
    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
                Select Columns
            </Typography>

            <Paper style={{ height: '60vh', padding: '1rem', width: '100%' }}>
                <MouseSelection onSelectionChange={handleSelectionChange} onSelectionStart={handleSelectionStart} />
                <Grid container id="elements-container" className="elements-container" style={{ gap: '0.5rem' }}>
                    {
                        csvColumns.map((col, i) => {

                            return (
                                <Grid
                                    item xs={1.4}
                                    key={i}
                                    style={{ padding: '0.5rem 1rem', border: '1px solid', width: 'auto' }}
                                    className={`element${isSelected(col) ? ' selected' : ''}`}
                                >
                                    <FormControlLabel control={<Checkbox color='primary' checked={isSelected(col)} onClick={(e) => handleToggle(col)} />} label={col.field} />
                                </Grid>
                            )
                        })
                    }
                </Grid >
            </Paper>
        </>
    )
}

export default SelectColumns