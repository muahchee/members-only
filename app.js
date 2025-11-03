import e, {urlencoded} from "express";
import path from "node:path"
import { fileURLToPath } from "node:url";

//router import
import { indexRouter } from "./routes/indexRouter.js";
import { signupRouter } from "./routes/signupRouter.js";
import { joinRouter } from "./routes/joinRouter.js";

const app = e();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(e.static(assetsPath));
app.use(urlencoded({ extended: true }));

//to easily access the currentUser without passing req.user into each render
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//app.use routes
app.use("/", indexRouter);
app.use("/signup", signupRouter)
app.use("/join", joinRouter )

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
