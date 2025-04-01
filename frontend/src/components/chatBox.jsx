import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Chip,
  InputAdornment,
  Tooltip
} from "@mui/material";
import { FaPaperPlane } from "react-icons/fa";
import BlogPost from "./BlogPost";

const ChatBox = ({ setHistory }) => {
  const [topic, setTopic] = useState("");
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URI, {
        params: { topic },
      });

      const { data } = response.data;
      setBlogPost(data);

      setHistory((prev) => [...prev, { topic: topic, data: response.data }]);

      // console.log("API Response Data:", response.data);
    } catch (error) {
      console.error("Error generating blog:", error);
      setError("Failed to generate blog post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: 3,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
        height: "80vh",
      }}
    >
      <BlogPost isLoading={isLoading} content={blogPost} />

      {error && (
        <Chip
          label={error}
          color="error"
          sx={{ marginTop: 2 }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          rows={1}
          variant="outlined"
          placeholder="Ask blog post..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Send Blog Request" arrow>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading || !topic.trim()}
                    sx={{ padding: 1, borderRadius: '50px' }}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : <FaPaperPlane />}
                  </Button>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
};

export default ChatBox;