import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserEditComponent } from '../components/users/user-edit/user-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChanges implements CanDeactivate<UserEditComponent> {

  canDeactivate(component: UserEditComponent) {
    if (component.editForm.dirty) {
      return confirm('Chcesz opuścić tę podstronę? Niezapisane zmiany zostaną utracone.');
    }
    return true;
  }

}