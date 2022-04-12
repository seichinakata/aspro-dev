import React, { useContext, memo } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

import AppContext from '../context/AppContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem'
};

const MuiModal = ({ header, icon, message }) => {
    const { isLoading, setIsLoading } = useContext(AppContext);
    const handleClose = () => setIsLoading(false);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isLoading}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isLoading}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {header}
                    </Typography>
                    <Container>
                        {icon}
                    </Container>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    )
}

export default memo(MuiModal)