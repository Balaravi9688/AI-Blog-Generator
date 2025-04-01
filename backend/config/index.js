import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.API_KEY || "AIzaSyBPAiRH_HwIoLN2wnGwRZFDE2kyWaV-i54",
};
