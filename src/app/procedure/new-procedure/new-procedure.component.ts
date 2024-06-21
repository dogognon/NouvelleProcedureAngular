
import { FlatTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
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
import { DragDirective, FileHandle } from '../../drag.directive';
import { Departement } from '../../model/departement';
import { DepartementService } from '../../service/departement.service';
import { ProcedureService } from '../../service/procedure.service';
import { DynamicDataSource, DynamicDatabase, DynamicFlatNode } from '../datasource';

@Component({
  selector: 'app-new-procedure',
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
    MatInputModule,
    MatButtonModule,
    RouterLink,
    DragDirective,
    MatFormFieldModule, MatInputModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatTableModule,MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, ReactiveFormsModule, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule

  ],
  templateUrl: './new-procedure.component.html',
  styleUrl: './new-procedure.component.css'
})
export class NewProcedureComponent {

  nom!:string;
  commentaire!:string;
  file!: File;



  list_departement : Departement[]= [];
  pdfFile="";


  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
  database: DynamicDatabase

  constructor(database: DynamicDatabase,private procedureService : ProcedureService,private dep : DepartementService,private cdRef: ChangeDetectorRef) {
    this.database = database;
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    this.dataSource.data = database.initialData();
  }

  //, 'editer'

  displayedColumns: string[] = ['id', 'libelle', 'createdAt', 'supprimer'];
  dataSourcemat = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcemat.filter = filterValue.trim().toLowerCase();
  }

/*
  onNoClick(): void {
    this.dialogRef.close();
  }*/

  save() {
    this.getLevel(this.treeControl.dataNodes[0])
   console.log(this.nom,this.commentaire,this.file,this.selectedDepartementList,this.selectedServiceList,this.selectedPosteList)

   this.selectedDepartementList.toString();
   this.selectedServiceList.toString();
   this.selectedPosteList.toString();

   this.procedureService.uploadProcedure(this.nom,this.commentaire, this.file, this.selectedDepartementList.toString(), this.selectedServiceList.toString(), this.selectedPosteList.toString()).subscribe({
    next : (data)=>{
      console.log(data)
     },
     error : (err)=>{
       if(err.status===401){
        // this.errorMessage = "Bad credentials"
       }
     }
   })
  /* this.dialogRef.close();*/

    }


  public GetFileOnLoad(event: any) {
    this.file = event.target.files[0];
    var element = document.getElementById("fakeFileInput") as HTMLInputElement | null;
    if(element != null) {
      element.value = this.file?.name;
    }
  }
  files: FileHandle[] = [];
  filesDropped(files: FileHandle[]): void {
    this.file = files[0].file;
    var element = document.getElementById("fakeFileInput") as HTMLInputElement | null;
    if(element != null) {
      element.value = this.file?.name;
    }
  }


  ListePDF(node: DynamicFlatNode){
    console.log(node.item,node.level)
    // level 0 departement
    // level 1 service
    // level 2 poste

    switch (node.level) {
      case 0:
        console.log('departement'+ node.item);
        this.procedureService.getprocedurebydepartement(node.item).subscribe({
          next : (data)=>{
            //this.listpdf = data
           console.log(data)
          },
          error : (err)=>{
            if(err.status===401){
             // this.errorMessage = "Bad credentials"
            }
          }
        })
        break;
      case 1:
        console.log('service'+ node.item);
        this.procedureService.getprocedurebyservice(node.item).subscribe({
          next : (data)=>{
            //this.listpdf = data
           console.log(data)
          },
          error : (err)=>{
            if(err.status===401){
             // this.errorMessage = "Bad credentials"
            }
          }
        })
        break;
      case 2:
        console.log('poste'+ node.item);
        this.procedureService.getprocedurebyposte(node.item).subscribe({
          next : (data)=>{
            //this.listpdf = data
           console.log(data)
          },
          error : (err)=>{
            if(err.status===401){
             // this.errorMessage = "Bad credentials"
            }
          }
        })
        break;
      default:
        console.log('Erreur');
    }
  }



