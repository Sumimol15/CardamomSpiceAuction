const bcrypt = require('bcrypt');
const Company = require('../../models/company');

const registerCompanyCntrl = async (req, res) => {
    try {
        if(!req.body) throw new Error('feilds are empty, please fill the feild and try again.');
        if(!req.body.companyName) throw new Error('name of the company is not provided');
        if(!req.body.registrationNumber) throw new Error('registration number is not provided');
        if(!req.body.phone) throw new Error('phone number is not provided');
        if(!req.body.state) throw new Error('state is not provided');
        if(!req.body.district) throw new Error('district is not provided');
        if(!req.body.locality) throw new Error('locality is not provided');
        if(!req.body.email) throw new Error('email is not provided');
        if(!req.body.password) throw new Error('password is not provided');
        const {
            companyName,
            registrationNumber,
            phone,
            state,
            district,
            locality,
            email,
            password,
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        if(!hashedPassword) throw new Error('password cause an issue please try again');
        const newCompany = new Company({
            companyName,
            registrationNumber,
            phone,
            state,
            district,
            locality,
            email,
            password:hashedPassword,
        })
        const savedData = await newCompany.save().catch((saveError) => {
            console.error('Error saving data to the database:', saveError);
            throw saveError; // Rethrow the error to be caught in the outer catch block.
        });
        
        console.log('5');
        res.status(200).send({
            message: savedData
        });

    } catch (err) {
        res.status(500).send({
            error: err.message
        });
    }
}

const loginCompanyCntrl = async (req, res) => {
    try {
        if(!req.body) throw new Error('please provide neccessary details');
        if(!req.body.companyName) throw new Error('companyName must be provided');
        if(!req.body.password) throw new Error('password must be provided');
        const {
            companyName,
            password
        } = req.body;
        console.log(req.body);
         console.log(1);
        const company = await Company.findOne({ companyName: companyName});
         console.log(2);
                console.log(company);
        if(!company) throw new Error('company name must be a valid one');
             console.log(3);
        const comparedPassword = bcrypt.compare(password, company.password);
                        console.log(comparedPassword);
                  console.log(4);
        if(!comparedPassword) throw new Error('password must be valid please try again');
                  console.log(5);
        res.status(200).send({
            message: 'authentication is successful'
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
}

module.exports = {
    registerCompanyCntrl,
    loginCompanyCntrl
}
