import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifierService} from "../../_core/services/notifier.service";
import {JudeteService} from "../../_core/api/judete.service";
import {LocalitatiService} from "../../_core/api/localitati.service";
import {AutentificareService} from "../../_core/services/autentificare.service";
import {AsociatieService} from "../../_core/api/asociatie.service";
import {Asociatie, AsociatieForm} from "../../_core/model/Asociatie";
import {Router} from "@angular/router";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {Judet} from "../../_core/model/Judet";
import {Localitate} from "../../_core/model/Localitate";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";

@Component({
  selector: 'app-detalii-asociatie',
  templateUrl: './detalii-asociatie.component.html',
  styleUrls: ['./detalii-asociatie.component.css']
})
export class DetaliiAsociatieComponent implements OnInit {
  judete: Judet[] = [];
  localitati: Localitate[] = [];
  valueJudet:number=0;
  valueLocalitate:number=0;
  private submitPressed: boolean = false;
  AsociatieForm: FormGroup =this.formBuilder.group({
    nume:[null,[Validators.maxLength(50),Validators.required]],
    cif:[null,[Validators.maxLength(10),Validators.required,Validators.pattern("^[0-9]*$")]],
    autorizatie:[null, [Validators.maxLength(100),Validators.required]],
    judet: this.formBuilder.group({id: [2, [Validators.required]]}),
    localitate: this.formBuilder.group({id: [5, [Validators.required]]}),
    strada:[null, [Validators.maxLength(100),Validators.required]],
    numar:[null, [Validators.maxLength(100),Validators.required]],
    bloc:[null, [Validators.maxLength(100),Validators.required]],
    scara:[null, [Validators.maxLength(100),Validators.required]]
  });
  constructor(private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private judeteService: JudeteService,
              private localitatiService: LocalitatiService,
              private autentificareService: AutentificareService,
              private asociatieService: AsociatieService,
              private router: Router,
              private asocCookieIdService: AsocCookieIdService,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService) { }

  ngOnInit(): void {
    this.listJudete();
    this.getDate();
  }

  listJudete(){
    this.judeteService.getJudete().subscribe((data: Judet[])=>{
        this.judete= data.sort((a,b) => a.id - b.id);
      },
      () => {
        this.autentificareService.logout();
      }
    );
  }
  listLocalitati(){
    this.localitatiService.getLocalitati(this.valueJudet).subscribe((data: Localitate[])=>{
        this.localitati= data.sort((a,b) => a.id - b.id);
      },
      () => {
        this.autentificareService.logout();
      }
    );
  }

  getDate(){
    this.asociatieService.getAsociatie(Number(this.asocCookieIdService.asocId)).subscribe((data: Asociatie) => {
      this.AsociatieForm.patchValue({
        nume: data.nume,
        cif: data.cif,
        autorizatie: data.autorizatie,
        strada: data.strada,
        numar: data.numar,
        bloc: data.bloc,
        scara: data.scara
      });
      this.valueJudet= data.judet;
      this.listLocalitati();
      this.valueLocalitate=data.localitate;
    })
  }
  onSubmit() {
    if(this.AsociatieForm.invalid){
      return;
    }
    const asociatieForm: AsociatieForm= new AsociatieForm(
      this.upperLowerTitleCaseService.upperCase(this.AsociatieForm.value.nume),
      this.AsociatieForm.value.cif,
      this.AsociatieForm.value.autorizatie,
      this.AsociatieForm.value.localitate.id,
      this.upperLowerTitleCaseService.titleCase(this.AsociatieForm.value.strada),
      this.upperLowerTitleCaseService.upperCase(this.AsociatieForm.value.numar),
      this.upperLowerTitleCaseService.upperCase(this.AsociatieForm.value.bloc),
      this.upperLowerTitleCaseService.upperCase(this.AsociatieForm.value.scara)
    );
    this.asociatieService.actualizareAsociatie(asociatieForm,Number(this.asocCookieIdService.asocId)).subscribe({
      next: next => {
        this.notifierService.showNotification("Datele au fost modificate cu succes!", "OK", "notificare");
      },
      error: error => {
        this.notifierService.showNotification(error.error, "OK", "eroare");
        this.logout();
      },
      complete: () => {
      }
    })
  }

  private logout() {
    this.autentificareService.logout();
  }
}
