import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProfilComponent } from './gestion-profil.component';

describe('GestionProfilComponent', () => {
  let component: GestionProfilComponent;
  let fixture: ComponentFixture<GestionProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
