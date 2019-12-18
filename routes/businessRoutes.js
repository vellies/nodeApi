const express = require('express');
const router = express.Router();

const joiSchemaValidation = require('../middleware/joiSchemaValidation');
//const tokenValidation = require('../middleware/tokenValidation');
const businessController = require('../controller/businessController');

const businessSchema = require('../apiSchema/businessSchema');

module.exports = router;

router.post('/signin',
    joiSchemaValidation.validateBody(businessSchema.userLogIn), 
    businessController.UserSignIn
);