import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifierService} from "../../_core/services/notifier.service";
import {JudeteService} from "../../_core/api/judete.service";
import {Judet} from "../../_core/model/Judet";
import {AutentificareService} from "../../_core/services/autentificare.service";
import {Localitate} from "../../_core/model/Localitate";
import {LocalitatiService} from "../../_core/api/localitati.service";
import {CreareAsociatieForm} from "../../_core/model/Asociatie";
import {AsociatieService} from "../../_core/api/asociatie.service";
import {Router} from "@angular/router";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";

@Component({
  selector: 'app-creare-asociatie',
  templateUrl: './creare-asociatie.component.html',
  styleUrls: ['./creare-asociatie.component.css']
})
export class CreareAsociatieComponent implements OnInit {
  judete: Judet[] = [];
  localitati: Localitate[] = [];
  valueJudet:number=0;
  valueLocalitate:number=0;
  private submitPressed: boolean = false;
  fieldTextType: boolean = false;
  iconText: string= 'visibility_off';
  creareAsociatieForm: FormGroup =this.formBuilder.group({
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
              private asocCookieIdService: AsocCookieIdService) { }

  ngOnInit(): void {
    this.listJudete();
  }

  listJudete(){
    this.judeteService.getJudete().subscribe((data: Judet[])=>{
        this.judete= data.sort((a,b) => a.id - b.id);
      },
      error => {
       this.autentificareService.logout();
      }
    );
  }
  listLocalitati(){
    this.localitatiService.getLocalitati(this.valueJudet).subscribe((data: Localitate[])=>{
        this.localitati= data.sort((a,b) => a.id - b.id);
      },
      error => {
           this.autentificareService.logout();
      }
    );
  }
  onSubmit() {
    this.submitPressed = true;
    if (this.creareAsociatieForm.invalid) {
      return;
    }
    const creareAsociatieForm: CreareAsociatieForm = new CreareAsociatieForm(this.creareAsociatieForm.value.nume,
      Number(this.creareAsociatieForm.value.cif),
      this.creareAsociatieForm.value.autorizatie,
      this.creareAsociatieForm.value.localitate.id,
      this.creareAsociatieForm.value.strada,
      this.creareAsociatieForm.value.numar,
      this.creareAsociatieForm.value.bloc,
      this.creareAsociatieForm.value.scara);

    this.asociatieService.inregistrareAsociatie(creareAsociatieForm).subscribe({
      next: next => {
        this.asocCookieIdService.setAsocId(next.asociatie.toString());
        this.notifierService.showNotification(next.message, "OK", "notificare");
        localStorage.setItem('paginaStart', "1");
        window.location.replace("/");
      },
      error: error => {
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    });
  }
}
