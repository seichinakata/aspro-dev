import { Stack } from '@mui/material';
import { Box } from '@mui/material';

const TestDataMapping = ({
    dbColumns,
    csvColumns,
    unmappedCols,
}) => {
    return (
        <Stack direction="row" spacing={2}>
            <Box>
                <h4>Db Columns</h4>
                <pre>
                    {JSON.stringify(dbColumns, null, 2)}
                </pre>
            </Box>
            <Box>
                <h4>CSV Columns</h4>
                <pre>
                    {JSON.stringify(csvColumns, null, 2)}
                </pre>
            </Box>
            <Box>
                <h4>Unmapped CSV Columns</h4>
                <pre>
                    {JSON.stringify(unmappedCols, null, 2)}
                </pre>
            </Box>
            <Box>
                <h4>Mapped CSV Columns</h4>
                <pre>
                    {JSON.stringify(csvColumns.filter(node => node.mapped), null, 2)}
                </pre>
            </Box>
        </Stack>
    )
}

export default TestDataMapping