var express = require('express');
const UserModel = require('../DBModels/UserModel');
var router = express.Router();
var jwt = require('jsonwebtoken');


/* GET users listing. */
router.post('/', async function(req, res, next) {
  const body = req.body
  if(body){
    const user = await UserModel.findOne({userName:body.userName})
    if(user){
    var token = jwt.sign(JSON.stringify(user), 'shhhhh');
    delete user.userName
    res.json({"token":token, "user": user})
    }else{
      res.json({"Err":"User not found"})
    }
  }else{
    res.json({"Err":"Empty body"})
  }
});

module.exports = router;
