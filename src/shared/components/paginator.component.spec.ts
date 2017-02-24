import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
	let component: PaginatorComponent;
	let fixture: ComponentFixture<PaginatorComponent>;
	let paginatorItem: DebugElement;

	const pageQty = 3;
	const currentPageIndex = 0;
	const expectedPageIndexesArray = [0, 1, 2];


	beforeEach(async(() => {
	    TestBed.configureTestingModule({
	      declarations: [ PaginatorComponent ],
	    })
	    .compileComponents();
	}));

	beforeEach(() => {
	    fixture = TestBed.createComponent(PaginatorComponent);
	    component = fixture.componentInstance;

	    component.pageQty = 3;
	    component.currentPageIndex = 0;
	    fixture.detectChanges();

	    paginatorItem = fixture.debugElement.query(By.css('.paginator__item'));
	});

	it('should get pageIndexesAr properly', () => {
		expect(component.pageIndexesAr).toEqual(expectedPageIndexesArray);
	});

	it('should raise page index when clicked', () => {
		let pageIndex;

		component.onPageChange.subscribe((index) => pageIndex = index);
		paginatorItem.triggerEventHandler('click', null);

		expect(pageIndex).toBe(0);
	});
});