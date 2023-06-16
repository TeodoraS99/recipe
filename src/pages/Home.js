import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import AddRecipeModal from "../components/AddRecipeModal";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "recipes"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <Grid container spacing={3} sx={{ paddingTop: "24px" }}>
      <Grid item xs={1} md={2} />
      <Grid item xs={10} md={8}>
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
           
            <Grid item key={recipe.id} xs={12} sm={6} md={4}>
               {console.log(recipe)}
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  src={recipe.img}
                  title="Recipe Image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.recipe_title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.preparation}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton size="small" onClick={handleClickOpen}>
                    <EditIcon />
                    <AddRecipeModal isOpen={open} recipe={recipe} onHandleClose={handleClose} />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={1} md={2} />
    </Grid>
  );
};

export default Home;
