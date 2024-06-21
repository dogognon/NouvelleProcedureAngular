import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Poste } from '../../../model/poste';
import { PosteService } from '../../../service/poste.service';

@Component({
  selector: 'app-delete-poste',
  standalone: true,
  imports: [
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent
  ],
  templateUrl: './delete-poste.component.html',
  styleUrl: './delete-poste.component.css'
})
export class DeletePosteComponent {



  poste!: Poste

  constructor(public dialogRef: MatDialogRef<DeletePosteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public pos: Poste,
    private posteService : PosteService) {
      this.poste = pos
    }

    delete(pos:Poste){
      this.posteService.deleteposte(this.poste.id).subscribe({
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

       onNoClick(): void {
        this.dialogRef.close();
      }
}
