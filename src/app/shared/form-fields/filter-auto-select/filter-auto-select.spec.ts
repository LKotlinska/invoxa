import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAutoSelect } from './filter-auto-select';

describe('FilterAutoSelect', () => {
  let component: FilterAutoSelect;
  let fixture: ComponentFixture<FilterAutoSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterAutoSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterAutoSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
