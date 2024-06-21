import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoggedBoneComponent } from './logged-bone/logged-bone.component';
import { LoginComponent } from './login/login.component';
import { DepartementComponent } from './param-base/departement/departement.component';
import { ParamBaseComponent } from './param-base/param-base.component';
import { PosteComponent } from './param-base/poste/poste.component';
import { ServicesComponent } from './param-base/services/services.component';
import { UtilisateurComponent } from './param-base/utilisateur/utilisateur.component';
import { ListProcedureComponent } from './procedure/list-procedure/list-procedure.component';
import { NewProcedureComponent } from './procedure/new-procedure/new-procedure.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { profileGuard } from './profile.guard';
export const routes: Routes = [
  // default route
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LoggedBoneComponent,
    canActivate: [authGuard],  
     canActivateChild: [profileGuard],
    children: [
      { path: 'procedure', 
      component: ParamBaseComponent,
     
      children: [
        { path: '', component: ProcedureComponent },
        { path: 'nouveau', component: NewProcedureComponent},
        { path: 'recherche', component: ListProcedureComponent},
      ],
    },
      {
        path: 'admin',
        component: ParamBaseComponent,
        children: [
          { path: '', component: DepartementComponent },
          { path: 'departement', component: DepartementComponent },
          { path: 'service', component: ServicesComponent },
          { path: 'poste', component: PosteComponent },
          { path: 'utilisateur', component: UtilisateurComponent }
        ],
      },
    ],
  },
  // route not found
  { path: '**', component: LoginComponent },
  //{path: '', redirectTo: '/heroes-list', pathMatch: 'full'},
];

