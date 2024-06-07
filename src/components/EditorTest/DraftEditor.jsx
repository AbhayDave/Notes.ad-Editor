// import packages
import React, { useCallback, useEffect, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";

// import Styles
import { useStyles } from "./styles";

// import redux selectors & actions
import {
  getAutoSave,
  getAutoSaveDelay,
} from "../../app/selectors/settingsSelector";
import { deleteNote } from "../../app/Notes/notesSlice";

const DraftEditor = ({
  noteState,
  setNoteState,
  saveNoteHandler,
  selectedNoteId,
}) => {
  //@ States and Variables:
  const classes = useStyles();
  const editorRef = useRef(null);
  let saveAfterTypingTimer = null;

  //@ Context:
  const dispatch = useDispatch();
  const autoSave = useSelector(getAutoSave);
  const autoSaveDelay = useSelector(getAutoSaveDelay);

  //@ Handlers:
  const editorChangeHandler = useCallback(
    (state) => {
      const contentState = noteState.editorState.getCurrentContent();
      setNoteState({
        editorState: state,
        htmlContentState: draftToHtml(convertToRaw(contentState)),
      });

      if (autoSave) {
        clearTimeout(saveAfterTypingTimer);
        saveAfterTypingTimer = setTimeout(() => {
          console.log("save after 5sec of type");
          saveNoteHandler();
        }, autoSaveDelay);
      }
    },
    [noteState, setNoteState]
  );

  const editorBlurHandler = () => {
    const rawState = convertToRaw(noteState.editorState.getCurrentContent());
    if (rawState.blocks[0].text.trim() === "") {
      dispatch(deleteNote(selectedNoteId));
    } else {
      saveNoteHandler();
    }
  };

  useEffect(() => {
    editorRef.current.focusEditor();
  }, []);

  return (
    <div style={{borderRight: "1px solid black"}}>
      <Editor
        ref={editorRef}
        editorState={noteState.editorState}
        toolbarClassName={classes.toolbarClass}
        wrapperClassName={classes.wrapperClass}
        editorClassName={classes.editorClass}
        onEditorStateChange={editorChangeHandler}
        onBlur={editorBlurHandler}
        toolbar={{
          image: {
            popupClassName: classes.imagePopup,
          },
          embedded: {
            popupClassName: classes.imagePopup,
          },
          emoji: {
            popupClassName: classes.imagePopup,
          },
        }}
      />
    </div>
  );
};

export default React.memo(DraftEditor);
