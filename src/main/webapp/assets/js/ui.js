/*
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});
*/
/*
const rifiuti = document.querySelector('#nuovi_rifiuti');				//parte di INTRO: da togliere
// dati delle ricette
const renderRecipe = (data, id) => {
	const html = `
	<div class="card-panel rifiuto white row" data-id="${id}">
      <img src="/assets/img/img-a-cazzo.jpg" style="width: 100%, max-width: 50px;" alt="recipe thumb">
      <div class="rifiuto-dettagli">
		<div class="rifiuto-nome">${data.nome_rifiuto}</div>
        <div class="rifiuto-tipo">${data.tipo_rifiuto}</div>
        <div class="rifiuto-grand">${data.grandezza}</div>
		<div class="rifiuto-cod">${data.codice}</div>     <!--prendo i dati all'interno del campo 'ricetta' -->
      </div>
      <div class="rifiuto-cancella">
		<i class="fas fa-trash" data-id="${id}"></i>
      </div>
    </div>
	`;
	
	rifiuti.innerHTML += html;
	//document.getElementById("nuovi_rifiuti").outerHTML = "";
};

const prova = (data,id) => {											//Togliere anche questo
	var d = new Date();
	var og = d.getDate() +"-"+ (d.getMonth()+1) +"-"+ d.getFullYear();
	var to_dat = data.data.toDate();
	var dat  =  to_dat.getDate() +"-"+ (to_dat.getMonth()+1) +"-"+ to_dat.getFullYear();
	if(dat == og){
		const html = `
		<li class="lista_rif" data-id=${id}> ${data.nome_rifiuto} (${data.tipo_rifiuto}): ${data.valore} 
		<i class="fas fa-trash" data-id="${id}" style="text-align:'right'"></i>
		</li>
		`;
		
		rifiuti.innerHTML += html;
	}else{
		console.log("nessun oggetto aggiunto oggi");
	}
	
}


//remove recipe from dom
const removeReipe = (id) => {												//si puó togliere
	const rifiuto = document.querySelector(`.rifiuto[data-id=${id}]`);
	rifiuto.remove();
};
*/
const removeWaste = (id) => {
	const rifiuto = document.querySelector(`.lista_rif[data-id=${id}]`);
	rifiuto.remove();
};

const score = document.querySelector('#score');
const leaderboard = (num,user,value) => {
	var colore;
	if(num == 0){
		colore = "#00ff00";		//verde
	}else if(num == 1){
		colore = "#80ff00";		//verde chiaro
	}else if(num == 2){
		colore = "#ffff00";		//giallo
	}else if(num == 3){
		colore = "#ff8000";		//arancione
	}else if(num == 4){
		colore = "#ff0000";		//rosso
	}else if(num == 5){
		colore = "#660000";		//marrone
	}
	const html = `
	<div class="card-panel white row">
		<h4 class="major">Il numero ${num} di Non SprECO é: ${user}</h4>
		<p> con un impatto medio di: <span>${value}</span></p>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
			aria-describedby="desc" role="progressbar" 	height="50%" width="50%"	
			xmlns:xlink="http://www.w3.org/1999/xlink">
		  <title>Trash</title>
		  <desc>A flat styled icon from Orion Icon Library.</desc>
		  <!-- 	colore sfondo	 -->
		  <path data-name="layer2" fill="${colore}" d="M11.066 2l6.032 60h30l5.937-60H11.066z"></path>
		  <!--  coperchio	-->
		  <path data-name="layer1" d="M58 3H6a1 1 0 0 1 0-2h52a1 1 0 0 1 0 2z" fill="#7c89ad"></path>
		  <!-- struttura esterna  -->
		  <path data-name="layer1" d="M47 63H17a1 1 0 0 1-1-.9l-6.026-60a1 1 0 0 1 1.99-.2L17.9 61h28.19l5.852-59.1a1 1 0 1 1 1.99.2L48 62.1a1 1 0 0 1-1 .9z" fill="#7c89ad"></path>
		  <!--  righe orizzontali interne -->
		  <path data-name="layer1" d="M51.531 17H12.57a1 1 0 0 1 0-2h38.961a1 1 0 0 1 0 2zM50.1 31H13.958a1 1 0 1 1 0-2H50.1a1 1 0 0 1 0 2zm-1.517 16H15.392a1 1 0 1 1 0-2h33.191a1 1 0 0 1 0 2z" fill="#7c89ad" fill-opacity="0.7"></path>
		  <!--  righe verticali interne -->
		  <path data-name="layer1" d="M27 63a1 1 0 0 1-1-.95l-3-60a1 1 0 1 1 2-.1l3 60a1 1 0 0 1-.95 1.05zm9.961 0h-.052a1 1 0 0 1-.948-1.049l3.04-60a1 1 0 1 1 2 .1l-3.04 60a1 1 0 0 1-1 .949z" fill="#7c89ad" fill-opacity="0.7"></path>
		</svg>
		<br>
		<br>
		<br>
		<br>
    </div>
	`;
	
	score.innerHTML += html;
};


