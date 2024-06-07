import * as React from "react";
import {
  Modal,
  Box,
  Typography,
} from "@mui/material";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import KeyboardAltSharpIcon from "@mui/icons-material/KeyboardAltSharp";

import Hotkeys from "react-hot-keys";

function ShortcutModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSidebarClose = () => {
    handleClose();
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
        keyName="ctrl+alt+h"
        onKeyDown={handleOpen}
        allowRepeat={true}
        onClick={handleOpen}
      >
        <KeyboardAltSharpIcon onClick={handleOpen} />
      </Hotkeys>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: "1rem", px: "2rem" }}
          >
            <Typography variant="h5">Keyboard Shortcuts</Typography>
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
            sx={{ px: "3rem", pb: "1rem" }}
          >
            <Typography variant="subtitle1">Create New Note</Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <Chip label="ctrl" />
              <span>+</span>
              <Chip label="alt" />
              <span>+</span>
              <Chip label="n" />
            </Stack>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", pb: "1rem" }}
          >
            <Typography variant="subtitle1">Add To Favourites</Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <Chip label="ctrl" />
              <span>+</span>
              <Chip label="alt" />
              <span>+</span>
              <Chip label="c" />
            </Stack>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", pb: "1rem" }}
          >
            <Typography variant="subtitle1">Toggle Edit Mode</Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <Chip label="ctrl" />
              <span>+</span>
              <Chip label="alt" />
              <span>+</span>
              <Chip label="e" />
            </Stack>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", pb: "1rem" }}
          >
            <Typography variant="subtitle1">Download Note</Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <Chip label="ctrl" />
              <span>+</span>
              <Chip label="alt" />
              <span>+</span>
              <Chip label="d" />
            </Stack>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", pb: "1rem" }}
          >
            <Typography variant="subtitle1">Delete Note</Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <Chip label="ctrl" />
              <span>+</span>
              <Chip label="delete" />
            </Stack>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", pb: "1rem" }}
          >
            <Typography variant="subtitle1">Save Note</Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <Chip label="ctrl" />
              <span>+</span>
              <Chip label="alt" />
              <span>+</span>
              <Chip label="s" />
            </Stack>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", pb: "1rem" }}
          >
            <Typography variant="subtitle1">Restore Note</Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <Chip label="ctrl" />
              <span>+</span>
              <Chip label="alt" />
              <span>+</span>
              <Chip label="u" />
            </Stack>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: "3rem", pb: "1rem" }}
          >
            <Typography variant="subtitle1">Open Settings</Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <Chip label="ctrl" />
              <span>+</span>
              <Chip label="alt" />
              <span>+</span>
              <Chip label="x" />
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ShortcutModal;
