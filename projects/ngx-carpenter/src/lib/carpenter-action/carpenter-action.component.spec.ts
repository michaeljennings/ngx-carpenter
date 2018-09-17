import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpenterActionComponent } from './carpenter-action.component';

describe('CarpenterActionComponent', () => {
  let component: CarpenterActionComponent;
  let fixture: ComponentFixture<CarpenterActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpenterActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpenterActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
