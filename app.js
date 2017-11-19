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

function sendProactiveMessage(address, txt) {
    var msg = new builder.Message().address(address).text(txt);
    bot.send(msg);
}


// Bot setup
var bot = new builder.UniversalBot(connector, function (session) {
});




bot.on('conversationUpdate', function (message) {

    if (message.membersAdded && message.membersAdded.length > 0) {
        var botAddId = message.address.bot.id;
        for (var i = 0; i < message.membersAdded.length; i++) {
            if (message.membersAdded[i].id === botAddId) {
                console.log('Bot Fired')
                var schedule1 = new cron.CronJob({
                    cronTime: '0 30 13 * * *',
                    onTick: function () {
                        console.log('Schedule 1 fired at 9am');
                        sendProactiveMessage(message.address, 'Hi All, Good morning!  \n  Please update the sheet for food preference for team lunch today.  \n  https://zetacorporate-my.sharepoint.com/personal/vsankarayogi_zetaglobal_com/_layouts/15/WopiFrame2.aspx?sourcedoc=%7B7CD23D7E-188D-4A3A-A586-AC4D417E563C%7D&file=Team%20Lunch.xlsx&action=default')
                    },
                    start: true,
                    timeZone: 'Asia/Kolkata'
                })
                var schedule2 = new cron.CronJob({
                    cronTime: '00 35 13 * * 7',
                    onTick: function () {
                        console.log('Reminder Schedule at 10:30');
                        sendProactiveMessage(message.address, 'This is a reminder that we are going to place an order at 11:30 based on the sheet updated')
                    },
                    start: true,
                    timeZone: 'Asia/Kolkata'
                })
                var schedule3 = new cron.CronJob({
                    cronTime: '00 40 13 * * 7',
                    onTick: function () {
                        console.log('Reminder Schedule at 11:15 ');
                        sendProactiveMessage(message.address, 'This is a reminder that we are going to place an order at 11:30 based on the sheet updated')
                    },
                    start: true,
                    timeZone: 'Asia/Kolkata'
                })
            }
        }

    }
});
