import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcedureComponent } from './list-procedure.component';

describe('ListProcedureComponent', () => {
  let component: ListProcedureComponent;
  let fixture: ComponentFixture<ListProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProcedureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
