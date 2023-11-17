const Company = require('../../models/company');


const getAllCompany = async (req, res, next) => {
    try {
        const company = await Company.find();
        if(!company) throw new Error('companys not found');
        res.status(200).send({
            message: company
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

const getById = async (req, res, next) => {
    try {
        if(!req.body.id) throw new Error('Error in getting company id');
        const company = await Company.findById(req.body.id);
        if(!company) throw new Error('company not found');
        res.status(200).send({
            message: company
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};


const getByCompanyName = async (req, res, next) => {
    try {
        if(!req.body.companyName) throw new Error('please fill the company name feild');
        const company = await Company.find({companyName:req.body.companyName});
        if(!company) throw new Error(`users not found with this fist name: ${req.body.companyName}`);
        res.status(200).send({
            message: company
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

const getByRegistrationNumber = async (req, res, next) => {
    try {
        if(!req.body.registrationNumber) throw new Error('please fill the registration number feild');
        const company = await Company.find({registrationNumber:req.body.registrationNumber});
        if(!company) throw new Error(`company not found with this registration number: ${req.body.registrationNumber}`);
        res.status(200).send({
            message: company
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

const getByState = async (req, res, next) => {
    try {
        if(!req.body.state) throw new Error('please fill the state feild');
        const company = await Company.find({state:req.body.state});
        if(!company) throw new Error(`company not found with this state: ${req.body.state}`);
        res.status(200).send({
            message: company
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

const getByStateAndDistrict = async (req, res, next) => {
    try {
        if(!req.body.state) throw new Error('please fill the state feild');
        if(!req.body.district) throw new Error('please fill the district feild');
        const company = await Company.find({state:req.body.state,district:req.body.district});
        if(!company) throw new Error(`company not found with this state witha district: ${req.body.district}`);
        res.status(200).send({
            message: company
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

const blockOrUnblockCompany = async (req, res) => {
    try {
        if(!req.body.id) throw new Error('Error in getting company id');
        if(!req.body.bool) throw new Error('Error in getting true or false');
        const {
            id
        } = req.body;
        const updatedCompany = await Company.findOneAndUpdate({_id:id},{
            $set:{
                isBlocked: bool
            }
        });
        if(!updatedCompany) throw new Error('Error in updating company');
        res.status(200).send({
            message: updatedCompany
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};


module.exports = {
    getById,
    getAllCompany,
    getByCompanyName,
    getByRegistrationNumber,
    getByState,
    getByStateAndDistrict,
    blockOrUnblockCompany
}