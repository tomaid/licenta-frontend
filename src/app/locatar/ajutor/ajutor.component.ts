import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-ajutor',
  templateUrl: './ajutor.component.html',
  styleUrls: ['./ajutor.component.css']
})
export class AjutorComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  private routeSub!: Subscription;
  apartamentId: number = -1;
  step = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if(params['id']!=null) this.apartamentId = params['id'];
    });
    if(this.apartamentId<0)location.reload();
  }
}
