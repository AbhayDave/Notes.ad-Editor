import * as React from "react";
import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import {
  getAutoSave,
  getAutoSaveDelay,
  getEditMode,
  getSortType,
} from "../../app/selectors/settingsSelector";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";
// import Input from "@mui/material/Input";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ImportExportSharpIcon from "@mui/icons-material/ImportExportSharp";
import {
  changeAutoSaveDelay,
  changeSortType,
  toggleAutoSave,
  toggleEditMode,
} from "../../app/Settings/settingsSlice";
import { asBlob } from "html-docx-js-typescript";
import draftToHtml from "draftjs-to-html";
import { saveAs } from "file-saver";
import { useNotes } from "../../app/useNotes";
import { importNotes } from "../../app/Notes/notesSlice";

import Hotkeys from "react-hot-keys";

function ModalWithSidebar() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const SORT_TYPE = useSelector(getSortType);
  const EDIT_MODE = useSelector(getEditMode);
  const AUTO_SAVE_DELAY = useSelector(getAutoSaveDelay);
  const AUTO_SAVE = useSelector(getAutoSave);

  const handleSidebarClose = () => {
    handleClose();
  };

  const fileInputRef = React.useRef(null);


  const [editMode, setEditMode] = React.useState("");
  const [sortType, setSortType] = React.useState("");
  const [autoSave, setAutoSave] = React.useState("");
  const [autoSaveDelay, setAutoSaveDelay] = React.useState("");

  const allNotes = useNotes().allNotes;

  React.useEffect(() => {
    setSortType(SORT_TYPE);
    setEditMode(EDIT_MODE);
    setAutoSave(AUTO_SAVE);
    setAutoSaveDelay(AUTO_SAVE_DELAY);
  }, []);

  const handleChange = (event) => {
    setSortType(event.target.value);
    dispatch(changeSortType(event.target.value));
  };

  const handleEditSwitch = () => {
    setEditMode(!editMode);
    dispatch(toggleEditMode("TOGGLE"));
  };

  const handleAutoSaveSwitch = () => {
    setAutoSave(!autoSave);
    dispatch(toggleAutoSave());
  };

  const handleAutoSaveDelayChange = (event) => {
    if (!parseInt(event.target.value)) {
      return;
    }
    setAutoSaveDelay(parseInt(event.target.value));
    dispatch(changeAutoSaveDelay(parseInt(event.target.value)));
  };

  const downloadAllNotesAsZip = React.useCallback(() => {
    allNotes.forEach((note) => {
      if (note.content) {
        asBlob(draftToHtml(note.content))
          .then((fb) => {
            saveAs(fb, `${note.title}.docx`);
          })
          .catch((err) => {
            console.error(err.message);
          });
      }
    });
  }, [allNotes]);

  const allNotesExportAsJson = React.useCallback(() => {
    const output = JSON.stringify(allNotes, null, 4);
    const blob = new Blob([output]);
    saveAs(blob, "Notes.ad.json");
  }, [allNotes]);

  const fileUploadHandler = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      dispatch(importNotes(JSON.parse(reader.result)));
    };

    reader.onerror = function () {
      alert(reader.error);
    };
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    p: 2,
  };

  return (
    <div>
      <Hotkeys
        keyName="ctrl+alt+x"
        onKeyDown={handleOpen}
        allowRepeat={true}
        onClick={handleOpen}
      >
        <SettingsIcon onClick={handleOpen} />
      </Hotkeys>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: "1rem", px: "2rem" }}
          >
            <Typography variant="h5">Modal Title</Typography>
            <CancelPresentationOutlinedIcon
              color="error"
              onClick={handleSidebarClose}
              sx={{ cursor: "pointer" }}
              fontSize="large"
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem" }}
          >
            <Typography variant="subtitle1">Sort By</Typography>
            <Select
              sx={{ minWidth: "5rem" }}
              value={sortType}
              onChange={handleChange}
              autoWidth
            >
              <MenuItem value={"Title"}>Title </MenuItem>
              <MenuItem value={"Last Updated"}>Last Updated</MenuItem>
              <MenuItem value={"Date Created"}>Date Created</MenuItem>
              {/* <MenuItem value={"Category"}>Category</MenuItem> */}
            </Select>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", py: 2 }}
          >
            <Typography variant="subtitle1">Edit Mode</Typography>
            <Switch
              checked={editMode ? true : false}
              onChange={() => handleEditSwitch()}
              name="loading"
              color="primary"
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", py: 2 }}
          >
            <Typography variant="subtitle1">Auto Save</Typography>
            <Switch
              checked={autoSave ? true : false}
              onChange={() => handleAutoSaveSwitch()}
              name="loading"
              color="primary"
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", py: 2 }}
          >
            <Typography variant="subtitle1">Auto Save Delay</Typography>
            <TextField
              id="outlined-basic"
              label="Delay (s)"
              variant="outlined"
              value={autoSaveDelay}
              onChange={handleAutoSaveDelayChange}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", py: 2 }}
          >
            <Typography variant="subtitle1">
              Download All Notes in DOCX Format at Once
            </Typography>
            <Button
              variant="contained"
              onClick={downloadAllNotesAsZip}
              startIcon={<DownloadIcon />}
            >
              Download All
            </Button>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", py: 2 }}
          >
            <Typography variant="subtitle1">
              Export all Notes as JSON
            </Typography>
            <Button
              variant="contained"
              onClick={allNotesExportAsJson}
              startIcon={<FileUploadIcon />}
            >
              Export All
            </Button>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", py: 2 }}
          >
            <Typography variant="subtitle1">
              Import Notes in JSON Format
            </Typography>
            <Button
              variant="contained"
              onClick={fileUploadHandler}
              startIcon={<ImportExportSharpIcon />}
            >
              Import All
            </Button>
            <input
              type="file"
              multiple={false}
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalWithSidebar;
