const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    registrationNumber: {
        type: Number,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    photo: {
        filename: { type: String, default: '1699383125517-1699349825560-1699342813711-backer.jpeg' },
        contentType: { type: String, default: 'image/jpeg' },
        description: { type: String, default: 'Default description' },
        url: { type: String, default: 'default-url' }
      },    
   },
    {
        collection: 'companyRegistration'
    }
);


module.exports = mongoose.model('companyRegistration', companySchema);