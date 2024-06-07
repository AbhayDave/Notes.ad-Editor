import {
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useCategories } from "../../app/useCategories";
import {
  renameCategory,
  selectCategory,
  toggleEditMode,
} from "../../app/Category/categorySlice";
import { useDispatch } from "react-redux";

import { deleteCategory } from "../../app/Category/categorySlice";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { moveToCategory } from "../../app/Notes/notesSlice";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { useCallback, useRef } from "react";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

function CategoryItem({ category, userCategory }) {
  const dispatch = useDispatch();
  const searchFieldRef = useRef();

  const selectedCategoryIndex = useCategories().selectedCategoryIndex;

  // reset handler of add category form
  const deleteCategoryHandler = (e, id) => {
    dispatch(deleteCategory(id));
    // setCategoryName("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    //  console.log("Dragged Over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    //  console.log("Dragged Leave");
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    const noteID = e.dataTransfer.getData("noteID");
    dispatch(moveToCategory({ moveToCategoryId: category.id, noteId: noteID }));
    console.log("Dropped", noteID);
  };

  const changeCategoryEditMode = (e) => {
    dispatch(toggleEditMode(category.id));
  };

  const renameCategoryHandler = (e) => {
    const rename = searchFieldRef.current.value;
    dispatch(renameCategory({ categoryId: category.id, categoryName: rename }));

    dispatch(toggleEditMode(category.id));
  };


  return userCategory ? (
    category.editMode ? (
      <ListItem
        key={category.id}
        disablePadding
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        onClick={() => {
          dispatch(selectCategory(category.id));
        }}
      >
        <ListItemButton
          sx={{
            borderRight:
              selectedCategoryIndex === category.id
                ? "0.5rem solid red"
                : "none",
          }}
          // onClick={(event) => handleListItemClick(event, index)}
        >
          {/* <ListItemText primary={category.name} /> */}
          <form action="#">
            <TextField
              inputRef={searchFieldRef}
              label="Rename Category"
              variant="outlined"
              type="text"
              size="small"
              defaultValue={category.name}
              // onChange={renameCategoryHandler}
            />
          </form>
          <DoneIcon
            onClick={renameCategoryHandler}
            fontSize="small"
            sx={{ ml: 1 }}
          />
          <DoDisturbIcon
            onClick={changeCategoryEditMode}
            fontSize="small"
            sx={{ ml: 1 }}
          />
        </ListItemButton>
      </ListItem>
    ) : (
      <ListItem
        key={category.id}
        disablePadding
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        onClick={() => {
          dispatch(selectCategory(category.id));
        }}
      >
        <ListItemButton
          sx={{
            borderRight:
              selectedCategoryIndex === category.id
                ? "0.5rem solid red"
                : "none",
          }}
          // onClick={(event) => handleListItemClick(event, index)}
        >
          <ListItemText primary={category.name} />
          <CreateOutlinedIcon
            onClick={(e) => {
              changeCategoryEditMode(e, category.id);
            }}
          />
          <DeleteOutlineOutlinedIcon
            sx={{ ml: 3 }}
            onClick={(e) => {
              deleteCategoryHandler(e, category.id);
            }}
          />
        </ListItemButton>
      </ListItem>
    )
  ) : (
    <ListItem
      key={category.id}
      disablePadding
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      onClick={() => {
        dispatch(selectCategory(category.id));
      }}
    >
      <ListItemButton
        sx={{
          borderRight:
            selectedCategoryIndex === category.id ? "0.5rem solid red" : "none",
        }}
        // onClick={(event) => handleListItemClick(event, index)}
      >
        <ListItemText primary={category.name} />
      </ListItemButton>
    </ListItem>
  );
}

export default CategoryItem;
