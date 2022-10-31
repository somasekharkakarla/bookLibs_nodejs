var mongoose = require('mongoose');
var UserModel = require('./DBModels/UserModel');


module.exports = {
    connectToServer: function(isConnected) {
        mongoose.connect(process.env.MONGO_DB_HOST_URL, { useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
            console.log("DB connected")
            createUsers();
            isConnected(true)
        }).catch(err =>{ 
            isConnected(false)
        });
    },
  };

  function createUsers(){
    UserModel.insertMany([{
        name:"User1",
        userName: "User1@creator",
        is_creator:true
    },
    {
        name:"User2",
        userName: "User2@viewer",
        is_viewer:true
    },
    {
        name:"User3",
        userName: "User3@viewAll",
        is_viewAll:true
    }
])
  }
