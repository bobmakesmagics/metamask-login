const healthcheck = (req, res, next) => {
    res.json({ message: "ok" });
};

module.exports = { healthcheck };