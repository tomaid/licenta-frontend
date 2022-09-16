import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NotifierService} from "../../../_core/services/notifier.service";
import {FacturaService} from "../../../_core/api/factura.service";
import {UpperLowerTitleCaseService} from "../../../_shared/upper-lower-title-case.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  FacturaInfo,
  FacturaPlataApartamentForm,
} from "../../../_core/model/Factura";

@Component({
  selector: 'app-plata-facturi',
  templateUrl: './plata-facturi.component.html',
  styleUrls: ['./plata-facturi.component.css']
})
export class PlataFacturiComponent implements OnInit {
  facturaInfo!: FacturaInfo;
  apartmentId!:number;
  plataForm: FormGroup = this.formBuilder.group({
    valoare: [null, [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
    card: [null, [Validators.maxLength(16),Validators.minLength(15), Validators.required, Validators.pattern('^([0-9]{15,16})?$')]],
    lunaExpirare: [null, [Validators.required, Validators.maxLength(2),Validators.minLength(2),Validators.max(12), Validators.pattern('^([0-9]{2,2})?$')]],
    anExpirare: [null, [Validators.required, Validators.maxLength(4),Validators.minLength(4),Validators.min(2022),Validators.max(2030), Validators.pattern('^([0-9]{4,4})?$')]],
    cvc: [null, [Validators.required, Validators.maxLength(3),Validators.minLength(3), Validators.pattern('^([0-9]{3,3})?$')]]
  });

  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private facturaService: FacturaService,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService,
              public dialogRef: MatDialogRef<PlataFacturiComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.apartmentId = this.data.apartamentId;
    this.facturaInfo = this.data.facturaInfo;
  }

  ngOnInit(): void {
    if (this.facturaInfo) {
      let x=this.facturaInfo.valoare + this.facturaInfo.valoareRestante-this.facturaInfo.valoareAchitata;
      this.plataForm.controls['valoare'].setValue(x.toFixed(2));
    }
  }

  plata() {
    if(!this.verificareCard(this.plataForm.value.card)){
      this.notifierService.showNotification("Return card invalid", "OK", "eroare");
      return false;
    }
    if(Number(this.plataForm.value.valoare)>(this.facturaInfo.valoare + this.facturaInfo.valoareRestante)){
      this.notifierService.showNotification("Valoarea introdusa este mai mare", "OK", "eroare");
      return false;
    }
    const plataForm: FacturaPlataApartamentForm = new FacturaPlataApartamentForm(
      this.plataForm.value.card,
      this.plataForm.value.lunaExpirare,
      this.plataForm.value.anExpirare,
      this.plataForm.value.cvc,
      Number(this.plataForm.value.valoare.toString().replace(/,/gi, ".")));
    this.facturaService.plataFacturaLocatar(this.apartmentId,this.facturaInfo.id, plataForm).subscribe({
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

  close(){
    this.dialogRef.close(true);
  }

  verifCardFunc(numarCard: string) {
    if(!this.verificareCard(numarCard))
      this.notifierService.showNotification("Cardul este invalid", "OK", "eroare");
      return false;
  }
  verificareCard = (numarCard: string): boolean => {
    let sum = 0;
    for(let i=numarCard.length-2; i>=0; i-=1){
      if((numarCard.length%2) ? (i % 2) : !(i % 2)){
        let aux = Number(numarCard[i])*2;
        (aux>9) ? sum += (aux - 9) : sum+=aux;
      } else{
        sum += Number(numarCard[i]);
      }
    }
    return((sum+Number(numarCard[numarCard.length-1]))% 10 === 0);
  }

}
