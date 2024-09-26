const AccountModel = require('../models/account')
const jwt = require('jsonwebtoken')

exports.getAllStudent = async (req, res) => {
    try {
      const users = await AccountModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  };
exports.createAccount = async(req, res, next)=>{
    var username = req.body.username
    var password = req.body.password
    var role = req.body.role

    try {
        const account = await AccountModel.findOne({
            username: username
        })
      if(account){
        res.json('da ton tai')
      }else{
        const accounts = await AccountModel.create({
            username: username,
            password: password,
            role: role            
        })
        .then(data=>{
            res.json('create successfull')
        })
        .catch(err=>{
            res.status(500).json('loi server')
        })
      }
    } catch (error) {
        res.status('500').json('loi server')
    }
}

exports.updateAccount = async(req, res, next)=>{   
    var id = req.params.id
    var newUsername = req.body.username
    AccountModel.findByIdAndUpdate(id,{
        username : newUsername
    })
    .then(data=>{
        res.json('da update')
    })
    .catch(err=>{
        res.status(500).json('loi server')
    })
}
exports.deleteAccount = async (req, res, next)=>{
    var id = req.params.id
        AccountModel.deleteOne({
            _id: id 
        })
        .then(data=>{
            res.json('da xoa thanh cong')
        })
        .catch(err=>{
            res.status(500).json('loi server')
        })
}