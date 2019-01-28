const assert = require('assert');
const supertest = require('supertest');

const talks = require('./mocks/talksMock');
const app = require('../src/app')(talks);

// const talks = require('./data/talks');

/**
 * Fake rendering engine.
 * 
 * This will replace original EJS rendering with one that
 * just returns the options as JSON string. So tests can
 * parse it and check if the data provided to the view is
 * correct.
 */
app.engine('html', (_, options, callback) => {
    callback(null, JSON.stringify(options));
});

const request = supertest.agent(app);

describe('Index', function() {

    it('should return the correct list of talks with successful status code.', async function() {
        const res = await request.get('/').expect(200);
        const body = JSON.parse(res.text);
        assert.deepEqual(body.talks, [
            {
                name: 'Cool talk',
                slug: 'cool-talk',
                description: 'General coolness',
                speaker: 'John Doe',
                speakerImage: 'jdoe.jpg',
                speakerTitle: 'You know him',
                track: '1',
                when: 'VIE 9:00-10:00',
                _feedbackReceived: false
            },
            {
                name: 'Another cool talk',
                slug: 'another-cool-talk',
                description: 'Amazingness',
                speaker: 'Dohn Joe',
                speakerImage: 'djoe.jpg',
                speakerTitle: 'You know him too',
                track: '1',
                when: 'VIE 10:00-11:00',
                _feedbackReceived: false
            }
        ]);
    });

});

describe('Talks', function() {

    it('should return 404 on non existing talk', async function() {
        await request.get('/talk/boring-talk')
            .expect(404);
    });

    it('should return the correct talk with correct info.', async function() {
        const res = await request.get('/talk/another-cool-talk')
            .expect(200);

        const body = JSON.parse(res.text);
        assert.deepEqual(body.talk, {
            name: 'Another cool talk',
            slug: 'another-cool-talk',
            description: 'Amazingness',
            speaker: 'Dohn Joe',
            speakerImage: 'djoe.jpg',
            speakerTitle: 'You know him too',
            track: '1',
            when: 'VIE 10:00-11:00'
        });
        assert.equal(body.feedbackReceived, false);
    });

    it('should fail on malformed feedbacks when voting.', async function() {
        await request.post('/talk/cool-talk')
            .send('rating=cuatro&comment=Nearly perfect.')
            .expect(400);
        await request.post('/talk/cool-talk')
            .send('comment=Nearly perfect.')
            .expect(400);
        await request.post('/talk/cool-talk')
            .send('rating=0')
            .expect(400);
        await request.post('/talk/cool-talk')
            .send('rating=6')
            .expect(400);
        await request.post('/talk/cool-talk')
            .send('rating=4&comment=' + Array(302).join('a'))
            .expect(400);
    });

    it('should be able to vote and comment on a talk.', async function() {
        return await request
            .post('/talk/another-cool-talk')
            .send('rating=4&comment=' + Array(301).join('a'))
            .expect(302);
    });

    it('should mark as voted when getting the same talk again.', async function() {
        const res = await request.get('/talk/another-cool-talk').expect(200);
        const body = JSON.parse(res.text);
        assert.deepEqual(body.talk, {
            name: 'Another cool talk',
            slug: 'another-cool-talk',
            description: 'Amazingness',
            speaker: 'Dohn Joe',
            speakerImage: 'djoe.jpg',
            speakerTitle: 'You know him too',
            track: '1',
            when: 'VIE 10:00-11:00'
        });
        assert.equal(body.feedbackReceived, true);
    });

});
