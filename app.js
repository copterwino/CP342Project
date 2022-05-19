var express = require("express");
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var jwt = require('jsonwebtoken');
const moment = require('moment');

var User = require('./models/user');
var Slide = require('./models/slide')
var Hall = require('./models/hall')
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
    let concert = Concert.find({ conDate: { $gte: new Date() } });
    let slide = Slide.find({ slideEXPDate: { $gte: new Date() } });
    Promise.all([concert,slide]).then(result => {
        res.render("index", {
            data: result[0],
            slide:result[1],
            moment: moment
        });
    }).catch(err => {
        //handle your error here
        console.log('Failed to retrieve the Concert List: ' + err);
    })
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

//Management page
app.get('/manage', function (req, res) {
    res.render('manage');
});
//Slides page
app.get('/slide', function (req, res) {
    Slide.find((err, docs) => {
        if (!err) {
            res.render("slide", {
                data: docs,
                moment: moment
            });
        } else {
            console.log('Failed to retrieve the Slide List: ' + err);
        }
    });
});
//Insert slide
app.post('/api/insertSlide', async (req, res) => {
    var {
        slideUploadDate,
        slideEXPDate,
        slideImage
    } = req.body;
    try {
        var responese = await Slide.create({
            slideUploadDate,
            slideEXPDate,
            slideImage
        })
        console.log('Inserted successfully: ', responese);
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';)' })
        throw error
    }
    res.json({ status: 'ok' });
});
//Delete hall
app.post('/api/deleteSlide', async (req, res) => {
    var {
        slideID
    } = req.body;
    try {
        var responese = await Slide.remove({
            _id: { $eq: slideID }
        })
        console.log('Remove successfully: ', responese);
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';)' })
        throw error
    }
    res.json({ status: 'ok' });
});
//Hall page
app.get('/hall', function (req, res) {
    Hall.find((err, docs) => {
        if (!err) {
            res.render("hall", {
                data: docs,
                moment: moment
            });
        } else {
            console.log('Failed to retrieve the Hall List: ' + err);
        }
    });
});
//Insert hall
app.post('/api/insertHall', async (req, res) => {
    var {
        hallName,
        hallImage
    } = req.body;
    if (!hallName || typeof hallName !== 'string') {
        return res.json({ status: 'error', error: 'Invalid concert name' })
    }
    try {
        var responese = await Hall.create({
            hallName,
            hallImage
        })
        console.log('Inserted successfully: ', responese);
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';)' })
        throw error
    }
    res.json({ status: 'ok' });
});
//Delete hall
app.post('/api/deleteHall', async (req, res) => {
    var {
        hallID
    } = req.body;
    try {
        var responese = await Hall.remove({
            _id: { $eq: hallID }
        })
        console.log('Remove successfully: ', responese);
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';)' })
        throw error
    }
    res.json({ status: 'ok' });
});
//Concert page
app.get('/concert', function (req, res) {
    Concert.find({ conDate: { $gte: new Date() } }, (err, docs) => {
        if (!err) {
            res.render("concert", {
                data: docs,
                moment: moment
            });
        } else {
            console.log('Failed to retrieve the Concert List: ' + err);
        }
    });
});
//InsertCon page
app.get('/insertCon', function (req, res) {
    res.render('insertCon', { moment: moment });
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
        console.log('Inserted successfully: ', responese);
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';)' })
        throw error
    }
    res.json({ status: 'ok' });
});
//Edit concert
app.post('/api/editConcert', async (req, res) => {
    var {
        conID,
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
        var responese = await Concert.updateOne({ _id: conID }, {
            conName,
            artistName,
            conDate,
            conTime,
            conDescription,
            conPoster
        })
        console.log('Concert edited successfully: ', responese);
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';)' })
        throw error
    }
    res.json({ status: 'ok' });
});
//Delete concert
app.post('/api/deleteConcert', async (req, res) => {
    var {
        conID
    } = req.body;
    console.log(conID);
    try {
        var responese = await Concert.remove({
            _id: { $eq: conID }
        })
        console.log('Remove successfully: ', responese);
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