const jsonwebtoken = require("jsonwebtoken");

const generateToken = (user) => {
  return jsonwebtoken.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = {
  generateToken,
};
