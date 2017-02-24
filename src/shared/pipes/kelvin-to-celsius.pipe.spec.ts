import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { KelvinToCelciusPipe } from './kelvin-to-celsius.pipe';

@Component({
    selector: 'test',
    template: `
    <p>{{ text | kelvinToCelcius }}</p>
    `
})
class TestComponent {
    text: string;
}

const mockedText = '273.15';

describe('KelvinToCelciusPipe', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, KelvinToCelciusPipe]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents();
    }));

    it('should translate kelvin to celsius', async(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.text = mockedText;
        fixture.detectChanges();
        const el = fixture.debugElement.nativeElement as HTMLElement; 
        expect(el.querySelector('p').textContent).toBe('0');
    }));
});