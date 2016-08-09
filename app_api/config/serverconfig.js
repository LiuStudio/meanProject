module.exports = {
   dbURL : 'mongodb://localhost/meanApp',
   secret : process.env.JWT_SECRET || "YOU_SHOULD_NOT_USE_THIS_AS_YOUR_SECRET",
   'facebook':{
   	clientID : '934181483377071',
   	clientSecret:'4ce89d758978e797b6ddaa41c98b0757',
   	callbackURL:'https://localhost:3543/api/facebook/callback'
   }
};