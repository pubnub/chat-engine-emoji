
const assert = require('chai').assert;
const emoji = require('./src/plugin.js');

const ChatEngine = require('chat-engine');

let pluginchat;
let CE;

describe('config', function() {

    it('should be configured', function() {

        CE = ChatEngine.create({
            publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
            subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395'
        }, {
            namespace: 'test-channel'
        });

        assert.isOk(CE);

    });

});

describe('connect', function() {

    it('should be identified as new user', function(done) {

        this.timeout(30000);

        CE.connect('robot-tester');

        CE.on('$.ready', (me) => {
            assert.isObject(me);
            done();
        });

    });

});

describe('plugins', function() {

    it('should be created', function() {

        pluginchat = new CE.Chat('pluginchat' + new Date().getTime(), {autoConnect: false});

        pluginchat.plugin(emoji());

    });

    it('publish and subscribe hooks should be called', function(done) {

        this.timeout(30000);

        pluginchat.on('$.connected', () => {

            let success = '<img class="emoji" title=":pizza:" alt="pizza" src="http://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/pizza.png" height="16" />';

            pluginchat.on('message', (payload) => {

                assert.isAbove(payload.data.text.indexOf(success), 0, 'emoji rendered');
                done();

            });

            pluginchat.emit('message', {
                text: 'I want :pizza:'
            });

        });

        pluginchat.connect();

    });

});
