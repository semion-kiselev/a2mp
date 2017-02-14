import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
	log(message: string, color?: string): void {
		return color?  console.log(`%c DEV: ${message}`, `color: ${color}`) : console.log(message);
	}
};

@Injectable()
export class ProdLoggerService {
	log(message: string, color?: string): void {
		return color?  console.log(`%c PROD: ${message}`, `color: ${color}`) : console.log(message);
	}
};

export function loggerFactory() {
	return (process.env.NODE_ENV === 'development') ? new LoggerService() : new ProdLoggerService();
};