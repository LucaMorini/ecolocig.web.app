//user.uid da errore se non c'é nessun utente loggato

auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user.displayName);
	console.log('\n user logged in: ', user.photoURL);
	document.getElementById('logout-li').style.display="block";
	document.getElementById('login-li').style.display="none";

	//Scoreboard
	var cest = [];
	db.collection("cestino").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			var cod_ut = doc.data().utente;
			if(!userExists(cod_ut)){
				var rif = {
					ut: doc.data().utente,
					nome:doc.data().nome_utente,
					val: doc.data().valore,
					count: 1,
					media: doc.data().valore,
				}
				cest.push(rif);
			}else{
				for(var i = 0 ; i <cest.length ; i++){
					if(cest[i].ut == cod_ut){
						cest[i].val += doc.data().valore;
						cest[i].count ++;
						cest[i].media = cest[i].val / cest[i].count;
					}
				}
			}
		});
		cest.sort(function(a, b){return a.media - b.media});					//ordine crescente  (decrescente = b - a)
		console.log("ciaoone 0");
		if(cest.length<5){
			for(i=0; i<cest.length ; i++){
				leaderboard(i+1 , cest[i].nome , cest[i].media)
				console.log('cest: '+i+') '+cest[i].nome + ' , '+ cest[i].media );
			}
		}else{
			for(i=0; i<5 ; i++){
				leaderboard(i+1 , cest[i].nome , cest[i].media)
				console.log('cest: '+i+') '+cest[i].nome + ' , '+ cest[i].media );
			}
		}
	});
	function userExists(cod) {
		return cest.some(function(el) {
			return el.ut === cod;
		}); 
	}
	
//Calendario
	var date = [];
	db.collection('cestino').where("utente", "==", user.uid).onSnapshot((snapshot) => {
		snapshot.forEach((doc) => {
			var today = doc.data().data.toDate();
			var gior = today.getDate() +"-"+ (today.getMonth()+1) +"-"+ today.getFullYear();
			if(!dateExists(gior)){
				var rif = {
					data: gior,
					val: doc.data().valore,
					count: 1,
					media: doc.data().valore,
				}
				date.push(rif);
			}else{
				for(var i = 0 ; i <date.length ; i++){
					if(date[i].data == gior){
						date[i].val += doc.data().valore;
						date[i].count ++;
						date[i].media = date[i].val / date[i].count;
					}
				}
			}
		})
		date.sort(function(a,b){return new Date(b.data) - new Date(a.data)});
		console.log("ciaoone date ------------");
		for(i=0; i<date.length ; i++){
			calendario(i,date[i].data , date[i].media);
			console.log('date: '+i+') '+date[i].data + ', media: '+ date[i].media );
		}
	})
	function dateExists(param) {
	  	return date.some(function(el) {
	    	return el.data === param;
	  	}); 
	}

