import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionesPropias } from './validaciones-propias';

describe('ValidacionesPropias', () => {
  let component: ValidacionesPropias;
  let fixture: ComponentFixture<ValidacionesPropias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidacionesPropias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidacionesPropias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
