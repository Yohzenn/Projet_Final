const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");

class UsersController {
  async getMyProfile(req, res) {
    const user = req.user;
    return res.status(200).send(user);
  }
  // app.get (/users)
  async index(req, res) {
    const users = await prisma.user.findMany();
    return res.status(200).send(users);
  }

  // app.post (/users)
  async store(req, res) {
    try {
      const body = req.body;
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await hashPassword(body.password),
        },
      });
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  // app.get (/users/:id)
  async show(req, res) {
    const id = req.params.id; // 4
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (user === null) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send(user);
  }

  // app.put (/users/:id)
  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;

      let user = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (user === null) {
        return res.status(404).send("User not found");
      }

      user = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          lastHouseVisited: body.house,
        },
      });

      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  // app.delete (/users/:id)
  async destroy(req, res) {
    try {
      const id = req.params.id;

      let user = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (user === null) {
        return res.status(404).send("User not found");
      }

      await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });

      return res.status(204).send();
      // return res.status(200).send(users);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
  async searchhouse(req, res) {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(201).send({
      house: user.lastHouseVisited,
    });
  }
}

module.exports = new UsersController();
