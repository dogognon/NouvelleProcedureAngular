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
import { Poste } from '../../model/poste';
import { PosteService } from '../../service/poste.service';
import { DeletePosteComponent } from './delete-poste/delete-poste.component';
import { EditPosteComponent } from './edit-poste/edit-poste.component';
import { NewPosteComponent } from './new-poste/new-poste.component';

@Component({
  selector: 'app-poste',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule,MatProgressSpinnerModule, 
    MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, ReactiveFormsModule, 
    FormsModule, MatIconModule, MatButtonModule, MatTooltipModule
  ],
  templateUrl: './poste.component.html',
  styleUrl: './poste.component.css'
})
export class PosteComponent  implements AfterViewInit {

  displayedColumns: string[] = ['id','service', 'libelle', 'createdAt', 'editer', 'supprimer'];
  dataSource = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private poste : PosteService,public dialog: MatDialog) {}
  ngAfterViewInit() {
    this.poste.getallposte().subscribe({
      next : (data)=>{
       // console.log(data)
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
    const dialogRef = this.dialog.open(NewPosteComponent, {
      //minWidth: '300px',
      //minHeight: '300px',
      data: '',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      window.location.reload();
      // = result;
    });
  }

  editDialog(row:Poste) {
    this.dialog.open(EditPosteComponent, {
      data: row
    });
  }

 



  deleteDialog(row:Poste,enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeletePosteComponent, {
      data:row,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }



}
