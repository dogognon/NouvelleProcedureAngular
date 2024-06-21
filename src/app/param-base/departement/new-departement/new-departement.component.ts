import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DepartementService } from '../../../service/departement.service';
import { DepartementRequest } from '../../../payload/DepartementRequest';

@Component({
  selector: 'app-new-departement',
  standalone: true,
  imports: [
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    MatFormFieldModule, MatInputModule, FormsModule
  ],
  templateUrl: './new-departement.component.html',
  styleUrl: './new-departement.component.css'
})
export class NewDepartementComponent {
departementRequest!:DepartementRequest
libelle!:string

  constructor(
    public dialogRef: MatDialogRef<NewDepartementComponent>,
    private departementService : DepartementService,
    //@Inject(MAT_DIALOG_DATA)
    //public libelle: string,
  ) {
    //console.log(libelle)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
   this.departementRequest = {libelle : this.libelle}
   this.departementService.adddepartement(this.departementRequest).subscribe({
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
