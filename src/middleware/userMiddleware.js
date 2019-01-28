module.exports = () => {
    return function(req, res, next) {
        req.user = {
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            id: req.session.id
        };
        next();
    };
};
