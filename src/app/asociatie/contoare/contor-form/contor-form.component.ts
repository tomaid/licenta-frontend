import {Component, Inject, OnInit} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AsocCookieIdService} from "../../../_core/services/asoc-cookie-id.service";
import {NotifierService} from "../../../_core/services/notifier.service";
import {ContoareService} from "../../../_core/api/contoare.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Contor, ContorForm} from "../../../_core/model/Contor";
import {OptiuniSelect} from "../../../_core/model/OptiuniSelect";
import {ApartamenteService} from "../../../_core/api/apartamente.service";
import {Apartament} from "../../../_core/model/Apartament";


@Component({
  selector: 'app-contor-form',
  templateUrl: './contor-form.component.html',
  styleUrls: ['./contor-form.component.css']
})
export class ContorFormComponent implements OnInit {
  selectedValue: number = -1;
  contor: Contor;
  contorGeneral: boolean = false;
  servId:number;
  apartamentId?: number;
  actionButton: string = "Creare";
  title: string = "Creare";
  modif: number=0;
  optiuniSelect: OptiuniSelect[] = [
    {id: 0, optiune: 'Contor general'},
    {id: 1, optiune: 'Pentru un apartament'},
    {id: 2, optiune: 'Pentru toate apartamentele'},
  ];
  apartamente: Apartament[] = [];
//  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  contorForm: FormGroup = this.formBuilder.group({
    nume:[null,[Validators.maxLength(50),Validators.required]],
    idApartament:this.formBuilder.group({id: [null, [Validators.required]]}),
    tip:this.formBuilder.group({id: [null, [Validators.required]]})
  });
  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private asocCookieIdService: AsocCookieIdService,
              private contoareService: ContoareService,
              public dialogRef: MatDialogRef<ContorFormComponent>,
              public apartamenteService: ApartamenteService,
              @Inject(MAT_DIALOG_DATA) public data:any) {
    this.contor = data.contor;
    this.servId = data.servId.servId;
    this.contorGeneral = data.contorGeneral.contorGeneral;
  }

  ngOnInit(): void {
    if(this.contorGeneral) this.optiuniSelect = this.optiuniSelect.filter(f=> f.id>0);
    if(this.contor){
      this.getApartamente();
      this.actionButton="Actualizare";
      this.title = "Modificare";
      this.modif=1;
      this.contorForm.controls['nume'].setValue(this.contor.nume);
      this.selectedValue=1;
      this.apartamentId =this.contor.idApartament;
      if(this.contor.general){
        this.selectedValue=0;
      }
    }
  }

  setContor() {
    const contorForm: ContorForm = new ContorForm(
      this.contorForm.value.nume,
      this.contorForm.value.idApartament.id,
      this.contorForm.value.tip.id,
    );
    if(!this.contor){
      if((this.contorForm.value.tip.id==1)&&(this.contorForm.invalid)) return;
      if((this.contorForm.value.tip.id==0)||(this.contorForm.controls['nume'].valid)){
        this.contoareService.creareContor(contorForm, Number(this.asocCookieIdService.asocId), this.servId).subscribe({
          next: next =>{
            this.notifierService.showNotification(next.message, "OK", "notificare");
          },
          error: error =>{
            this.notifierService.showNotification(error.error.message, "OK", "eroare");
          },
          complete: () =>{
          this.dialogRef.close();
        }
        })}
      }else{
      this.updateContor(contorForm);
    }
  }
  updateContor(contorForm: ContorForm){
    this.contoareService.actualizareContor(contorForm,Number(this.asocCookieIdService.asocId), this.servId, this.contor.id).subscribe({
      next: next =>{
        this.notifierService.showNotification(next.message, "OK", "notificare");
      },
      error: error =>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      },
      complete: () =>{
        this.dialogRef.close();
    }
    })
  }
  listOptiuni(){
    if(this.selectedValue==1){
      this.getApartamente();
    }
  }
  getApartamente() {
    this.apartamenteService.getApartamente(Number(this.asocCookieIdService.asocId)).subscribe({
      next : next =>{
        this.apartamente = next;
      },
      error: error=>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    })
  }
}
