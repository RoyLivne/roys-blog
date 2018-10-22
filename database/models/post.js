const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({

title:String,
subtitle:String,
description:String,

content:String,

author:{
type:mongoose.Schema.Types.ObjectId,
ref:'User',
required:true
},

createdAt:{

    type:Date,
    default:new Date()
},

image:String
})

const Post = mongoose.model('Post',PostSchema)

module.exports = Post