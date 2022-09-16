import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {DateUser, DetaliiForm, ModficareParolaForm} from "../_core/model/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifierService} from "../_core/services/notifier.service";
import {AccountService} from "../_core/api/account.service";
import {AutentificareService} from "../_core/services/autentificare.service";
import {Router} from "@angular/router";
import {UpperLowerTitleCaseService} from "../_shared/upper-lower-title-case.service";


@Component({
  selector: 'app-detalii-cont',
  templateUrl: './detalii-cont.component.html',
  styleUrls: ['./detalii-cont.component.css']
})
export class DetaliiContComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );
  mesaj: string = 'A aparut o eroare.';
  detaliiContForm: FormGroup =this.formBuilder.group({
    user:[null,[Validators.email, Validators.required]],
    nume:[null,[Validators.maxLength(50),Validators.required,Validators.pattern("^[a-zA-Z -]*$")]],
    prenume:[null, [Validators.maxLength(50),Validators.required,Validators.pattern("^[a-zA-Z -]*$")]],
    telefon:[null, [Validators.maxLength(20),,Validators.required,Validators.pattern("^[0-9]*$")]]
  });
  modificareParolaForm: FormGroup =this.formBuilder.group({
    parolaVeche: [null,[Validators.maxLength(128), Validators.required, Validators.minLength(8)]],
    parolaNoua: [null,[Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
  });
  fieldTextType: boolean = false;
  iconText: string= 'visibility_off';
  fieldTextTypeNew: boolean = false;
  iconTextNew: string= 'visibility_off';
  nume: string = "";
  prenume: string = "";
  telefon: string = "";
  email: string = "";

  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private accountService: AccountService,
              private autentificareService: AutentificareService,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.getDate();
  }
  getDate(){
    this.accountService.getDate().subscribe((data: DateUser) => {
      this.detaliiContForm.patchValue({
        user:data.user,
        nume:data.nume,
        prenume:data.prenume,
        telefon:data.telefon
      })
    })
  }
  acasa() {
    this.router.navigate(['/']);
  }


  onSubmit() {

    if(this.detaliiContForm.invalid){
      return;
    }
    const detaliiContForm: DetaliiForm = new DetaliiForm(
      this.upperLowerTitleCaseService.lowerCase(this.detaliiContForm.value.user),
      this.upperLowerTitleCaseService.upperCase(this.detaliiContForm.value.nume),
      this.upperLowerTitleCaseService.upperCase(this.detaliiContForm.value.prenume),
      this.detaliiContForm.value.telefon);

    this.accountService.actualizareDate(detaliiContForm).subscribe({
        next: next => {
          this.notifierService.showNotification("Datele au fost modificate cu succes!", "OK", "notificare");
        },
        error: error => {
          this.notifierService.showNotification(error.error.message, "OK", "eroare");
          this.logout();
        },
        complete: () => {
        }
      }

    );
  }

  modificareParola() {
    if(this.modificareParolaForm.invalid){
      return;
    }
    const modificareParolaForm: ModficareParolaForm = new ModficareParolaForm(
      this.modificareParolaForm.value.parolaVeche,
      this.modificareParolaForm.value.parolaNoua);
    this.accountService.actualizareParola(modificareParolaForm).subscribe({
        next: next => {
          this.notifierService.showNotification("Parola a fost actualizata!", "OK", "notificare");
        },
        error: error => {
          this.notifierService.showNotification(error.error.message, "OK", "eroare");
          this.logout();
        },
        complete: () => {

        }
      }

    );
  }

  togglePassword() {
    this.fieldTextType = !this.fieldTextType;
    if(this.fieldTextType){
      this.iconText = 'visibility';
    } else{
      this.iconText = 'visibility_off';
    }

  }
  togglePasswordNew() {
    this.fieldTextTypeNew = !this.fieldTextTypeNew;
    if(this.fieldTextTypeNew){
      this.iconTextNew = 'visibility';
    } else{
      this.iconTextNew = 'visibility_off';
    }
  }
  logout(){
    this.autentificareService.logout();
  }

}
