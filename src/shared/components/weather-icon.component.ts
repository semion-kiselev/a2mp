import { Component, Input } from '@angular/core';

@Component({
	selector: 'weather-icon',
	template: `
		<div [ngSwitch]="icon" class="weather-icon-wrapper">
			<template [ngSwitchCase]="'wi01d'"><i class="weather-icon wi01d"></i></template>
			<template [ngSwitchCase]="'wi01n'"><i class="weather-icon wi01n"></i></template>
			<template [ngSwitchCase]="'wi02d'"><i class="weather-icon wi02d"></i></template>
			<template [ngSwitchCase]="'wi02n'"><i class="weather-icon wi02n"></i></template>
			<template [ngSwitchCase]="'wi03d'"><i class="weather-icon wi03d"></i></template>
			<template [ngSwitchCase]="'wi03n'"><i class="weather-icon wi03n"></i></template>
			<template [ngSwitchCase]="'wi04d'"><i class="weather-icon wi04d"></i></template>
			<template [ngSwitchCase]="'wi04n'"><i class="weather-icon wi04n"></i></template>
			<template [ngSwitchCase]="'wi09d'"><i class="weather-icon wi09d"></i></template>
			<template [ngSwitchCase]="'wi09n'"><i class="weather-icon wi09n"></i></template>
			<template [ngSwitchCase]="'wi10d'"><i class="weather-icon wi10d"></i></template>
			<template [ngSwitchCase]="'wi10n'"><i class="weather-icon wi10n"></i></template>
			<template [ngSwitchCase]="'wi11d'"><i class="weather-icon wi11d"></i></template>
			<template [ngSwitchCase]="'wi11n'"><i class="weather-icon wi11n"></i></template>
			<template [ngSwitchCase]="'wi13d'"><i class="weather-icon wi13d"></i></template>
			<template [ngSwitchCase]="'wi13n'"><i class="weather-icon wi13n"></i></template>
			<template [ngSwitchCase]="'wi50d'"><i class="weather-icon wi50d"></i></template>
			<template [ngSwitchCase]="'wi50n'"><i class="weather-icon wi50n"></i></template>
		</div>
	`
})
export class WeatherIconComponent {
	@Input() public icon: string;
}