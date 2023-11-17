const Spice = require('../../models/spice');

const getAllSpice = async (req, res, next) => {
    try {
        const spices = await Spice.find();
        if(!spices) throw new Error('spice not found');
        res.status(200).send({
            message: spices
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

const getBySpiceId = async (req, res, next) => {
    try {
        if(!req.body.id) throw new Error('Error in getting company id');
        const spice = await Spice.findById(req.body.id);
        if(!spice) throw new Error('Spice not found');
        res.status(200).send({
            message: spice
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};


const blockOrUnblockSpice = async (req, res) => {
    try {
        if(!req.body.id) throw new Error('Error in getting Spice id');
        if(!req.body.bool) throw new Error('Error in getting true or false');
        const {
            id
        } = req.body;
        const updatedSpice = await Spice.findOneAndUpdate({_id:id},{
            $set:{
                isBlocked: bool
            }
        });
        if(!updatedSpice) throw new Error('Error in updating spice');
        res.status(200).send({
            message: updatedSpice
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

module.exports = {
    getAllSpice,
    getBySpiceId,
    blockOrUnblockSpice
}