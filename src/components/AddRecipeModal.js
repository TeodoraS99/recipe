import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {addDoc, collection, doc, getDoc, serverTimestamp} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../firebase";

const initialState = {
  recipe_title: "",
  ingredients: "",
  preparation: "",
  complexity: "",
  preparation_time: "",
  baking_time: "",
};

function AddRecipeModal(props) {
  const [data, setData] = useState(initialState);
  const {
    recipe_title,
    ingredients,
    preparation,
    complexity,
    preparation_time,
    baking_time,
  } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    await addDoc(collection(db, "recipes"), {
      ...data,
      tiestamp: serverTimestamp(),
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   id && getSingleRecipe();
  // }, [id]);

  useEffect(() => {
    if (props.recipe) {
      setData({
        recipe_title: props.recipe.recipe_title,
        ingredients: props.recipe.ingredients,
        preparation: props.recipe.preparation,
        complexity: props.recipe.complexity,
        preparation_time: props.recipe.preparation_time,
        baking_time: props.recipe.baking_time,
      });
    }
  }, [props.recipe]);

  const getSingleRecipe = async () => {
    const docRef = doc(db, "recipes", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is Pause");
              break;
            case "running":
              console.log("Upload is Running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onHandleClose}
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Recipe Title"
            onChange={handleChange}
            value={recipe_title}
            fullWidth
            variant="outlined"
            name="recipe_title"
          />

          <TextField
            label="Ingredients"
            value={ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients..."
            rows={3}
            fullWidth
            variant="outlined"
            multiline
            name="ingredients"
          />

          <TextField
            label="Preparation"
            value={preparation}
            onChange={handleChange}
            placeholder="Enter preparation steps..."
            rows={3}
            fullWidth
            variant="outlined"
            multiline
            name="preparation"
          />
          <InputLabel id="complexity-label">Complexity</InputLabel>

          <Select
            labelId="complexity-label"
            value={complexity}
            onChange={handleChange}
            fullWidth
            label="Complexity"
            variant="outlined"
            name="complexity"
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>

          <TextField
            label="Preparation Time"
            value={preparation_time}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            name="preparation_time"
          />
          <TextField
            label="Baking Time"
            value={baking_time}
            onChange={handleChange}
            variant="outlined"
            name="baking_time"
          />

          <Button variant="outlined" component="label">
            Upload File
            <input
              type="file"
              name="image"
              // onChange={(e) => setFile({ ...data, image: e.target.files[0] })}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={progress !== null && progress < 100}
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddRecipeModal;
