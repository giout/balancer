const CustomError = require("../utils/error.util.js")

const errorHandler = (err, req, res, next) => {
    console.log(err)
    
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }

    res.status(500).json({ msg: "Internal server error." })
}

module.exports = {
    errorHandler
}