import { getAllMessages } from "../db/queries.js";

export async function allMessagesGet(req, res) {
  const messages = await getAllMessages();
  res.render("index", {
    title: "Homepage",
    messages: messages,
  });
}
