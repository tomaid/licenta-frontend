import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'licenta';
  constructor() { }

  ngOnInit(): void {

    // if (this.autentificareService.isLoggedIn()){
    //   if(this.roleService.isAdmin()){
    //     this.router.navigate(['asociatie']);
    //   }else{
    //     this.router.navigate(['locatar']);
    //   }
    //   this.router.navigate(['locatar']);
    // }
    // this.router.navigate(['autentificare']);
  }
}
