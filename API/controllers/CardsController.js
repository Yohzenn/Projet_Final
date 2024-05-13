const prisma = require("../config/prisma");

class CardsController {
  async showUserCards(req, res) {
    try {
      const { id } = req.user;

      const cards = await prisma.userCard.findMany({
        where: {
          userId: id,
        },
        select: {
          cardId: true,
          quantity: true,
        },
      });

      if (!cards) return res.status(404).json({ message: "No cards found." });

      return res.status(200).json(cards);
    } catch (error) {}
  }
}

module.exports = new CardsController();
