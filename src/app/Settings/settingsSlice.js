import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  autoSave: false,
  editMode: false,
  autoSaveDelay: 5, 
  sortType: "Date Created",
  showEditor: true,
  showPanel: true, 
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleAutoSave: (state) => {
      state.autoSave = !state.autoSave;
    },
    toggleEditMode: (state, action) => {
      state.editMode =
        action.payload === "TOGGLE" ? !state.editMode : action.payload;
    },
    changeAutoSaveDelay: (state, action) => {
      state.autoSaveDelay = action.payload;
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.sidebarOpen =
        action.payload === "TOGGLE" ? !state.sidebarOpen : action.payload;
    },
    toggleSettingsTab: (state, action) => {
      state.settingsTabOpen =
        action.payload === "TOGGLE" ? !state.settingsTabOpen : action.payload;
    },
    toggleEditor: (state, action) => {
      state.showEditor =
        action.payload === "TOGGLE" ? !state.showEditor : action.payload;
    },
    togglePanel: (state, action) => {
      state.showPanel =
        action.payload === "TOGGLE" ? !state.showPanel : action.payload;
    },
  },
});

export const {
  toggleAutoSave,
  toggleEditMode,
  changeAutoSaveDelay,
  changeSortType,
  toggleSidebar,
  toggleSettingsTab,
  toggleEditor,
  togglePanel,
} = settingsSlice.actions;

export default settingsSlice.reducer;
