

const StaffModel=require('../Model/StaffModel');

const Staff=StaffModel.Staff;




exports.CreateStaff=(req,res)=>{
    const staff=new Staff(req.body);

    res.send(staff);
    staff.save();
}

exports.getrequest= async(req,res)=>{
    const staff=await Staff.find({});
    res.send(staff)
}

exports.getItemById= async(req,res)=>{
    const id=req.params.id;
    const staff=await Staff.findById({_id:id})
    res.send(staff);
}

exports.UpdateStaffInfo=async(req,res)=>{
    const id=req.params.id;
    const staff=await Staff.updateOne({_id:id},
        
        {$set:req.body}
        )

        res.send(staff);
}

exports.searchStaffDetails= async(req,res)=>{
    const key=req.params.key;
    const staff= await Staff({
        
       "$or":[
            {firstname:{$rejex:key}},
            {lastname:{$rejex:key}}

        ]


    })

    res.send(staff);
}

exports.deleteStaffDetails= async(req,res)=>{
    let  id=req.params.id;
    const staff= await Staff.findOneAndDelete({_id:id});
    res.send(staff);
    
}