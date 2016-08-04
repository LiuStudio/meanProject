module.exports = {
   dbURL : 'mongodb://localhost/meanApp',
   secret : process.env.JWT_SECRET || "YOU_SHOULD_NOT_USE_THIS_AS_YOUR_SECRET"
};