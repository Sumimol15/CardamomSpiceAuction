const bcrypt = require('bcrypt');
const Company = require('../../models/company');


const companyProfileCntrl = async (req, res) => {
    try {
        if(!req.body.companyName) throw new Error('companyName must be provided');
        const {
            companyName
        } = req.body;
        const company = await Company.find({companyName: companyName});
        console.log('1');
        if(!company) throw new Error('company data is not available please try again');
        console.log('2');
        console.log(company);
        res.status(200).send({
            message: company
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

const updateCompanyProfileCntrl = async (req, res) => {
    try {
        if(!req.body) throw new Error('company data is not provided please try again');
        if(!req.body.companyName) throw new Error('companyName must be provided');
        if(!req.body.registrationNumber) throw new Error('registrationNumber must be provided');
        if(!req.body.phone) throw new Error('phone must be provided');
        if(!req.body.state) throw new Error('state must be provided');
        if(!req.body.district) throw new Error('district must be provided');
        if(!req.body.locality) throw new Error('locality is not provided');
        if(!req.body.email) throw new Error('email must be provided properly');
        const {
            companyName,
            registrationNumber,
            phone,
            state,
            district,
            locality,
            email,
            photo
        } = req.body;
        console.log('1',req.body);
        const company = await Company.findOneAndUpdate(
            {companyName: companyName},
            {
                $set: {
                    companyName,
                    registrationNumber,
                    phone,
                    state,
                    district,
                    locality,
                    email,
                    photo: {
                        filename: photo.filename,
                        contentType: photo.contentType,
                        description: photo.description,
                        url: photo.url
                    }
                }
            });
            console.log('1');

            if(!company) throw new Error('there is an error in updating the company please try again');
            console.log('1');
            res.status(200).send({
                message: company
            })
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
}


const updateCompanyPasswordCntrl = async (req, res) => {
    try {
        if(!req.body.companyName) throw new Error('company name is required');
        if(!req.body.currentPassword) throw new Error('current password is required');
        if(!req.body.newPassword) throw new Error('new password is required');
        const company = await Company.findOne({companyName: companyName})
        if(!company) throw new Error('company not found');
        const comparedPassword = await bcrypt.compare(currentPassword, company.password);
        if(!comparedPassword) throw new Error('password mismatch occur please provide a valid current password');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        if(!hashedPassword) throw new Error('password encryption cause an issue please try again');
        const updatedData = await Company.findOneAndUpdate({
            companyName: companyName
        },{
            $set: {
                password: password
            }
        });

        if(!updatedData) throw new Error('updating password failed, can you please try again later');
        res.status(200).send({
            message: updatedData
        });
    } catch (error) {
        throw new Error({
            error: error.message
        })
    }
}
module.exports = {
    companyProfileCntrl,
    updateCompanyProfileCntrl,
    updateCompanyPasswordCntrl
}