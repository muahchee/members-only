import { body, validationResult, matchedData } from "express-validator";
import { changeMembership } from "../db/queries.js";
import dotenv from "dotenv";

dotenv.config();

const validateMemberPW = [
  body("member-pw").trim().custom(async (value) => {
    if (String(value) !== process.env.MEMBER_PW) throw new Error("Wrong Password!");
  }),
];

export async function joinGet(req, res) {
  res.render("join", { title: "Membership" });
}

export const joinPost = [
  validateMemberPW,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("join", {
        title: "Membership",
        errors: errors.array(),
      });
    }
    await changeMembership(req.user.username);
    res.redirect("/")
  },
];
