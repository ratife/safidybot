'use strict';
const BootBot = require('bootbot');
const dialogue = require("./dialogue");

const bot = new BootBot({
  accessToken: 'EAAeLMRoZAwh8BABhxj7P9a9zTFJ3KlZC3AKGREu6zpXBhanPuhH3RBdJkgjvKc2ChAE89m8PCXl1c1rnboQYwaMmobjkPjJY00SIlt7aw7T3DtynSlIQjdz5GpDvZCFqN01rHcql63u4NQn64Fom194CpsjENd2aRQSkxqE1KIdkNouPpPfDUqDXRDJjKkZD',//FB_ACCESS_TOKEN
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
		dialogue.startEnquete(convo);
	});
});


bot.on('postback:HAMERINA', (payload, chat) => {
	chat.conversation((convo) => {
		dialogue.startEnquete(convo);
	});
});

bot.start();