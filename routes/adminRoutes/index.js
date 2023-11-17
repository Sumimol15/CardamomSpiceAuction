const express = require('express');
const router = express();
const { getAllUser, getByFistName, getByFullName, getByLastName, blockOrUnblockUser, createOrRemoveAdmin, verifyOrUnverifyUser } = require('../.../../../controller/adminController/userManagement');
const { getAllCompany, getByCompanyName, getByRegistrationNumber, getByState, getByStateAndDistrict, blockOrUnblockCompany, getById } = require('../../controller/adminController/companyManagement');
const { getAllSpice, getBySpiceId, blockOrUnblockSpice } = require('../../controller/adminController/spiceManagement');
const { getAllAuction, getByAuctionId, blockOrUnblockAuction, getBystartDate } = require('../../controller/adminController/auctionManagement');

router.use(express.json());

/////////////userManagement\\\\\\\\\\\\\\\\
router.get('/user/getAll', getAllUser);
router.get('/user/getByFistName', getByFistName);
router.get('/user/getByLastName', getByLastName);
router.get('/user/getByFullName', getByFullName);
router.get('/user/blockOrUnblock', blockOrUnblockUser);
router.get('/user/createOrRemoveAdmin', createOrRemoveAdmin);
router.get('/user/verifyOrUnverifyUser', verifyOrUnverifyUser);


/////////////companyManagement\\\\\\\\\\\\\\\\
router.get('/company/getById', getById);
router.get('/company/getAll', getAllCompany);
router.get('/company/getByCompanyName', getByCompanyName);
router.get('/company/getByRegistrationNumber', getByRegistrationNumber);
router.get('/company/getByState', getByState);
router.get('/company/getByStateAndDistrict', getByStateAndDistrict);
router.post('/company/blockOrUnblockCompany', blockOrUnblockCompany);


/////////////spiceManagement\\\\\\\\\\\\\\\\
router.get('/spice/getAll', getAllSpice);
router.get('/spice/getBySpiceId', getBySpiceId);
router.get('/spice/blockOrUnblockSpice', blockOrUnblockSpice);


/////////////auctionManagement\\\\\\\\\\\\\\\\
router.get('/auction/getAll', getAllAuction);
router.get('/auction/getByAuctionId', getByAuctionId);
router.get('/auction/getByStartDate', getBystartDate);
router.post('/auction/blockOrUnblockAuction', blockOrUnblockAuction);


module.exports = router;