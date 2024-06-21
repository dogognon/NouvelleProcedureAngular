import { Departement } from './departement';
import { Poste } from "./poste"

export interface Services {
  id :string;
  libelle :string;
  departement_id:number;
  departement?:Departement;
 poste?:Poste[]
}
