const mongoose = require('mongoose');

const spiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    spiceType: {
        type: String,
    },
    auctionDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    endTime: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    photo: {
        filename: { type: String, default: '1699383125517-1699349825560-1699342813711-backer.jpeg' },
        contentType: { type: String, default: 'image/jpeg' },
        description: { type: String, default: 'Default description' },
        url: { type: String, default: 'default-url' }
      },    
    quality: {
        colour: {
            type: String,
        },
        size: {
            type: Number,
        },
        grade: {
            type: String,
        }
    },
    bidPrice: {
        type: Number,
    },
    holderFirstName: { type: String},
    holderLastName: { type: String},
    holderMail: { type: String},
    holderMobileNumber: {type: String},
    minimumPrice: {
        type: Number,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isRejected: {
        type: Boolean,
        default: true
    }
},
{
    collection: 'spices'
});

module.exports = mongoose.model('Spices',spiceSchema);

