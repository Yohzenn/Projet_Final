const prisma = require("../config/prisma");
const { comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

class AuthentificationController {
  async login(req, res) {
    try {
      const body = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (user === null) {
        return res.status(404).send("User not found");
      }

      const isSamePassword = await comparePassword(
        body.password,
        user.password
      );

      if (!isSamePassword) {
        return res.status(401).send("Unauthorized");
      }

      const token = generateToken(user);

      return res.status(200).send(token);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
}

module.exports = new AuthentificationController();
