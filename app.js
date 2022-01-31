const express = require('express')
const session = require('express-session')
const ejs = require('ejs')
const bcrypt = require('bcrypt')
const db = require("./db")
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const cokkieSession = require('cookie-session')


//Import and config env file
require('dotenv').config()

const PORT = process.env.PORT || 5000

//db
db.connect((error) => {
    if (error) {
        console.log("DATABASE connection err:\n", error);
    }
    else {
        console.log("DATABASE connected..........");
    }
});


//Create and configure express server
const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(cokkieSession({
    maxAge: 1000 * 60 * 60 * 24 * 30,
    keys: [process.env.keys]
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



//Passport setup
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    db.query("select * from users where username = ?", [username], (err, rows) => {
        done(err, rows);
    });
});

passport.use('local', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true //passback entire req to call back
    },
    (req, username, password, done) => {

        db.query('select * from users where username = ?', [username], (err, rows) => {
            console.log(err)
            console.log("Rows: ", rows[0])

            if (err) return done({ 'message': err })
            if (!rows.length) return done(null, false)

            let DBpassword = rows[0].hash_pass;
            bcrypt.compare(password, DBpassword, (err, res) => {
                if (err) {
                    console.log(err)
                    return done({ 'message': err })
                }

                if (!res) {
                    return done(null, false)
                }

                return done(null, rows[0]);
            })
        })
    }
))


//middlewares
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/')
}

function isDuplicateUsername(req, res, next) {
    let username = req.body.username;
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
        console.log(rows)
        if (err) {
            console.log("DB err: ", err)
            res.redirect('/register?err=server')
        }
        else if (rows.length) {
            console.log("duplicate err: ", rows)
            res.redirect('/register?err=duplicate-username')
        }
        else
            return next();
    })
}

//Homepage
app.route('/')
    .get(isLoggedIn, (req, res) => {
        res.render('home', { 'loggedIn': req.isAuthenticated() })
    })

    
//Login
app.route('/login')
    .get(isLoggedOut, (req, res) => {
        res.render('login', { 'loggedIn': req.isAuthenticated(), 'message': (req.query) ? req.query : null })
    })
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?err=true'
    }))


