module.exports = (talks) => {

    function getIndex(req, res) {
        const talkList = JSON.parse(JSON.stringify(talks.all()));

        talkList.forEach((talk) => {
            talk._feedbackReceived = !!req.session['feedbackReceived_' + talk.slug];
        });
        
        res.render('pages/index', { talks: talkList });
    }

    return {
        getIndex
    };
};
