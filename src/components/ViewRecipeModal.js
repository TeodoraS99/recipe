// import AddIcon from "@mui/icons-material/Add";
// import PersonIcon from "@mui/icons-material/Person";
// import Avatar from "@mui/material/Avatar";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import { default as React} from "react";

// const ViewRecipeModal = () => {
//   const { onClose, selectedValue, open } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };



//   return (
//     <Dialog onClose={handleClose} open={open}>
//       <DialogTitle>Recipe details</DialogTitle>
//       <List sx={{ pt: 0 }}>
//         {recipes.map((recipe) => (
//           <ListItem disableGutters>
//             <ListItemButton
//               onClick={() => handleListItemClick(recipe)}
//               key={recipe}
//             >
//               <ListItemAvatar>

//               </ListItemAvatar>
//               <ListItemText primary={recipe} />
//             </ListItemButton>
//           </ListItem>
//         ))}

//         <ListItem disableGutters>
//           <ListItemButton
//             autoFocus
//             onClick={() => handleListItemClick("addAccount")}
//           >
//             <ListItemAvatar>
//               <Avatar>
//                 <AddIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary="Add account" />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Dialog>
//   );
// };

// export default ViewRecipeModal;
