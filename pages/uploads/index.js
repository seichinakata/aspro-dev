import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../../context/AppContext';
import MuiStepper from '../../components/MuiStepper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { Fab } from '@mui/material';
import useUploads from '../../hooks/useUploads';
import Layout from '../../components/Layout';

// components
import OpenFile from '../../components/uploadSteps/OpenFile';
import SelectColumns from '../../components/uploadSteps/SelectColumns';
import DataMapping from '../../components/uploadSteps/DataMapping';
import Upload from '../../components/uploadSteps/Upload';
import MuiModalProgress from '../../components/MuiModalProgress';
import SearchTextField from '../../components/SearchTextField';

// src

const Page = ({ data }) => {
    const {
        allowProceed,
        setAllowProceed,
        activeStep,
        setActiveStep,
        csvColumns,
        setCsvColumns,
        records,
        setRecords,
        filename,
        setFileName,
        dbColumns,
        setDbColumns,
        progress,
        setProgress,
        progressMessage,
        setProgressMessage,
        unmappedCols,
        setUnmappedCols
    } = useUploads();

    const [searchText, setSearchText] = useState("");
    const [open, setOpen] = useState(false);

    const searchTextRef = useRef();
    // console.log(isLoading)
    const handleOnSearch = () => {
        const search = searchTextRef?.current?.value || "";
        setSearchText(searchTextRef.current.value);
    }

    useEffect(() => {
        setAllowProceed(false);
        setDbColumns(data);
    }, [])

    return (
        <>
            <MuiModalProgress
                header={'Progress'}
                message={`Loading ${filename}...`}
                progress={progress}
                setProgress={setProgress}
            />

            <Layout>
                <Stack direction="column" spacing={2}>
                    <MuiStepper activeStep={activeStep} />

                    {activeStep === 0 && (
                        <OpenFile
                            csvColumns={csvColumns}
                            setCsvColumns={setCsvColumns}
                            data={records}
                            setData={setRecords}
                            allowProceed={allowProceed}
                            setAllowProceed={setAllowProceed}
                            filename={filename}
                            setFileName={setFileName}
                            progress={progress}
                            setProgress={setProgress}
                        />
                    )}

                    {activeStep === 1 && (
                        <SelectColumns
                            csvColumns={csvColumns}
                            setCsvColumns={setCsvColumns}
                            allowProceed={allowProceed}
                            setAllowProceed={setAllowProceed}
                        />
                    )}

                    {activeStep === 2 && (
                        <>
                            {/* search */}
                            <Stack direction="row" spacing={2}>
                                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                                    <SearchTextField
                                        inputRef={searchTextRef}
                                        id="search-textfield"
                                        placeholder="Search Database Column"
                                        variant="outlined"
                                        onChange={handleOnSearch}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '20ch' }} variant="outlined" style={{ marginLeft: '16px' }}>
                                    <Fab
                                        variant="extended"
                                        color='primary'
                                        style={{ margin: '8px' }}
                                    // onClick={() => setOpen(true)}
                                    >
                                        {`${unmappedCols.length} `}
                                        Unmapped
                                    </Fab>
                                </FormControl>
                            </Stack>

                            <DataMapping
                                csvColumns={csvColumns}
                                setCsvColumns={setCsvColumns}
                                allowProceed={allowProceed}
                                setAllowProceed={setAllowProceed}
                                dbColumns={dbColumns}
                                setDbColumns={setDbColumns}
                                sampleRecord={records[0]}
                                searchText={searchText}
                                unmappedCols={unmappedCols}
                                setUnmappedCols={setUnmappedCols}
                                open={open}
                                setOpen={setOpen}
                            />
                        </>
                    )}
                    {activeStep === 3 && (<Upload />)}

                    <Stack direction="row" spacing={2}>
                        {activeStep > 0 && (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setActiveStep(activeStep - 1)}
                            >
                                Back
                            </Button>
                        )}
                        {activeStep < 3 && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setActiveStep(activeStep + 1)}
                                disabled={!allowProceed}
                            >
                                Proceed
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Layout>
        </>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/data/dbcolumns.json`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}

export default Page