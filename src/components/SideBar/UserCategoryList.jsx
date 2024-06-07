import {
  Box,
  List,
  Typography,
} from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import CategoryItem from "./CategoryItem";

import { addCategory } from "../../app/Category/categorySlice";
import { useDispatch } from "react-redux";

import { useCategories } from "../../app/useCategories";

function UserCategoryList() {
  const dispatch = useDispatch();

  const userCategories = useCategories().userCategories;
  const allCategoryNames = userCategories.map((category) => category.name);

  
  // for value inside form Textfield
  const [categoryName, setCategoryName] = React.useState("");




  // for setting category-name on type
  const changeHandler = (e) => {
    setCategoryName(e.target.value);
  };

 

  // submit handler to add category
  const addCategorySubmitHandler = (e) => {
    e.preventDefault();
    if (allCategoryNames.includes(categoryName)) {
      alert("Category Already Exist");
    } else {
      dispatch(addCategory(categoryName));
    }
    setCategoryName("");
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          addCategorySubmitHandler(e);
        }}
      >
        <Typography variant="h6">Add a New Category</Typography>

        <TextField
          id="outlined-basic"
          label="Enter Category Name.."
          variant="outlined"
          value={categoryName}
          onChange={changeHandler}
          sx={{maxWidth: "90%"}}
        />
      </Box>
      <List>
        {userCategories.map((category) => ( <CategoryItem key={category.name} userCategory={true} category={category} /> ))}
      </List>
    </>
  );
}

export default UserCategoryList;
