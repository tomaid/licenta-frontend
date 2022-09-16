import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../_core/model/Role";
import {LoginForm, RegisterForm} from "../_core/model/User";
import {AccountService} from "../_core/api/account.service";
import {NotifierService} from "../_core/services/notifier.service";
import {RoleService} from "../_core/services/role.service";
import {Router} from "@angular/router";
import {UpperLowerTitleCaseService} from "../_shared/upper-lower-title-case.service";

@Component({
  selector: 'app-inregistrare',
  templateUrl: './inregistrare.component.html',
  styleUrls: ['./inregistrare.component.css']
})
export class InregistrareComponent implements OnInit {
  registerForm: FormGroup =this.formBuilder.group({
    user:[null,[Validators.email, Validators.required]],
    pass: [null,[Validators.maxLength(128), Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    nume:[null,[Validators.maxLength(50),Validators.required,Validators.pattern("^[a-zA-Z -]*$")]],
    prenume:[null, [Validators.maxLength(50),Validators.required,Validators.pattern("^[a-zA-Z -]*$")]],
    telefon:[null, [Validators.maxLength(20),Validators.required,Validators.pattern("^[0-9]*$")]],
    role: this.formBuilder.group({id: [2, [Validators.required]]})
  });
  roles: Role[]=[
    { id: 1, name: 'Administrator' },
    { id: 2, name: 'Locatar' }
  ];
  private submittedPressed: boolean = false;
  selectedValue: number = 2;
  fieldTextType: boolean = false;
  iconText: string= 'visibility_off';
  stringObject: any;
  registered: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private notifierService: NotifierService,
              private roleService: RoleService,
              private router: Router,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService) { }

  ngOnInit(): void {
  }

  onSubmit():void {
    this.submittedPressed= true;
    this.registered=false;
    if(this.registerForm.invalid){
      return;
    }
    const registerForm: RegisterForm = new RegisterForm(
      this.upperLowerTitleCaseService.lowerCase(this.registerForm.value.user),
      this.registerForm.value.pass,
      this.upperLowerTitleCaseService.titleCase(this.registerForm.value.nume),
      this.upperLowerTitleCaseService.titleCase(this.registerForm.value.prenume),
      this.registerForm.value.telefon,
      this.registerForm.value.role);
      this.accountService.inregistrare(registerForm).subscribe(
        {
          next: next => {
            this.registered=true;
            this.notifierService.showNotification(next.message, "OK", "notificare");
            const loginForm: LoginForm = new LoginForm(
              this.upperLowerTitleCaseService.lowerCase(this.registerForm.value.user),
              this.registerForm.value.pass,
            );
            this.accountService.autentificare(loginForm).subscribe({
              next: next => {
                localStorage.setItem('token', next.access_token);
                this.roleService.isAdminNavigate();
              },
              error: error => {
                this.notifierService.showNotification("A aparut o eroare", "OK", "eroare");
              }
            });
          },
          error: error => {
            this.notifierService.showNotification(error.error.message, "OK", "eroare");
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
  navigateTo(link: string): void
  {
    this.router.navigate([link]);
  }


}
