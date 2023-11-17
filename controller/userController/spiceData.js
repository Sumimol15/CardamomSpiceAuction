const Spice = require('../../models/spice');

const createSpice = async (req, res) => {
    try {
        if(!req.body) throw new Error('please fill all the input fields.');
        if(!req.body.name) throw new Error('please fill the name field.');
        if(!req.body.sellerId) throw new Error('there is an error in identifying the seller please try again later.');
        if(!req.body.weight) throw new Error('please fill the weight field.');
        if(!req.body.companyName) throw new Error('error in fetching the company name.');
        if(!req.body.auctionDate) throw new Error('please provide the auction date field.');
        if(!req.body.endTime) throw new Error('please provide the end time field');
        if(!req.body.minimumPrice) throw new Error('please provide the minimum price feild');
        const {
            name,
            sellerId,
            weight,
            companyName,
            auctionDate,
            endTime,
            minimumPrice,
            photo,
        } = req.body;

        const newSpice = new Spice({
            name,
            sellerId,
            weight,
            companyName,
            auctionDate,
            endTime,
            minimumPrice,
            photo: {
                filename: photo.filename,
                contentType: photo.contentType,
                description: photo.description,
                url: photo.url
            },
        });
        const newData = await newSpice.save();
        if(!newData) throw new Error('error in creating spice instance please wait and try again.');
        res.status(200).send({
            message: newSpice
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
}


const updateSpiceById = async (req, res) => {
    try {
        if(!req.body.id) throw new Error('error in getting id of the spice instance');
        const {
            id
        } = req.body;
        console.log(req.body);
        const newData = await Spice.findById(id);
        const isRejected = !newData.isRejected;
        const newSpice = await Spice.findByIdAndUpdate(id, {
            $set: {
              isRejected
            }
          });

        if(!newSpice) throw new Error('error in creating spice instance please wait and try again.');

        res.status(200).send({
            message: newSpice
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
}




const getAllSpiceByType = async (req, res) => {
    try {
        if(!req.body.spiceType) throw new Error('error in getting spice type from request');
        const {
            spiceType
        } = req.body;
        const spiceData = await Spice.find({spiceType: spiceType});
        if(!spiceData) throw new Error('error in getting spice data from data source');
        res.status(200).send({
            message: spiceData
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
};

const getSpiceByCompanyName = async (req, res) => {
    try {
        if(!req.body.companyName) throw new Error('error in getting company name from request');
        const {
            companyName
        } = req.body;

        const spiceData = await Spice.find({companyName: companyName});

        
        if(!spiceData) throw new Error('error in getting spice data');

        res.status(200).send({
            message: spiceData
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
}



const getAllAuctionByCompanyNameAndDate = async (req, res) => {
    try {
        if (!req.body.companyName) throw new Error('error in getting by company name');
        if (!req.body.auctionDate) throw new Error('error in getting auction date from request');
        if (!req.body.endTime) throw new Error('error in getting endTime from request');
        
        console.log('1');
        console.log(req.body);
        
        const { companyName, auctionDate, endTime } = req.body;
        const allSpices = await Spice.find({ companyName, auctionDate, endTime,isRejected:false });
        
        console.log('2');
        
        if (allSpices.length === 0) {
            res.status(200).send({
                message: []
            });
        } else {
            res.status(200).send({
                message: allSpices
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            error: err.message
        });
    }
};

const getSpiceByCompanyBySellerId = async (req, res) => {
    try {
        if(!req.body.sellerId) throw new Error('error in getting seller id from request');
        const {
            sellerId
        } = req.body;
        const spiceData = await Spice.find({sellerId: sellerId});
        if(!spiceData) throw new Error('error in getting spice data');
        res.status(200).send({
            message: spiceData
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
};

const futureSpice = async (req, res) => {
    try {
        const currentDate = new Date();
        const spiceData = await Spice.find({auctionDateDate: { $gt: currentDate}});
        if(!spiceData) throw new Error('error in getting spice data');
        res.status(200).send({
            message: spiceData
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
};

const expiredSpice = async (req, res) => {
    try {
        const currentDate = new Date();
        const spiceData = await Spice.find({auctionDateDate: { $lt: currentDate}});
        if(!spiceData) throw new Error('error in getting spice data');
        res.status(200).send({
            message: spiceData
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    };
};

const getSpiceByStartDate = async (req, res) => {
    try {
        if(!req.body.startDate) throw new Error(' error in getting start date');
        const {
            startDate
        } = req.body.startDate;
        const spiceData = await Spice.find({auctionDateDate: { $gt: startDate}});
        if(!spiceData) throw new Error('error in getting spice data');
        res.status(200).send({
            message: spiceData
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
};


const updateSpiceBid = async (req, res) => {
    try {
        const {
            holderId,
            bidPrice,
            spiceId,
            holderFirstName,
            holderLastName,
            holderMail,
            holderMobileNumber,
          } = req.body;
          const id = spiceId;
          const spice = await Spice.findByIdAndUpdate(id, {
            $set: {
                bidPrice,
                holderFirstName,
                holderLastName,
                holderMail,
                holderId,
                holderMobileNumber
            }
          },{ new: true });
          if(!spice) throw new Error('error in getting spice data');
          res.status(200).send({
            message: spice
          });
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    createSpice,
    updateSpiceById,
    getAllSpiceByType,
    getSpiceByCompanyName,
    getSpiceByCompanyBySellerId,
    futureSpice,
    expiredSpice,getAllAuctionByCompanyNameAndDate,
    getSpiceByStartDate,
    updateSpiceBid
}