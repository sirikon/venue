const { Question } = require('./models/index');

module.exports = {
    create (talkSlug, question, user) {
        return Question.create({
            talkSlug,
            ip: user.ip,
            userId: user.id,
            date: new Date(),
            question
        });
    },
    all () {
        return Question.findAll();
    },
    getByTalkSlug(talkSlug) {
        return Question.findAll({
            where: { talkSlug }
        });
    }
};
