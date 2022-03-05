const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const tokenDuration = "10h";

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: tokenDuration
  })
};

module.exports.signUp = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await UserModel.create({username, password });
    res.status(200).json({ ...user._doc, succes: "Compte cree"})
  }
  catch(err) {
    res.status(200).send({ err })
  }
}

module.exports.signIn = async (req, res) => {
  const { username, password } = req.body

    UserModel.login(username, password)
    .then(function(user, err){
      if(err) return res.status(500).json({err: "error"});
      const token = createToken(user._id)
      res.cookie('jwt', token, { httpOnly: true, tokenDuration})
      res.status(200).json({ ...user._doc, succes: "Vous ete connecter"})
    })
    .catch((err)=>{
    res.status(500).json({ err: 'invalid user' });
  });
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}