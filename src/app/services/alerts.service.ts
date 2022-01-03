import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  defaultErrorTitle: string = "Attenzione";
  defaultErrorMessage: string = "Errore generico.";

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string){
      this.toastr.success(message, title)
  }

  showError(message: string, title: string){
      this.toastr.error(message ? message : this.defaultErrorMessage, title ? title : this.defaultErrorTitle)
  }

  showInfo(message: string, title: string){
      this.toastr.info(message, title)
  }

  showWarning(message: string, title: string){
      this.toastr.warning(message, title)
  }
}
