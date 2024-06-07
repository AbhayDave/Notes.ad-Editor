import { useCallback, useEffect, useRef, useState } from "react";
import { useNotes } from "../../app/useNotes";
import { Box, Divider, IconButton, List, TextField, Tooltip } from "@mui/material";
import { useCategories } from "../../app/useCategories";

import { useDispatch, useSelector } from "react-redux";

import DragableNotesItem from "./DragableNotesItem";
import { getSortType } from "../../app/selectors/settingsSelector";
import moment from "moment";

import Hotkeys from "react-hot-keys";



import { DeleteOutlineOutlined } from "@mui/icons-material";
import { deleteAllTrashNotes } from "../../app/Notes/notesSlice";

function NotesList() {
  const allNotes = useNotes().allNotes;
  const currentCategoryId = useCategories().selectedCategoryIndex;
  const defaultCategories = useCategories().defaultCategories;
  const userCategories = useCategories().userCategories;
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const sortBy = useSelector(getSortType);


  const dispatch = useDispatch()

  const handleDragStart = (e, note) => {
    e.dataTransfer.setData("noteID", note.id);
    console.log("Draggind Started: ", note.id);
  };

  const searchFieldRef = useRef();

  function escapeRegExp(stringToGoIntoTheRegex) {
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  const searchHandler = useCallback(
    (e) => {
      const searchText = escapeRegExp(e.target.value);
      const regex = new RegExp(searchText, "gi");
      let foundInTitle = false;
      let foundInContent = false;

      setFormattedNotes(
        allNotes.filter((note) => {
          foundInTitle = regex.test(note.title);

          const noteContent = note?.content?.blocks
            .map((block) => {
              return block.text;
            })
            .join(" ");

          foundInContent = regex.test(noteContent);

          if (foundInTitle || foundInContent) return true;
          return false;
        })
      );
    },
    [searchFieldRef]
  );

  const FocusHandler = () => {
    console.log(searchFieldRef.current);
    searchFieldRef.current.focus();
  };

  const deleteAllNotesHandler = () => {
    dispatch(deleteAllTrashNotes());
  }

  const [formattedNotes, setFormattedNotes] = useState(() => {
    if (currentCategoryId === "1") {
      return allNotes.filter((note) => note.category_id !== "3");
    } else if (currentCategoryId === "2") {
      return allNotes.filter(
        (note) => note.fav === true && note.category_id !== "3"
      );
    } else {
      return allNotes.filter((note) => note.category_id === currentCategoryId);
    }
  });

  //@ Sort Formatted Notes:
  useEffect(() => {
    setFormattedNotes((prevFormattedNotes) => {
      if (sortBy === "Last Updated") {
        const sortedFormattedNotes = prevFormattedNotes.sort((a, b) => {
          if (moment(a?.lastSaved).isBefore(b?.lastSaved)) return 1;
          if (moment(a?.lastSaved).isAfter(b?.lastSaved)) return -1;
          return 0;
        });
        return sortedFormattedNotes;
      } else if (sortBy === "Title") {
        const sortedFormattedNotes = prevFormattedNotes.sort(function (a, b) {
          let x = a.title.toUpperCase(),
            y = b.title.toUpperCase();
          return x == y ? 0 : x > y ? 1 : -1;
        });
        return sortedFormattedNotes;
      } else if (sortBy === "Date Created") {
        const sortedFormattedNotes = prevFormattedNotes.sort((a, b) => {
          if (moment(a?.createdAt).isBefore(b?.createdAt)) return 1;
          if (moment(a?.createdAt).isAfter(b?.createdAt)) return -1;
          return 0;
        });
        return sortedFormattedNotes;
      }
    });
  }, [sortBy]);

  useEffect(() => {
    if (currentCategoryId === "1") {
      setFormattedNotes(allNotes.filter((note) => note.category_id !== "3"));
    } else if (currentCategoryId === "2") {
      setFormattedNotes(
        allNotes.filter((note) => note.fav === true && note.category_id !== "3")
      );
    } else {
      setFormattedNotes(
        allNotes.filter((note) => note.category_id === currentCategoryId)
      );
    }
  }, [currentCategoryId, allNotes]);

  return (
    <>
      <Box display={"flex"} alignItems={"center"} sx={{py: 2, px: 2, gap: 1}}>
        <Hotkeys keyName="ctrl+alt+f" onKeyDown={FocusHandler}>
          <form action="#">
            <TextField
              inputRef={searchFieldRef}
              label="Search Notes"
              variant="outlined"
              type="text"
              size="small"
              onChange={searchHandler}
            />
          </form>
        </Hotkeys>
        {currentCategoryId === "3" && (
          <Tooltip title="Empty Trash">
            <IconButton onClick={deleteAllNotesHandler}>
              <DeleteOutlineOutlined />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Divider />

      <List>
        {formattedNotes.map((note) => {
          let noteCategory = defaultCategories.filter(
            (category) => category.id === note.category_id
          );

          if (noteCategory.length === 0) {
            noteCategory = userCategories.filter(
              (category) => category.id === note.category_id
            );
          }

          return (
            <DragableNotesItem
              handleDragStart={handleDragStart}
              key={note.id}
              note={note}
              noteCategory={noteCategory}
              setSelectedNoteId={setSelectedNoteId}
              selectedNoteId={selectedNoteId}
            />
          );
        })}
      </List>
    </>
  );
}

export default NotesList;
