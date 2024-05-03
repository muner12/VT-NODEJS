const experss = require('express')
const controller=require('../controller/controller')
const vaccanyController=require('../controller/vaccancyController')
const router = experss.Router()

router.post('/RegisterAuthor',controller.addAuther);
router.post('/AddPost',controller.addPost);
router.post('/AddComment',controller.addComment);
router.post('/AddLike',controller.addLike);
router.post('/AddShare',controller.addShare);
router.get('/Populate',controller.populate);
//submit application


router.post('/addApplicant',vaccanyController.addApplicants)
router.post('/addVaccancy',vaccanyController.addVaccancy)

router.post('/applyVaccancy',vaccanyController.submitApplication)
router.post('/findAllApplies',vaccanyController.findAllApplies)


module.exports=router