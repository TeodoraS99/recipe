import Grid from "@mui/material/Grid";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Recipe from "../components/Recipe";
import { db } from "../firebase";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const recipeRef = collection(db, "recipes");
    const q = query(recipeRef, orderBy("timestamp"));
    const unsub = onSnapshot(
      q,
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
            <Recipe recipe={recipe} key={recipe.id} />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={1} md={2} />
    </Grid>
  );
};

export default Home;
