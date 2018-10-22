const User = require('../database/models/user')

module.exports = (req,res,next)=>{


    if(req.session.userId)
    {
    
        return req.redirect('/')

    }
    
    next()
}
