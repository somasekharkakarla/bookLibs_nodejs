const { json, query } = require('express');
var express = require('express');
const BookModel = require('../DBModels/BookModel');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* get books. */
router.get('/',validator, async function(req, res, next) {
    const user = req.user
    let books = []
    let filterObj = {}
     if(user.is_viewer && !user.is_viewAll){
        filterObj.createdBy = user.userName
     }
    if(!user.is_creator && (user.is_viewer || user.is_viewAll)){
    if(req.query.hasOwnProperty("old")){
        filterObj.createdOn =  { $lt : new Date(Date.now() - 10*60000).toISOString()}
         books = await BookModel.find(filterObj).sort({createdOn: -1}).limit(req.query.old)
    }else if(req.query.hasOwnProperty("new")){
        filterObj.createdOn =  { $gte : new Date(Date.now() - 10*60000).toISOString()}
        books = await BookModel.find(filterObj).sort({createdOn: -1}).limit(req.query.new)
    }else{
        books = await BookModel.find()
    }
    res.json(books)
}else{
    res.json({Err:"Creator not view books"})
}

});

/* update books */
router.put('/', validator, async function(req, res){
    const body = req.body
    const user = req.user
    if(user.is_creator){
       const book = await BookModel.findOneAndUpdate({title:body.title},{$set:{summary:body.summary}},{new: true})
       console.warn("update",book)
       if(book){
        res.json(book)
       }else{
        res.json({Err:"Unable to Edit"})
       }
    }else{
        res.json({Err:"Don't have access to edit"})
    }
})

/* create books */
router.post('/',validator, function(req, res, next) {
    console.log(req.body)
    const body = req.body
    const user = req.user
    BookModel.create({
        title: body.title,
        summary:body.summary,
        createdBy:user.userName,
        createdOn:Date.now()
    }, (err,book) =>{
        if(err){
            res.send('Err');
        }else{
            res.send(JSON.stringify(book));
        }
    })
  });

  /* delete book */
router.post('/delete',validator, async function(req, res, next) {
    const body = req.body
    const user = req.user
    if(user.is_creator){
        const book = await BookModel.findOneAndDelete({_id:body._id})
        if(book){
            res.json(book)
        }else{
            res.json({Err:"Unable to delete or Already deleted"})
        }
       
    }else{
        res.json({Err:'User does not have access to delete book'});
    }
   
  });

function validator(req, res, next){
    const token = req.headers.jwt
    console.log("token", token)
    if(token){
        jwt.verify(token,'shhhhh',(err, data) =>{
            if(err){
                res.json({"Err":"Invalid token"});
            }else{
                req.user = data;
                next()
            }
        })
    }else{
        res.json({"Err":"Token not found"});
    }
}  

module.exports = router;