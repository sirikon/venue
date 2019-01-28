const feedbacks = require('../data/feedbacks');
const questions = require('../data/questions');

module.exports = () => {

    function getTalkById(req, res) {
        res.render('pages/talk', {
            talk: req.talk,
            feedbackReceived: req.talk.feedbackReceived,
            questionReceived: req.query.q === '1'
        });
    }
    
    function validateFeedback(feedback) {
        if (isNaN(feedback.rating)) {
            return false;
        }
        if (feedback.rating < 1 || feedback.rating > 5) {
            return false;
        }
        if (feedback.comment.length > 300) {
            return false;
        }
        return true;
    }
    
    function parseFeedback(body) {
        return {
            rating: parseInt(body.rating),
            comment: body.comment || ''
        };
    }
    
    async function postFeedback(req, res) {
        if (req.talk.feedbackReceived) {
            return res.redirect('/talk/' + req.talk.slug);
        }
    
        var feedback = parseFeedback(req.body);
        if (!validateFeedback(feedback)) {
            return res.sendStatus(400);
        }
    
        await feedbacks.create(req.talk.slug, feedback, req.user);
        req.talk.feedbackReceived = true;
        res.redirect(`/talk/${req.talk.slug}`);
    }

    function parseQuestion(body) {
        return body.question;
    }

    function validateQuestion(question) {
        return question.length <= 300 && question.length > 0;
    }

    async function postQuestion(req, res) {
        const question = parseQuestion(req.body);

        if (!validateQuestion(question)) {
            return res.sendStatus(400);
        }

        await questions.create(req.talk.slug, question, req.user);
        res.redirect(`/talk/${req.talk.slug}?q=1#question`);
    }

    return {
        getTalkById,
        postFeedback,
        postQuestion
    };
};
