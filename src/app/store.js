import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Category/categorySlice";
import notesSlice from "./Notes/notesSlice";
import settingsSlice from "./Settings/settingsSlice";
import moment from "moment";

// import icons
// import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

// Combine the slices into the rootReducer
const rootReducer = {
  notes: notesSlice,
  categories: categoriesSlice,
  settings: settingsSlice,
};

const initialState = {
  notes: {
    allNotes: [
      {
        id: "001",
        category_id: "1",
        title: "Welcome Note",
        fav: true,
        createdAt: moment(),
        content: {
          blocks: [
            {
              key: "8i090",
              text: "Hello User :)",
              type: "header-three",
              depth: 0,
              inlineStyleRanges: [
                {
                  offset: 0,
                  length: 13,
                  style: "BOLD",
                },
              ],
              entityRanges: [],
              data: {},
            },
            {
              key: "49adm",
              text: "# WELCOME to clone of The.Editor",
              type: "code",
              depth: 0,
              inlineStyleRanges: [
                {
                  offset: 0,
                  length: 23,
                  style: "CODE",
                },
                {
                  offset: 0,
                  length: 23,
                  style: "BOLD",
                },
              ],
              entityRanges: [],
              data: {},
            },
            {
              key: "7mtd7",
              text: "The.Editor  is a clone app of  The.Editor  and is made for learning purpose.",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [
                {
                  offset: 0,
                  length: 83,
                  style: "fontfamily-Georgia",
                },
                {
                  offset: 0,
                  length: 83,
                  style: "fontsize-16",
                },
                {
                  offset: 0,
                  length: 10,
                  style: "BOLD",
                },
                {
                  offset: 31,
                  length: 13,
                  style: "ITALIC",
                },
              ],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
      {
        id: "002",
        category_id: "1",
        title: "Note 2",
        fav: false,
        createdAt: moment(),
        content: {
          blocks: [
            {
              key: "8i090",
              text: "Hello User :)",
              type: "header-three",
              depth: 0,
              inlineStyleRanges: [
                {
                  offset: 0,
                  length: 13,
                  style: "BOLD",
                },
              ],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
    ],
    selectedNoteId: null,
    selectedNoteForOption: null,
  },

  categories: {
    defaultCategories: [
      {
        id: "0",
        name: "Quick Notes",
        // icon: ReactDomServer.renderToString(<NotesOutlinedIcon />),
        // icon: "home",
      },
      {
        id: "1",
        name: "All Notes",
        // icon: ReactDomServer.renderToString(<DescriptionOutlinedIcon />),
        // icon: "DescriptionOutlinedIcon",
      },
      {
        id: "2",
        name: "Favorites",
        // icon: ReactDomServer.renderToString(<BookmarkBorderOutlinedIcon />),
        // icon: "BookmarkBorderOutlinedIcon",
      },
      {
        id: "3",
        name: "Trash",
        // icon: ReactDomServer.renderToString(<DeleteOutlinedIcon />),
        // icon: "DeleteOutlinedIcon",
      },
    ],
    userCategories: [
      {
        id: "6",
        name: "Testing",
        // icon: ReactDomServer.renderToString(<NotesOutlinedIcon />),
        // icon: "home"
      },
      {
        id: "7",
        name: "Testing 2",
        // icon: ReactDomServer.renderToString(<NotesOutlinedIcon />),
        // icon: "home",
      },
    ],
    selectedCategoryIndex: "1",
  },

  settings: {
    autoSave: false,
    editMode: false,
    autoSaveDelay: 5,
    sortType: "Date Created",
    sidebarOpen: true,
    settingsTabOpen: true,
    showEditor: true,
    showPanel: true,
  },
};

const saveToLocalStorage = (state) => {
  try {
    const newState = {
      notes: state.notes,
      categories: state.categories,
      settings: {
        ...state.settings,
        sidebarOpen: true,
        settingsTabOpen: true,
        showEditor: true,
        showPanel: true,
      },
    };
    const serializedState = JSON.stringify(newState);
    localStorage.setItem("the.editor-store", serializedState);
  } catch (e) {
    console.warn(e);
    alert(e.message);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("the.editor-store");
    if (serializedState === null) return initialState;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return initialState;
  }
};

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: loadFromLocalStorage(),
});

// Subscribe to store changes and save to local storage
store.subscribe(() => {
  const state = store.getState();
  // Save state to local storage
  saveToLocalStorage(state);
});

export default store;
