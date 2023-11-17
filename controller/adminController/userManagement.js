const User = require('../../models/user');


const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find();
        if(!user) throw new Error('users not found');
        res.status(200).send({
            message: user
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

const getByFistName = async (req, res, next) => {
    try {
        if(!req.body.firstname) throw new Error('please fill the first name feild');
        const users = await User.find({firstname:req.body.firstname});
        if(!users) throw new Error(`users not found with this fist name: ${req.body.firstname}`);
        res.status(200).send({
            message: users
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

const getByLastName = async (req, res, next) => {
    try {
        if(!req.body.lastname) throw new Error('please fill the last name feild');
        const users = await User.find({lastname:req.body.lastname});
        if(!users) throw new Error(`users not found with this last name: ${req.body.lastname}`);
        res.status(200).send({
            message: users
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

const getByFullName = async (req,res) => {
    try {
        if(!req.body.firstname) throw new Error('please fill the first name feild');
        if(!req.body.lastname) throw new Error('please fill the last name feild');
        const users = await User.find({firstname:req.body.firstname,lastname:req.body.lastname});
        if(!users) throw new Error(`users not found with this last name: ${req.body.lastname}`);
        res.status(200).send({
            message: users
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}


const blockOrUnblockUser = async (req, res) => {
    try {
        if(!req.body.id) throw new Error('Error in getting user id');
        if(!req.body.bool) throw new Error('Error in getting true or false');
        const {
            id
        } = req.body;
        const updatedUser = await User.findOneAndUpdate({_id:id},{
            $set:{
                isBlocked: bool
            }
        });
        if(!updatedUser) throw new Error('Error in updating user');
        res.status(200).send({
            message: updatedUser
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

const createOrRemoveAdmin = async (req, res) => {
    try {
        if(!req.body.id) throw new Error('Error in getting user id');
        if(!req.body.bool) throw new Error('Error in getting true or false');
        const {
            id
        } = req.body;
        const updatedUser = await User.findOneAndUpdate({_id:id},{
            $set:{
                isAdmin: bool
            }
        });
        if(!updatedUser) throw new Error('Error in updating user');
        res.status(200).send({
            message: updatedUser
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};


const verifyOrUnverifyUser = async (req, res) => {
    try {
        if(!req.body.id) throw new Error('Error in getting user id');
        if(!req.body.bool) throw new Error('Error in getting true or false');
        const {
            id
        } = req.body;
        const updatedUser = await User.findOneAndUpdate({_id:id},{
            $set:{
                isVerified: bool
            }
        });
        if(!updatedUser) throw new Error('Error in updating user');
        res.status(200).send({
            message: updatedUser
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};


module.exports = {
    getAllUser,
    getByFistName,
    getByLastName,
    getByFullName,
    blockOrUnblockUser,
    createOrRemoveAdmin,
    verifyOrUnverifyUser
}