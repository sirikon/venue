const talksData = require('../data/talks');

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

module.exports = {
    all () {
        return talksData.map(t => clone(t));
    },
    getBySlug (slug) {
        const talk = talksData.filter(t => t.slug === slug)[0];
        if (!talk) return null;
        return clone(talk);
    }
};
