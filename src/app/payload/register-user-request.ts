export interface RegisterUserRequest {
  isAdmin :boolean;

  nomprenoms: string;
  poste:string;
  telephone?: string;
  email:string;
}
