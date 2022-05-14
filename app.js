var express = require("express");
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var User = require('./models/user');
var Concert = require('./models/concert')
var JWT_SECRET = '$!fgasf(^*&(gl@$fdaf*&%UTRgfadgsagaewae@$@(^*&(^fsa!#$!%@$&^';


var app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '/contents')));
app.use('/public', express.static(path.join(__dirname, '/scripts')));
app.use(session({
    username: '',
    secret: 'node js mongodb',
    resave: true,
    saveUninitialized: true,
}));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

//Connect to 'CP342Project' database
const mongoURI = "mongodb://localhost:27017/CP342Project"
mongoose.connect(mongoURI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    userCreateIndex: true
};

//Index page
app.get('/', function (req, res) {
    res.render('index');
});
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});

//Login form
app.get('/login', function (req, res) {
    res.render('login');
});
app.post('/api/login', async (req, res) => {
    //Get username and password.
    var { username, password } = req.body;
    //Find username in database.
    var user = await User.findOne({ username }).lean();
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username or password.' });
    }
    if (await bcrypt.compare(password, user.password)) {
        var token = jwt.sign({
            id: user._id,
            username: user.username
        },
            JWT_SECRET
        );
        req.session.username = username;
        return res.json({ status: 'ok', data: token });
    }
    res.json({ status: 'error', error: 'Invalid username or password.' });

});
app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

//Register form
app.get('/register', function (req, res) {
    res.render('register');
});
app.post("/api/register", async (req, res) => {
    //Get information.
    var {
        username,
        password: plainTextPassword,
        password_re: plainTextPasswordre,
        email: plainTextEmail,
        address: plainTextAddress,
        phone: plainTextPhone
    } = req.body;
    //Check if phone is contain only number
    let phoneIsNum = /^\d+$/.test(plainTextPhone);
    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username.' });
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password.' });
    }
    if (plainTextPassword.length < 4) {
        return res.json({
            status: 'error',
            error: 'Password must be at least 5 characters.'
        });
    }
    if (plainTextPassword !== plainTextPasswordre) {
        return res.json({
            status: 'error',
            error: 'Confirm password do not match.'
        });
    }
    if ((plainTextPhone.length !== 10) || (!plainTextPhone)) {
        return res.json({
            status: 'error',
            error: 'Invalid phone number.'
        });
    }
    //Hashing data
    var password = await bcrypt.hash(plainTextPassword, 10);
    var email = await bcrypt.hash(plainTextEmail, 10);
    var address = await bcrypt.hash(plainTextAddress, 10);
    var phone = await bcrypt.hash(plainTextPhone, 10);
    try {
        var responese = await User.create({
            username,
            password,
            email,
            address,
            phone
        })
        console.log('User created successfully: ', responese);
    } catch (error) {
        // duplicate key
        if (error.keyPattern.username == 1 && error.code == 11000) {
            return res.json({ status: 'error', error: 'This username is already in use.' })
        }
        if (error.keyPattern.email == 1 && error.code == 11000) {
            return res.json({ status: 'error', error: 'This email is already in use.' })
        }
        throw error
    }
    res.json({ status: 'ok' });
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

//Management page
app.get('/manage', function (req, res) {
    res.render('manage');
});

//Concert page
app.get('/concert', function (req, res) {
    res.render('concert')
});
app.post('/api/insertConcert', async (req, res) => {
    var {
        conName,
        artistName,
        conDate,
        conTime,
        conDescription,
        conPoster
    } = req.body;
    if (!conName || typeof conName !== 'string') {
        return res.json({ status: 'error', error: 'Invalid concert name' })
    }
    if (!artistName || typeof artistName !== 'string') {
        return res.json({ status: 'error', error: 'Invalid artist name' })
    }
    try {
        var responese = await Concert.create({
            conName,
            artistName,
            conDate,
            conTime,
            conDescription, 
            conPoster
        })
        console.log('User created successfully: ', responese);
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';)' })
        throw error
    }
    res.json({ status: 'ok' });
});

//Order page
app.get('/order', function (req, res) {
    res.render('order');
});

var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log("Server is running on port : " + port);
});