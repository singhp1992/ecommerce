const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'JWT_~secret*\\key'


function sign(userId) {
	return jwt.sign( { id: userId }, secret, { expiresIn: 60 * 60 * 3} )
}

function verify(token, callback) {
  jwt.verify(token, secret, callback)
}

module.exports = {
  sign,
  verify
}
