import { body, validationResult, matchedData } from "express-validator";
import { addMessage } from "../db/queries.js";

async function wenxuanReplace(value) {
  const regex = /wenxuan/gi;
  return value.replaceAll(regex, "pipis");
}

const validateMsg = [
  body("title")
    .isLength({ max: 100 })
    .withMessage("Titles should be less than 100 characters long.")
    .customSanitizer(wenxuanReplace),
  body("text")
    .isLength({ max: 300 })
    .withMessage("Text should be less than 300 characters long.")
    .customSanitizer(wenxuanReplace),
];

export async function createGet(req, res) {
  res.render("create", { title: "Create a Message!" });
}

export const createPost = [
  validateMsg,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("create", {
        title: "Create a Message",
        errors: errors.array(),
      });
    }
    const { title, text } = matchedData(req);

    await addMessage({
      userid: req.user.id,
      title: title,
      timestamp: new Date().toLocaleDateString(),
      text: text,
    });
    res.redirect("/");
  },
];
