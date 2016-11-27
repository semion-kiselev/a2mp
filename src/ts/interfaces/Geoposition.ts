interface Coordinates {
	accuracy: number;
	altitude: void;
	altitudeAccuracy: void;
	heading: void;
	latitude: number;
	longitude: number;
	speed: void;
}

interface Geoposition {
	coords: Coordinates,
	timestamp: number
}

export { Geoposition }