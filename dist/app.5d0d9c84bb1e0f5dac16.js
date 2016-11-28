/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	__webpack_require__(23);
	const weather_module_1 = __webpack_require__(25);
	(new weather_module_1.default).start();


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
1,
/* 24 */,
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const weather_service_1 = __webpack_require__(26);
	const towns_component_1 = __webpack_require__(28);
	const map_component_1 = __webpack_require__(31);
	class WeatherModule {
	    start() {
	        this.weatherService = new weather_service_1.default();
	        this.initTownsComponent();
	        this.initMapComponent();
	    }
	    initTownsComponent() {
	        const countries = document.querySelectorAll('.b-towns');
	        if (countries.length > 0) {
	            [].forEach.call(countries, (countryEl) => {
	                new towns_component_1.default(countryEl, this.weatherService);
	            });
	        }
	    }
	    initMapComponent() {
	        const maps = document.querySelectorAll('.b-map');
	        if (maps.length > 0) {
	            [].forEach.call(maps, (mapEl) => {
	                new map_component_1.default(mapEl, this.weatherService);
	            });
	        }
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = WeatherModule;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const getJson_1 = __webpack_require__(27);
	class WeatherService {
	    constructor() {
	        this.apiKey = '0585be187827a4d56040a8a992d654ab';
	        this.urlTmp = 'http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&units=metric';
	        this.tenMinInMs = 10 * 60 * 1000;
	        this.localDataKey = 'weatherForCountries';
	        this.localSaveDateKey = 'weatherSaveDate';
	    }
	    getWeatherForCountries() {
	        const localWeatherForCountries = localStorage.getItem(this.localDataKey);
	        if (localWeatherForCountries && this.localDataIsFresh()) {
	            return Promise.resolve(JSON.parse(localWeatherForCountries));
	        }
	        return this.getCurrentPosition().then(this.fetchWeather.bind(this));
	    }
	    getCurrentPosition() {
	        return new Promise((resolve, reject) => {
	            navigator.geolocation.getCurrentPosition(resolve, reject);
	        });
	    }
	    fetchWeather(position) {
	        const lat = position.coords.latitude;
	        const lon = position.coords.longitude;
	        let url = this.urlTmp.replace(/\$\{lat\}/, '' + lat).replace(/\$\{lon\}/, '' + lon);
	        url = `${url}&appid=${this.apiKey}`;
	        return getJson_1.default(url)
	            .then(JSON.parse)
	            .then(this.formatFetchedData.bind(this))
	            .then(this.saveFormatedDataToLocalStorage.bind(this));
	    }
	    formatFetchedData(data) {
	        return data.list.map((item) => {
	            return {
	                name: item.name,
	                temp: Math.round(item.main.temp),
	                description: item.weather[0].description,
	                icon: 'wi' + item.weather[0].icon
	            };
	        });
	    }
	    saveFormatedDataToLocalStorage(data) {
	        localStorage.setItem(this.localDataKey, JSON.stringify(data));
	        localStorage.setItem(this.localSaveDateKey, '' + Date.now());
	        return data;
	    }
	    localDataIsFresh() {
	        const currentDateMs = Date.now();
	        const dataSaveDateMs = +localStorage.getItem(this.localSaveDateKey);
	        return currentDateMs - dataSaveDateMs < this.tenMinInMs;
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = WeatherService;


/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = (url) => {
	    return new Promise((resolve, reject) => {
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', url, true);
	        xhr.onload = () => {
	            if (xhr.status === 200 || xhr.status === 304) {
	                resolve(xhr.responseText);
	            }
	            else {
	                reject(xhr.status);
	            }
	        };
	        xhr.onerror = () => {
	            reject(new Error('Network Error'));
	        };
	        xhr.send();
	    });
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(29);
	class TownsComponent {
	    constructor(el, weatherService) {
	        this.el = el;
	        this.weatherService = weatherService;
	        this.rowsPerPage = 10;
	        this.currentPageIndex = 0;
	        this.renderLoader();
	        weatherService.getWeatherForCountries()
	            .then(this.renderDataAndBindEvents.bind(this))
	            .catch(this.renderError.bind(this));
	    }
	    renderLoader() {
	        this.el.innerHTML = `
				<div class="towns__loader">
					<div class="spinner">
						<div class="wBall" id="wBall_1">
							<div class="wInnerBall"></div>
						</div>
						<div class="wBall" id="wBall_2">
							<div class="wInnerBall"></div>
						</div>
						<div class="wBall" id="wBall_3">
							<div class="wInnerBall"></div>
						</div>
						<div class="wBall" id="wBall_4">
							<div class="wInnerBall"></div>
						</div>
						<div class="wBall" id="wBall_5">
							<div class="wInnerBall"></div>
						</div>
					</div>
				</div>
			`;
	    }
	    renderError() {
	        this.el.innerHTML = `
				<div class="towns__error alert danger">
					Whoops, something goes wrong...
					<br>
					Please, try again in 10 minutes.
				</div>
			`;
	    }
	    renderDataAndBindEvents(data) {
	        this.data = data;
	        this.pageQty = Math.ceil(data.length / this.rowsPerPage);
	        const pagesAr = this.getPagesArray(this.pageQty);
	        this.el.innerHTML = `
				<div class="row">
					<div class="col pull-right">
						<div id="TownsWeatherPaginator" class="towns__paginator">
						${pagesAr.length > 1 ?
	            pagesAr.map((num, index) => `
									<button 
										class="towns__paginator-item ${index === 0 ? '--selected' : 0}" 
										data-pageIndex="${num}"
									>
										${num + 1}
									</button>
								`).join('') :
	            ''}
				</div>
					</div>
				</div>
				
				<ul id="TownsWeatherList" class="towns__list">
					${this.getDataItems(data, 0, this.rowsPerPage)}
				</ul>
			`;
	        this.bindEvents();
	    }
	    rerenderDataList() {
	        const from = this.rowsPerPage * this.currentPageIndex;
	        const to = from + this.rowsPerPage;
	        const dataItems = this.getDataItems(this.data, from, to);
	        const ulEl = this.el.querySelector('#TownsWeatherList');
	        if (ulEl) {
	            ulEl.innerHTML = dataItems;
	        }
	    }
	    getDataItems(data, from, to) {
	        data = data.slice(from, to);
	        return data.map(item => `
				<li class="towns__list-item">
					<div class="row">
						<div class="towns__list-item-name-wrapper col">
							<div class="towns__list-item-name">${item.name}</div>
						</div>
						<div class="towns__list-item-info-wrapper col pull-right">
							<div class="row">
								<div class="towns__list-item-icon col">
									<i class="weather-icon ${item.icon}"></i>
								</div>
								<div class="towns__list-item-temp col">
									${item.temp}<sup class="towns__list-item-sup">°C</sup>
								</div>
								<div class="towns__list-item-description col">${item.description}</div>
							</div>
						</div>
						</div>
					</div>
				</li>
			`).join('');
	    }
	    getPagesArray(qty) {
	        let ar = [];
	        for (let i = 0; i < qty; i++) {
	            ar.push(i);
	        }
	        return ar;
	    }
	    bindEvents() {
	        const paginator = this.el.querySelector('#TownsWeatherPaginator');
	        if (paginator && this.pageQty > 1) {
	            paginator.addEventListener('click', this.onClickPaginator.bind(this));
	        }
	    }
	    onClickPaginator(e) {
	        const targetEl = e.target;
	        const paginator = e.currentTarget;
	        const pageIndex = parseInt(targetEl.getAttribute('data-pageIndex'));
	        if (pageIndex !== this.currentPageIndex) {
	            this.currentPageIndex = pageIndex;
	            this.rerenderDataList();
	            const selectedItem = paginator.querySelector('.--selected');
	            if (selectedItem)
	                selectedItem.classList.remove('--selected');
	            targetEl.classList.add('--selected');
	        }
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TownsComponent;


/***/ },
/* 29 */
1,
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(32);
	const loadGoogleMapsApi_1 = __webpack_require__(34);
	class MapsComponent {
	    constructor(el, weatherService) {
	        this.el = el;
	        this.weatherService = weatherService;
	        loadGoogleMapsApi_1.default({ key: 'AIzaSyDUXoXKPqU4Dx1GulPcmbVwfOXYDK7UsBQ' })
	            .then(this.getPositionAndRenderMap.bind(this))
	            .catch(this.renderError.bind(this));
	    }
	    getPositionAndRenderMap(googleMaps) {
	        this.weatherService.getCurrentPosition()
	            .then((position) => {
	            const latitude = position.coords.latitude;
	            const longitude = position.coords.longitude;
	            this.renderMap(googleMaps, latitude, longitude);
	        });
	    }
	    renderMap(googleMaps, latitude, longitude) {
	        new googleMaps.Map(this.el, {
	            center: { lat: latitude, lng: longitude },
	            scrollwheel: false,
	            zoom: 8
	        });
	    }
	    renderError() {
	        this.el.innerHTML = `
				<div class="map__error alert danger">
					Whoops, something goes wrong with Google map...
				</div>
			`;
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MapsComponent;


/***/ },
/* 32 */
1,
/* 33 */,
/* 34 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ({ client, key, language }) => {
	    const callbackName = '__googleMapsApiOnLoadCallback';
	    return new Promise((resolve, reject) => {
	        const scriptElement = document.createElement('script');
	        const params = [`callback=${callbackName}`];
	        if (client)
	            params.push(`client=${client}`);
	        if (key)
	            params.unshift(`key=${key}`);
	        if (language)
	            params.push(`language=${language}`);
	        scriptElement.src = `https://maps.googleapis.com/maps/api/js?${params.join('&')}`;
	        console.log(scriptElement.src);
	        window[callbackName] = () => {
	            resolve(window['google'].maps);
	            delete window[callbackName];
	        };
	        document.body.appendChild(scriptElement);
	    });
	};


/***/ }
/******/ ])));