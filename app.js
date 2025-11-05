import e, { urlencoded } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import passport from "passport";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
const pgSession = connectPgSimple(session);

import dotenv from "dotenv";

//router import
import { indexRouter } from "./routes/indexRouter.js";
import { signupRouter } from "./routes/signupRouter.js";
import { joinRouter } from "./routes/joinRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import { deleteRouter } from "./routes/deleteRouter.js";

///----
import { pool } from "./db/pool.js";
import "./auth/passport.js";
import { isAdmin, isUser, isMember } from "./auth/authMiddle.js";
import { createRouter } from "./routes/createRouter.js";

dotenv.config();

const app = e();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(e.static(assetsPath));
app.use(urlencoded({ extended: true }));
app.use(e.json());

//connect to the table "session" in db
const sessionStore = new pgSession({
  pool: pool,
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1day
    },
  })
);

//passport auth goes here--------------------

app.use(passport.session());

// to easily access the currentUser without passing req.user into each render
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//-------------------routes-----------------------------------
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/join", isUser, joinRouter);
app.use("/admin", isMember, adminRouter);

// -----login/logout------
app.get("/login", (req, res) => {
  res.render("login", { title: "login" });
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//---messages----
app.use("/create",isUser, createRouter)
app.use("/delete",isAdmin, deleteRouter)


app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
