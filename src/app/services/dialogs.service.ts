import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';
import { DialogComponent } from '../components/shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(public dialog: MatDialog) { }

  private config = {
    height: 'auto',
    width: 'fit-content',
    data: {},
    autoFocus: true
  };




  public open<T>(component: ComponentType<T> | TemplateRef<T>, data: any, event?: any) {

    this.config = { ...this.config, ...data };

    this.setBackdrop(this.config);

    if(event){
      this.setPosition(event, data?.located);
    }

    this.config['data'] = { component };
    return this.dialog.open(DialogComponent, {...this.config, panelClass: 'custom-dialog'});
  }

  /*public error<T>(data: any) {
    return this.dialog.open(AlertDialogComponent, {panelClass: 'alert-panel', data: data});
  }*/


  private setPosition(event: any, located: string){

    const pos = event.target.getClientRects()[0]; // Posizione del pulsante che fa triggerare la dialog

    // Se non trovo il pulsante di trigger, posiziono la dialog nel centro dello schermo
    if(pos){
      let left = pos.left + pos.width/2; // coordinata x per il centro del pulsante
      let top = pos.top + pos.height/2; // coordinata y per il centro del pulsante

      const dialogWidth = Number(this.config.width.replace("px", "")); // lunghezza della dialog
      const dialogHeight = Number(this.config.height.replace("px", "")); // altezza della dialog

      // Posiziono la dialog in base alla config
      switch (located) {
        case "BOTTOM":
          left = left - dialogWidth/2;
          top = top + pos.height/2;
          break;

        case "RIGHT":
          left = left + pos.width/2;
          top = top - pos.height/2;
          break;

        case "LEFT":
          left = left - pos.width/2 - dialogWidth;
          top = top - pos.height/2;
          break;

        case "TOP":
          left = left - dialogWidth/2;
          top = top - pos.height/2 - dialogHeight ;
          break;

        // Se non specificato, la posiziono al centro del pulsante di trigger
        default:
          break;
      }

      const data = {
        position: {
          top : top + "px",
          left : left + "px"
        }
      };

      this.config = { ...this.config, ...data }

    }

  }

  private setBackdrop(config: any){
    if(config.hasBackdrop === false){
      config.hasBackdrop = true;
      config.backdropClass = "cdk-overlay-transparent-backdrop";
    }
    this.config = config;
  }

}
