const crypto = require('crypto');

const generateToken = () => {
    
    const token = crypto.randomBytes(32).toString('base64');
    
    return token;
}


module.exports = generateToken