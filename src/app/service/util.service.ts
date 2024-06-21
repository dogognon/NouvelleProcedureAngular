import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getErrorMessage(nameField :string, error : ValidationErrors) : string {
    if(error['required']){
      return "Le champ "+nameField+" est réquis"
    }else{
      if(error['minlength']){
        return "Le champ "+nameField+" doit avoir "+error['minlength']['requiredLength']+" caractères. Actuellement le champ en possède :"+error['minlength']['actualLength']+" caractères."
      }else{
        if(error['min']){
          console.log(error['min'])
          return "Le champ "+nameField+" doit avoir une valeur supérieur à "+error['min']['min']+"."
        }else{
          if(error['maxlength']){
            return "Le champ "+nameField+" doit avoir "+error['maxlength']['requiredLength']+" caractères. Actuellement le champ en possède :"+error['maxlength']['actualLength']+" caractères."
          }else{
            if(error['pattern']){
              return "Votre "+nameField+" est invalide."
            }else{
          return "";
          }
        }
       }
      }
    }
  }
}
