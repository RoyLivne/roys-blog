const mongoose = require('mongoose')

const bcrypt = require('bcrypt-nodejs')

const UserSchema = new mongoose.Schema({

username:{ 
    type:String,
    required:[true,'Please provide you username']
},

email:{
    type:String,
    required:[true,'Please provide your email'],
    unique:true
},
password:{
    type:String,
required:[true,'Please provide your password']
}

})


UserSchema.pre('save',function(next){

    const user = this

    bcrypt.genSalt(10, function(salt) {
        bcrypt.hash(user.password, salt, null, function(err, encrypted) {
            user.password = encrypted
    
    next()
        });
      });


    // bcrypt.hash(user.password,10,(error ,encrypted)=>{

    // user.password = encrypted
    
    // next()

    // })
})


module.exports = mongoose.model('User',UserSchema)