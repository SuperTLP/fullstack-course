logger = require("./logger")

function errorHandler(error, request, response, next) {
    if (error.name==="ValidationError" || error.name==="JsonWebTokenError") {
        return response.status(400).json({"error": error.message})
    }
}

module.exports=errorHandler