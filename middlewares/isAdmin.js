const { verifyToken } = require("../services/tokenService")

const isAdmin = (req, res, next) => {
    const auth = req?.headers?.authorization
    if (!auth) {
        res.status(401)
        return res.send({
            success: false,
            messages: ['Please provide a valid auth header']
        })
    }
    const token = auth.split(' ')
    const admin = verifyToken(token[token.length - 1])
    if (admin && admin.type === 'admin') {
        req.admin = admin
        return next()
    }
    res.status(401)
    return res.send({
        success: false,
        messages: ['You are not allowed to do so.']
    })
}

module.exports = isAdmin