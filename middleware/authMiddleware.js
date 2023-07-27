const isLogin = (req, res, next) => {
  console.log("User is log in");

  next();
};

module.exports.isLogin = isLogin;
