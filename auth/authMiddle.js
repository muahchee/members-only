//access: user
export async function isUser(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).render("401", {
      errorMsg:
        "Either you are logged out or have not signed up yet.",
    });
  }
}

//access: user, member
export async function isMember(req, res, next) {
  if (req.isAuthenticated() && req.user.member) {
    next();
  } else {
    return res.status(401).render("401", {
      errorMsg: "Either you are logged out or you are not a MEMBER yet.",
    });
  }
}

//access: user, member, admin

export async function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    return res.status(401).render("401", {
      errorMsg:
        "Either you are logged out or you are not an ADMIN yet.",
    });
  }
}
