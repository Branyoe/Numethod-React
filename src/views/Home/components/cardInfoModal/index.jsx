import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardMedia } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: 300,
    sm: 400,
  },
  bgcolor: 'background.paper',
  borderRadius: '7px',
  boxShadow: 24,
  p: 0,
};

export default function CardInfoModal({ imgSrc = "", title = "", body = "" }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Leer más</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Card sx={{ maxWidth: "false", textAlign: 'left' }}>
              <CardMedia
                component="img"
                height="140"
                image={imgSrc}
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                  {body + " "}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
