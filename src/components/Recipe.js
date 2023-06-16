import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import AddRecipeModal from "../components/AddRecipeModal";
import ViewRecipeModal from "../components/ViewRecipeModal";

import { db } from "../firebase";

const Recipe = ({ recipe }) => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewOpen = () => {
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "recipes", id));
  };

  return (
    <Grid item key={recipe.id} xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={recipe.img}
          component="img"
          title="Recipe Image"
        />
        <CardContent>
          <Typography
            onClick={handleViewOpen}
            gutterBottom
            variant="h5"
            component="div"
          >
            {recipe.recipe_title}
          </Typography>

          <ViewRecipeModal
            isOpen={viewOpen}
            recipe={recipe}
            onHandleClose={handleViewClose}
          ></ViewRecipeModal>

          <Typography variant="body2" color="text.secondary">
            {recipe.preparation}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>

          <IconButton size="small" onClick={() => handleDelete(recipe.id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <AddRecipeModal
        isOpen={open}
        recipe={recipe}
        onHandleClose={handleClose}
      />
    </Grid>
  );
};

export default Recipe;
