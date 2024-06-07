import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";

import Hotkeys from "react-hot-keys";

import { saveAs } from "file-saver";

import { useDispatch } from "react-redux";
import { Box, Typography, TextField } from "@mui/material";
import { useNotes } from "../../app/useNotes";
import { asBlob } from "html-docx-js-typescript";
import draftToHtml from "draftjs-to-html";

import {
  deleteNote,
  moveToCategory,
  restoreNote,
  tempDeleteNote,
} from "../../app/Notes/notesSlice";

import { useCategories } from "../../app/useCategories";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
  
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

// eslint-disable-next-line react/prop-types
export default function NotesMenu({ noteId, categoryId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const currentCategoryIndex = useCategories().selectedCategoryIndex;
  const defaultCategories = useCategories().defaultCategories;
  const userCategories = useCategories().userCategories;

  const defaultCategoriesNames = defaultCategories.map(
    (category) => category.name
  );

  const userCategoriesNames = userCategories.map(
    (category) => category.name
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const allNotes = useNotes().allNotes;

  const downloadNoteHandler = React.useCallback(() => {
    const note = allNotes.find((note) => note.id === noteId);

    console.log(note?.content);

    if (note?.content) {
      asBlob(draftToHtml(note.content))
        .then((data) => {
          saveAs(data, `${note.title}.docx`);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      alert("The Note is empty hence can't be downloaded");
    }
    setAnchorEl(null);
  }, [allNotes, noteId]);

  const trashNoteHandler = React.useCallback(() => {
    dispatch(tempDeleteNote(noteId));
    setAnchorEl(null);
  }, [dispatch, noteId]);

  const deleteNoteHandler = React.useCallback(() => {
    dispatch(deleteNote(noteId));
    setAnchorEl(null);
  }, [dispatch, noteId]);

  const restoreNoteHandler = React.useCallback(() => {
    dispatch(restoreNote(noteId));
    setAnchorEl(null);
  }, [dispatch, noteId]);

  const changeCategorySubmitHandler = React.useCallback((e) => {
    e.preventDefault();

    const categoryName = new FormData(e.target).get("categoryName");
    if (defaultCategoriesNames.includes(categoryName)) {
      // console.log("Default Category");
      const moveToCategoryId = defaultCategories.find(
        (category) => category.name === categoryName
      ).id;
      // console.log(moveToCategoryId);
      dispatch(moveToCategory({ moveToCategoryId, noteId }));
    } else if (userCategoriesNames.includes(categoryName)) {
      // console.log("User Category");
      const moveToCategoryId = userCategories.find(
        (category) => category.name === categoryName
      ).id;
      // console.log(moveToCategoryId);
      dispatch(moveToCategory({ moveToCategoryId, noteId }));
    } else {
      alert("Category with the given name does not exist");
    }
    handleClose()
  }, [defaultCategories, userCategories, dispatch, noteId, userCategoriesNames, defaultCategoriesNames]);

  return (
    <div>
      <MoreHorizOutlinedIcon
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        // disableElevation
        onClick={handleClick}
        // endIcon={<KeyboardArrowDownIcon />}
      />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={downloadNoteHandler}>
          <DownloadOutlinedIcon />
          Download
        </MenuItem>

        {categoryId === "3" ? (
          <MenuItem onClick={restoreNoteHandler}>
            <Hotkeys
              keyName="ctrl+alt+u"
              onKeyDown={restoreNoteHandler}
              allowRepeat={true}
            >
              <RestorePageOutlinedIcon />
              Restore
            </Hotkeys>
          </MenuItem>
        ) : (
          <MenuItem onClick={trashNoteHandler}>
            <DeleteOutlineOutlinedIcon />
            Trash
          </MenuItem>
        )}

        {categoryId === "3" && (
          <MenuItem onClick={deleteNoteHandler}>
            <DeleteForeverOutlinedIcon />
            Delete Permanently
          </MenuItem>
        )}

        <Divider sx={{ my: 0.5 }} />

        <MenuItem disableRipple onKeyDown={(e) => e.stopPropagation()}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
            }}
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              changeCategorySubmitHandler(e);
            }}
          >
            <Typography variant="body">Move to Category</Typography>
            <TextField
              id="categoryName"
              label="Enter Category Name.."
              variant="outlined"
              sx={{ maxWidth: "90%" }}
              name="categoryName"
            />
          </Box>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
