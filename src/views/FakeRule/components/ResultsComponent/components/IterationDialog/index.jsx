import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { MathComponent } from 'mathjax-react'

export default function IterationDialog({ children, iterationData, indice }) {

  //material code ************************
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  //*******My code*************************** */
  const [p1, p2, p3, p4] = iterationData.process.fakeRule;

  return (
    <>
      <StyledTableRow onClick={handleClickOpen}>
        {children}
      </StyledTableRow>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Iteración {indice}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              maxWidth: "100%",
              bgcolor: 'background.paper'
            }}
          >
            <MathComponent tex={String.raw`Xr = Xu-\frac{f(Xu)(Xl - Xu)}{f(Xl)-f(Xu}`} />
            <MathComponent tex={String.raw`Xr = ${p1.t1} - \frac{ ${p1.t2} ( ${p1.t3} - ${p1.t4} ) }{ ${p1.t5} - ${p1.t6} }`} />
            <MathComponent tex={String.raw`Xr = ${p2.t1} - \frac{ ${p2.t2} ( ${p2.t3} ) }{ ${p2.t4} }`} />
            <MathComponent tex={String.raw`Xr = ${p3.t1} - \frac{ ${p3.t2} }{ ${p3.t3} }`} />
            <MathComponent tex={String.raw`Xr = ${p4.t1} - ${p4.t2}`} />
            <MathComponent tex={String.raw`Xr = ${iterationData.xRes}`} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}