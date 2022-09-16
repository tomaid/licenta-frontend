import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {FormBuilder, FormControl} from "@angular/forms";
import {NotifierService} from "../../_core/services/notifier.service";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {MatDialog} from "@angular/material/dialog";
import {map, Observable, shareReplay, Subscription} from "rxjs";
import {Contor} from "../../_core/model/Contor";
import {MatTableDataSource} from "@angular/material/table";
import {ContoareService} from "../../_core/api/contoare.service";
import {ContorFormComponent} from "./contor-form/contor-form.component";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";
import {DeleteConfirmationComponent} from "../../_shared/delete-confirmation/delete-confirmation.component";

@Component({
  selector: 'app-contoare',
  templateUrl: './contoare.component.html',
  styleUrls: ['./contoare.component.css']
})
export class ContoareComponent implements OnInit {
  contoare: Contor[] = [];
  numeServiciu!: string;
  dataSource = new MatTableDataSource(this.contoare);
  displayedColumns: string[] = ['nume', 'numeApartament', 'actiuni'];
  selected = new FormControl(0);
  contorGeneral: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );
  serviceId!: number;
  private routeSub!: Subscription;
  constructor(private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private router: Router,
              private asocCookieIdService: AsocCookieIdService,
              private contoareService: ContoareService,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
      this.routeSub = this.route.params.subscribe(params => {
        this.serviceId = params['id'];
      });
      this.route.queryParams.subscribe(queryParams =>{
        this.numeServiciu=this.upperLowerTitleCaseService.titleCase(queryParams['serviciu']);
      })
      this.contorSubscription();
  }
  private contorSubscription(){
    this.contoareService.getContoare(Number(this.asocCookieIdService.asocId),Number(this.serviceId)).subscribe({
      next:next =>{
        this.contoare = next;
      },
      error:error =>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      },
    complete: () =>{
    }
    })
  }
  modificareContor(contor: Contor): void {
    const servId=this.serviceId;
    const dialogRef = this.dialog.open(ContorFormComponent,{
      data: {contor, servId: {servId}, contorGeneral: false}
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.contorSubscription();
    });
  }
  creareContor() : void{
    const contorGeneral = this.contoare.filter(c=>c.general).length>0;
    const servId=this.serviceId;
    const dialogRef = this.dialog.open(ContorFormComponent,{
      data: {contor:null,servId: {servId}, contorGeneral: {contorGeneral}}
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.contorSubscription();
    });
  }
  stergereContor(contor: Contor): void{
    const dialogRef = this.dialog.open(DeleteConfirmationComponent,{disableClose: false});
    dialogRef.componentInstance.confirmMessage = "Sunteți sigur/ă că doriți să ștergeți contorul?";
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.contoareService.stergeContor(Number(this.asocCookieIdService.asocId), Number(this.serviceId), contor.id).subscribe({
          next: next => {
            this.notifierService.showNotification(next.message, "OK", "notificare");
            this.contorSubscription();
          },
          error: error => {
            this.notifierService.showNotification(error.error.message, "OK", "eroare");
          }
        });
      }
    });
  }

  back(link: string): void {
    this.router.navigate([link]);
  }
  istoricIndecsi(contor: Contor) {
    this.router.navigate(['asociatie','serviciu', this.serviceId, 'contoare', contor.id], { queryParams: { numeServiciu: this.numeServiciu, contorNume :contor.nume, apartament: contor.numeApartament },queryParamsHandling: 'merge' });
  }

}
