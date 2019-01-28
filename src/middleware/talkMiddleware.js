module.exports = (talks) => {

    function extendTalk(talk, req) {
        return Object.defineProperties(talk, {
            feedbackReceived: {
                get: () => {
                    return !!req.session['feedbackReceived_' + talk.slug];
                },
                set: (value) => {
                    req.session['feedbackReceived_' + talk.slug] = !!value;
                }
            }
        });
    }

    return function(req, res, next) {
        const talk = talks.getBySlug(req.params.slug);
        if (!talk) {
            res.sendStatus(404);
            return;
        }
        req.talk = extendTalk(talk, req);
        next();
    };
};
