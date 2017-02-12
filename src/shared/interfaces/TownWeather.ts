interface TownWeather {
	id: number;
	name: string;
	description: string;
	icon: string;
	temp: number;
	favorite: boolean;
	windSpeed: number;
	windDeg: number;
	humidity: string;
	sunrise: string;
	sunset: string;
}

export { TownWeather };