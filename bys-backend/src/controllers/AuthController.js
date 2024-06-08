const jwt = require('jsonwebtoken');
const UserContract = require('../Blockchain/Contracts/User/UserContract');
const { MESSAGES } = require('../Constants/MessageConstant');
const { accountAddress } = require('../Constants/contractConstants');
const { encrypt, decrypt } = require('../Utils/utils');

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserContract.methods.getUserByEmailAndPassword(encrypt(email), encrypt(password)).call();
    if (user) {
        const token = generateToken(user);
        res.json({ 
          access_token: token,
          id: user.userId.toString(),
          email: decrypt(user.mail),
          isActive: user.isActive,
          roles: user.roles
      });
    } else {
      res.status(401).json({ message: 'E-posta veya şifre yanlış' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Giriş yapılamadı', error });
  }
}

async function logout(req, res) {
  res.status(200).json({
    message: "success",
    success: true
  });
}

async function register(req, res) {
  const { name, surname, password, mail, phone } = req.body;

  try {
    await UserContract.methods
          .addUser(
            encrypt(name),
            encrypt(surname),
            '',
            encrypt(password),
            encrypt(mail),
            encrypt(phone),
            [],
            false
          )
          .send({ from: accountAddress, gas: 800000 });

    res.status(200).json({
      message: MESSAGES.SUCCESS,
      success: true,
    });
  } catch (error) {
    res.status(401).json({ message: 'Kayıt Olunamadı' });
  }
}

function generateToken(user) {
  const token = jwt.sign(
    { userId: user.id, email: decrypt(user.mail), role: user.roles },
    'oGk1oTdlB0q4s3adTEUi5VHU9Dyskxmaokg8Pl3E6zzb10YQzAwv6ELzkb7l8Xy3',
    { expiresIn: '1h' }
  );

  return token;
}

module.exports = {
  login,
  logout,
  register,
};
