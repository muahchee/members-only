import { addUser, getUserbyUsername } from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";
import bcrypt from "bcryptjs";

const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage("First Name should only contain alphabets."),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage("Last Name should only contain alphabets."),
  ,
  body("username")
    .trim()
    .custom(async (value) => {
      const existingUser = await getUserbyUsername(value);
      if (existingUser) throw new Error("Username is already taken!");
    }),
  body("pw")
    .isLength({ min: 5 })
    .withMessage("Password should be 5 characters minimum."),
  body("cpw").custom(async (value, { req }) => {
    if (value !== req.body.pw) throw new Error("Passwords don't match!");
  }),
];

export async function addUserGet(req, res) {
  res.render("signup", { title: "Signup" });
}

export const addUserPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        title: "Signup",
        errors: errors.array(),
        obj: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          pw: req.body.pw,
          cpw: req.body.cpw,
        },
      });
    }
    const { firstname, lastname, username, pw } = matchedData(req);

    try {
      const hashedPw = await bcrypt.hash(pw, 10);
      await addUser({
        firstname: firstname,
        lastname: lastname,
        username: username,
        pw: hashedPw,
      });
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];
