function getSettings(req, res, next) {
  res.json({
    email: "brunnobenites@gmail.com",
  });
}

module.exports = { getSettings };