const calendar = document.querySelector('#cal');
const calendario = (num, data, media) => {
	var colore;
	if(media <= 80){
		colore = "#00ff00";
	}else if(media <= 100){
		colore = "#ffff00";
	}else {
		colore = "#ff0000";
	}
	const html = `
	<div class="card-panel white row" style="content-align:center">
		<h4 class="major">Giorno ${data}</h4>
		<p> Impatto del giorno: <span>${media}</span></p>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
			aria-describedby="desc" role="progressbar" 	height="30%" width="30%"	
			xmlns:xlink="http://www.w3.org/1999/xlink">
		  <title>Trash</title>
		  <desc>A flat styled icon from Orion Icon Library.</desc>
		  <!-- 	colore sfondo	 -->
		  <path data-name="layer2" fill="${colore}" d="M11.066 2l6.032 60h30l5.937-60H11.066z"></path>
		  <!--  coperchio	-->
		  <path data-name="layer1" d="M58 3H6a1 1 0 0 1 0-2h52a1 1 0 0 1 0 2z" fill="#7c89ad"></path>
		  <!-- struttura esterna  -->
		  <path data-name="layer1" d="M47 63H17a1 1 0 0 1-1-.9l-6.026-60a1 1 0 0 1 1.99-.2L17.9 61h28.19l5.852-59.1a1 1 0 1 1 1.99.2L48 62.1a1 1 0 0 1-1 .9z" fill="#7c89ad"></path>
		  <!--  righe orizzontali interne -->
		  <path data-name="layer1" d="M51.531 17H12.57a1 1 0 0 1 0-2h38.961a1 1 0 0 1 0 2zM50.1 31H13.958a1 1 0 1 1 0-2H50.1a1 1 0 0 1 0 2zm-1.517 16H15.392a1 1 0 1 1 0-2h33.191a1 1 0 0 1 0 2z" fill="#7c89ad" fill-opacity="0.7"></path>
		  <!--  righe verticali interne -->
		  <path data-name="layer1" d="M27 63a1 1 0 0 1-1-.95l-3-60a1 1 0 1 1 2-.1l3 60a1 1 0 0 1-.95 1.05zm9.961 0h-.052a1 1 0 0 1-.948-1.049l3.04-60a1 1 0 1 1 2 .1l-3.04 60a1 1 0 0 1-1 .949z" fill="#7c89ad" fill-opacity="0.7"></path>
		</svg>
		<br>
		<br>
		<br>
		<br>
    </div>
	`;
	if(num == 0){
		calendar.innerHTML = html;
	}else{
		calendar.innerHTML += html;
	}
};

const elenco = document.querySelector('#elenco_giornata');
const mia_giornata = (numero, nome, tipo, valore, id) => {			//ultima prova, 	FUNZIONA
	if(numero == 1){
		const html = `
			<li class="lista_rif" data-id=${id}>${numero}) ${nome} (${tipo}): ${valore} 
			<i class="fas fa-trash" data-id="${id}" style="text-align:'right'"></i>
			</li>
			`;
		elenco.innerHTML = html;
	}else{
		const html = `
			<li class="lista_rif" data-id=${id}>${numero}) ${nome} (${tipo}): ${valore} 
			<i class="fas fa-trash" data-id="${id}" style="text-align:'right'"></i>
			</li>
			`;
		elenco.innerHTML += html;
	}
	
};
															//a posto
const cestino = document.querySelector('#img_cestino');
const cest_img = (tot) => {
	console.log("il totale del cestino e " + tot);
	const html = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
	aria-describedby="desc" role="progressbar" 	height="100%" width="100%"	
	xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs>
    <linearGradient id="1" x1="0%" y1="100%" x2="0%" y2="0%">
      <!-- soglie cambi colore da impostare con javascript -->
      <stop offset="0%" stop-color="#00FF00" />				<!-- inizio = verde -->
      <stop offset="${tot}%" stop-color="#996600" />			<!-- soglia 1: fine verde, inizio rosso -->
      <stop offset="${tot}%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#FFFFFF" />
<!--      <stop offset="80%" stop-color="#600000" />			 soglia 2: fine rosso, inizio nero -->
<!--      <stop offset="100%" stop-color="#000000" />			 fine = nero -->		
    </linearGradient>
	</defs>
  <title>Trash</title>
  <desc>A flat styled icon from Orion Icon Library.</desc>
  <!-- 	colore sfondo	 -->
  <path data-name="layer2" fill="url(#1)" d="M11.066 2l6.032 60h30l5.937-60H11.066z"></path>
  <!--		ombra  
  <path data-name="opacity" fill="#000064" opacity=".15" d="M31.953 2H11.066l6.032 60h14.855V2z"></path>
  -->
  <!--  coperchio	-->
  <path data-name="layer1" d="M58 3H6a1 1 0 0 1 0-2h52a1 1 0 0 1 0 2z" fill="#7c89ad"></path>
  <!-- struttura esterna  -->
  <path data-name="layer1" d="M47 63H17a1 1 0 0 1-1-.9l-6.026-60a1 1 0 0 1 1.99-.2L17.9 61h28.19l5.852-59.1a1 1 0 1 1 1.99.2L48 62.1a1 1 0 0 1-1 .9z" fill="#7c89ad"></path>
  <!--  righe orizzontali interne -->
  <path data-name="layer1" d="M51.531 17H12.57a1 1 0 0 1 0-2h38.961a1 1 0 0 1 0 2zM50.1 31H13.958a1 1 0 1 1 0-2H50.1a1 1 0 0 1 0 2zm-1.517 16H15.392a1 1 0 1 1 0-2h33.191a1 1 0 0 1 0 2z" fill="#7c89ad" fill-opacity="0.7"></path>
  <!--  righe verticali interne -->
  <path data-name="layer1" d="M27 63a1 1 0 0 1-1-.95l-3-60a1 1 0 1 1 2-.1l3 60a1 1 0 0 1-.95 1.05zm9.961 0h-.052a1 1 0 0 1-.948-1.049l3.04-60a1 1 0 1 1 2 .1l-3.04 60a1 1 0 0 1-1 .949z" fill="#7c89ad" fill-opacity="0.7"></path>
  
</svg>
	`;
	
	cestino.innerHTML = html;
};
