const express= require('express')
const app = express();
const dotenv = require('dotenv')
const passport = require('./config/passport')
const db = require('./config/ConnectDB')
const AccountC = require('./routers/accountRouter')
const login = require('./routers/loginRouter')
dotenv.config()
db()
const PORT = process.env.PORT||8080

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize())

app.use('/api/admin', login)
app.use('/api/account', AccountC)
app.listen(PORT, ()=>{
    console.log('cho')
})
