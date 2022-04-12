import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';

import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import Stack from '@mui/material/Stack';
import { StepLabel } from '@mui/material';

import * as XLSX from 'xlsx';
import { v4 as uuid } from 'uuid';

import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import SortIcon from "@mui/icons-material/ArrowDownward";


const Input = styled('input')({
    display: 'none',
});

const OpenFile = ({
    allowProceed,
    setAllowProceed,
    csvColumns,
    setCsvColumns,
    data,
    setData,
    filename,
    setFileName,
    progress,
    setProgress,
}) => {
    const {
        isLoading,
        setIsLoading
    } = useContext(AppContext);

    useEffect(() => {
        data.length && setAllowProceed(true);
    }, [])

    // process CSV data
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        // Math.round(i / dataStringLines.length) 
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            const obj = { id: uuid() + i };
            if (headers && row.length == headers.length) {

                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] == '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] == '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        obj[headers[j]] = d;
                    }
                }

                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }
            }
            const percent = ((i / dataStringLines.length).toFixed(1)) * 100;
            setTimeout(() => {
                setProgress(percent);
            }, 0.05)
        }

        // prepare columns list from headers
        const columns = headers.map(col => ({
            field: col,
            headerName: col,
            selected: false,
            mapped: false,
            flex: 1,
        }));

        setData(list);
        setCsvColumns(columns);
        setAllowProceed(true);
    }

    // handle file upload
    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        if (!file) return setIsLoading(false);

        setIsLoading(true);
        setData([]);
        setCsvColumns([]);
        setProgress(0);
        setFileName(file.name);

        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
        };
        reader.readAsBinaryString(file);

    }

    // const isIndeterminate = (indeterminate) => indeterminate;
    // const selectableRowsComponentProps = { indeterminate: isIndeterminate };

    // console.log(data.slice(0, 5))

    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
                Open File
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file">
                    <Input accept=".csv,.xlsx,.xls" id="contained-button-file" multiple type="file" onChange={handleFileUpload} />
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label>
                <label htmlFor="icon-button-file">
                    <Input accept=".csv,.xlsx,.xls" id="icon-button-file" type="file" onChange={handleFileUpload} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <DriveFileMoveIcon />
                    </IconButton>
                </label>
                <StepLabel>{filename}</StepLabel>

            </Stack>

            <Paper style={{ height: 500, width: '100%' }}>
                {/* <DataTable
                    title="CSV Sample Data"
                    columns={columns}
                    data={isLoading ? [] : data.slice(0, 5)}
                    defaultSortField="title"
                    sortIcon={<SortIcon />}
                    pagination
                    // selectableRows
                    selectableRowsComponent={Checkbox}
                    selectableRowsComponentProps={selectableRowsComponentProps}
                /> */}
                <DataGrid
                    rows={isLoading ? [] : data.slice(0, 5)}
                    columns={csvColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.id}
                />
            </Paper>
        </>
    )
}

export default OpenFile