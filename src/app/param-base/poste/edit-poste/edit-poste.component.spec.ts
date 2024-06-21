import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPosteComponent } from './edit-poste.component';

describe('EditPosteComponent', () => {
  let component: EditPosteComponent;
  let fixture: ComponentFixture<EditPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPosteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
