const prisma = require("../config/prisma");
const jsonwebtoken = require("jsonwebtoken");

class AuthMiddleware {
  async authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // console.log("Authenticating token: ", token);

    if (token == null) return res.sendStatus(401);

    // On vérifie le token grâce au Token secret
    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) console.log(err);

      // Si y'a erreur, renvoie 403.
      if (err) return res.sendStatus(403);

      // Recupère l'email contenu dans le token
      const email = payload.email;

      // On cherche l'utilisateur grâce à son email
      // Et on récupère son email + son next booster
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          email: true,
          booster: true,
        },
      });

      if (!user) return res.sendStatus(403);

      req.user = user;

      next();
    });
  }
}

module.exports = new AuthMiddleware();
