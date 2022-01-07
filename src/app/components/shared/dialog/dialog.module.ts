import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material.module";
import { DialogsService } from "src/app/services/dialogs.service";
import { DialogComponent } from "./dialog.component";
import { UserMenuDialogComponent } from './user-menu-dialog/user-menu-dialog.component';

@NgModule({
  declarations: [
      DialogComponent,
      UserMenuDialogComponent
  ],
  imports     : [
      MaterialModule
  ],
  providers   : [
      DialogsService
  ]
})
export class DialogModule
{
}
