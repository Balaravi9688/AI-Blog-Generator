import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

const BlogPost = ({ content, isLoading }) => {
  const lines = content ? content.split("\n") : [];

  return (
    <Card sx={{ marginBottom: 4, marginTop: 3, width: "100%", height: "60vh" }}>
      <CardContent>
        {isLoading ? (
          <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ marginTop: 3 }}>
            Generating your blog post, please wait...
          </Typography>
        ) : !content ? (
          <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ marginTop: 3 }}>
            Your blog post will appear here once generated.
          </Typography>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.5,
                  duration: 0.5,
                }}
              >
                <Typography variant="body1" textAlign={"center"} marginTop={2}>
                  {line}
                </Typography>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogPost;
