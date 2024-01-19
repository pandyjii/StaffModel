
const express = require('express');
const StaffModel = require('../Model/StaffModel');
const { body, validationResult } = require('express-validator');
const Staff = StaffModel.Staff;
const router = express.Router();




// Email RegexValidation
const emailValidate = (v) => {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)) {
    return true;
  }
  throw new Error("Not a valid Email");
};

// mobile RegexValidation
const mobileRegex = (v) => {
  if (/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(v)) {
    return true;
  }
  throw new Error("Not a valid Phone no");
};

// Name RegexValidation
const startWith = (v) => {
  if (/^[a-zA-Z]+$/.test(v)) {
    return true;
  }
  throw new Error(" Name must be start with  alphabets");
};


//  validates 

const validates = (validations) => {
  return async (request, responce, next) => {
    for (let validation of validations) {
      const val = await validation.run(request);
      if (val.errors.length){
        break;
      }
       
    }

    const errors = validationResult(request);
    if (errors.isEmpty()) {
      return next();
    }

    responce.status(400).json({ errors: errors.array() });
  };
};



// Post request

router.post('/staff',
validates([
    body("staffId")
      .trim()
      .notEmpty()
      .withMessage("Staff ID is required")
      .escape()
      .isLength({ min:1, max: 255 })
      .withMessage("Staff ID must be at most 255 characters"),

    
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .escape()
      .isLength({min:2, max: 255 })
      .withMessage("First name must be required & at most 255 characters")
      .custom(startWith),

   
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last name is required")
      .escape()
      .isLength({ min:2, max: 255 })
      .withMessage("Last name  is required  ")
       .custom(startWith),

   
    body("specialization")
      .trim()
      .escape()
      .isLength({ max: 50 })
      .withMessage("Specialization must be 50 characters"),

  
    body("isDoctor")
      .isBoolean()
      .escape()
      .withMessage(" isDoctor is Only accepted boolean value"),

  
    body("age")
      .isInt({ min: 1, max: 100 })
      .escape()
      .withMessage("Age must be between 1 and 100 "),

    
    body("birthday")
      .isISO8601()
      .toDate()
      .withMessage("Invalid date format please use a ISO8601 format with string"),

    
    body("gender")
      .trim()
      .escape()
      .isLength({min:3, max: 10 })
      .withMessage("Gender must be min 3 characters"),

   
    body("mobile")
      .trim()
      .notEmpty()
      .withMessage("Mobile number is required")
      .escape()
      .isLength({ min: 10 })
      .withMessage("Mobile number is required Unique Each time")
      .isMobilePhone("any", { strictMode: false })
      .custom(mobileRegex),
  
    body("countryCode")
      .trim()
      .escape()
      .isLength({min:2, max: 10 })
      .withMessage("Country code must be at most 10 characters"),

   
    body("whatsapp")
      .trim()
      
      .isLength({ max: 255 })
      .withMessage("WhatsApp must be at most 255 characters"),

   
    body("email")
      .trim()
      .escape()
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ max: 100 })
      .withMessage("Email must be at most 100 characters")
      .custom(emailValidate),
    
    body("address.house")
      .trim()
      .escape()
      .isLength({ max: 255 })
      .withMessage("House must be at most 255 characters"),

    
    body("address.street")
      .trim()
      .escape()
      .isLength({ max: 1000 })
      .withMessage("Street must be at most 1000 characters"),

    
    body("address.landmarks")
      .trim()
      .escape()
      .isLength({ max: 1000 })
      .withMessage("Landmarks must be at most 1000 characters"),

   
    body("address.city")
      .trim()
      .escape()
      .isLength({ max: 500 })
      .withMessage("City must be at most 500 characters"),

    
    body("address.pincode")
      .trim()
      .escape()
      .isLength({ max: 50 })
      .withMessage("Pincode must be at most 50 characters"),

  
    body("documentType")
      .trim()
      .escape()
      .isLength({ max: 100 })
      .withMessage("Document type must be at most 100 characters"),

   
    body("documentNumber")
      .trim()
      .escape()
      .isLength({ max: 100 })
      .withMessage("Document number must be at most 100 characters"),

 
    body("upiId")
      .trim()
      .escape()
      .isLength({ max: 100 })
      .withMessage("UPI ID must be at most 100 characters"),

   
    body("bankName")
      .trim()
      .escape()
      .isLength({ max: 100 })
      .withMessage("Bank name must be at most 100 characters"),

   
    body("accountName")
      .trim()
      .escape()
      .isLength({ max: 255 })
      .withMessage("Account name must be at most 255 characters"),

   
    body("accountNo")
      .trim()
      .escape()
      .isLength({ max: 100 })
      .withMessage("Account number must be at most 100 characters"),

    
    body("ifsc")
      .trim()
      .escape()
      .isLength({ max: 50 })
      .withMessage("IFSC must be at most 50 characters"),

   
    body("isAdmin").isBoolean().withMessage(" isAdmin only accept boolean value"),

    
    body("created.on")
      .isISO8601()
      .toDate()
      .withMessage("Invalid date format please write in string format with ISO 8601 format  "),

    
    body("created.by.id")
      .trim()
      .escape()
      .isLength({ max: 255 })
      .withMessage("Created by ID must be at most 255 characters"),

 
    body("created.by.name")
      .trim()
      .escape()
      .isLength({ max: 255 })
      .withMessage("Created by name must be at most 255 characters"),

   
    body("modified.on")
      .isISO8601()
      .toDate()
      .withMessage("Invalid date format for modified.on"),

  
    body("modified.by.id")
      .trim()
      .escape()
      .isLength({ max: 255 })
      .withMessage("Invalid date format please write in string format with ISO 8601 format"),

   
    body("modified.by.name")
      .trim()
      .escape()
      .isLength({ max: 255 })
      .withMessage("Modified by name must be at most 255 characters"),


    body("profilePic").
    trim().
    escape(),

    body("documents").
    isArray()
    .escape()
    .withMessage("Documents  type must be array "),

    body("deleted")
    .isBoolean()
    .escape()
    .withMessage("Deleted value only return  boolean "),


    body("user")
    .isMongoId()
    .escape()
    .withMessage("Please write a valid user Id like mongoId"),
  ]),
  async (req, res) => {
    try {
      const staff = new Staff(req.body);
      await staff.save();
      res.status(200).json({ data: staff });
    } catch (errors) {
      console.error(errors);
      res.status(400).json({ errors: "Internal errors...!" });
    }
  }
);

// get Request 
router.get('/', async (req, res) => {

  const staff = await Staff.find({})
  res.send(staff);
})

// Put request
router.put('/:id', async (req, res) => {

  const id = req.params.id;
  const staff = await Staff.findOneAndUpdate({ _id: id },

    { $set: req.body }

  )
  res.send(staff);
})

// search 
router.get('/search/:key', async (req, res) => {
  const key = req.params.key;
  const staff = await Staff({
    "$or": [
      { firstName: { $rejex: key } },
      { lastName: { $rejex: key } }
    ]
  })
  res.send(staff);
})
// delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const staff = await Staff.findOneAndDelete({ _id: id });
  res.send(staff);
 
})

exports.router = router;





