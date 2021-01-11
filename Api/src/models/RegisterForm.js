const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const registerFormSchema = new Schema
  (
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      address: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      imagen : {type: String , default:"https://cdn.xl.thumbs.canstockphoto.es/-eps-vectorial_csp42561989.jpg"}
    },
    {
      timestamps: true,
    }
  );

/* {
  "firstName":"Christian",
  "lastName":"Martín",
  "email":"christian@gmail.com",
  "password":"1234",
  "address":"cristo de la victoria",
  "phoneNumber":"666666666"
} */

const RegisterForm = mongoose.model('RegisterForm', registerFormSchema);
module.exports = RegisterForm;


