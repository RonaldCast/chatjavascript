 const mongoose = require('mongoose');
 const {Schema} = mongoose

 const chatSchema = new Schema({
     nickname: String, 
     msg: String,
     create_at: {
         type: Date,
         default: Date.now
     }
 })

 module.exports = mongoose.model('chat', chatSchema)