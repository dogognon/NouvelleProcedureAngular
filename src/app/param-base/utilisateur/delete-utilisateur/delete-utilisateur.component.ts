import { Component, Inject } from '@angular/core';
import { Utilisateur } from '../../../model/Utilisateur';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { UtilisateurService } from '../../../service/utilisateur.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-utilisateur',
  standalone: true,
  imports: [
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent
  ],
  templateUrl: './delete-utilisateur.component.html',
  styleUrl: './delete-utilisateur.component.css'
})
export class DeleteUtilisateurComponent {

  utilisateur!: Utilisateur

  constructor(public dialogRef: MatDialogRef<DeleteUtilisateurComponent>,
    @Inject(MAT_DIALOG_DATA)
    public utili: Utilisateur,
    private utilservice : UtilisateurService) {
      this.utilisateur = utili
    }

    delete(util:Utilisateur){
      this.utilservice.deleteutilisateur(util.id).subscribe({
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
