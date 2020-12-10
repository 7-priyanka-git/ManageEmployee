import { AbstractControl, ValidationErrors } from '@angular/forms';


export class SpaceNotAllowedValidator {

    static cannotContainSpace(abstractControl: AbstractControl) : ValidationErrors | null {
        if((abstractControl.value).indexOf(' ') >= 0){
            return {cannotContainSpace: true}
        }
        return null;
    }
}

