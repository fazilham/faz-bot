// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder');
var restify = require('restify');
var Promise = require('bluebird');
var url = require('url');
var Swagger = require('swagger-client');



var schedule = require('node-schedule');


// Swagger client for Bot Connector API
var connectorApiClient = new Swagger({
    url: 'https://raw.githubusercontent.com/Microsoft/BotBuilder/master/CSharp/Library/Microsoft.Bot.Connector.Shared/Swagger/ConnectorAPI.json',
    usePromise: true
});

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
    console.log('Time:'+ new Date())
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: '7c82dd69-17ed-4750-960c-a66b44ede779',
    appPassword: '9XOT7eiiYJhHrr79z9L6WZJ'
});

// Listen for messages
server.post('/api/messages', connector.listen());

// Bot setup
var bot = new builder.UniversalBot(connector, function (session) {
 
});


bot.on('conversationUpdate', function (message) {
    
    console.log('conversationUpdate event triggered');
    
    var j = schedule.scheduleJob({hour: 10, minute: 20, dayOfWeek: 1}, function(){
    console.log('Test conversatiion Schedule');
   bot.send(new builder.Message()
                .address(message.address)
                .text('Hi All, Good morning /nPlease update the sheet for food preference for team lunch today. /n https://zetacorporate-my.sharepoint.com/personal/vsankarayogi_zetaglobal_com/_layouts/15/WopiFrame2.aspx?sourcedoc=%7B7CD23D7E-188D-4A3A-A586-AC4D417E563C%7D&file=Team%20Lunch.xlsx&action=default'));
});

    
});


