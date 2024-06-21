import { Services } from "./services";

export interface Poste {
  id :string
  libelle :string
  service_id:number
  service?:Services
  modifiedAt:string
}
