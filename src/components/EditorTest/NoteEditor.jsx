// import packages
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import clsx from "clsx";
import draftToHtml from "draftjs-to-html";
import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";
import moment from "moment";
import Hotkeys from "react-hot-keys";
import { useDispatch, useSelector } from "react-redux";
import { ListItemButton } from "@mui/material";

// import Components:
import DraftEditor from "./DraftEditor";
import NotePreview from "./NotePreview";

// import SettingModal from "../Modal/SettingModal"

// import Redux and sCreators
import {
  addToFav,
  tempDeleteNote,
  resetSelectedNote,
  restoreNote,
  updateNote,
} from "../../app/Notes/notesSlice";

// import styles
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useStyles } from "./styles";

import {
  Box,
  Chip,
  List,
  ListItemIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";

// import icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/EditOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import SyncIcon from "@mui/icons-material/Sync";
// import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { getSelectedCategoryIndex } from "../../app/selectors/categoriesSelector";

import {
  getAllNotes,
  getSelectedNoteId,
} from "../../app/selectors/notesSelector";

import {
  getEditMode,
  getShowEditor,
} from "../../app/selectors/settingsSelector";

import {
  toggleEditMode,
  toggleEditor,
  togglePanel,
} from "../../app/Settings/settingsSlice";

import { useCategories } from "../../app/useCategories";

// Global Variables
let initialState = {
  htmlContentState: "",
  editorState: EditorState.createEmpty(),
};

// Main Component Start..
const NoteEditor = () => {
  //@ States & Variables:
  const matches = useMediaQuery("(max-width:480px)");

  const classes = useStyles();
  const [noteState, setNoteState] = useState(initialState);
  let contentState;

  //@ Consuming Contexts:
  const selectedCategoryIndex = useSelector(getSelectedCategoryIndex);
  const allNotes = useSelector(getAllNotes);
  const selectedNoteId = useSelector(getSelectedNoteId);
  const editMode = useSelector(getEditMode);
  const showNoteEditor = useSelector(getShowEditor);
  const dispatch = useDispatch();

  const responsiveHandler = () => {
    if (matches) {
      dispatch(toggleEditor(false));
      dispatch(togglePanel(true));
    }
  };

  const currentCategoryIndex = useCategories().selectedCategoryIndex;

  const selectedNote = allNotes.filter((note) => note.id === selectedNoteId);


  const formattedNotes = useMemo(() => {
    if (currentCategoryIndex === "2") {
      return allNotes.filter((note) => note.fav === true);
    }

    return allNotes.filter((note) => note.category_id === currentCategoryIndex);
  }, [allNotes, currentCategoryIndex]);

  const showEditor = formattedNotes.length > 0 && selectedNoteId !== null;

  useEffect(() => {
    if (selectedNoteId !== null) dispatch(resetSelectedNote());
  }, [selectedCategoryIndex, dispatch]);

  useEffect(() => {
    if (selectedNote.length > 0 && selectedNote[0].content) {
      setNoteState({
        editorState: EditorState.createWithContent(
          convertFromRaw(selectedNote[0].content)
        ),
        htmlContentState: draftToHtml(selectedNote[0].content),
      });
    } else {
      setNoteState(initialState);
    }
    dispatch(toggleEditMode(false));
  }, [selectedNoteId]);

  //@ Handlers:
  const saveNoteHandler = useCallback(() => {
    if (selectedNoteId === null) {
      alert("Please Select Note");
    }
    contentState = noteState.editorState.getCurrentContent();
    const newNote = {
      id: selectedNoteId,
      title: convertToRaw(contentState).blocks[0].text,
      content: convertToRaw(contentState),
      lastSaved: moment(),
    };
    dispatch(updateNote(newNote));
  }, [noteState]);

  const toggleEditModeHandler = useCallback(() => {
    if (selectedNoteId === null) {
      alert("Please Select Note");
    }
    dispatch(toggleEditMode("TOGGLE"));
  }, [editMode, selectedNoteId, dispatch]);

  const addToFavHandler = useCallback(() => {
    if (selectedNoteId === null) {
      alert("Please Select Note");
    }
    dispatch(addToFav(selectedNoteId));
  }, [selectedNoteId, dispatch]);

  const deleteNoteHandler = useCallback(() => {
    if (selectedNoteId === null) {
      alert("Please Select Note");
    }
    dispatch(tempDeleteNote(selectedNoteId));
  }, [selectedNoteId, dispatch]);

  const restoreNoteHandler = useCallback(() => {
    if (selectedNoteId === null) {
      alert("Please Select Note");
    }
    console.log("AD");
    dispatch(restoreNote(selectedNoteId));
  }, [selectedNoteId, dispatch]);

  const downloadNoteHandler = useCallback(() => {
    if (noteState.htmlContentState !== "") {
      asBlob(noteState.htmlContentState)
        .then((data) => {
          saveAs(data, `${selectedNote[0].title}.docx`);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      alert("The Note is empty hence can't be downloaded");
    }
  }, [noteState, selectedNote]);

  // useEffect(() => {
  //   console.log(currentCategoryIndex);
  //   console.log(formattedNotes);
  //   console.log(selectedNoteId);
  //   console.log(selectedNote);
  // }, [currentCategoryIndex, formattedNotes, selectedNoteId, selectedNote]);

  // const openSettingModal = () => {
  //   setSettingModalIsOpen(true);
  // };

  // useEffect(() => {
  //   if (autoSave) {
  //     timer = setTimeout(() => {
  //       saveNoteHandler();
  //     }, autoSaveDelay * 1000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [autoSave, autoSaveDelay]);

  return (
    <div
      className={clsx(classes.root, { 
        [classes.hideEditor]: !showNoteEditor,
      })}
    >
      {editMode || showEditor ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className={classes.topBar}
        >
          {selectedNoteId !== null ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              className={classes.backIconWrapper}
              onClick={responsiveHandler}
            >
              <KeyboardBackspaceRoundedIcon
                onClick={() => {
                  if (selectedNoteId !== null) dispatch(resetSelectedNote());
                }}
              />
            </Box>
          ) : null}

          {selectedNote.length > 0 ? (
            <Typography
              variant="overline"
              className={classes.lastSaved}
              align="right"
            >
              {selectedNote[0]?.lastSaved
                ? moment(selectedNote[0].lastSaved).fromNow()
                : "unsaved"}
            </Typography>
          ) : null}

          <List className={classes.noteOptions}>
            <ListItemButton disableGutters onClick={saveNoteHandler}>
              <ListItemIcon>
                <Hotkeys
                  keyName="ctrl+alt+s"
                  onKeyDown={saveNoteHandler}
                  allowRepeat={true}
                >
                  <SyncIcon />
                </Hotkeys>
              </ListItemIcon>
            </ListItemButton>
          </List>
        </Box>
      ) : null}
      {showEditor ? (
        editMode ? (
          <DraftEditor
            selectedNoteId={selectedNoteId}
            saveNoteHandler={saveNoteHandler}
            noteState={noteState}
            setNoteState={setNoteState}
          />
        ) : (
          <NotePreview htmlContentState={noteState.htmlContentState} />
        )
      ) : (
        <div className={classes.createNoteMessage}>
          <Typography variant="h5" m={1} gutterBottom>
            {selectedNoteId === null && formattedNotes.length === 0
              ? "Create Note"
              : "Select Note To Edit or Preview"}
          </Typography>
          {selectedNoteId === null && formattedNotes.length === 0 ? (
            <div>
              <Chip size="small" label="Ctrl" /> +
              <Chip size="small" label="Alt" /> +
              <Chip size="small" label="N" />
            </div>
          ) : null}
        </div>
      )}

      {/* formattedNotes to check note list is empty or have notes for the selected category... */}

      {editMode || showEditor ? (
        <div className={classes.bottomBar}>
          <List
            className={clsx(classes.noteOptions, {
              [classes.hiddenEditor]: !showEditor,
            })}
          >
            <ListItemButton disableGutters onClick={toggleEditModeHandler}>
              <ListItemIcon>
                <Hotkeys
                  keyName="ctrl+alt+e"
                  onKeyDown={toggleEditModeHandler}
                  allowRepeat={true}
                >
                  {!editMode ? (
                    <EditOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </Hotkeys>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton disableGutters>
              <ListItemIcon onClick={addToFavHandler}>
                <Hotkeys
                  keyName="ctrl+alt+c"
                  onKeyDown={addToFavHandler}
                  allowRepeat={true}
                >
                  {selectedNote[0]?.fav ? (
                    <BookmarkOutlinedIcon />
                  ) : (
                    <BookmarkBorderOutlinedIcon />
                  )}
                </Hotkeys>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton
              disableGutters
              className={clsx(
                selectedNote[0]?.category_id !== "3" && classes.trash
              )}
              onClick={
                selectedNote[0]?.category_id !== "3"
                  ? deleteNoteHandler
                  : restoreNoteHandler
              }
            >
              <ListItemIcon>
                {selectedNote[0]?.category_id === "3" ? (
                  <Hotkeys
                    keyName="ctrl+alt+u"
                    onKeyDown={restoreNoteHandler}
                    allowRepeat={true}
                  >
                    <RestoreOutlinedIcon />
                  </Hotkeys>
                ) : (
                  <Hotkeys
                    keyName="ctrl+del"
                    onKeyDown={deleteNoteHandler}
                    allowRepeat={true}
                  >
                    <DeleteOutlineIcon />
                  </Hotkeys>
                )}
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton disableGutters onClick={downloadNoteHandler}>
              <ListItemIcon>
                <Hotkeys
                  keyName="ctrl+alt+d"
                  onKeyDown={downloadNoteHandler}
                  allowRepeat={true}
                >
                  <SystemUpdateAltIcon />
                </Hotkeys>
              </ListItemIcon>
            </ListItemButton>
          </List>
          {/* <Box
            display="flex"
            alignItems="center"
            className={classes.hideOnMobile}
          >
            {selectedNote.length > 0 ? (
              <Typography
                variant="overline"
                className={classes.lastSaved}
                align="right"
              >
                {selectedNote[0]?.lastSaved
                  ? moment(selectedNote[0].lastSaved).fromNow()
                  : "unsaved"}
              </Typography>
            ) : null}
            <List className={classes.noteOptions}>
              <ListItemButton disableGutters onClick={saveNoteHandler}>
                <ListItemIcon>
                  <Hotkeys
                    keyName="ctrl+alt+s"
                    onKeyDown={saveNoteHandler}
                    allowRepeat={true}
                  >
                    <SyncIcon />
                  </Hotkeys>
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Box> */}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(NoteEditor);
