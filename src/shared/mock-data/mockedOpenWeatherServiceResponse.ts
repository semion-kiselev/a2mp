const mockedOpenWeatherServiceResponse = {
	cod: '',
	count: 1,
	list: [
		{
			clouds: {
				all: 0 
			},
			coord: {
				lat: 0,
				lon: 0
			},
			dt: 0,
			id: 1,
			main: {
				humidity: 0,
				pressure: 0,
				temp: 0,
				temp_max: 0,
				temp_min: 0
			},
			name: '',
			sys: {
				country: '',
				sunrise: 0,
				sunset: 0
			},
			weather: [
				{
					description: '',
					icon: '',
					id: 1,
					main: ''
				}
			],
			wind: {
				deg: 0,
				gust: 0,
				speed: 0,
				var_beg: 0,
				var_end: 0
			}
		}
	],
	message: 'string'
};

export { mockedOpenWeatherServiceResponse };