//Register
app.route('/register')
    .get(isLoggedOut, (req, res) => {
        res.render('register', { 'loggedIn': req.isAuthenticated(), 'message': (req.query) ? req.query : null })
    })
    .post(isDuplicateUsername, (req, res) => {
        let { name, username, password } = req.body;
        console.log(name)
        console.log(username)
        console.log(password)

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.log("bcrypt err: ", err)
                res.redirect('/register?err=server')
            }
            else {
                db.query('INSERT INTO users SET ?',{username : username,  hash_pass : hash, name : name},(err) => {
                    if (err) {
                        console.log("DB err: ", err)
                        res.redirect('/register?err=server')
                    }
                    else {
                        console.log("SUCCESS")
                        let bp_table = username + "_bp";
                        let sugar_table = username + "_sugar";
                        db.query(`CREATE TABLE ${bp_table}(time_stamp varchar(256) PRIMARY KEY,bp_high INT,bp_low INT, medicine VARCHAR(256))`, (err) => {
                            if (err) {
                                console.log("DB err: ", err)
                                res.redirect('/register?err=server')
                            }
                            else{
                                console.log("Created table for bp");
                                db.query(`CREATE TABLE ${sugar_table}(time_stamp varchar(256) PRIMARY KEY,sugar INT, medicine VARCHAR(256))`, (err) => {
                                    if (err) {
                                        console.log("DB err: ", err)
                                        res.redirect('/register?err=server')
                                    }
                                    else{
                                        console.log("Created table for bp");
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

        //If everything runs successfully, Redirect user to the login page
        res.redirect('/login')
    })

//logout
app.get('/logout', isLoggedIn, (req, res) => {
    req.logout()

    res.redirect('/')
})

//Stats
app.get("/bp_stats", isLoggedIn, (req, res) => {
    let user = req.user[0].username;
    console.log(user);
    if(!user){
        res.send({'status': -1});
    }
    else{
        let bp_table = user + "_bp";
        db.query(`SELECT * FROM ${bp_table}`, (err, rows) => {
            if(err){
                console.log(err)
                res.send({'status': -1});
            }
            else{
                console.log(rows);
                res.send({'status': 1, 'body': rows});
            }
        })
    }
})
app.get("/sugar_stats", isLoggedIn, (req, res) => {
    let user = req.user[0].username;
    console.log(user);
    if(!user){
        res.send({'status': -1});
    }
    else{
        let sugar_table = user + "_sugar";
        db.query(`SELECT * FROM ${sugar_table}`, (err, rows) => {
            if(err){
                console.log(err)
                res.send({'status': -1});
            }
            else{
                console.log(rows);
                res.send({'status': 1, 'body': rows});
            }
        })
    }
});

//Add data
app.post('/bp_update', (req,res) => {
    let user = req.user[0].username;
    console.log(user);
    if(!user){
        res.send({'status': -1});
    }
    else{

        let bp_low = req.body.bp_low;
        let bp_high = req.body.bp_high;
        let bp_table = user + "_bp";
        let timestamp = new Date();

        db.query(`SELECT bp_med FROM users WHERE username="${user}"`, (err, rows) => {
            if(err){
                console.log(err);
                res.send({'status': -1});
            }
            else if(rows.length == 0){
                console.log("No data found");
                res.send({'status': -1})
            }
            else{
                db.query(`INSERT INTO ${bp_table} VALUES ("${timestamp}", ${bp_low}, ${bp_high}, "${rows[0].bp_med}")`, (err) => {
                    if(err){
                        console.log(err)
                        res.send({'status': -1});
                    }
                    else{
                        res.send({'status': 1, 'body': rows});
                    }
                })
            }
        })
    }
})
app.post('/sugar_update', (req,res) => {
    let user = req.user[0].username;
    console.log(user);
    if(!user){
        res.send({'status': -1});
    }
    else{

        let sugar = req.body.sugar_level;
        let sugar_table = user + "_sugar";
        let timestamp = new Date();
        // let today = new Date();

        db.query(`SELECT sugar_med FROM users WHERE username="${user}"`, (err, rows) => {
            if(err){
                console.log(err);
                res.send({'status': -1});
            }
            else if(rows.length == 0){
                console.log("No data found");
                res.send({'status': -1})
            }
            else{
                db.query(`INSERT INTO ${sugar_table} VALUES ("${timestamp}", ${sugar}, "${rows[0].sugar_med}")`, (err) => {
                    if(err){
                        console.log(err)
                        res.send({'status': -1});
                    }
                    else{
                        res.send({'status': 1, 'body': rows});
                    }
                })
            }
        })
    }
})

//Medicine data
app.route("/bp_med")
.get( (req, res) => {
    let user = req.user[0].username;
    console.log(user);
    if(!user){
        res.send({'status': -1});
    }
    else{
        db.query(`SELECT bp_med FROM users WHERE username="${user}"`, (err, rows) => {
            if(err){
                console.log(err);
                res.send({'status': -1});
            }
            else if(rows.length == 0){
                console.log("No data found");
                res.send({'status': -1})
            }
            else{
                res.send({'status': 1, 'body': rows[0]})
            }
        })
    }
})
.post( (req, res) => {
    let user = req.user[0].username;
    console.log(user);
    if(!user){
        res.send({'status': -1});
    }
    else{
        let bp_med = req.body.bp_med;
        db.query(`UPDATE users SET bp_med = "${bp_med}" WHERE username = "${user}"`, (err) => {
            if(err){
                console.log(err);
                res.send({'status': -1});
            }
            else{
                console.log("Updated bp medicine for", user);
                res.send({'status': 1});
            }
        })
    }
})

app.route("/sugar_med")
.get( (req, res) => {
    let user = req.user[0].username;
    console.log(user);
    if(!user){
        res.send({'status': -1});
    }
    else{
        db.query(`SELECT sugar_med FROM users WHERE username="${user}"`, (err, rows) => {
            if(err){
                console.log(err);
                res.send({'status': -1});
            }
            else if(rows.length == 0){
                console.log("No data found");
                res.send({'status': -1})
            }
            else{
                res.send({'status': 1, 'body': rows[0]})
            }
        })
    }
})
.post( (req, res) => {
    let user = req.user[0].username;
    console.log(user);
    if(!user){
        res.send({'status': -1});
    }
    else{
        let sugar_med = req.body.sugar_med;
        db.query(`UPDATE users SET sugar_med = "${sugar_med}" WHERE username = "${user}"`, (err) => {
            if(err){
                console.log(err);
                res.send({'status': -1});
            }
            else{
                console.log("Updated sugar medicine for", user);
                res.send({'status': 1});
            }
        })
    }
})

//Open server to listen
app.listen(PORT, () => {
    console.log(`Server started...`);
});
