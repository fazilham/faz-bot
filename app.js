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
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: '7c82dd69-17ed-4750-960c-a66b44ede779',
    appPassword: '9XOT7eiiYJhHrr79z9L6WZJ'
});

// Listen for messages
server.post('/api/messages', connector.listen());

// Bot setup
var msgAddress= [];

var bot = new builder.UniversalBot(connector, function (session) {
});

bot.on('conversationUpdate', function (message) {

    var address = message.address;

    msgAddress.push(address);
    console.log(1)
    console.log(message.address)
    console.log(2)
   /* bot.send(new builder.Message()
        .address(message.address)
        .text('Welcome'));*/


});

var j = schedule.scheduleJob({hour: 11, minute: 40, dayOfWeek: 2}, function(){
   


    console.log('running every minute 1, 2, 4 and 5');

    console.log('1')
    console.log(msgAddress);
    console.log(2)
    var newAddresses = msgAddress.splice(0);
    console.log(3)
    console.log(newAddresses)

    msgAddress.forEach(function (address) {
        console.log('Crone 1')
        console.log(address.address)
        console.log('Crone 1')
        bot.send(new builder.Message()
            .address(address.address)
            .text('Welcome'));

    })


});


