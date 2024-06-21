import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Utilisateur } from '../../model/Utilisateur';
import { AuthService } from '../../service/auth.service';
import { UtilisateurService } from '../../service/utilisateur.service';
import { DeleteUtilisateurComponent } from './delete-utilisateur/delete-utilisateur.component';
import { EditUtilisateurComponent } from './edit-utilisateur/edit-utilisateur.component';
import { NewUtilisateurComponent } from './new-utilisateur/new-utilisateur.component';


@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,MatProgressSpinnerModule, MatTableModule, MatSortModule,
    MatPaginatorModule, DatePipe, ReactiveFormsModule, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule,MatSlideToggleModule
  ],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {

  displayedColumns: string[] = ['id','poste','nomPrenoms','phone','email', 'role', 'createdAt', 'editer', 'supprimer'];
  dataSource = new MatTableDataSource([]);
  ListUtilisateur : Utilisateur[] = [];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private authservice : AuthService,private utilservice : UtilisateurService,public dialog: MatDialog) {}




  deleteDialog(row:Utilisateur,enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteUtilisateurComponent, {
      data:row,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  ngAfterViewInit() {
    this.utilservice.getallutilisateur().subscribe({
      next : (data)=>{
        console.log(data)
        data.forEach((ele: Utilisateur) => {
          ele.isAdmin = ele.roles.filter(x=>x.roleName==("Administrateur")).length>0?true:false
        });
        this.dataSource = new MatTableDataSource(data);
      },
      error : (err)=>{
        if(err.status===401){
          //this.errorMessage = "Bad credentials"
        }
      }
    })
  }

  public toggle(util:Utilisateur,event: MatSlideToggleChange) {
    console.log('toggle', event.checked);
   // update privileges
   var droit = '';
   if(event.checked){
    droit = "Administrateur"
   }else{
    droit = "Utilisateur"
   }
   //event.checked
   this.utilservice.updatePrivilege(util.id,droit).subscribe({
     next : (data)=>{
       console.log(data)
     },
     error : (err)=>{
       if(err.status===401){
         //this.errorMessage = "Bad credentials"
       }
     }
   })
}

  newDialog() {
    const dialogRef = this.dialog.open(NewUtilisateurComponent, {
      minWidth: '500px',
      minHeight: '300px',
      data: '',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      window.location.reload();
      // = result;
    });
  }

  editDialog(row:Utilisateur) {
    this.dialog.open(EditUtilisateurComponent, {
    
      data: row
    });
  }


  
}
