import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmationDialog = (props) => {
  const { open, onClose, onConfirm, title, description } = props;
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => onClose()}
          sx={{
            color: "white",
            backgroundColor: "#f14d54",
            "&:hover": {
              backgroundColor: "#f14d54",
            },
            marginLeft: "8px",
            width: "100px",
          }}
        >
          Cancle
        </Button>
        <Button
          variant="contained"
          onClick={() => onConfirm()}
          sx={{
            color: "white",
            backgroundColor: "#80BF32",
            "&:hover": {
              backgroundColor: "#80BF32",
            },
            marginLeft: "8px",
            width: "100px",
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
