import {Component, Inject, OnInit} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifierService} from "../../../_core/services/notifier.service";
import {AsocCookieIdService} from "../../../_core/services/asoc-cookie-id.service";
import {UpperLowerTitleCaseService} from "../../../_shared/upper-lower-title-case.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FacturaInfo, FacturaPlataForm} from "../../../_core/model/Factura";
import {FacturaService} from "../../../_core/api/factura.service";

@Component({
  selector: 'app-plata-facturi',
  templateUrl: './plata-facturi.component.html',
  styleUrls: ['./plata-facturi.component.css']
})
export class PlataFacturiComponent implements OnInit {
  metoda!:number;
  plataForm: FormGroup = this.formBuilder.group({
    valoare: [null, [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
    metoda:[null, [Validators.required]],
  });

  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private asocCookieIdService: AsocCookieIdService,
              private facturaService: FacturaService,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService,
              public dialogRef: MatDialogRef<PlataFacturiComponent>,
              @Inject(MAT_DIALOG_DATA) public facturaInfo: FacturaInfo) {
  }

  ngOnInit(): void {
    if (this.facturaInfo) {
      let x=this.facturaInfo.valoare + this.facturaInfo.valoareRestante-this.facturaInfo.valoareAchitata;
      this.plataForm.controls['valoare'].setValue(x.toFixed(2));
      this.plataForm.controls['metoda'].setValue(1);
    }
  }

  plata() {
    if(Number(this.plataForm.value.valoare)>(this.facturaInfo.valoare + this.facturaInfo.valoareRestante)){
      this.notifierService.showNotification("Valoarea introdusa este mai mare", "OK", "eroare");
      return false;
    }
    const plataForm: FacturaPlataForm = new FacturaPlataForm(
      this.facturaInfo.id,
      Number(this.plataForm.value.valoare.toString().replace(/,/gi, ".")),
      this.plataForm.value.metoda);
    this.facturaService.plataFactura(Number(this.asocCookieIdService.asocId),this.facturaInfo.id, plataForm).subscribe({
      next: next =>{
        this.notifierService.showNotification(next.message, "OK", "notificare");
      },
      error: error =>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      },
      complete:() =>{
        this.dialogRef.close();
    }
    })
    return true;
  }

  verificare(value: string) {
    if(Number(value)>(this.facturaInfo.valoare + this.facturaInfo.valoareRestante)){
      this.notifierService.showNotification("Valoarea introdusa este mai mare", "OK", "eroare");
    return false;
    }
    return  true;
  }
}
