import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import connectDB from "./config/db.js";
connectDB();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 3003;

const app = express();

app.use(cors({ origin: "*", credentials: true }));


app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => res.send(`Hello World`));
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));

// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
// const port = process.env.PORT || 3003;

// import cors from "cors";
// import cookieParser from "cookie-parser";

// import connectDB from "./config/db.js";
// connectDB();

// import authRoutes from "./routes/authRoutes.js";

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.use(notFound);
// app.use(errorHandler);

// app.listen(port, () => console.log(`Server is running on port ${port}`));
