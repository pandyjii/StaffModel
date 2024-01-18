
const express=require('express');
const StaffModel=require('../Model/StaffModel');
const { body,validationResult } = require('express-validator');

const Staff=StaffModel.Staff;

const router=express.Router();

router.post('/staff',[
    body('firstName','FirstName is required').isLength({min:3}),
    body('lastName','lastname is required').isLength({min:3}),
    body('email','please enter a valid Email').isEmail({}),
    body('mobile','mobile no is required').isLength({min:10})
    
    ],(req,res)=>{
    
        const errors=validationResult(req);
        let staff=new Staff(req.body);
        if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
        }
       
        res.send(staff);
        staff.save();
    })

    router.get('/', async (req,res)=>{

        const staff= await Staff.find({})
        res.send(staff);
    })

  router.put('/:id', async (req,res)=>{

    const id=req.params.id;
    const staff= await Staff.findOneAndUpdate({_id:id},
        
       {$set:req.body}

        )
        res.send(staff);
  })

  router.get('/search/:key',async (req,res)=>{
    const key=req.params.key;
    const staff= await Staff({
        "$or":[
            {firstName:{$rejex:key}},
            {lastName:{$rejex:key}}
        ]
    })
    res.send(staff);
  })

  router.delete('/:id', async (req,res)=>{
    const id=req.params.id;
    const staff= await Staff.findOneAndDelete({_id:id});
    res.send(staff);
    // staff.save();
  })
    





exports.router=router;