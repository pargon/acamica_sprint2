const logger = (req, res, next) => {
    console.log(`request HTTP method: ${req.method}`);
    console.log(`request HTTP method path: ${req.path}`);
    
    next();
}

module.exports = logger;