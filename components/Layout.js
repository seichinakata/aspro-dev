import MuiStepper from "./MuiStepper";
import MuiNavbar from "./MuiNavbar";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
    return (
        <>
            <MuiNavbar />
            <Container maxWidth="xl">{children}</Container>
        </>
    )
}

export default Layout;