import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locatar',
  templateUrl: './locatar.component.html',
  styleUrls: ['./locatar.component.css']
})
export class LocatarComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
  creareAsociatie() {
    localStorage.setItem('paginaStart', '1');
    window.location.replace("/asociatie/creare-asociatie");
  }
}
