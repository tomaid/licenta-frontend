import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NotifierService} from "../../../_core/services/notifier.service";
import {AsocCookieIdService} from "../../../_core/services/asoc-cookie-id.service";
import {ApartamenteService} from "../../../_core/api/apartamente.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Apartament, ApartamentForm} from "../../../_core/model/Apartament";
import {UpperLowerTitleCaseService} from "../../../_shared/upper-lower-title-case.service";

@Component({
  selector: 'app-apartament-form',
  templateUrl: './apartament-form.component.html',
  styleUrls: ['./apartament-form.component.css']
})
export class ApartamentFormComponent implements OnInit {

  actionButton: string = "Creare";
  title: string = "Introducere";
  apartamentForm: FormGroup = this.formBuilder.group({
    numar:[null,[Validators.maxLength(5),Validators.required]],
    suprafataMp:[null,[Validators.maxLength(6),Validators.required,Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
    numarLocatari:[null,[Validators.maxLength(2),Validators.required,Validators.pattern("^[0-9]*$")]],
    nume:[null,[Validators.maxLength(50),Validators.required,Validators.pattern("^[a-zA-Z -]*$")]],
    prenume:[null, [Validators.maxLength(50),Validators.required,Validators.pattern("^[a-zA-Z -]*$")]],
    telefon:[null, [Validators.maxLength(20),Validators.required,Validators.pattern("^[0-9]*$")]],
    email:[null,[Validators.email, Validators.required]]
  });
  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private asocCookieIdService: AsocCookieIdService,
              private apartamentService: ApartamenteService,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService,
              public dialogRef: MatDialogRef<ApartamentFormComponent>,
              @Inject(MAT_DIALOG_DATA) public apartament: Apartament) { }

  ngOnInit(): void {
    if(this.apartament){
      this.actionButton="Actualizare";
      this.title = "Modificare";
      this.apartamentForm.controls['numar'].setValue(this.upperLowerTitleCaseService.upperCase(this.apartament.numar));
      this.apartamentForm.controls['suprafataMp'].setValue(this.apartament.suprafataMp);
      this.apartamentForm.controls['numarLocatari'].setValue(this.apartament.numarLocatari);
      this.apartamentForm.controls['nume'].setValue(this.upperLowerTitleCaseService.titleCase(this.apartament.nume));
      this.apartamentForm.controls['prenume'].setValue(this.upperLowerTitleCaseService.titleCase(this.apartament.prenume));
      this.apartamentForm.controls['telefon'].setValue(this.apartament.telefon);
      this.apartamentForm.controls['email'].setValue(this.upperLowerTitleCaseService.lowerCase(this.apartament.email));
    }
  }

  setApartament() {
    const apartamentForm: ApartamentForm = new ApartamentForm(
      this.apartamentForm.value.numar,
      Number(this.apartamentForm.value.suprafataMp.toString().replace(/,/gi, ".")),
      this.apartamentForm.value.numarLocatari,
      this.upperLowerTitleCaseService.titleCase(this.apartamentForm.value.nume),
      this.upperLowerTitleCaseService.titleCase(this.apartamentForm.value.prenume),
      this.apartamentForm.value.telefon,
      this.upperLowerTitleCaseService.lowerCase(this.apartamentForm.value.email)
      );
    if(!this.apartament){
    if(this.apartamentForm.valid){
      this.apartamentService.creareApartament(apartamentForm, Number(this.asocCookieIdService.asocId)).subscribe({
        next: next =>{
          this.notifierService.showNotification(next.message, "OK", "notificare");
        },
        error: error =>{
          this.notifierService.showNotification(error.error.message, "OK", "eroare");
        }
      })
    }}else{
      this.updateApartament(apartamentForm);
    }
  }
  updateApartament(apartamentForm: ApartamentForm){
    this.apartamentService.actualizareApartament(apartamentForm,this.apartament.id,Number(this.asocCookieIdService.asocId)).subscribe({
      next: next =>{
        this.notifierService.showNotification(next.message, "OK", "notificare");
      },
      error: error =>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    })
  }
}
