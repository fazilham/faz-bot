
var builder = require('botbuilder');
var restify = require('restify');
var port = process.env.PORT || 3000;
var schedule = require('node-schedule');
// Setup Restify Server
var server = restify.createServer();
server.listen(port, function () {
    console.log('Sever started');
});

// Create chat bot and listen for messages
var connector = new builder.ChatConnector({
    appId: '7c82dd69-17ed-4750-960c-a66b44ede779',
    appPassword: '9XOT7eiiYJhHrr79z9L6WZJ'
});

server.get('/', function (req, res) {
    res.send('Hello')
});

server.post('/api/messages', connector.listen());

var userStore = [];
var bot = new builder.UniversalBot(connector, function (session) {
    // store user's address
    var address = session.message.address;
    console.log(address)
    userStore.push(address);

    // end current dialog
    session.endDialog('You\'ve been invited to a survey! It will start in a few seconds...');
});

// Every 5 seconds, check for new registered users and start a new dialog
setInterval(function () {
    var newAddresses = userStore.splice(0);
    newAddresses.forEach(function (address) {

        console.log('Starting survey for address:', address);

        // new conversation address, copy without conversationId
        var newConversationAddress = Object.assign({}, address);
        delete newConversationAddress.conversation;

        // start survey dialog
        bot.beginDialog(newConversationAddress, 'survey', null, function (err) {
            if (err) {
                // error ocurred while starting new conversation. Channel not supported?
                bot.send(new builder.Message()
                    .text('This channel does not support this operation: ' + err.message)
                    .address(address));
            }
        });

    });
}, 5);

bot.dialog('survey', [
    function (session) {
        builder.Prompts.text(session, 'Hello... What\'s your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        builder.Prompts.number(session, 'Hi ' + results.response + ', How many years have you been coding?');
    },
    function (session, results) {
        session.userData.coding = results.response;
        builder.Prompts.choice(session, 'What language do you code Node using? ', ['JavaScript', 'CoffeeScript', 'TypeScript']);
    },
    function (session, results) {
        session.userData.language = results.response.entity;
        session.endDialog('Got it... ' + session.userData.name +
            ' you\'ve been programming for ' + session.userData.coding +
            ' years and use ' + session.userData.language + '.');
    }
]);


const logUserConversation = (event) => {

    var event = schedule.scheduleJob("*/1 * * * *", function() {
        console.log('Schedule Content')
        console.log('message: ' + event.text + ', user: ' + event.address.user.name);;
    });
};
 
// Middleware for logging
bot.use({
    receive: function (event, next) {
        logUserConversation(event);
        next();
    },
    send: function (event, next) {
        logUserConversation(event);
        next();
    }
});

console.log('Fazil')
console.log('Fazil test')



