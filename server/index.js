require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const massive = require("massive");
const routes = require("./routes");
const socket = require("socket.io");

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});

//link to strategy.js
const strategy = require("./strategy");

const app = express();

const PORT = process.env.PORT || 3001;
server = app.listen(PORT, () => {
  console.log(`I am listening on port ${PORT}`);
});

app.use(json());
app.use(morgan("tiny"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

//where i use strategy
passport.use(strategy);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
//loger function
function logger(req, res, next) {
  const { user, params, body, query } = req;
  console.log({
    user,
    params,
    body,
    query
  });
  next();
}

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("http://localhost:3000");
  }
}

app.get("/login", (req, res, next) => {
  passport.authenticate("auth0", (err, user, info) => {
    const db = req.app.get("db");
    db.users.find({ auth_id: user.id }).then(([dbUser]) => {
      if (!dbUser) {
        db.users
          .insert({
            first_name: user.name.givenName,
            last_name: user.name.familyName,
            email: user.emails[0].value,
            session_id: req.session.id,
            auth_id: user.id,
            profile_picture: user.picture
          })
          .then(newUser => {
            req.session.user = newUser;
            return res.redirect("http://localhost:3000/#/dashboard/view");
          });
      } else {
        req.session.user = dbUser;
        return res.redirect("http://localhost:3000/#/dashboard/view");
      }
    });
  })(req, res, next);
});

app.get("/logout", isLoggedIn, (req, res, next) => {
  req.session.destory();
  res.redirect("http://localhost:3000/#/");
});

app.get("/me", (req, res, next) => {
  const { user } = req.session;
  return res.status(200).json(user);
});

//React s3
app.use(
  "/s3",
  require("react-s3-uploader/s3router")({
    bucket: "upply-userprofile",
    region: "us-east-2", //optional
    signatureVersion: "v4", //optional (use for some amazon regions: frankfurt and others)
    headers: { "Access-Control-Allow-Origin": "*" }, // optional
    ACL: "private", // this is default
    uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  })
);

//Socket.io Chat

const io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("SEND_MESSAGE", function(data) {
    io.emit("RECEIVE_MESSAGE", data);
  });
});

//End of Socket.io Chat
routes(app);
