import { DatePipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
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
import { Departement } from '../../model/departement';
import { DepartementService } from '../../service/departement.service';
import { DeleteDepartementComponent } from './delete-departement/delete-departement.component';
import { EditDepartementComponent } from './edit-departement/edit-departement.component';
import { NewDepartementComponent } from './new-departement/new-departement.component';

@Component({
  selector: 'app-departement',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule,MatProgressSpinnerModule, 
    MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, ReactiveFormsModule, 
    FormsModule, MatIconModule, MatButtonModule, MatTooltipModule
  ],
  templateUrl: './departement.component.html',
  styleUrl: './departement.component.css'
})
export class DepartementComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'libelle', 'createdAt', 'editer', 'supprimer'];
  dataSource = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private dep : DepartementService,public dialog: MatDialog) {}




  ngAfterViewInit() {
    this.dep.getalldepartement().subscribe({
      next : (data)=>{
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
      },
      error : (err)=>{
        if(err.status===401){
          //this.errorMessage = "Bad credentials"
        }
      }
    })
  }


  newDialog() {
    const dialogRef = this.dialog.open(NewDepartementComponent, {
    
      data: '',
    });
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      //console.log('The dialog was closed'+result);
      // = result;
    });
  }

  editDialog(row:Departement) {
    this.dialog.open(EditDepartementComponent, {
      data:row,
    });
  }


  deleteDialog(row:Departement,enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteDepartementComponent, {
      data:row,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }





}
