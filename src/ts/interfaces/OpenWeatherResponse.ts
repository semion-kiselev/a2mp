interface OpenWeatherResponseItemClouds {
	all: number;
}

interface OpenWeatherResponseItemCoord {
	lat: number;
	lon: number;
}

interface OpenWeatherResponseItemMain {
	humidity: number;
	pressure: number;
	temp: number;
	temp_max: number;
	temp_min: number;
}

interface OpenWeatherResponseItemSys {
	country: string;
}

interface OpenWeatherResponseItemWeaterItem {
	description: string;
	icon: string;
	id: number;
	main: string;
}

interface OpenWeatherResponseItemWind {
	deg: number;
	gust: number;
	speed: number;
	var_beg: number;
	var_end: number;
}

interface OpenWeatherResponseItem {
	clouds: OpenWeatherResponseItemClouds;
	coord: OpenWeatherResponseItemCoord;
	dt: number;
	id: number;
	main: OpenWeatherResponseItemMain;
	name: string;
	sys: OpenWeatherResponseItemSys;
	weather: OpenWeatherResponseItemWeaterItem[];
	wind: OpenWeatherResponseItemWind;
}

interface OpenWeatherResponse {
	cod: string;
	count: number;
	list: OpenWeatherResponseItem[],
	message: string;
}

export { OpenWeatherResponseItem, OpenWeatherResponse };