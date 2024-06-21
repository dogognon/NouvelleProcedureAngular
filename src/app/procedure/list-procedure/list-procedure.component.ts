import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { RouterLink } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { procedure } from '../../model/procedure';
import { ProcedureService } from '../../service/procedure.service';
import { DeleteProcedureComponent } from '../delete-procedure/delete-procedure.component';
import { EditProcedureComponent } from '../edit-procedure/edit-procedure.component';
import { NewProcedureComponent } from '../new-procedure/new-procedure.component';

@Component({
  selector: 'app-list-procedure',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTreeModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule, MatInputModule, MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatProgressBarModule,
    NgxExtendedPdfViewerModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    RouterLink,
    MatInputModule,
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    MatFormFieldModule, MatInputModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatTableModule,MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, ReactiveFormsModule, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule

  ],
  templateUrl: './list-procedure.component.html',
  styleUrl: './list-procedure.component.css'
})
export class ListProcedureComponent {

  displayedColumns: string[] = ['id', 'nom','commentaire','departement','service','poste', 'createdAt', 'editer', 'supprimer'];
  dataSource = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private proc : ProcedureService,public dialog: MatDialog) {}




  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteProcedureComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  ngAfterViewInit() {
    this.proc.getallProcedure().subscribe({
      next : (data)=>{
        console.log("procedure"+data)
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
    const dialogRef = this.dialog.open(NewProcedureComponent, {
      minWidth: '300px',
      minHeight: '300px',
      data: '',
    });
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      //console.log('The dialog was closed'+result);
      // = result;
    });
  }

  editDialog(row:procedure) {
    this.dialog.open(EditProcedureComponent, {
      minWidth: '90%',
      minHeight: '90%',
      data:row,
    });
  }

 /* supprimerDialog(row:Departement) {
    this.dialog.open(NewDepartementComponent, {
      minWidth: '300px',
      minHeight: '300px',
      /*data: {
        animal: 'panda',
      },
    });
  }*/
}
