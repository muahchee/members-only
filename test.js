import e, { urlencoded } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
const pgSession = connectPgSimple(session);

import dotenv from "dotenv";

///----
import { pool } from "./db/pool.js";

dotenv.config();

const app = e();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(e.static(assetsPath));
app.use(urlencoded({ extended: true }));
app.use(e.json())

//connect to the table "session" in db
const sessionStore = new pgSession({
  pool: pool,

});

app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1day
    },
  })
);
// app.use(passport.session());

//to easily access the currentUser without passing req.user into each render
// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });

//app.use routes
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/join", joinRouter);
app.use("/login", loginRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
