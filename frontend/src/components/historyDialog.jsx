import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';

const HistoryDialog = ({ open, onClose, item }) => {
  const handleCopy = () => {
    if (item && item.data?.data) {
      navigator.clipboard.writeText(item.data.data)
        .then(() => {
          alert("Content copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {item && (
        <>
          <DialogTitle sx={{ fontFamily: "Arial, sans-serif", display: 'flex', justifyContent: 'space-between' }}>
            {item.topic}
            <IconButton onClick={handleCopy} color="primary">
              <FileCopyIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ fontFamily: "Times New Roman, Times, serif" }}>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "Courier New, monospace" }}>
              {item.data?.data}
            </pre>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary" sx={{ fontFamily: "Arial, sans-serif" }}>
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default HistoryDialog;
