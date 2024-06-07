import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useCategories } from "../../app/useCategories";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";



import {
  addToFav,
  removeFromFav,
  selectNote,
} from "../../app/Notes/notesSlice";
import { useDispatch } from "react-redux";
import NotesMenu from "./NotesMenu";

function DragableNotesItem({
  note,
  noteCategory,
  selectedNoteId,
  setSelectedNoteId,
  handleDragStart,
}) {
  const currentCategoryIndex = useCategories().selectedCategoryIndex;
  const dispatch = useDispatch();

  const makeNoteFavHandler = (id) => {
    if (currentCategoryIndex === "3") {
      return;
    } else {
      dispatch(addToFav(id));
    }
  };

  const makeNoteNotFavHandler = (id) => {
    if (currentCategoryIndex === "3") {
      return;
    } else {
      dispatch(removeFromFav(id));
    }
  };

  const handleListItemClick = (noteId) => {
    setSelectedNoteId(noteId);
    dispatch(selectNote(noteId));
  };

  return (
    <ListItem key={note.id} disablePadding>
      <ListItemButton selected={selectedNoteId === note.id ? true : false}>
        {note.fav ? (
          <FavoriteOutlinedIcon
            onClick={() => makeNoteNotFavHandler(note.id)}
            sx={{ mr: 2 }}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            onClick={() => makeNoteFavHandler(note.id)}
            sx={{ mr: 2 }}
          />
        )}
        <ListItemText
          draggable
          onDragStart={(e) => handleDragStart(e, note)}
          style={
            {
              // cursor: "move",
            }
          }
          primary={note.title}
          secondary={noteCategory[0]?.name}
          onClick={() => handleListItemClick(note.id)}
        />
        <NotesMenu noteId={note.id} categoryId={note.category_id} />
      </ListItemButton>
    </ListItem>
  );
}

export default DragableNotesItem;
