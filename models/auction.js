const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    products: [{
        productId : {
             type: String,
            },
            bidderId: {
                type: String,
            },
            bidPrice: {
                type: Number,
            },
        }
    ],
    productId:{
         type: String,
    },
    currentPrice: {
        type: String,
      
    },
    currentAuctionHolder: {
        type: String,
    },
    startDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    bids: [
        {
            bidderId: {
                type: String,
            },
            bidPrice: {
                type: Number,
            },
            updatedAt: {
                type: mongoose.Schema.Types.Date,
            },
        }
    ],
    endDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    isBlocked: {
        type: Boolean
    },
    createdAt: {
        type: mongoose.Schema.Types.Date
    },
},
{
    collection: 'Auction'
})

module.exports = mongoose.model('Auction', auctionSchema );