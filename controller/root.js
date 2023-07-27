const root = (req, res) => {
  res.render("index", {
    title: "Express Application",
    message: "Welcome to our Express class",
  });
};

module.exports = root;
