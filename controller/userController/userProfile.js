const User = require('../../models/user');
const bcrypt = require('bcrypt');
const userProfileCntrl = async (req,res) => {
    try {
        if(!req.body.email) throw new Error('Please provide email of user');
        const {
            email
        } = req.body;
        const user = await User.findOne({ email: email});
        if(!user) throw new Error('User not found');
        res.status(200).send({
            message: user
        })
        
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

const userByIdCntrl = async (req,res) => {
    try {
        if(!req.body.sellerId) throw new Error('Please provide id of user');
        const {
            sellerId
        } = req.body;
 
        const user = await User.findOne({ _id: sellerId});
  
        if(!user) throw new Error('User not found');
        res.status(200).send({
            message: user
        })
        
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}




const updateProfileCntrl = async (req, res) => {
    try {
        if(!req.body) throw new Error('Please provide proper data of user');
        if(!req.body.email) throw new Error('Please provide email of user');

        const {
            firstName,
            lastName,
            email,
            mobileNumber,
            userType,
            photo
        } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            {
              $set: {
                firstName,
                lastName,
                mobileNumber,
                userType,
                photo: {
                    filename: photo.filename,
                    contentType: photo.contentType,
                    description: photo.description,
                    url: photo.url
                }
              },
            },
            { new: true }
          );

        if(!updatedUser) throw new Error('user updating errror please try again later');
        res.status(200).send({
            message: updatedUser
        })

    } catch (error) {
      res.status(500).send({
        error: error.message
      });
    }
}


const updateProfilePasswordCntrl = async (req, res) => {
    try {
        if(!req.body) throw new Error('Please provide proper data of user');
        if(!req.body.email) throw new Error('Please provide email of user');
        if(!req.body.currentPassword) throw new Error('Please provide password of user');
        if(!req.body.newPassword) throw new Error('Please provide new password of user');
        const {
            email,
            currentPassword,
            newPassword
        } = req.body;
        const user = await User.findOne({ email: email});
        if(!user) throw new Error('user not found please try later');
        const comparedPassword = await bcrypt.compare(currentPassword, user.password);

        if(!comparedPassword) throw new Error('the current password is incorrect, please  provide correct current password');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        if(!hashedPassword) throw new Error('password has an issue please try later.')
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            {
              $set: {
                password:hashedPassword
              },
            }
          );

        if(!updatedUser) throw new Error('user updating errror please try again later');
        res.status(200).send({
            message: updatedUser
        })

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

module.exports = {
    userProfileCntrl,
    updateProfileCntrl,
    updateProfilePasswordCntrl,
    userByIdCntrl
}