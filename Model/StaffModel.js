const mongoose =require('mongoose')
const client = new mongoose.Schema({code: Number, name: String, address: String, mobile: String, email: String});

exports.clientModel = new mongoose.model("Clients", client);
// export {clientModel};

const staffSchema = new mongoose.Schema({
    staffId:{
        unique:true,
        type: String,
        index: true,
        maxLength: 255,
        required:[true,'staffId is required']
    },
    firstName: {
        type: String,
        index: true,
        minLength:2,
        maxLength: 255,
        required:[true,' FirstName is required']
    },
    lastName: {
        type: String,
        index: true,
        minLength:2,
        maxLength: 255,
        required:[true,'LastName is required']
    },
    specialization: {
        type: String,
        maxLength: 50
    },
    isDoctor: {
        type: Boolean,
        default:false
    },
    age: {
        type: Number,
        min: 1,
        max: 100
    },
    birthday: {
        type: Date

    },
    gender: {
        type: String,
        maxLength: 10,
        required:true
    },
    mobile: {
        type: String,
        validate: {
          validator: function(v) {
            return /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      },
    countryCode:{
        type: String,
        default:'+91',
        maxLength: 10
      },
    whatsapp: {
        type: String,
        index: true
    },
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
          },
          message: props => `${props.value} is not a valid Email!`
        },
        required: [true, 'the Email id is required']
      },
    address:  {
        house:{
            type: String,
            maxLength: 255
        },
        street:{
            type: String,
            maxLength: 1000 
        },
        landmarks:{
            type: String,
            maxLength: 1000
        },
        city:{
            type: String,
            maxLength: 500
        },
        pincode:{
            type: String,
            maxLength: 50
        }
    },
    documentType:  {
        type: String,
        maxLength: 100
    },
    documentNumber:  {
        type: String,
        maxLength: 100
    },
    upiId:  {
        type: String,   
        maxLength: 100
    },
    bankName:  {
        type: String,
        maxLength: 100
    },
    accountName:  {
        type: String,
        maxLength: 255
    },
    accountNo:  {
        type: String,
        maxLength: 100
    },
    ifsc: {
        type: String,
        maxLength: 50
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    created: {
        on: {
            type: Date,
            default: Date.Now
        },
        by: {
            id: String,
            name: {
                type: String,
                maxLength: 255
            },
        }
    },
    modified: {
        on: {
            type: Date,
            default: Date.Now
        },
        by: {
            id: String,
            name: {
                type: String,
                maxLength: 255
            },
        }
    },
    profilePic: String,
    documents: [String],
    deleted: {
        type: Boolean,
        default:false
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
{versionKey:'1.1'})


// Create the user model
exports.Staff = new mongoose.model("Staff", staffSchema);
// export {Staff};
