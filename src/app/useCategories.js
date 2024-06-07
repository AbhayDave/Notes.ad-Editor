import { useSelector } from "react-redux";

export const useCategories = () => {
  return useSelector((state) => state.categories);
};
