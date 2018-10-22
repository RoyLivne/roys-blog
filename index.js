require('dotenv').config();

const path = require('path')

const express = require('express')

const expressEdge = require('express-edge')

const edge = require('edge.js')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')

const createPostController = require('./controllers/CreatePost')

const homePageController = require('./controllers/HomePage')

const storePostController = require('./controllers/storePost')

const getPostController  = require('./controllers/getPost')

const createUserController = require('./controllers/createUser')

const storeUserController = require('./controllers/StoreUser')

const loginController = require('./controllers/login')

const loginUserController = require('./controllers/loginUser')

const cloudinary = require('cloudinary')

const auth = require('./Middleware/auth')

const connectFlash = require('connect-flash')

const expressSession = require('express-session')

const connectMongo = require('connect-mongo')

const validateCreatePostMiddleware = require('./Middleware/storePost')

const redirectIfAuthenticated = require('./Middleware/redirectIfAuthenticated')

const logoutController = require('./controllers/logout')

const mongoStore = connectMongo(expressSession)

const app = new express()

mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true })

app.use(express.static('public'))

app.use(expressEdge)

app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(connectFlash())
app.use(expressSession({
    secret:process.env.EXPRESS_SESSION_KEY,
    store:new mongoStore({
        mongooseConnection:mongoose.connection
    }),
    resave:true,
    saveUninitialized:true
}))

app.use('*',(req,res,next)=>{

    edge.global('auth',req.session.userId)
    next()
})

cloudinary.config({
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
   cloud_name:process.env.CLOUDINARY_API_NAME

})

app.get('/', homePageController)

app.get('/posts/new',auth,createPostController)

app.post('/posts/store',auth,validateCreatePostMiddleware,storePostController)

app.get('/about',(req,res)=>{

    res.render('about')
})

app.get('/post/:id', getPostController)

app.get('/auth/register',redirectIfAuthenticated,createUserController)

app.post('/users/register',redirectIfAuthenticated,storeUserController)

app.get('/auth/login',redirectIfAuthenticated,loginController)

app.post('/users/login',redirectIfAuthenticated,loginUserController)

app.get('/auth/logout',auth,logoutController)

app.use((req,res)=>{
res.render('notFound')

})

app.listen(process.env.PORT,()=>{

    console.log('App listening on port 4000')
})

