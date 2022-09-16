import {Component, OnInit} from '@angular/core';
import {AutentificareService} from "../_core/services/autentificare.service";
import {RoleService} from "../_core/services/role.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../_core/api/account.service";
import {NotifierService} from "../_core/services/notifier.service";
import {LoginForm} from "../_core/model/User";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-autentificare',
  templateUrl: './autentificare.component.html',
  styleUrls: ['./autentificare.component.css']
})
export class AutentificareComponent implements OnInit {
  private submittedPressed: boolean = false;
  selectedValue: number = 2;
  fieldTextType: boolean = false;
  iconText: string= 'visibility_off';
  mesaj: string = 'A aparut o eroare.';
  loggedIn:boolean = false;
  subject = new BehaviorSubject(false);


  loginForm: FormGroup =this.formBuilder.group({
    username:[null,[Validators.email, Validators.required]],
    password: [null,[Validators.maxLength(128), Validators.required, Validators.minLength(8)]],
  })

  constructor(private autentificareService: AutentificareService,
              private roleService: RoleService,
              private router: Router,
              private formBuilder: FormBuilder,
              private accountService: AccountService,
              private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.subject.subscribe((data) => {
      // console.log('Subscriber A:', data);
      if (data)this.router.navigate(['locatar']);
    });
  }

  onSubmit() {
    this.submittedPressed = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginForm: LoginForm = new LoginForm(
      this.loginForm.value.username,
      this.loginForm.value.password,
    );
    this.accountService.autentificare(loginForm).subscribe({
        next: next => {
          localStorage.setItem('token', next.access_token);
          this.notifierService.showNotification("Ati fost autentificat cu succes. Veti fi redirectionat catre contul dumneavoastra.", "OK", "notificare");
          this.loggedIn = true;
        },
        error: error => {
          if (error.status == 500) this.mesaj = "Ați introdus un id de utilizator invalid!";
          if (error.status == 400) this.mesaj = "Parola este greșită!";
          this.notifierService.showNotification(this.mesaj + " Reintroduceți date de autentificare.", "OK", "eroare");
        },
      complete: () => {
        this.roleService.isAdminNavigate();
      }
      }

    );
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
    if (this.fieldTextType) {
      this.iconText = 'visibility';
    } else {
      this.iconText = 'visibility_off';
    }
  }

  navigateTo(link: string): void
  {
    this.router.navigate([link]);
  }
}
