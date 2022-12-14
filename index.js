'use strict';
const BootBot = require('bootbot');

const bot = new BootBot({
  accessToken: 'EAAeLMRoZAwh8BABPj5WPD0iwQwBbcrSlw5S0BZACHInZAvlm9g9A42tfoYZABTfDofBS05xgZC7ECjIGQR0SKuTuIycOp2rdPrenvFmI2gljLhkLp0NM7Hn7eZCaZBc4S8IhtSFYIwRQmfzjuWuXVm5MuKtDEAv84vI6gCWzp877ldVoPGYm0sleas97YZA3tL8ZD',//FB_ACCESS_TOKEN
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


var questionProvince = {
		text: 'Avy any @ province aiza ianao ?',
		buttons: [
			{ type: 'postback', title: 'Antananarivo', payload: 'Antananarivo' },
			{ type: 'postback', title: 'Mahajanga', payload: 'Mahajanga' },
			{ type: 'postback', title: 'Antsiranana', payload: 'Mahajanga' }
		]
	};
	
var questionRegion = {
		text: 'Avy any @ region aiza ianao ?',
		buttons: [
			{ type: 'postback', title: 'Analamanga', payload: 'Analamanga' },
			{ type: 'postback', title: 'AmoroniMania', payload: 'AmoroniMania' },
			{ type: 'postback', title: 'Haute matsiatra', payload: 'Hautematsiatra' }
		]
	};
var questionDistrict = {
		text: 'Avy any @ district aiza ianao ??',
		buttons: [
			{ type: 'postback', title: 'Ambositra', payload: 'Ambositra' },
			{ type: 'postback', title: 'Manandrina', payload: 'Manandrina' },
			{ type: 'postback', title: 'Fandrina', payload: 'Fandrina' }
		]
	};
var questionCommune = {
		text: 'Avy any @ Commune aiza ianao ?',
		buttons: [
			{ type: 'postback', title: 'Ambositra I', payload: 'Ambositra I' },
			{ type: 'postback', title: 'Ambositra II', payload: 'Ambositra II' },
			{ type: 'postback', title: 'Imady Ala', payload: 'Imady Ala' }
		]
	};
	
var questionFkt = {
		text: 'Avy any @ Fokotany aiza ianao ??',
		buttons: [
			{ type: 'postback', title: 'Est Vinany', payload: 'Est vinany' },
			{ type: 'postback', title: 'Ambohimiadana', payload: 'Ambohimiadana' },
			{ type: 'postback', title: 'Avaratsena', payload: 'Avaratsena' }
		]
	};
	
var questionBV = {
		text: 'Avy any @ Bureau de vote aiza ianao ??',
		buttons: [
			{ type: 'postback', title: 'BV 1', payload: 'BV 1' },
			{ type: 'postback', title: 'BV 2', payload: 'BV 2' },
			{ type: 'postback', title: 'BV 3', payload: 'BV 3' }
		]
	};
	
const askName = (convo) => {
		convo.ask(`Iza no anaranao feno ?`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('fullname', text);
			askProvince(convo);
			//convo.say(`Ny anaranao feno dia : ${text}`).then(() => askProvince(convo));
		});
	};

	const askProvince = (convo) => {
		convo.ask(questionProvince
				, (payload, convo) => {
					//console.log(payload.message);
					const text = payload.postback.payload;
					//const text = payload.message.text;
					//const text = payload.message;
					convo.set('province', text);
					askRegion(convo);
					//convo.say(`ianao dia avy any ${text}`).then(() => askRegion(convo));
				});
	};
	
	const askRegion = (convo) => {
		convo.ask(questionRegion, (payload, convo) => {
			const text = payload.postback.payload;
			convo.set('region', text);
			askDistrict(convo);
			//convo.say(`ianao dia avy any ${text}`).then(() => askDistrict(convo));
		});
	};
	
	const askDistrict = (convo) => {
		convo.ask(questionDistrict, (payload, convo) => {
			const text = payload.postback.payload;
			convo.set('district', text);
			askCommune(convo);
			//convo.say(`ianao dia avy any ${text}`).then(() => askCommune(convo));
		});
	};
	
	const askCommune = (convo) => {
		convo.ask(questionCommune, (payload, convo) => {
			const text = payload.postback.payload;
			convo.set('commune', text);
			askFokotany(convo);
			//convo.say(`ianao dia avy any ${text}`).then(() => askFokotany(convo));
		});
	};
	
	const askFokotany = (convo) => {
		convo.ask(questionFkt, (payload, convo) => {
			const text = payload.postback.payload;
			convo.set('fokotany', text);
			askBV(convo);
			//convo.say(`ianao dia avy any ${text}`).then(() => askBV(convo));
		});
	};
	
	const askBV = (convo) => {
		convo.ask(questionBV, (payload, convo) => {
			const text = payload.postback.payload;
			convo.set('bv', text);
			askInscrit(convo);
			//convo.say(`ianao dia avy @BV ${text}`).then(() => sendSummary(convo));
		});
	};
	
	const askInscrit = (convo) => {
		convo.ask("Firy ny isan'ny olona voasoratra anarana ?", (payload, convo) => {
			const text = payload.message.text;
			convo.set('inscrit', text);
			askVote(convo);
			//convo.say(`ianao dia avy @BV ${text}`).then(() => sendSummary(convo));
		});
	};
	
	const askVote = (convo) => {
		convo.ask("Firy ny isan'ny olona nadatsa-bato ?", (payload, convo) => {
			const text = payload.message.text;
			convo.set('vato', text);
			askNULL(convo);
			//convo.say(`ianao dia avy @BV ${text}`).then(() => sendSummary(convo));
		});
	};
	
	const askNULL = (convo) => {
		convo.ask("Firy ny isan'ny vato tsy manankery ?", (payload, convo) => {
			const text = payload.message.text;
			convo.set('vatoNull', text);
			askCandidat(convo,1);
			//convo.say(`ianao dia avy @BV ${text}`).then(() => sendSummary(convo));
		});
	};
	
	const askCandidat = (convo,i) => {
		convo.ask("Firy vato azon'ny candidat "+i+" ?", (payload, convo) => {
				const text = payload.message.text;
				convo.set('candidat'+i, text);
				i = i + 1;
				if(i<3){
					askCandidat(convo,i);
				}
				else{
					sendSummary(convo);;
				}
		});
		
			
	};
	
	


	const sendSummary = (convo) => {
		console.log(convo);
		var resultat = "IRETO NY VOKATRA AVY AMINAO :"; 
		
		resultat =  resultat + "\n - ANARANA : "+ convo.get("fullname");
		
		resultat = resultat + " \n- PROVINCE : "+ convo.get("province") ;
		resultat = resultat + " \n- REGION : "+ convo.get("region") ;
		resultat = resultat + " \n- DISTRICT : "+ convo.get("district") ;
		resultat = resultat+ " \n- COMMUNE : "+ convo.get("commune") ;
		resultat = resultat+ " \n- FOKONTANY : "+ convo.get("commune") ;
		resultat = resultat+ " \n- BV : "+ convo.get("bv") 
				 
		resultat = resultat+ " =============== \n";	
		resultat = resultat + " \n- INSCRIT : "+ convo.get("inscrit") ;	
		resultat = resultat+ " \n- VOTE : "+ convo.get("vato") ;
		resultat = resultat+ " \n- FOTSY/MATY : "+ convo.get("vatoNull");
		
		for(var i=1;i<3;i++){
			var key = 'candidat'+i;
			resultat = resultat+ " \n- "+key+" : "+ convo.get(key) ;
		}	
		
		var askValidation = {
			text: resultat,
			buttons: [
				{ type: 'postback', title: 'EKENA', payload: 'EKENA' },
				{ type: 'postback', title: 'AVERINA', payload: 'AVERINA' }
			]
		};
	
		convo.ask(askValidation, (payload, convo) => {
			const text = payload.postback.payload;
			if(text =="EKENA"){
				convo.say("VOATAHIRY NY VOKATRA, MISAOTRA !!!");
				convo.end();
			}
			else{
				askName(convo);
				 
			}
			
		});		
     
	  
	};

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
		askName(convo);
	});
});


bot.on('postback:HAMERINA', (payload, chat) => {
	chat.conversation((convo) => {
		askName(convo);
	});
});

bot.start();