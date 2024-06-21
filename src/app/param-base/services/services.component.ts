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
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Services } from '../../model/services';
import { DepartementService } from '../../service/departement.service';
import { ServicesService } from '../../service/services.service';
import { DeleteServicesComponent } from './delete-services/delete-services.component';
import { EditServicesComponent } from './edit-services/edit-services.component';
import { NewServicesComponent } from './new-services/new-services.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule,MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, ReactiveFormsModule, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  displayedColumns: string[] = ['id','departement', 'libelle', 'createdAt', 'editer', 'supprimer'];
  dataSource = new MatTableDataSource<Services>([]);
  ListServ : Services[] = [];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private dep : DepartementService,private serv : ServicesService,public dialog: MatDialog) {}






  ngAfterViewInit() {
    this.serv.getallservice().subscribe({
      next : (data)=>{
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
        console.log( this.dataSource.data)
        this.ListServ = data
      },
      error : (err)=>{
        if(err.status===401){
          //this.errorMessage = "Bad credentials"
        }
      }
    })
    //load departement
    /*this.ListServ.forEach((serv)=>{
      this.dep.getDepartementById(serv.departement_id).subscribe({
        next : (data)=>{
          console.log(data)
          serv.departement = data
        }
      })
    })
    this.dataSource = new MatTableDataSource(this.ListServ);*/

  }


  newDialog() {
    const dialogRef = this.dialog.open(NewServicesComponent, {
      data: '',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      window.location.reload();
      // = result;
    });
  }

  editDialog(row:Services) {
    this.dialog.open(EditServicesComponent, {
      data: row
     
    });
  }

 supprimerDialog(row:Services,enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DeleteServicesComponent, {
      data:row,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
