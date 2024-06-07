import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Hotkeys from "react-hot-keys";
import DefaultCategoryList from "./DefaultCategoryList";
import UserCategoryList from "./UserCategoryList";
import { addNote } from "../../app/Notes/notesSlice";
import { useDispatch } from "react-redux";
import { useCategories } from "../../app/useCategories";

const Sidebar = () => {
  const dispatch = useDispatch();

  const selectedCategoryIndex = useCategories().selectedCategoryIndex;

  const addNoteHandler = () => {
    if (selectedCategoryIndex == "3") {
      alert("Can't add new note to trash please select a category");
    } else {
      dispatch(addNote(selectedCategoryIndex));
    }
  };

  return (
    <div>
      {/* <Toolbar /> */}
      <Box
        component="section"
        height={80}
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        gap={1}
        pl={3}
        pr={3}
        // sx={{ border: "2px solid grey" }}
      >
        <Hotkeys keyName="ctrl+alt+n" onKeyDown={addNoteHandler}>
        <IconButton color="primary" onClick={addNoteHandler}>
          <AddCircleOutlineOutlinedIcon sx={{ fontSize: 50 }} />
        </IconButton>
        </Hotkeys>
        <Typography variant="h6">Add New Note</Typography>
      </Box>
      <Divider />
      <Divider />
      <DefaultCategoryList />
      <Divider />
      <UserCategoryList />
    </div>
  );
};

export default Sidebar;
