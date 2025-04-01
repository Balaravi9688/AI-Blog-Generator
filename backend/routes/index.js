import { Router } from "express";
import { generateBlog } from "../service/generate_blog.js";

const routes = Router();

routes.get("/get-all-blogs", (req, res) => {
  res.status(200).json({ message: "get all blogs" });
});

routes.get("/generate-blog", async (req, res) => {
  const { topic } = req.query;

  const data = await generateBlog(topic);

  if (!data.status) {
    return res.status(500).json({ message: "Error generating blog" });
  }

  res.status(200).json({ data: data.data });
});

export default routes;
