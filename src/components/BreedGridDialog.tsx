import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

interface IBreedGridDialogProps {
  handleClose: () => void
  open: boolean
  dlgImages: {
    message: Array<string>
  }
}
const BreedGridDialog = ({handleClose, open, dlgImages}: IBreedGridDialogProps) => {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Dog Poster Generate"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {dlgImages.message && dlgImages.message.map(item => (
              <Grid item xs={4} key={item}>
                <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={'dog poster'}
                  width={150}
                  height={150}
                  loading="lazy"
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
  );
};

export default BreedGridDialog;