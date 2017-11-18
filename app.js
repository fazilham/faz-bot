// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder');
var restify = require('restify');
var cron = require('cron');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: '7c82dd69-17ed-4750-960c-a66b44ede779',
    appPassword: '9XOT7eiiYJhHrr79z9L6WZJ'
});

// Listen for messages
server.post('/api/messages', connector.listen());

function sendProactiveMessage(address) {
    var msg = new builder.Message().address(address);
    msg.text('Hello, this is a notification');
    msg.textLocale('en-US');
    bot.send(msg);
}


// Bot setup
var bot = new builder.UniversalBot(connector, function (session) {
});


bot.on('contactRelationUpdate', function (message) {
    console.log(message)

    var schedule = new cron.CronJob({
        cronTime: '00 25 19 * * 6',
        onTick: function() {
            console.log('job 1 ticked');
            sendProactiveMessage(message.address)
        },
        start: true,
        timeZone: 'Asia/Kolkata'
    });


    /*sendProactiveMessage(message.address)*/
});
