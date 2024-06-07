import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import moment from "moment";

const initialState = {
  allNotes: [],
  selectedNoteId: null,
  selectedNoteForOption: null,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const _id = uuid();
      state.allNotes.unshift({
        id: _id,
        category_id: action.payload,
        title: "New Note",
        fav: action.payload === "2" ? true : false,
        createdAt: moment(),
        active: true,
      });
      state.selectedNoteId = _id;
    },

    selectNote: (state, action) => {
      state.allNotes = state.allNotes.map((note) => ({
        ...note,
        active: note.id === action.payload,
      }));
      state.selectedNoteId = action.payload;
      // console.log(state.selectedNoteId);
    },

    resetSelectedNote: (state) => {
      state.allNotes = state.allNotes.map((note) => ({
        ...note,
        active: false,
      }));
      state.selectedNoteId = null;
    },

    updateNote: (state, action) => {
      state.allNotes = state.allNotes.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            title:
              action.payload.title !== "" ? action.payload.title : note.title,
            content: action.payload.content,
            lastSaved: action.payload.lastSaved,
          };
        }
        return note;
      });
    },

    addToFav: (state, action) => {
      state.allNotes = state.allNotes.map((note) => {
        if (note.id === action.payload) {
          return {
            ...note,
            fav: !note.fav,
          };
        }
        return note;
      });
    },

    removeFromFav: (state, action) => {
      state.allNotes = state.allNotes.map((note) => {
        if (note.id === action.payload) {
          return {
            ...note,
            fav: !note.fav,
          };
        }
        return note;
      });
    },

    tempDeleteNote: (state, action) => {
      state.allNotes = state.allNotes.map((note) => {
        if (note.id === action.payload) {
          return {
            ...note,
            previous_category_id: note.category_id,
            category_id: "3",
          };
        }
        return note;
      });
      state.selectedNoteId = null;
    },

    restoreNote: (state, action) => {
      state.allNotes = state.allNotes.map((note) => {
        if (note.id === action.payload) {
          return {
            ...note,
            previous_category_id: null,
            category_id: note.previous_category_id,
          };
        }
        return note;
      });
      state.selectedNoteId = null;
    },

    deleteNote: (state, action) => {
      state.allNotes = state.allNotes.filter(
        (note) => note.id !== action.payload
      );
    },

    deleteAllTrashNotes: (state) => {
      state.allNotes = state.allNotes.filter(
        (note) => note.category_id !== "3"
      );
    },

    selectNoteForOption: (state, action) => {
      const selectedNote = state.allNotes.find(
        (note) => note.id === action.payload
      );
      state.selectedNoteForOption = selectedNote;
    },

    moveToCategory: (state, action) => {
      
      state.allNotes = state.allNotes.map((note) => {
        if (note.id === action.payload.noteId) {

          if (action.payload.moveToCategoryId === "2") {
            return {
              ...note,
              // category_id: action.payload.moveToCategoryId,
              fav: true,
            };
          }
            return {
              ...note,
              category_id: action.payload.moveToCategoryId,
            };
        }
        return note;
      });
      console.log(state.allNotes);
    },

    importNotes: (state, action) => {
      state.allNotes = action.payload;
    },
  },
});

export const {
  addNote,
  selectNote,
  resetSelectedNote,
  updateNote,
  addToFav,
  removeFromFav,
  tempDeleteNote,
  restoreNote,
  deleteNote,
  deleteAllTrashNotes,
  selectNoteForOption,
  moveToCategory,
  importNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
