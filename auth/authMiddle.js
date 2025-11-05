export async function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).render("index", {
      title: "Homepage",
      errors: [{ msg: "You are not a MEMBER yet, so you don't have access to that page!" }],
    });
  }
}

export async function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    return res.status(401).render("index", {
      title: "Homepage",
      errors: [{ msg: "You are not an ADMIN yet, so you don't have access to that page!" }],
    });
  }
}
