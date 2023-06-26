import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import AddRecipeModal from "./AddRecipeModal";

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Reteta
          </Typography>

          <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
            Add Recipe
          </Button>
          <AddRecipeModal isOpen={open} onHandleClose={handleClose} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
