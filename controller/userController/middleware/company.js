const Company = require('../../../models/company');
const setCompanySession = async (req, res, next) => {
    try {
        req.session.companyName = req.body.companyName;
        if(!req.session.companyName) throw new Error('There is an error in your session,please try again');
        next()
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

const getCompanySession = async (req, res, next) => {
    try {

        if(req.session.companyName !== req.body.companyName) throw new Error('There is an error in your session');

        next();
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

const isBlockedCompany = async (req, res, next) => {
    try {
        if(!req.body.companyName) throw new Error('There is an issue in passing your company name');
        const company = await Company.find({ companyName: req.body.companyName});
        if(company.isBlocked) throw new Error('access denied, company is blocked please contact the admin for rectification');
        console.log('2');
        next();
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

module.exports = {
    setCompanySession,
    getCompanySession,
    isBlockedCompany
}