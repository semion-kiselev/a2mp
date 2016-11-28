interface Coords {
	lat: number;
	lng: number;
}

interface Options {
	center: Coords;
	scrollwheel: boolean;
	zoom: number;
}

interface Map {
	new (el: HTMLElement, options: Options): void;
}

interface GoogleMaps {
	Map: Map
}

export { GoogleMaps };