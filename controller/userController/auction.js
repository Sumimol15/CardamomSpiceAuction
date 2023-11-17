const Auction = require('../../models/auction');

const createAuction = async (req, res) => {
    try {
        if(!req.body) throw new Error('you must provide required data or there cause an error please try again');
        if(!req.body.companyName) throw new Error('you must provide company name');
        if(!req.body.startDate) throw new Error('you must provide start date');
        if(!req.body.endDate) throw new Error('you must provide end date');
        const {
            companyName,
            startDate,
            endDate,
        } = req.body;
        console.log('1');
        const auction = new Auction({
            companyName,
            startDate,
            endDate,
            createdAt: new Date()
        });
        console.log('1');
        const dataListedInAuction = await auction.save();
        console.log('1');
        if(!dataListedInAuction) throw new Error('error in listong in the auction please try again..');
        res.status(200).send({
            message: dataListedInAuction
        });

    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};


const updateAuction = async (req, res) => {
    try {
      const {
        companyName,
        productId,
        bidderId,
        bidPrice,
        startDate,
        endDate,
      } = req.body;
  
      if (!companyName || !productId || !bidderId || !bidPrice || !startDate || !endDate) {
        throw new Error('All required data must be provided');
      }
  
      const auction = await Auction.findOne({ companyName, });
  
      if (!auction) {
        throw new Error('Auction not found');
      }
  
      const currentDate = new Date();
  
      if (currentDate < new Date(startDate)) {
        throw new Error(`Bid hasn't started yet. Please wait until ${startDate}`);
      }
  
      if (currentDate > new Date(endDate)) {
        throw new Error(`Bid has already ended. You cannot place a bid after ${endDate}`);
      }
      if(!auction.currentPrice) auction.currentPrice = bidPrice
      if(!auction.currentAuctionHolder) auction.currentAuctionHolder = bidderId
      if (bidPrice > auction.currentPrice) {
        auction.currentPrice = bidPrice;
      }

      auction.productId = productId;
      auction.bids.push({
        bidderId,
        bidPrice,
        updatedAt: new Date(),
      });
  
      const newBid = await auction.save();
  
      if (!newBid) {
        throw new Error('Error in updating the bid. Please try again');
      }
  
      res.status(200).send({
        message: newBid,
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  };
  
const getAllAuctionByCompanyName = async (req, res) => {
    try {
        if(!req.body.companyName) throw new Error('You must provide a company name');
        const {
            companyName
        } = req.body;
        console.log('1');
        const auction = await Auction.find({companyName: companyName});
        console.log('1',auction);
        if(!auction) throw new Error('Error in getting company data, please try again later');
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


const getAuctionByProductId = async (req, res) => {
    try {
        if(!req.body.productId) throw new Error('you must provide product id');
        const {
            productId
        } = req.body;
        const auction = new Auction.findAll({productId: productId});
        if(!auction) throw new Error('Error in getting company data, please try again later');
        res.status(200).send({
            message: auction
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

const getByBidderId = async (req, res) => {
  try {
      if (!req.body.bidderId) {
          throw new Error('You must provide a bidder id');
      }
      const { bidderId } = req.body;

      const auctions = await Auction.find({ "bids.bidderId": bidderId });



      res.status(200).send({
          message: auctions
      });
  } catch (error) {
      res.status(500).send({
        message: []
      });
  }
};





module.exports = {
    createAuction,
    updateAuction,
    getAllAuctionByCompanyName,
    getAuctionByProductId,
    getByBidderId,
}