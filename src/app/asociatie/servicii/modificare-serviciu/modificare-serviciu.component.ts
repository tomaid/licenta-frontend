import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ModificareServiciuForm, Serviciu} from "../../../_core/model/Serviciu";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifierService} from "../../../_core/services/notifier.service";
import {AsocCookieIdService} from "../../../_core/services/asoc-cookie-id.service";
import {ServiciiService} from "../../../_core/api/servicii.service";
import {map, Observable, shareReplay} from "rxjs";

@Component({
  selector: 'app-modificare-serviciu',
  templateUrl: './modificare-serviciu.component.html',
  styleUrls: ['./modificare-serviciu.component.css']
})
export class ModificareServiciuComponent {
  serviciuForm: FormGroup =this.formBuilder.group({
    nume:[this.serviciu.nume,[Validators.maxLength(50),Validators.required]],
    pret:[this.serviciu.pret,[Validators.maxLength(10),Validators.required,Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]]
  });
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private asocCookieIdService: AsocCookieIdService,
              private serviciiService: ServiciiService,
              public dialogRef: MatDialogRef<ModificareServiciuComponent>,
              @Inject(MAT_DIALOG_DATA) public serviciu: Serviciu) { }

  onModificareServiciu() {
    if (this.serviciuForm.invalid) {
      return;
    }
    const modificareServiciuForm: ModificareServiciuForm = new ModificareServiciuForm(
      this.serviciu.id,
      this.serviciuForm.value.nume,
      Number(this.serviciuForm.value.pret.toString().replace(/,/gi, ".")),
      Number(this.asocCookieIdService.asocId)
    );
    this.serviciiService.actualizareSeriviciu(modificareServiciuForm,this.serviciu.id,Number(this.asocCookieIdService.asocId)).subscribe({
      next: next => {
        this.notifierService.showNotification(next.message, "OK", "notificare");
      },
      error: err => {
        this.notifierService.showNotification(err.message, "OK", "eroare");
      },
      complete: () => {
        this.dialogRef.close();
      }
    });
  }

}