//La mia giornata
	var tot = 0;
	var giornata = [];
	var data = new Date();
	db.collection('cestino').where("utente", "==", user.uid).onSnapshot((snapshot) => { 		//.where("data", "==", data)
		// console.log("sei entrato");
		giornata = [];
		tot = 0
		snapshot.forEach((doc) => {
			console.log("sei nel doc: "  + doc.id);
			var today = doc.data().data.toDate();
			var giorno = today.getDate() +"-"+ (today.getMonth()+1) +"-"+ today.getFullYear();
			var ora = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var time = new Date();
			var oggi = time.getDate() +"-"+ (time.getMonth()+1) +"-"+ time.getFullYear();
			if(giorno == oggi){
				if(!dayExists(ora)){
					var ref = {
						nome: doc.data().nome_rifiuto,
						tipo: doc.data().tipo_rifiuto,
						val: doc.data().valore,
						time: ora,
						id: doc.id,
					}
					giornata.push(ref);
				}else{
					console.log("documento non di oggi");
				}
			}
			//console.log("ecco tutte le date: "+ today.getDate() +"-"+ (today.getMonth()+1) +"-"+ today.getFullYear());
		})
		
		console.log("-------------- GIORNATA ------------");
		for(i=0; i<giornata.length ; i++){
			tot += giornata[i].val;
			mia_giornata( i+1 , giornata[i].nome , giornata[i].tipo, giornata[i].val , giornata[i].id);
			console.log('rifiuto: '+(i+1)+') '+ giornata[i].nome + ', tipo: '+ giornata[i].tipo + ', valore: '+ giornata[i].val );
		}
		console.log('tot: ' + tot)
		tot = tot/10;
		var old_tot;
		if(tot > 100){
			old_tot = tot;
			tot = 100;
		}
		cest_img(tot);
		console.log('totale giornaliero: ' + tot);
	})
	function dayExists(param) {
	  	return giornata.some(function(el) {
	    	return el.time === param;
	  	}); 
	}

	//lez 24  real time listener (database)
	db.collection('cestino').where("utente", "==", user.uid).onSnapshot((snapshot) => {
		snapshot.docChanges().forEach(change => {
			//console.log(change.doc.id)
/*			if(change.type === 'added'){								//TOGLIERE
				prova(change.doc.data(), change.doc.id);		//lez 25
				//console.log(change.doc.id)
//				console.log(change.doc.utente)
			}
*/			if(change.type === 'removed'){
				//lez 28: togli dati dal sito
				removeWaste(change.doc.id);						//lez 28
			}
		})
	})
	//lez 27: aggiungere ricette
	
	const form = document.querySelector('form');
	form.addEventListener('submit', evt => {		
		evt.preventDefault();
		var ciao;
		
		switch(form.tipo.value) {
			case "carta":
			     ciao = 2,53 ;
			    break;
			case "plastica":
				switch(form.cod.value) {
					case "1":			// 1 PET
					     ciao = 1,14;
					    break;
					case "2":		// 2 HDPE
					     ciao = 0,66;
					    break;
					case "3":			// 3 PVC
					     ciao = 1,93;
					    break;
					case "4":		// 4 LDPE
					     ciao = 1,8 ;
					    break;
					case "5":			// 5 PP
					     ciao = 0,73 ;
					    break;
					case "6":			// 6 PS
					     ciao = 2,5 ;
					    break;
					default:
					    ciao = 0,95;
					}
			    break;
			case "vetro":
			     ciao = 0,25;
			    break;
			case "organico":
			     ciao = 3,66 ;
			    break;
			case "indifferenziato":
			     ciao = 2,85;
			    break;
			default:
			    ciao = 1;
		}
		ciao *= form.grand.value;
		
/*
		if( form.tipo.value == 'plastica' ){
			ciao = 2;
			if(form.grand.value == 10){
				ciao *= 2;
			}
		}else if(form.tipo.value == 'carta'){
			ciao = 1;
			if(form.grand.value == 10){
				ciao *= 1;
			}
		}else if(form.tipo.value == 'vetro'){
			ciao = 3;
			if(form.grand.value == 10){
				ciao *= 3;
			}
		}else if(form.tipo.value == 'indifferenziato'){
			ciao = 5;
			if(form.grand.value == 10){
				ciao *= 5;
			}
		}else if(form.tipo.value == 'organico'){
			ciao = 4;
			if(form.grand.value == 10){
				ciao *= 4;
			}
		}
*/		
							/*	var today = new Date();
								console.log("la data del  tuo documento e': "+firebase.firestore.FieldValue.serverTimestamp());
							*/
							
							
		const rifiuti = {
			utente: user.uid,		
			nome_utente: user.displayName,
			nome_rifiuto: form.nome.value,
			tipo_rifiuto: form.tipo.value,	
			grandezza: form.grand.value,		
			codice:form.cod.value,
			data: firebase.firestore.FieldValue.serverTimestamp(),		
			valore: ciao,
		};
		
		db.collection('cestino').add(rifiuti)								//comando Database
			.catch(err => console.log(err));
		
		form.nome.value = '';	
		form.tipo.value = '';
		form.grand.value = '';
		form.cod.value = '';
	})

	//lez 28: togliere ricette (= togliere dati da database)
	
	const wasteContainer = document.querySelector('#elenco_giornata');		
	wasteContainer.addEventListener('click', evt => {
		console.log(evt);
		if(evt.target.tagName === 'I'){
			const id = evt.target.getAttribute('data-id');
			db.collection('cestino').doc(id).delete();						//comando Database
		}
	})
  } else {
    console.log('user logged out');
	document.getElementById('login-li').style.display="block";
	document.getElementById('logout-li').style.display="none";	
  }
})

//google login
const login = document.querySelector('#login');
login.addEventListener('click', (e) => {
	console.log("hai premuto Login");
  e.preventDefault();
	auth.signInWithPopup(provider).then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
	console.log(credential);
	console.log("hai effettuato il Login");
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
	console.log(token);
    // The signed-in user info.
    var user = result.user;
	console.log(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
	return caches.match('/pag/fallback.html')
  });
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
	console.log("hai premuto Logout");
  	e.preventDefault();
	auth.signOut().then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
	console.log("hai effettuato il Logout");
  }).catch((error) => {
	console.log("ho incontrato un errore"+error);
 });
});
