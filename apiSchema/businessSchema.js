const Joi = require('joi');
//var email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
module.exports.userLogIn = Joi.object().keys({
    emailid : Joi.string().email().required(),
  // emailid : Joi.string().required().email({ minDomainAtoms: 2 }),
    // devicetype : Joi.string().required()
    // emailid: Joi.string().regex(email).required(),
    password : Joi.string().required()
}) ;
