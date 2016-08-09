var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var serverconfig = require('./serverconfig')

exports.local = passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    console.log("inside passport config username is "+username+"password is "+password );
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));

exports.facebook = passport.use(new FacebookStrategy({
  clientID: serverconfig.facebook.clientID,
  clientSecret: serverconfig.facebook.clientSecret,
  callbackURL: serverconfig.facebook.callbackURL,
 // passReqToCallback: true,
  profileFields: ["id", 'first_name', 'last_name', 'email']
},
function(accessToken, refreshToken, profile, done){
  console.log("inside passport facebook config, accessToken is "+ accessToken +"profile is "+JSON.stringify(profile));
  User.findOne({OauthId: profile.id}, function(err,user) {
    if (err){return done(err);}
    if(!user){
            user = new User();
            user.email= profile.email;
            user.firstname= profile._json.first_name;
            user.lastname= profile._json.last_name;
            user.OauthId = profile.id;
            user.OauthToken = accessToken;
            console.log('creating new oauth user ...');
            console.log('user is '+JSON.stringify(user));
             user.save(function (err) {
              if (err){
                console.log('inside passport facebook config, save error, err is '+ err)
                 return done(err);
               }else{
              console.log('saving user ...');
              return done(null,user);
               }     
            });
      }else{
      console.log("find user in DB...")
      return done(null, user);
    }
  });
}));