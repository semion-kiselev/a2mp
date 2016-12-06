import './towns.component.scss';

import WeatherService from '../../services/weather.service';
import WeatherItem from '../../interfaces/WeatherItem';

class TownsComponent {
	private data: WeatherItem[];
	private pageQty: number;
	private rowsPerPage: number = 10;
	private currentPageIndex: number = 0;

	constructor(private el: HTMLElement, private weatherService: WeatherService) {
		this.renderLoader();

		weatherService.getWeatherForCountries()
			.then(this.renderDataAndBindEvents.bind(this))
			.catch(this.renderError.bind(this));
	}

	renderLoader(): void {
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

	renderError(): void {
		this.el.innerHTML = `
			<div class="towns__error alert danger">
				Whoops, something goes wrong...
				<br>
				Please, try again in 10 minutes.
			</div>
		`;	
	}

	renderDataAndBindEvents(data: WeatherItem[]): void {
		this.data = data;
		this.pageQty = Math.ceil(data.length / this.rowsPerPage);
		const pagesAr: Number[] = this.getPagesArray(this.pageQty);

		this.el.innerHTML = `
			<div class="row">
				<div class="col pull-right">
					<div id="TownsWeatherPaginator" class="towns__paginator">
					${ 
						pagesAr.length > 1 ? 
						pagesAr.map(
							(num: number, index: number): string => `
								<button 
									class="towns__paginator-item ${index === 0 ? '--selected' : 0}" 
									data-pageIndex="${num}"
								>
									${num + 1}
								</button>
							`
						).join('') : 
						'' 
					}
			</div>
				</div>
			</div>
			
			<ul id="TownsWeatherList" class="towns__list">
				${ this.getDataItems(data, 0, this.rowsPerPage) }
			</ul>
		`;

		this.bindEvents();
	}

	rerenderDataList(): void {
		const from: number = this.rowsPerPage * this.currentPageIndex;
		const to: number = from + this.rowsPerPage;

		const dataItems: string = this.getDataItems(this.data, from, to);
		const ulEl = this.el.querySelector('#TownsWeatherList');

		if (ulEl) {
			ulEl.innerHTML = dataItems;
		}
	}

	getDataItems(data: WeatherItem[], from: number, to: number): string {
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

	getPagesArray(qty: number): number[] {
		let ar: number[] = [];

		for (let i: number = 0; i < qty; i++) {
			ar.push(i);
		}

		return ar;
	}

	bindEvents(): void {
		const paginator = this.el.querySelector('#TownsWeatherPaginator');

		if (paginator && this.pageQty > 1) {
			paginator.addEventListener('click', this.onClickPaginator.bind(this));
		}
	}

	onClickPaginator(e: Event): void {
		const targetEl = e.target as HTMLElement;
		const paginator = e.currentTarget as HTMLElement;
		const pageIndex: number = parseInt(targetEl.getAttribute('data-pageIndex'));

		if (pageIndex !== this.currentPageIndex) {
			this.currentPageIndex = pageIndex;
			this.rerenderDataList();

			const selectedItem = paginator.querySelector('.--selected');
			if ( selectedItem ) selectedItem.classList.remove('--selected');			
			targetEl.classList.add('--selected');
		}
	}
}

export default TownsComponent;