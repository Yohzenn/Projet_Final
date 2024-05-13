const prisma = require("../config/prisma");

class BoosterController {
  async boosterOpening(req, res) {
    try {
      const cardsId = req.body.cards;

      // Définition de variables par destructuration d'objet
      const { id, email } = req.user;

      // Vérifier si le booster est bel et bien disponible
      const booster = await prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          booster: true,
        },
      });

      if (parseInt(booster.booster) - Date.now() > 0)
        return res.status(400).json({ message: "The booster is not ready." });

      // Pour chaque id (carte) dans cardsId :
      cardsId.forEach(async (cardId) => {
        // On vérifie si l'utilisateur a déjà la carte.
        const hasCard = await prisma.userCard.findFirst({
          where: {
            userId: id,
            cardId: cardId,
          },
        });

        // Si il a la carte
        if (hasCard) {
          // On incrémente la quantité
          await prisma.userCard.update({
            where: {
              userId_cardId: {
                userId: id,
                cardId: cardId,
              },
            },
            data: {
              quantity: {
                increment: 1,
              },
            },
          });
        } else {
          // Sinon on crée une nouvelle relation ehtre la carte et l'utilisateur.
          await prisma.userCard.create({
            data: {
              userId: id,
              cardId: cardId,
            },
          });
        }
      });

      // On crée la date du prochain booster
      const nextBooster = Date.now() + 1000 * 60 * 60 * 24; // 86400000 millisecondes = 24h

      // On update la date du prochain booster dans la table User
      const updateBooster = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          booster: nextBooster.toString(), // toString = convertir number en string
        },
        select: {
          booster: true,
        },
      });

      return res
        .status(201)
        .json({ booster: updateBooster.booster, message: "Cartes ajoutées !" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async resetBooster(req, res) {
    try {
      const { email } = req.user;

      // Je vérifie si l'utilisateur existe
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) return res.status(404).json({ message: "User not found." });

      // Si il existe, j'update son booster en remplaçant la valeur par "0"
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          booster: "0",
        },
      });

      return res
        .status(200)
        .json({ message: "The booster has been successfully reseted. " });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new BoosterController();
