import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NotifierService} from "../../../_core/services/notifier.service";
import {AsocCookieIdService} from "../../../_core/services/asoc-cookie-id.service";
import {UpperLowerTitleCaseService} from "../../../_shared/upper-lower-title-case.service";
import {ApartamentFormComponent} from "../../apartamente/apartament-form/apartament-form.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Calcul, Cheltuiala, CheltuialaForm} from "../../../_core/model/Cheltuiala";
import {CheltuialaService} from "../../../_core/api/cheltuiala.service";
import {MAT_DATE_LOCALE} from "@angular/material/core";

@Component({
  selector: 'app-cheltuieli-form',
  templateUrl: './cheltuieli-form.component.html',
  styleUrls: ['./cheltuieli-form.component.css']
})
export class CheltuieliFormComponent implements OnInit {
  actionButton: string = "Introducere";
  title: string = "Introducere";
  calcul_id!:number;
  data_introducere = new Date();
  cheltuialaForm: FormGroup = this.formBuilder.group({
    nume_cheltuiala:[null,[Validators.maxLength(255),Validators.required]],
    suma:[null, [Validators.maxLength(10),Validators.required,Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
    calcul_id:[null, [Validators.required]],
    numar_factura:[null, [Validators.maxLength(9),Validators.required,Validators.pattern("^[0-9]*$")]],
    serie_factura:[null,[Validators.maxLength(255),Validators.required]],
  });
  fcalcul : Calcul[] = [];
  minDate = new Date(2022, 0, 1);
  maxDate = new Date(2099, 11, 31);
  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private asocCookieIdService: AsocCookieIdService,
              private cheltuialaService: CheltuialaService,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService,
              public dialogRef: MatDialogRef<ApartamentFormComponent>,
              @Inject(MAT_DIALOG_DATA) public cheltuiala: Cheltuiala) {
  }

  ngOnInit(): void {
    this.formulaCalcul();
    if(this.cheltuiala){
      this.actionButton="Actualizare";
      this.title = "Modificare";
      this.cheltuialaForm.controls['nume_cheltuiala'].setValue(this.upperLowerTitleCaseService.upperCase(this.cheltuiala.nume_cheltuiala));
      this.cheltuialaForm.controls['suma'].setValue(this.cheltuiala.suma);
      this.cheltuialaForm.controls['serie_factura'].setValue(this.upperLowerTitleCaseService.upperCase(this.cheltuiala.serie_factura));
      this.cheltuialaForm.controls['numar_factura'].setValue(this.cheltuiala.numar_factura);
      this.cheltuialaForm.controls['calcul_id'].setValue(this.cheltuiala.calcul_id);
      this.data_introducere=this.cheltuiala.data_introducere;
    }
  }

  setCheltuiala() {
    const cheltuialaForm: CheltuialaForm = new CheltuialaForm(
      this.cheltuialaForm.value.nume_cheltuiala,
      this.cheltuialaForm.value.calcul_id,
      this.data_introducere,
      Number(this.cheltuialaForm.value.suma.toString().replace(/,/gi, ".")),
      this.cheltuialaForm.value.numar_factura,
      this.upperLowerTitleCaseService.titleCase(this.cheltuialaForm.value.serie_factura)
    );
    if(!this.cheltuiala){
      if(this.cheltuialaForm.valid){
        this.cheltuialaService.creareCheltuiala(cheltuialaForm, Number(this.asocCookieIdService.asocId)).subscribe({
          next: next =>{
            this.notifierService.showNotification(next.message, "OK", "notificare");
          },
          error: error =>{
            this.notifierService.showNotification(error.error.message, "OK", "eroare");
          }
        })
      }}else{
      this.updateCheltuiala(cheltuialaForm);
    }
  }
  updateCheltuiala(cheltuialaForm: CheltuialaForm){
    this.cheltuialaService.actualizareCheltuiala(cheltuialaForm,this.cheltuiala.id,Number(this.asocCookieIdService.asocId)).subscribe({
      next: next =>{
        this.notifierService.showNotification(next.message, "OK", "notificare");
      },
      error: error =>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    })
  }

  formulaCalcul(){
    this.cheltuialaService.formulaCalcul(Number(this.asocCookieIdService.asocId)).subscribe({
      next: next => {
        this.fcalcul=next;
      },
      error: error => {
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    })
}

  setDate(event: any) {
    this.data_introducere = event.value;
  }
}
