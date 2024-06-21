import { Departement } from './../../../model/departement';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DepartementRequest } from '../../../payload/DepartementRequest';
import { DepartementService } from '../../../service/departement.service';

@Component({
  selector: 'app-edit-departement',
  standalone: true,
  imports: [
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    MatFormFieldModule, MatInputModule, FormsModule
  ],
  templateUrl: './edit-departement.component.html',
  styleUrl: './edit-departement.component.css'
})
export class EditDepartementComponent {

  departement!: Departement
  departementRequest!:DepartementRequest



  constructor(
    public dialogRef: MatDialogRef<EditDepartementComponent>,
    @Inject(MAT_DIALOG_DATA)
    public depart: Departement,
    private departementService : DepartementService,
  ) {

    this.departement = depart
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editer(dep:Departement){
    this.departementRequest = {libelle : dep.libelle}
    this.departementService.editdepartement(this.departement.id,this.departementRequest).subscribe({
     next : (data)=>{
       console.log(data)
      },
      error : (err)=>{
        if(err.status===401){
         // this.errorMessage = "Bad credentials"
        }
      }
    })
    this.dialogRef.close();
     }

}
