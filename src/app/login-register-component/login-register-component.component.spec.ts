import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterComponentComponent } from './login-register-component.component';

describe('LoginRegisterComponentComponent', () => {
  let component: LoginRegisterComponentComponent;
  let fixture: ComponentFixture<LoginRegisterComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginRegisterComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegisterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
