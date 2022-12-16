'use strict';
const fs = require('fs');
const validator = require('validator');
const filetools = require("./filetools");

const questionProvince = {
    text: 'Avy any @ province aiza ianao ?',
    buttons: [
        { type: 'postback', title: 'Antananarivo', payload: 'Antananarivo' },
        { type: 'postback', title: 'Mahajanga', payload: 'Mahajanga' },
        { type: 'postback', title: 'Antsiranana', payload: 'Mahajanga' }
    ]
};

const questionRegion = {
    text: 'Avy any @ region aiza ianao ?',
    buttons: [
        { type: 'postback', title: 'Analamanga', payload: 'Analamanga' },
        { type: 'postback', title: 'AmoroniMania', payload: 'AmoroniMania' },
        { type: 'postback', title: 'Haute matsiatra', payload: 'Hautematsiatra' }
    ]
};
const questionDistrict = {
    text: 'Avy any @ district aiza ianao ??',
    buttons: [
        { type: 'postback', title: 'Ambositra', payload: 'Ambositra' },
        { type: 'postback', title: 'Manandrina', payload: 'Manandrina' },
        { type: 'postback', title: 'Fandrina', payload: 'Fandrina' }
    ]
};
const questionCommune = {
    text: 'Avy any @ Commune aiza ianao ?',
    buttons: [
        { type: 'postback', title: 'Ambositra I', payload: 'Ambositra I' },
        { type: 'postback', title: 'Ambositra II', payload: 'Ambositra II' },
        { type: 'postback', title: 'Imady Ala', payload: 'Imady Ala' }
    ]
};

const questionFkt = {
    text: 'Avy any @ Fokotany aiza ianao ??',
    buttons: [
        { type: 'postback', title: 'Est Vinany', payload: 'Est vinany' },
        { type: 'postback', title: 'Ambohimiadana', payload: 'Ambohimiadana' },
        { type: 'postback', title: 'Avaratsena', payload: 'Avaratsena' }
    ]
};

const questionBV = {
    text: 'Avy any @ Bureau de vote aiza ianao ??',
    buttons: [
        { type: 'postback', title: 'BV 1', payload: 'BV 1' },
        { type: 'postback', title: 'BV 2', payload: 'BV 2' },
        { type: 'postback', title: 'BV 3', payload: 'BV 3' }
    ]
};

const otherProof = {
    text: 'Mbola misy sary hafa ?',
    buttons: [
        { type: 'postback', title: 'ENY', payload: 'ENY' },
        { type: 'postback', title: 'TSIA', payload: 'TSIA' }
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
				const text = payload.postback.payload;
				convo.set('province', text);
				askRegion(convo);
			});
};

const askRegion = (convo) => {
	convo.ask(questionRegion, (payload, convo) => {
		const text = payload.postback.payload;
		convo.set('region', text);
		askDistrict(convo);
	});
};

const askDistrict = (convo) => {
	convo.ask(questionDistrict, (payload, convo) => {
		const text = payload.postback.payload;
		convo.set('district', text);
		askCommune(convo);
	});
};

const askCommune = (convo) => {
	convo.ask(questionCommune, (payload, convo) => {
		const text = payload.postback.payload;
		convo.set('commune', text);
		askFokotany(convo);
	});
};

const askFokotany = (convo) => {
	convo.ask(questionFkt, (payload, convo) => {
		const text = payload.postback.payload;
		convo.set('fokotany', text);
		askBV(convo);
	});
};

const askBV = (convo) => {
	convo.ask(questionBV, (payload, convo) => {
		const text = payload.postback.payload;
		convo.set('bv', text);
		askInscrit(convo);
	});
};

const askInscrit = (convo) => {
	convo.ask("Firy ny isan'ny olona voasoratra anarana ?", (payload, convo) => {
		const text = payload.message.text;
        if(validator.isNumeric(text)){
            convo.set('inscrit', text);
		    askVote(convo);
        }
        else{
            convo.say("Tandremo fa isa no andrasana").then(() => askInscrit(convo))
        }
	});
};

