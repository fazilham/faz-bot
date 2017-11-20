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
    appId: '0ad9b070-c39c-4171-a646-a622a5a18f12',
    appPassword: 'doYBSH49[tpqzeEKM658%!_'
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


bot.dialog('hi', function (session) {
    console.log(session.message.user.name);
    var userName = '';
   if(session.message.user.name!== undefined){
       userName = ' '+session.message.user.name;
   }
    session.endDialog('Hi'+userName+', I am a bot assisting you. Hope you like me. I would be learning from you all on how to speak. Bear with me. I am a slow learner');
}).triggerAction({ matches: [/Hi/i, /genie/i, /^help/i] });

bot.dialog('update', function (session, result) {
    var userName = '';
    if(session.message.user.name!== undefined){
        userName = ' '+session.message.user.name;
    }
    session.endDialog('Thank you'+userName+'. Noted.');
}).triggerAction({ matches: [/updated/i, /done/i] });

bot.dialog('thanks', function (session, result) {
    var userName = '';
    if(session.message.user.name!== undefined){
        userName = ' '+session.message.user.name;
    }else{
        userName = ' User';
    }
    session.endDialog('Welcome'+userName);
}).triggerAction({ matches: [/thanks/i, /thank you/i] });



bot.on('conversationUpdate', function (message) {
    var schedule1 = new cron.CronJob({
        cronTime: '0 0 9 * * 1',
        onTick: function () {
            console.log('Schedule 1 fired at 9am');
            sendProactiveMessage(message.address, 'Hi All, Good morning!  \nPlease update the sheet for food preference for team lunch today.  \nhttps://zetacorporate-my.sharepoint.com/personal/vsankarayogi_zetaglobal_com/_layouts/15/WopiFrame2.aspx?sourcedoc=%7B7CD23D7E-188D-4A3A-A586-AC4D417E563C%7D&file=Team%20Lunch.xlsx&action=default');

        },
        start: false,
        timeZone: 'Asia/Kolkata'
    });
    var schedule2 = new cron.CronJob({
        cronTime: '00 30 10 * * 1',
        onTick: function () {
            console.log('Reminder Schedule at 10:30');
            sendProactiveMessage(message.address, 'This is a reminder that we are going to place an order at 11:30 based on the updated sheet');

        },
        start: false,
        timeZone: 'Asia/Kolkata'
    });
    var schedule3 = new cron.CronJob({
        cronTime: '00 15 11 * * 1',
        onTick: function () {
            console.log('Reminder Schedule at 11:15 ');
            sendProactiveMessage(message.address, 'This is a reminder that we are going to place an order at 11:30 based on the updated sheet');

        },
        start: false,
        timeZone: 'Asia/Kolkata'
    });

var schedule4 = new cron.CronJob({
        cronTime: '0 35 19 * * 0',
        onTick: function () {
            console.log('Schedule 1 fired at 9am');
            sendProactiveMessage(message.address, 'Hi All, Good morning!  \nPlease update the sheet for food preference for team lunch today.  \nhttps://zetacorporate-my.sharepoint.com/personal/vsankarayogi_zetaglobal_com/_layouts/15/WopiFrame2.aspx?sourcedoc=%7B7CD23D7E-188D-4A3A-A586-AC4D417E563C%7D&file=Team%20Lunch.xlsx&action=default');

        },
        start: false,
        timeZone: 'Asia/Kolkata'
    });
    
    if (message.membersAdded && message.membersAdded.length > 0) {
        var botAddId = message.address.bot.id;
        for (var i = 0; i < message.membersAdded.length; i++) {
            if (message.membersAdded[i].id === botAddId) {
                console.log('Bot Added')
                if(schedule1.running === undefined) {
                schedule1.start();
                schedule2.start();
                schedule3.start();
                    schedule4.start();
                }
            }
        }

    } else if (message.membersRemoved) {
        // See if bot was removed
        var botId = message.address.bot.id;
        for (var j = 0; j < message.membersRemoved.length; j++) {
            if (message.membersRemoved[j].id === botId) {
                console.log('Bot Removed')
                // Say goodbye
                if(schedule1.running === true){
                    schedule1.stop();
                    schedule2.stop();
                    schedule3.stop();
                     schedule4.stop();
                }
                break;
            }
        }
    }

});
