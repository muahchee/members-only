import { body, validationResult, matchedData } from "express-validator";
import dotenv from "dotenv";
import { changeAdminStatus } from "../db/queries.js";

dotenv.config();

const validateAdminPW = [
  body("admin-pw").custom(async (value) => {
    if (String(value) != process.env.ADMIN_PW) throw new Error("Wrong Password!");
  }),
];

export async function adminGet(req, res) {
  res.render("admin", { title: "Become an Admin!" });
}

export const adminPost = [
  validateAdminPW,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("admin", {
        title: "Become an Admin!",
        errors: errors.array(),
      });
    }
    await changeAdminStatus(req.user.username)
    res.redirect("/")
  },
];
