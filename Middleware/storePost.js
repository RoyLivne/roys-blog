module.exports = (req,res,next)=>{
    if(!req.files.image||!req.body.title||!req.body.subtitle||!req.body.description)
    {
    
        return res.redirect('/posts/new')
    }
    next()
    }