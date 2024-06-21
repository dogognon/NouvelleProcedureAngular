import { Services } from "./services"

export interface Departement {
  id :string
  libelle :string
  createdAt:string
  modifiedAt:string
  service?:Services[]
}

