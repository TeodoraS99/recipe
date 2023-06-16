import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

const ViewRecipeModal = ({ recipe, isOpen, onHandleClose }) => {
  return (
    <Dialog
      onClose={onHandleClose}
      open={isOpen}
      className="p-4"
      PaperProps={{
        style: {
          height: "100%",
          width: "50%",
        },
      }}
      fullScreen
    >
      <DialogTitle>Add Recipe</DialogTitle>
      <DialogContent>
      <Typography variant="body2" color="text.secondary">
            {recipe.preparation}
          </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ViewRecipeModal;
