import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#00A8E6',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#EEEEEE',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
