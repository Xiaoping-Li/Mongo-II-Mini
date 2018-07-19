const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const months = ['january', 'December'];

const PersonSchema = new mongoose.Schema({
    password: {
      type: String,
      validate: passwordLengthValidator,
      msg: 'password too short'
    },
    firstName: {
      type: String,
      required: true,
      index: true, //new.will add index for firstname for searching
      lowercase: true
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, //creates an index automatically
    },
    friends: [],
    age: {
      type: Number,
      min: 0,
      max: 150
    },
    gender: String,
    location: String,
    dateOfBirth: Date,
    workDay: {
      type: String,
      match: /^(mon|tues|wednes|thur|fri)day$/i, 
      msg: "no work on weekends!", //new
    },
    months: {
      type: String,
      enum: months
    } // new
}, 
{ runSettersOnQuery: true } // new
);

//limit the longth of email address
// Custom Validators: return true or false

function passwordLengthValidator(password)  {
  return password.length >= 10;
}

//Virtuals
/*
//user.fullName
PersonSchema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.lastName}`;
})

PersonSchema.virtual('fullName').set(function(name){
  this.first = name.split(' ')[0];
  this.last = name.split(' ')[1];
});
*/

//two types of indexes: 
//-path level: index: true
//-schema level: used for compound indexes
/*
PersonSchema.index({firstName: 1, lastName: 1});
*/


/*
PersonSchema.pre('save', function(val) {
  //grab only the numbers using regex
  //based on country or the length choose a format
  //rewrite it to the format you want
  // return the formatted number
})
*/ 

/*
User.create({}, {}).then() //const user= new User() + user.save()
*/

module.exports = mongoose.model('Person', PersonSchema);
