import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
// import ReactDomServer from "react-dom/server";

// import icons
// import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const initialState = {
  defaultCategories: [],
  userCategories: [],
  selectedCategoryIndex: "1",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.userCategories.push({
        id: uuid(),
        // icon: "", // Assuming you don't need rendered icon in store
        name: action.payload,
        editMode: false,
      });
    },
    selectCategory: (state, action) => {
      state.selectedCategoryIndex = action.payload;
    },
    toggleEditMode: (state, action) => {
      // console.log(action);
      const index = state.userCategories.findIndex(
        (category) => category.id === action.payload
      );
      if (index !== -1) {
        state.userCategories[index].editMode =
          !state.userCategories[index].editMode;
      }
    },
    renameCategory: (state, action) => {
      const index = state.userCategories.findIndex(
        (category) => category.id === action.payload.categoryId
      );
      if (index !== -1) {
        state.userCategories[index].name = action.payload.categoryName;
      }
    },
    deleteCategory: (state, action) => {
      state.userCategories = state.userCategories.filter(
        (category) => category.id !== action.payload
      );
    },
  },
});

export const {
  addCategory,
  selectCategory,
  toggleEditMode,
  renameCategory,
  deleteCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
