import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Departement } from '../../../model/departement';
import { DepartementService } from '../../../service/departement.service';

@Component({
  selector: 'app-delete-departement',
  standalone: true,
  imports: [
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent
  ],
  templateUrl: './delete-departement.component.html',
  styleUrl: './delete-departement.component.css'
})
export class DeleteDepartementComponent {

  errorMessage!: string

  departement!: Departement

  constructor(public dialogRef: MatDialogRef<DeleteDepartementComponent>,
    @Inject(MAT_DIALOG_DATA)
    public depart: Departement,
    private departementService : DepartementService) {
      this.departement = depart
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    delete(dep:Departement){
      this.departementService.deletedepartement(this.departement.id).subscribe({
       next : (data)=>{
        alert("Suppression effectuee avec succes")
         console.log(data)
        },
        error : (err)=>{
          if(err.status===401){
            this.errorMessage = "Bad credentials"
          }else{
            this.errorMessage = err.error
           
          }
          alert(this.errorMessage)
        }
      })
      this.dialogRef.close();
       }

}
