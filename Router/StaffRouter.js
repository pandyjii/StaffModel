
const express=require('express');
const StaffCOnteoller=require('../Controller/StaffController');

const router=express.Router();



router.get('/',StaffCOnteoller.getrequest)
router.post('/staff',StaffCOnteoller.CreateStaff);
router.get('/:id',StaffCOnteoller.getItemById);
router.put('/:id',StaffCOnteoller.UpdateStaffInfo);
router.get('/search/:key',StaffCOnteoller.searchStaffDetails);
router.delete('/:id',StaffCOnteoller.deleteStaffDetails);
exports.router=router;