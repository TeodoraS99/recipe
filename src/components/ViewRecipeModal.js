import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
      <DialogTitle>
        <b>{recipe.recipe_title}</b>
      </DialogTitle>
      <DialogContent>
        <CardMedia
          sx={{ maxWidth: 345 }}
          image={recipe.img}
          component="img"
        ></CardMedia>
        <CardContent>
          <Typography>Preparation time: {recipe.preparation_time}</Typography>
          <hr />
          <Typography>Baking time: {recipe.baking_time}</Typography>
        </CardContent>

        <Typography variant="" color="text.secondary">
          Ingredients:
          {recipe.ingredients}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Preparation:
          {recipe.preparation}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ViewRecipeModal;
