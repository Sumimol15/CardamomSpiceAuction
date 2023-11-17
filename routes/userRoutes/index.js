const express = require('express');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public'); 
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'photo-' + uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
const router = express.Router();
const { registerUserCntrl, loginUserCntrl} = require('../../controller/userController/auth');
const { userProfileCntrl, updateProfileCntrl, updateProfilePasswordCntrl, userByIdCntrl } = require('../../controller/userController/userProfile');
const { registerCompanyCntrl, loginCompanyCntrl } = require('../../controller/userController/companyAuth');
const { companyProfileCntrl, updateCompanyProfileCntrl, updateCompanyPasswordCntrl } = require('../../controller/userController/companyProfile');
const { createSpice, updateSpiceById, getAllSpiceByType, getSpiceByCompanyName, getSpiceByCompanyBySellerId, futureSpice, expiredSpice, getSpiceByStartDate, getAllAuctionByCompanyNameAndDate, updateSpiceBid } = require('../../controller/userController/spiceData');
const { createAuction, updateAuction, getAllAuctionByCompanyName, getAuctionByProductId, getByBidderId } = require('../../controller/userController/auction');
const { setUserSession, getUserSession, isBlocked } = require('../../controller/userController/middleware/user');
const { setCompanySession, getCompanySession, isBlockedCompany } = require('../../controller/userController/middleware/company');
const {getAllSpice, getBySpiceId} = require('../../controller/adminController/spiceManagement')
const { getAllCompany}= require('../../controller/adminController/companyManagement');
const { getAllAuction } = require('../../controller/adminController/auctionManagement');
router.use(express.json());

    
//////////authenticationRoutes\\\\\\\\\\\\\\\\
router.post('/register/user', registerUserCntrl);
router.post('/register/company',  registerCompanyCntrl);
router.post('/login/user',setUserSession, isBlocked, loginUserCntrl);
router.post('/login/company', setCompanySession, isBlockedCompany, loginCompanyCntrl);

//////////profileRoutes\\\\\\\\\\\\\\\\
router.post('/userProfile', isBlocked, userProfileCntrl);
router.post('/userById',userByIdCntrl);
router.post('/companyProfile', companyProfileCntrl);
router.post('/userProfile/update', isBlocked, upload.single('photo'),updateProfileCntrl);
router.post('/userProfile/updatePassword', getUserSession, isBlocked, updateProfilePasswordCntrl);
router.post('/companyProfile/update', isBlockedCompany, upload.single('photo'), updateCompanyProfileCntrl);
router.post('/companyProfile/updatePassword', getCompanySession, isBlockedCompany, updateCompanyPasswordCntrl);
router.get('/company/getAll', getAllCompany);

//////////spiceRoutes\\\\\\\\\\\\\\\\
router.get('/spice/getByType', getAllSpiceByType);
router.post('/spice/getByCompanyName', getSpiceByCompanyName);
router.post('/spice/getBySellerId', getSpiceByCompanyBySellerId);
router.get('/spice/getByFutureSpice', futureSpice);
router.get('/spice/getByExpiredSpice', expiredSpice);
router.get('/spice/getByStartDate', getSpiceByStartDate);
router.post('/spice/create', upload.single('photo'),createSpice);
router.post('/spice/update', updateSpiceById);
router.get('/spice/getAll', getAllSpice);
router.get('/spice/getBySpiceId', getBySpiceId);
router.post('/spice/getAllByCompanyNameAndDate', getAllAuctionByCompanyNameAndDate);
router.post('/spice/bid', updateSpiceBid);

//////////auctionRoutes\\\\\\\\\\\\\\\\
router.post('/auction/getbyCompanyName', getAllAuctionByCompanyName);
router.get('/auction/getbyProductId', getAuctionByProductId);
router.post('/auction/getByBidderId', getByBidderId);
router.post('/auction/company/create', createAuction);
router.post('/auction/user/update', updateAuction);
router.get('/auction/getAll', getAllAuction);



module.exports = router;
