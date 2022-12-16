'use strict';
const BootBot = require('bootbot');
const dialogue = require("./dialogue");
const filetools = require("./filetools");


const bot = new BootBot({
  accessToken: 'EAAeLMRoZAwh8BAPa0UdeE7TaWNJmBv3RsGSn0b5oyD4ZCZCxcNnv5vUIRLZCzy9lumAtVcwFxz4AIS4JEXuhRqLaDRYMQxZCsd8Yhi4a2vh7LuUaLP8f84bKPnIsHmPxnTKnGXGFVV7KFrPsSx843AzF11d8IsEm3TntOYP6MIkzkJYlY6JIQcgT7D2XknIAZD',//FB_ACCESS_TOKEN
  verifyToken: '123456',//FB_VERIFY_TOKEN
  appSecret: '831026b5269e4a751c49b46721cf4909' //  'FB_APP_SECRET'
});

bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	console.log(`The user said: ${text}`);
});

bot.on('postback', (payload, chat) => {
	console.log(`>>>>> postback`);
	const text = payload.postback.payload;
	console.log(`The user said: ${text}`);
});
/*
bot.on('attachment', (payload, chat) => {
	var cpt = 0;
	payload.message.attachments.forEach(element => {
		console.log(element.payload.url);
		cpt++;
		filetools.download(element.payload.url, './upload/image'+cpt+'.png', function(){
		console.log('done');
		});
	});
	
	console.log('An attachment was received!');
});
*/
bot.hear(['salama', 'akory aby', /aona( inona)?/i], (payload, chat) => {
	// Send a text message with buttons
	chat.say({
		text: 'Tongasoa eto @ safidy malagasy efa vonona ny hamaly ve ianao ?',
		buttons: [
			{ type: 'postback', title: 'vonona', payload: 'VONONA' },
			{ type: 'postback', title: 'tsy nonona', payload: 'tsia' },
		]
	});
});

bot.on('postback:VONONA', (payload, chat) => {
	chat.conversation((convo) => {
		dialogue.startEnquete(convo,chat);
	});
});


bot.on('postback:HAMERINA', (payload, chat) => {
	chat.conversation((convo) => {
		dialogue.startEnquete(convo);
	});
});

bot.start();