const askVote = (convo) => {
	convo.ask("Firy ny isan'ny olona nadatsa-bato ?", (payload, convo) => {
		const text = payload.message.text;
        if(validator.isNumeric(text)){
            convo.set('vato', text);
		    askNULL(convo);
        }
        else{
            convo.say("Tandremo fa isa no andrasana").then(() => askVote(convo))
        }
	});
};

const askNULL = (convo) => {
	convo.ask("Firy ny isan'ny vato tsy manankery ?", (payload, convo) => {
		const text = payload.message.text;
        if(validator.isNumeric(text)){
            convo.set('vatoNull', text);
		    askCandidat(convo,1);
        }
        else{
            convo.say("Tandremo fa isa no andrasana").then(() => askNULL(convo))
        }
	});
};

const askCandidat = (convo,i) => {
	convo.ask("Firy vato azon'ny candidat "+i+" ?", (payload, convo) => {
			const text = payload.message.text;
            if(validator.isNumeric(text)){
                convo.set('candidat'+i, text);
                i = i + 1;
                if(i<3){
                    askCandidat(convo,i);
                }
                else{
                    sendSummary(convo);;
                }
            }
            else{
                convo.say("Tandremo fa isa no andrasana").then(() => askCandidat(convo,i))
            }

			
	});
	
		
};


const askProof = (convo) => {
	convo.ask("Alefaso ny profofo", (payload, convo) => {
		payload.message.attachments.forEach(element => {
			console.log(element.payload.url);
			var userId = convo.get('user').id;
			var cpt = convo.get("prof_cpt");
			cpt++;
			convo.set("prof_cpt",cpt);
			filetools.download(element.payload.url, './upload/'+userId+'/prf_'+cpt+'.png', function(){
				console.log('done');
			});
		});
		convo.ask(otherProof,(payload,convo)=>{
			const text = payload.postback.payload;
			if(text =="ENY"){
				askProof(convo);
			}
			else{
				convo.say("VOATAHIRY NY VOKATRA AVY AMINAY");
				convo.say("MANKASITRAKA ANAO IZAHAY !!!");
				convo.say("Mbola afaka mandefa vokatra hafa ianao amin'ny manaraka");
				convo.say("MISAOTRA TOMPOKO !!!");
				convo.end();
			}
		})
	});
	
};



const askValidation = (convo,resultat) => {

	var questionValidation = {
		text: resultat,
		buttons: [
			{ type: 'postback', title: 'EKENA', payload: 'EKENA' },
			{ type: 'postback', title: 'AVERINA', payload: 'AVERINA' }
		]
	};

	convo.ask(questionValidation, (payload, convo) => {
		const text = payload.postback.payload;
		if(text =="EKENA"){
			convo.say("Mila mandefa sary ianao ho porofo : tablilao sy PV");
			askProof(convo);
		}
		else{
			askName(convo);
		}
	});	
}

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
			 
	resultat = resultat+ " \n =============== \n";	
	resultat = resultat + " \n- INSCRIT : "+ convo.get("inscrit") ;	
	resultat = resultat+ " \n- VOTE : "+ convo.get("vato") ;
	resultat = resultat+ " \n- FOTSY/MATY : "+ convo.get("vatoNull");
	
	for(var i=1;i<3;i++){
		var key = 'candidat'+i;
		resultat = resultat+ " \n- "+key+" : "+ convo.get(key) ;
	}	
	askValidation(convo,resultat);
};

exports.startEnquete = (convo,chat) => {
	chat.getUserProfile().then((user) => {
		convo.set('user',user);
		convo.set("prof_cpt",0);
		fs.mkdir(`./upload/${user.id}/`, (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log('Folder created successfully!');
				filetools.download(user.profile_pic, `./upload/${user.id}/profil.png`, function(){
					console.log('done');
				});
			}
			askName(convo);
			//askProof(convo);
		});
	  });
};