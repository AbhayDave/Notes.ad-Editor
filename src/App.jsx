import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";

import NotesList from "./components/NotesList/NotesList";

import Sidebar from "./components/SideBar/Sidebar";
import NoteEditor from "./components/EditorTest/NoteEditor";

import ModalWithSidebar from "./components/Modal/ModalWithSidebar";
import ShortcutModal from "./components/Modal/ShortcutModal";




const drawerWidth = 300;

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 0 }}>
              <Typography
                variant="h6"
                sx={{ flexGrow: 0 }}
                noWrap
                component="div"
              >
                Notes.ad
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              
              <IconButton color="inherit" edge="start" sx={{ ml: 2 }}>
                  <ModalWithSidebar />
              </IconButton>
            {/* </Box>

            <Box sx={{ flexGrow: 0 }}> */}
              <IconButton color="inherit" edge="start" sx={{ ml: 2 }}>
                <ShortcutModal />
              </IconButton>

              <Chip
                label="ctrl + alt + h for Help"
                sx={{
                  ml: 2,
                  color: "black",
                  backgroundColor: "white",
                  opacity: "0.5",
                }}
              />
              
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Box
        component="main"
        height={"100vh"}
        display={"flex"}
        // flexDirection={"column"}
        sx={{
          flexGrow: 1,
          // p: 3,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box
          component="section"
          sx={{
            flexGrow: 1,
            // p: 3,
            width: { sm: drawerWidth - 100 },
            maxWidth: {
              xs: drawerWidth - 100,
              sm: drawerWidth,
            },
            flexShrink: { sm: 0 },
            // border: "1px solid red",
          }}
        >
          <Toolbar />
          <NotesList />
        </Box>

        <Box
          component="section"
          sx={{
            flexGrow: 1,
            // p: 3,
          }}
        >
          <Toolbar />
          <NoteEditor />
        </Box>
      </Box>

      {/* <Box
        component="section"
        sx={{
          flexGrow: 1,
          // p: 3,
          width: { sm: drawerWidth - 100 },
          maxWidth: {
            xs: drawerWidth - 100,
            sm: drawerWidth,
          },
          flexShrink: { sm: 0 },
          // border: "1px solid red",
        }}
      >
        <Toolbar />
        <SettingModel />
      </Box> */}
    </Box>
  );
}

export default App;
