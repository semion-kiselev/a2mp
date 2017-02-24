import { Component, Input } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { WindDegDirective } from './wind-deg.directive';

@Component({
    selector: 'test',
    template: `
    <p [dWindDeg]="45"></p>
    `
})
class TestComponent {
    @Input() dWindDeg: number;
}

describe('TempBgDirective', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, WindDegDirective]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents();
    }));

    it('should rotate wind pointer', async(() => {
        const fixture = TestBed.createComponent(TestComponent);
		const el = fixture.debugElement.nativeElement as HTMLElement;
		fixture.detectChanges();

        expect(el.querySelector('p').style.transform).toBe('rotate(45deg)');
    }));
});