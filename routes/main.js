const express=require('express');
const itemsController=require('../controllers/items');
const router=express.Router();

router.get('/', itemsController.getMainPage);
router.get('/secrets',itemsController.getAllSecrets);
router.get('/register',itemsController.getRegisterPage);
router.post('/register',itemsController.newRegisterUser);
router.get('/submit',itemsController.getSecret);
router.post('/submit',itemsController.newUserSecret);
router.get('/login',itemsController.getLoginPage);
router.post('/login',itemsController.newUserLogin);
router.get('/logout',itemsController.getLogout);

module.exports=router;