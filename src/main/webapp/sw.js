//lez 15: caches the events
//lez 17: cambia nome 'staticCacheName' ogni volta che cambi uno dei file contenuto negli 'assets'
const staticCacheName = 'staticache-v0';
const dynamicCacheName = 'dynamicache-v0'		//lez 18 : dynamic  cache

const assets = [
	'/',
	'assets/css/fontawesome-all.min.css',
	'assets/css/main.css',
	'assets/css/noscript.css',
	'assets/img/sfondo.png',
	'assets/js/util.js',
	'assets/js/main.js',
	'assets/js/registersw.js',
	'assets/js/ui.js',
	'assets/js/breakpoints.min.js',
	'assets/js/browser.min.js',
	'assets/js/jquery.min.js',
	'/index.html',
	'/404.html',
	'/pag/fallback.html',			//lez 19  offline pages not cached
	
	/*
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/materialicons/v98/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
	*/
];

//lez 21: limit cache size
const limitCacheSize = (name, size) =>  {
	caches.open(name).then(cache =>{
		  cache.keys().then(keys =>{
			if(keys.length > size){
				cache.delete(keys[0]).then(limitCacheSize(name, size));
			}
		})
	})
}

// install event
self.addEventListener('install', evt => {
  console.log('service worker installed');	//lez 15
	evt.waitUntil(
		caches.open(staticCacheName).then(cache => {
			console.log('caching shell assets');
			cache.addAll(assets);
		})
	);
	//
});

// activate event
self.addEventListener('activate', evt => {
  console.log('service worker activated');	//lez 17
	evt.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key !== staticCacheName && key !== dynamicCacheName)
				.map(key => caches.delete(key))
			)
		})
		
	);
	//
});

//lez 12
// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event' , evt);
if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
	evt.respondWith(								//lez 24
		caches.match(evt.request).then(cacheRes => {
			return cacheRes || fetch(evt.request).then(fetchRes => {		//lez 18: dynamic cache
				return caches.open(dynamicCacheName).then(cache =>{
					cache.put(evt.request.url, fetchRes.clone());
					limitCacheSize(dynamicCacheName, 15)		//lez 21: limit caching
					return fetchRes;
					})
				});
			}).catch(() =>{ 		//lez 20: fallback solo per pagine html
				if(evt.request.url.indexOf('.html') > -1){
					return caches.match('/pag/fallback.html')
				}
			})
		);
	}
});