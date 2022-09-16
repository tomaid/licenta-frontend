import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifierService} from "../_core/services/notifier.service";
import {LoginForm} from "../_core/model/User";
import {AccountService} from "../_core/api/account.service";

@Component({
  selector: 'app-resetare-parola',
  templateUrl: './resetare-parola.component.html',
  styleUrls: ['./resetare-parola.component.css']
})
export class ResetareParolaComponent implements OnInit {

  mesaj: string = "";
  resetForm: FormGroup =this.formBuilder.group({
    username:[null,[Validators.email, Validators.required]]
  })
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private accountService: AccountService) { }

  ngOnInit(): void {
  }

  navigateTo(link: string): void
  {
    this.router.navigate([link]);
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    }
    const loginForm: LoginForm = new LoginForm(
      this.resetForm.value.username,
      ""
    );
    this.accountService.resetareParola(loginForm).subscribe({
        next: next => {
          this.notifierService.showNotification("Parola a fost schimbata. Veti primi noua parola in email. Va rugam verificati email-ul.", "OK", "notificare");
        },
        error: error => {
          if (error.status == 500) this.mesaj = "A aparut o eroare.";
          if (error.status == 400) this.mesaj = "A aparut o eroare.";
          this.notifierService.showNotification(this.mesaj + " Reintroduceți email-ul.", "OK", "eroare");
        },
        complete: () => {
        }
      }
    );

  }
}
