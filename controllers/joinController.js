import { body, validationResult, matchedData } from "express-validator";
import dotenv from "dotenv";
import { changeMembership } from "../db/queries.js";

dotenv.config();

const validateMemberPW = [
  body("member-pw").custom(async (value) => {
    if (value !== process.env.MEMBER_PW) throw new Error("Wrong Password!");
  }),
];

export async function joinGet(res, req) {
  res.render("join", { title: "Membership" });
}

export const joinPost = [
  validateMemberPW,
  async (res, req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("join", {
        title: Membership,
        errors: errors.array(),
      });
    }
    await changeMembership(req.currentUser.username)
  },
];
