const Auction = require('../../models/auction');

const getAllAuction = async (req, res, next) => {
    try {
        console.log('1');
        const auction = await Auction.find();
        console.log('1');
        if(!auction) throw new Error('auction not found');
        console.log('1');
        res.status(200).send({
            message: auction
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

const getByAuctionId = async (req, res, next) => {
    try {
        if(!req.body.id) throw new Error('Error in getting auction id');
        const auction = await Auction.findById(req.body.id);
        if(!auction) throw new Error('auction not found');
        res.status(200).send({
            message: auction
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};


const getBystartDate = async (req, res, next) => {
    try {
        if(!req.body.startDate) throw new Error('Error in getting auction start date');
        const {
            startDate
        } = req.body;
        const auction = await Auction.find({"startDate": startDate});
        if(!auction) throw new Error(`auction not found at date:${startDate}`);
        res.status(200).send({
            message: auction
        })
    } catch (error) {
            res.status(500).send({
                error: error.message
            });
    }
};







const blockOrUnblockAuction = async (req, res) => {
    try {
        if(!req.body.id) throw new Error('Error in getting auction id');
        if(!req.body.bool) throw new Error('Error in getting true or false');
        const {
            id
        } = req.body;
        const updatedAuction = await Auction.findOneAndUpdate({_id:id},{
            $set:{
                isBlocked: bool
            }
        });
        if(!updatedAuction) throw new Error('Error in updating auction');
        res.status(200).send({
            message: updatedAuction
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

module.exports = {
    getAllAuction,
    getByAuctionId,
    getBystartDate,
    blockOrUnblockAuction
}
