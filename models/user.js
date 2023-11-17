const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     firstName: {
               type: String,
               required: true
     },
     lastName: {
               type: String,
               required: true,
               unique: true
     },
     email: {
            type: String,
            required: true
     },
     mobileNumber: {
                   type: Number,
                   required: true
     },
     photo: {
      filename: { type: String, default: '1699383125517-1699349825560-1699342813711-backer.jpeg' },
      contentType: { type: String, default: 'image/jpeg' },
      description: { type: String, default: 'Default description' },
      url: { type: String, default: 'default-url' }
    },    
     password: {
               type: String,
               required: true
     },
     userType: {
                type: String,
                default: "guest"
     },
     isBlocked: {
                 type: Boolean,
                 default: false
     },
     isVerified: {
                 type: Boolean,
                 default: false
     },
     isAdmin: {
                 type: Boolean,
                 default: false
     }
   },
     {
      collection: 'userRegistration', 
     }
);


module.exports = mongoose.model("userRegistration",userSchema);
     
 