ngAfterViewInit() {
  /*this.dep.getalldepartement().subscribe({
    next : (data)=>{
      console.log(data)
      this.dataSourcemat = new MatTableDataSource(data);
    },
    error : (err)=>{
      if(err.status===401){
        //this.errorMessage = "Bad credentials"
      }
    }
  })*/
  this.dep.getalldepartement().subscribe({
    next : (data)=>{
     //data;
     this.database.dataMap.clear();
     this.database.rootLevelNodes.splice(0,this.database.rootLevelNodes.length);
      console.log(data)
       this.list_departement = data;
       console.log(this.mapDepartementList(data));
       this.database.dataMap = this.mapDepartementList(data);
       data.forEach((dep:Departement) => {
        this.database.rootLevelNodes.push(dep.libelle)
       });
       this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
       this.dataSource = new DynamicDataSource(this.treeControl, this.database);
       this.dataSource.data = this.database.initialData();
    },
    error : (err)=>{
      if(err.status===401){
        //this.errorMessage = "Bad credentials"
      }
    }
  })

  this.cdRef.detectChanges();
}




mapDepartementList(departementList:Departement[] ){

 // Créer un nouveau Map pour stocker les libellés et les services
const resultMap = new Map<string, string[]>();

// Parcourir chaque département
departementList.forEach(departement => {
  // Vérifier si le département a des services
  if (departement.service && departement.service.length > 0) {
    const serviceLibelles: string[] = [];

    // Parcourir chaque service du département
    departement.service.forEach(service => {
      serviceLibelles.push(service.libelle);

      // Vérifier si le service a des postes
      if (service.poste && service.poste.length > 0) {
        const posteLibelles = service.poste.map(poste => poste.libelle);
        resultMap.set(service.libelle, posteLibelles);
      }
    });

    // Ajouter les libellés de service au Map pour le département
    resultMap.set(departement.libelle, serviceLibelles);
  }
});

return resultMap;
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


allComplete: boolean[] = [false];
selectedDepartementList :string[]=[];
selectedServiceList: string[]=[];
selectedPosteList: string[]=[];
updateAllComplete(node: DynamicFlatNode) {

  const descendants = this.treeControl.getDescendants(node);

  // Mise à jour de l'état complet pour le niveau inférieur (node.level + 1)
  if (node.level + 1 < this.allComplete.length) {
    const lowerLevelDescendants = descendants.filter(descendant => descendant.level === node.level + 1);
    this.allComplete[node.level + 1] = lowerLevelDescendants.some(descendant => descendant.isChecked) && !this.allComplete[node.level];
  }

  // Mise à jour de l'état complet pour le niveau actuel (node.level)
  this.allComplete[node.level+1] = descendants.some(descendant => descendant.isChecked) && !this.allComplete[node.level];
}
someComplete(node: DynamicFlatNode): boolean {
  const descendants = this.treeControl.getDescendants(node);
  if (descendants && descendants.length > 0) {
    return descendants.some(descendant => descendant.isChecked) && !this.allComplete[node.level];
  }
  return false;
}
setAll(node: DynamicFlatNode, completed: boolean) {
  // faire une methode de recurperation des selection pour tous les noeuds(departement, service et poste)
  console.log(node);
  switch (node.level) {
    case 0:
      console.log("Aucun departement n'a été effectué")
      if(!node.isChecked){
        this.selectedDepartementList.push(node.item)
      }else{
        const indexToRemove = this.selectedDepartementList.indexOf(node.item);

if (indexToRemove !== -1) {
  this.selectedDepartementList.splice(indexToRemove, 1);
}

      }
      break;
      case 1:
        console.log("Aucun service n'a été effectué")
        if(!node.isChecked){
          this.selectedServiceList.push(node.item)
        }else{
          const indexToRemove = this.selectedServiceList.indexOf(node.item);

  if (indexToRemove !== -1) {
    this.selectedServiceList.splice(indexToRemove, 1);
  }

        }
        break;
        case 2:
          console.log("Aucun poste n'a été effectué")
          if(!node.isChecked){
            this.selectedPosteList.push(node.item)
          }else{
            const indexToRemove = this.selectedPosteList.indexOf(node.item);

    if (indexToRemove !== -1) {
      this.selectedPosteList.splice(indexToRemove, 1);
    }

          }
          break;
      default:
        console.log("Aucune selection n'a été effectué")
  }

  const descendants = this.treeControl.getDescendants(node);
  node.isChecked = completed;
  descendants.forEach(descendant => descendant.isChecked = completed);
  this.updateAllComplete(node); // Mettre à jour l'état complet après modification
}

}
