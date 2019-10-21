import { Router } from "express";
import userRoute from './userRoutes';
import jobRoute from './jobRoutes';
import blogRoute from './blogRoutes';
import commentRoute from './commentRoutes';
import adminRoute from './adminRoutes';

const app = Router();

app.get("/", (req, res) => {
  res.send("Welcome to VGG career portal");
});


app.use("/", userRoute);
app.use("/", jobRoute);
app.use("/", blogRoute);
app.use("/", commentRoute);
app.use("/", adminRoute);


export default app;
