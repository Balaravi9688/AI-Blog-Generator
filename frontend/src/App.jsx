import React, { useState } from "react";
import {
  Box,
  Drawer,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  styled,
  ListItemSecondaryAction,
  IconButton,
  Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatBox from "./components/ChatBox";
import HistoryDialog from "./components/historyDialog";

function App() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredHistory = history?.filter((item) =>
    item.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHistoryItemClick = (index) => {
    setSelectedItem(index);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = (index) => {
    const data = history?.filter((item, historyIndex) => historyIndex !== index);
    setHistory(data);
  };

  const StyledAppName = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    fontSize: '2rem',
    letterSpacing: '1px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: "25%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "inherit",
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
            padding: 2,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ marginBottom: 2 }}>
          <StyledAppName variant="h6" gutterBottom>
            AI Blog Generator
          </StyledAppName>
        </Box>
        <TextField
          label="Search Blog"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          sx={{ marginBottom: 2 }}
        />
        <List>
          {!filteredHistory?.length ? (
            <ListItem>
              <ListItemText primary="No blog found" sx={{ textAlign: "center", color: "gray" }} />
            </ListItem>
          ) : (
            filteredHistory?.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleHistoryItemClick(index)}
                selected={selectedItem === index}
                sx={{
                  backgroundColor: selectedItem === index ? "#d3d3d3" : "transparent",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <ListItemText primary={item.topic} />
                <ListItemSecondaryAction>
                  <Tooltip title="Delete" arrow>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#fff",
          padding: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <ChatBox setHistory={setHistory} />
        </Container>
      </Box>

      <HistoryDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        item={selectedItem !== null ? filteredHistory[selectedItem] : null}
      />
    </Box>
  );
}

export default App;