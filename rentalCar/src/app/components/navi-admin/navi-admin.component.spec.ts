import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviAdminComponent } from './navi-admin.component';

describe('NaviAdminComponent', () => {
  let component: NaviAdminComponent;
  let fixture: ComponentFixture<NaviAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaviAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaviAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
