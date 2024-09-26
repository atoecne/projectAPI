const AccountModel = require('../models/account')
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res, next) => {
  try {
    passport.authenticate('local', async (err, user) => {
      if (err) return res.status(500).json('loi server');
      if (!user) return res.status(401).json('username khong ton tai');      
      else {
        const token = await jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
        res.cookie("token", token, { maxAge: 100000 });
        return res.json({ token });
      }
    })(req, res, next);
    console.log(process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.log(error)
    return res.status(500).json('loi server');
  }
};

exports.verifyAdmin = async (req, res, next) => {
  console.log('checklogin ne')
  try {
    var token = req.params.token
    console.log(req.params.token)
    console.log(token)
    console.log(process.env.ACCESS_TOKEN_SECRET)
    if (!token) {
      return res.status(500).json('Token not available');
    } else {
      var result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      const admin = await AccountModel.findOne({
        _id: result
      })
      if (admin) {
        req.data = admin
        console.log(req.data)
        next()
      } else {
        res.json('No Permission')
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json('Token not available')
  }
};

exports.phanquyen = ( req, res, next) =>{
  var role = req.data.role
  if(role === 'admin'){
    next()
  }else{
    res.json('No Permission')
  }
}