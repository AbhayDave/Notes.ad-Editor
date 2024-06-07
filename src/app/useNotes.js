import { useSelector } from "react-redux";

export const useNotes = () => {
  return useSelector((state) => state.notes);
};
