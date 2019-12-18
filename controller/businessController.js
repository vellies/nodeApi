const businessService = require('../service/businessService');
const constants = require('../constants');

var globalRes;
module.exports.UserSignIn =  async (req,res) => {
    globalRes = res;
    try {
        await businessService.UserSignIn(req.body,ProcessSignInResponse);
    }catch(error){
        console.log('Something went wrong: Controller : UserSignIn',error); 
    }
}

function ProcessSignInResponse(err, result,type) {
    let response = {...constants.defaultServerResponse};
    try {
            if(err){
                response.message = err.message;
            }else {
                const responseFromService =  result;
                if(type == 1)
                {
                    response.status = 202;
                    response.message = constants.UserMessage.USER_NOT_REGISTERD;
                }
                else if(type==2)
                {
                    response.status = 200;
                    response.message = constants.UserMessage.USER_LOGIN_MESSAGE;
                }
                else if(type==3)
                {
                    response.status = 203;
                    response.message = constants.UserMessage.USER_INVALID_MESSAGE;
                }
                else
                {
                    response.status = 201;
                    response.message = constants.UserMessage.USER_ACCESS_DENIED;
                }
                response.body = responseFromService;
            }
     }catch(error){
        console.log('Something went wrong: Controller : ProcessSignInResponse',error);
        response.message = error.message;       
     }
     return globalRes.status(response.status).send(response);
  }

