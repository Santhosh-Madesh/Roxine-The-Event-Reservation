

const errorHandler = (error, req, res, next) =>{

    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server error!";

    return res.status(statusCode).json({
        success: false,
        message : message
    });

}

module.exports = errorHandler;