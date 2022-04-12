import { useState } from 'react'

const useUploads = () => {
    const [allowProceed, setAllowProceed] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [csvColumns, setCsvColumns] = useState([]);
    const [records, setRecords] = useState([]);
    const [filename, setFileName] = useState("No file chosen");
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [dbColumns, setDbColumns] = useState([]);
    const [progress, setProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState("Loading...");
    const [unmappedCols, setUnmappedCols] = useState([]);

    return {
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
        selectedColumns,
        setSelectedColumns,
        dbColumns,
        setDbColumns,
        progress,
        setProgress,
        progressMessage,
        setProgressMessage,
        unmappedCols,
        setUnmappedCols
    }
}

export default useUploads;