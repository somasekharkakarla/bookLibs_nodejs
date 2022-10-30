var mongoose = require('mongoose');
const UserModel = require('./DBModels/UserModel');



module.exports = {
    connectToServer: function(isConnected) {
        mongoose.connect(process.env.MONGO_DB_HOST_URL, { useNewUrlParser: true}).then(() =>{
            console.log("DB connected")
          //  createUsers();
            isConnected(true)
        }).catch(err =>{ 
            isConnected(false)
            console.log(err)
        });
    },
  };

  function createUsers(){
    userSchema.insertMany([{
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
