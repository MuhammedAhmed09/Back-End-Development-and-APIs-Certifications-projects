import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

dotenv.config();

import watchlistRoutes from "./routes/watchlist.js";
import authRouter from './routes/auth.js';
import { authenticate } from './middleware/authenticate.js'

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.use("/api/watchlist", authenticate, watchlistRoutes);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
