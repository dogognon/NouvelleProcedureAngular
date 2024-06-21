import { Poste } from './poste';
import { Role } from './role';

export interface Utilisateur {
  id :string
  nomprenoms :string
  email:string
  createdAt:string
  modifiedAt:string
  poste_id:number;
  poste?:Poste;
  isAdmin:boolean
  roles:Role[]
}

