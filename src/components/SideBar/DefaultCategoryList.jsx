import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useCategories } from "../../app/useCategories";
import { selectCategory } from "../../app/Category/categorySlice";
import { useDispatch } from "react-redux";
import CategoryItem from "./CategoryItem";

function DefaultCategoryList() {
  const dispatch = useDispatch();

  const defaultCategories = useCategories().defaultCategories;
  const selectedCategoryIndex = useCategories().selectedCategoryIndex;

 

  return (
    <List>
      {defaultCategories.map((category) => {
        return <CategoryItem key={category.name} userCategory={false} category={category} />;
      })}
    </List>
  )
}

export default DefaultCategoryList;
