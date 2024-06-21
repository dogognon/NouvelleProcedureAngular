import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { procedure } from '../../model/procedure';

@Component({
  selector: 'app-delete-procedure',
  standalone: true,
  imports: [],
  templateUrl: './delete-procedure.component.html',
  styleUrl: './delete-procedure.component.css'
})
export class DeleteProcedureComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public libelle: procedure) {

  }

}
