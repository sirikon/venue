const { Feedback } = require('./models/index');

module.exports = {
    create (talkSlug, feedback, user) {
        return Feedback.create({
            talkSlug,
            ip: user.ip,
            userId: user.id,
            date: new Date(),
            ...feedback
        });
    },
    all () {
        return Feedback.findAll();
    }
};
