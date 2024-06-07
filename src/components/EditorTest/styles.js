import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    overflowY: "scroll",
  },
  
  hideEditor: {
    display: "none",
  },

  editorClass: {
    padding: "0.5rem 1rem",
    height: "91vh !important",
    // maxWidth: "30vw" ,
    // background: theme.customTheme.ui3,

    "& div.DraftEditor-root": {
      height: "98%",
    },
  },

  toolbarClass: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",

    "& div div": {
      borderRadius: "5px",
      transition: "0.3s ease",

      "&:hover": {
        boxShadow:
          "0px 4px 6px -1px rgba(0,0,0,0.1) , 0px 2px 4px -1px rgba(0,0,0,0.06)",
      },
    },
  },

  topBar: {
    width: "100%",
    background: theme.customTheme.ui,
    display: "none",
    ["@media (max-width:480px)"]: {
      // eslint-disable-line no-useless-computed-key
      display: "flex",
    },
  },

  backIconWrapper: {
    padding: "0.4rem",
    backgroundColor: theme.customTheme.syntax,
    color: theme.customTheme.ui,
  },

  bottomBar: {
    width: "100%",
    background: theme.customTheme.ui,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  imagePopup: {
    left: 0,
    transform: "translateX(-50%) !important",
  },

  noteOptions: {
    display: "flex",
    padding: 0,

    "& .MuiListItem-root": {
      opacity: 0.8,

      "&:hover": {
        opacity: 1,
      },
    },

    "& div.MuiListItemIcon-root": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "40px !important",

      "& svg": {
        fontSize: "1.3rem",
      },

      ["@media (max-width:555px)"]: {
        // eslint-disable-line no-useless-computed-key
        minWidth: "30px !important",

        "& svg": {
          fontSize: "1.1rem",
        },
      },
    },
  },

  hideOnMobile: {
    ["@media (max-width:480px)"]: {
      // eslint-disable-line no-useless-computed-key
      display: "none",
    },
  },

  createNoteMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "95.9vh",
    fontWeight: "bold",
    textTransform: "uppercase",

    ["@media (max-height:834px)"]: {
      // eslint-disable-line no-useless-computed-key
      height: "77vh",
    },
    ["@media (max-width:670px)"]: {
      // eslint-disable-line no-useless-computed-key
      "& .MuiTypography-h5": {
        fontSize: "1.2rem",
      },
    },
    ["@media (max-width:520px)"]: {
      // eslint-disable-line no-useless-computed-key
      "& .MuiTypography-h5": {
        fontSize: "1rem",
      },
    },
  },

  hiddenEditor: {
    visibility: "hidden",
  },

  loaderBox: {
    height: "95.9vh",
  },

  preview: {
    backgroundColor: theme.customTheme.ui3,
    height: "77vh",
    overflowY: "auto",
    background: "#F5F5F5",
    wordWrap: "break-word",
    padding: "0.5rem 1rem",
  },

  lastSaved: {
    flexGrow: 2,
    opacity: 0.8,
  },

  trash: {
    "&:hover": {
      "& svg": {
        color: "red",
      },
    },
  },
}));
