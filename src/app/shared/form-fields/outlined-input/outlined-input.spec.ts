import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlinedInput } from './outlined-input';

describe('OutlinedInput', () => {
  let component: OutlinedInput;
  let fixture: ComponentFixture<OutlinedInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutlinedInput],
    }).compileComponents();

    fixture = TestBed.createComponent(OutlinedInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
