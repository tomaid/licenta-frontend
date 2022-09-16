import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Apartament, ApartamentForm} from "../../_core/model/Apartament";
import {NotifierService} from "../../_core/services/notifier.service";
import {MatDialog} from "@angular/material/dialog";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {ApartamenteService} from "../../_core/api/apartamente.service";
import {ApartamentFormComponent} from "./apartament-form/apartament-form.component";
import {MatTableDataSource} from "@angular/material/table";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {DeleteConfirmationComponent} from "../../_shared/delete-confirmation/delete-confirmation.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {IndecsiService} from "../../_core/api/indecsi.service";
import {Contor, ContorIndex} from "../../_core/model/Contor";
import {IndexContorForm} from "../../_core/model/IndexContor";

@Component({
  selector: 'app-apartamente',
  templateUrl: './apartamente.component.html',
  styleUrls: ['./apartamente.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ApartamenteComponent implements OnInit {
  apartamente: Apartament[] = [];
  contorIndecsi: ContorIndex[] = [];
  dataSource!: MatTableDataSource<Apartament>;
  displayedColumns: string[] = ['numar', 'nume_prenume', 'actiuni'];
  expandedElement!: Apartament | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  indexForm: FormGroup = this.formBuilder.group({
    indexCurent:[null,[Validators.maxLength(2),Validators.required,Validators.pattern("^[0-9]*$")]],
  });
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );
  // private routeSub?: Subscription;
  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private router: Router,
              private asocCookieIdService: AsocCookieIdService,
              private apartamentService: ApartamenteService,
              private indecsiService: IndecsiService,
              public dialog: MatDialog,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService) {
    // this.dataSource.filterPredicate = (data, filter) => {
    //   const dataStr = data.numar + data.nume;
    //   return dataStr.indexOf(filter) != -1;
    //
    // }
  }

  ngOnInit(): void {
  // private route: ActivatedRoute, -> se pune in constructor
  //   this.routeSub = this.route.params.subscribe(params => {
  //     console.log(params) //log the entire params object
  //     console.log(params['id']) //log the value of id
  //     console.log(this.asocCookieIdService.asocId)
  //   });

    this.apartamenteSubscription();
  }
  private apartamenteSubscription() {
    this.apartamentService.getApartamente(Number(this.asocCookieIdService.asocId)).subscribe({
      next:next=>{
        this.apartamente = next;
      },
      error:error=>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      },
    complete:() =>{
      this.dataSource = new MatTableDataSource(this.apartamente);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    //  this.dataSource.filterPredicate = (data, filter) => {
    //    const dataStr = data.numar + data.nume + data.prenume  + data.nume + " " + data.prenume;
    //    return dataStr.indexOf(filter) != -1;

   //   }
    }
    });
  }
  modificareApartament(apartament: Apartament): void {
    const dialogRef = this.dialog.open(ApartamentFormComponent,{
      data: apartament
    });
    dialogRef.afterClosed().subscribe(result => {
      this.apartamenteSubscription();
    });

  }

  creareApartament() : void{
    const dialogRef = this.dialog.open(ApartamentFormComponent,{});
    dialogRef.afterClosed().subscribe(result => {
      this.apartamenteSubscription();
    });
  }
  stergereApartament(apartament: Apartament): void{
    const dialogRef = this.dialog.open(DeleteConfirmationComponent,{disableClose: false});
    dialogRef.componentInstance.confirmMessage = "Sunteți sigur/ă că doriți să ștergeți apartamentul?";
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.apartamentService.stergeApartament(apartament.id, Number(this.asocCookieIdService.asocId)).subscribe({
          next: next => {
            this.notifierService.showNotification(next.message, "OK", "notificare");
            this.apartamenteSubscription();
          },
          error: error => {
            this.notifierService.showNotification(error.error.message, "OK", "eroare");
          }
        })
      }
    });
  }

  applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getdata(aptid: any) {
    this.indecsiService.getIndecsi(Number(this.asocCookieIdService.asocId), aptid).subscribe({
      next:next=>{
        this.contorIndecsi = next;
      },
      error:error=>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      },
    });
  }

  setIndex(c: ContorIndex, index: any, apartamentId: any) {
    const contorForm: IndexContorForm = new IndexContorForm(
      c.id,
      Number(index));
    this.indecsiService.salvareIndex(contorForm,Number(this.asocCookieIdService.asocId),apartamentId,c.idServiciu, c.id).subscribe({
      next: next =>{
        this.notifierService.showNotification(next.message, "OK", "notificare");
      },
      error: error =>{
        console.log(error.error.message);
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    })

  }
  istoricIndecsi(idServiciu: number, idContor: number, numeServiciu: string, numeContor: string, numarApartament: string) {
    this.router.navigate(['asociatie','serviciu', idServiciu, 'contoare', idContor], { queryParams: { numeServiciu: numeServiciu, contorNume :numeContor, apartament: numarApartament, return: 1 },queryParamsHandling: 'merge' });
  }


}
