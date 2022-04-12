import React, { useEffect, useState, memo, useCallback, useRef } from 'react';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MuiGreyLabel from '../MuiGreyLabel';
import { FormControl } from '@mui/material';
import dataMappingHeader from '../../src/DataMappingHeader';
import { v4 as uuid } from 'uuid';
import { NoMeals } from '@mui/icons-material';
import Fab from '@mui/material/Fab';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SearchTextField from '../SearchTextField';

import MuiModalMedium from '../MuiModalMedium';
import SelectColumns from './SelectColumns';

// test
import TestDataMapping from './TestDataMapping';

const DataMapping = ({
    csvColumns,
    setCsvColumns,
    allowProceed,
    setAllowProceed,
    dbColumns,
    setDbColumns,
    sampleRecord,
    searchText,
    unmappedCols,
    setUnmappedCols,
    open,
    setOpen,
}) => {
    // const [unmappedCols, setUnmappedCols] = useState([]);
    const [isDefaultMapped, setIsDefaultMapped] = useState(false);

    const { db, csvVal, mapCsv } = dataMappingHeader;

    const handleDefaultMapping = useCallback(() => {
        const defaultMap = dbColumns.map(dbcol => {
            const colMatched = csvColumns.find(csvCol => csvCol.field === dbcol.name);
            if (colMatched) {
                dbcol.mapped = [colMatched];
                dbcol.value = sampleRecord[colMatched.field];
                colMatched.mapped = true;
            }
            return dbcol;
        });
        setDbColumns(defaultMap);
        setIsDefaultMapped(true);
    }, [dbColumns])

    const handleOnChange = useCallback((dbCol, selectedCsvCol, reason, detail) => {
        const newSelectedCsvCol = [...selectedCsvCol];

        if (reason === 'removeOption') {
            const newCsvColumns = [...csvColumns];
            const newCsvColumn = newCsvColumns.find(node => node.field === detail.option.field);
            newCsvColumn.mapped = false;
            setCsvColumns(newCsvColumns);
        }

        // tag as mapped
        if (reason === "selectOption") {
            newSelectedCsvCol = newSelectedCsvCol.map(node => {
                node.mapped = true;
                return node;
            });
        }

        const newDbColumns = [...dbColumns];
        const newDbColumn = newDbColumns.find(node => node == dbCol);
        const values = selectedCsvCol.map(node => sampleRecord[node.field])

        newDbColumn.mapped = [...selectedCsvCol];
        newDbColumn.value = values.join(' ')
        setDbColumns(newDbColumns);
    }, [dbColumns])

    const filteredDbColumns = useCallback(() => {
        // console.log(searchText)
        const search = searchText
        if (search === "") return dbColumns;
        return dbColumns.filter(node => node.name.includes(search));
    }, [searchText])

    useEffect(() => {
        !isDefaultMapped && handleDefaultMapping();
        setUnmappedCols(
            csvColumns
                .filter(node => !node.mapped && node.selected)
        );
    }, []);

    useEffect(() => {
        setUnmappedCols(
            csvColumns
                .filter(node => !node.mapped && node.selected)
        );
    }, [dbColumns])

    // console.log('rerendered', filteredDbColumns());

    return (
        <>
            <MuiModalMedium
                open={open}
                setOpen={setOpen}
            >
                <SelectColumns
                    page={false}
                    csvColumns={unmappedCols}
                    setCsvColumns={setUnmappedCols}
                    allowProceed={allowProceed}
                    setAllowProceed={setAllowProceed}
                />
            </MuiModalMedium>

            <Paper style={{ height: '60vh', padding: '0 1rem 1rem 1rem', overflowY: 'auto' }}>
                <Stack
                    spacing={8}
                >
                    {/* header */}
                    <Stack direction="row" spacing={2} style={{ width: '75%', position: 'absolute', background: '#FFFFFF', padding: '1rem', zIndex: 1 }}>
                        <FormControl sx={{ m: 1, width: db.width }} variant="outlined" style={{ margin: 0 }}>
                            <MuiGreyLabel bold={true}>Database Column</MuiGreyLabel>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: csvVal.width }} variant="outlined" style={{ margin: 0, marginLeft: '24px' }}>
                            <MuiGreyLabel bold={true}>CSV Sample Value</MuiGreyLabel>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: mapCsv.width }} variant="outlined" >
                            <MuiGreyLabel bold={true}>Mapped CSV Columns</MuiGreyLabel>
                        </FormControl>
                    </Stack>

                    {/* content */}
                    <Stack
                        spacing={2}
                    >
                        {
                            filteredDbColumns() && filteredDbColumns().map(dbCol => (
                                <Stack direction="row" spacing={2} key={uuid()}>
                                    <FormControl sx={{ m: 1, width: db.width }} variant="outlined" style={{ marginLeft: '16px' }}>
                                        <MuiGreyLabel>{dbCol.name}</MuiGreyLabel>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: csvVal.width }} variant="outlined">
                                        <TextField id="outlined-basic" variant="outlined" defaultValue={dbCol.value} placeholder={"Unmapped..."} />
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: mapCsv.width }} variant="outlined">
                                        <Autocomplete
                                            multiple
                                            id={dbCol.name}
                                            options={unmappedCols}
                                            getOptionLabel={(option => option.field)}
                                            defaultValue={dbCol.mapped.length ? [...dbCol.mapped] : []}
                                            isOptionEqualToValue={(option, value) => option.field === value.field}
                                            // filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label=""
                                                    placeholder="Search CSV Columns"
                                                />
                                            )}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip variant="filled" color="primary" label={option.field} {...getTagProps({ index })} />
                                                ))
                                            }
                                            onChange={(e, values, reason, detail) => handleOnChange(dbCol, values, reason, detail)}

                                        />
                                    </FormControl>

                                </Stack>
                            ))
                        }
                    </Stack>
                </Stack>
            </Paper>

            {/* <TestDataMapping
                dbColumns={dbColumns}
                csvColumns={csvColumns}
                unmappedCols={unmappedCols}
            /> */}
        </>
    )
}

export default DataMapping