const User = require('../../../models/user');
const setUserSession = async (req, res, next) => {
    try {
        req.session.email = req.body.email;
        if(!req.session.email) throw new Error('There is an error in your session,please try again');
        next()
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

const getUserSession = async (req, res, next) => {
    try {
        if(req.session.email !== req.body.email) throw new Error('There is an error in your session');
        next();
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

const isBlocked = async (req, res, next) => {
    try {
        if(!req.body.email) throw new Error('There is an issue in passing your email address');
        const user = await User.find({ email: req.body.email});
        if(user.isBlocked) throw new Error('access denied, user is blocked please contact the admin for rectification');
        next();
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

module.exports = {
    setUserSession,
    getUserSession,
    isBlocked
}