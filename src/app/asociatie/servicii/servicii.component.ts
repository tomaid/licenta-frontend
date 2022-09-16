import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotifierService} from "../../_core/services/notifier.service";
import {Router} from "@angular/router";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {CreareServiciuForm, Serviciu} from "../../_core/model/Serviciu";
import {ServiciiService} from "../../_core/api/servicii.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {ModificareServiciuComponent} from "./modificare-serviciu/modificare-serviciu.component";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";
import {DeleteConfirmationComponent} from "../../_shared/delete-confirmation/delete-confirmation.component";
import {ContorIndex} from "../../_core/model/Contor";
import {IndexContorForm} from "../../_core/model/IndexContor";
import {IndecsiService} from "../../_core/api/indecsi.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-servicii',
  templateUrl: './servicii.component.html',
  styleUrls: ['./servicii.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])],
})
export class ServiciiComponent implements OnInit {
  servicii: Serviciu[] = [];
  dataSource!: MatTableDataSource<Serviciu>;
  contorGeneral!: ContorIndex;
  expandedElement!: Serviciu | null;
  displayedColumns: string[] = ['nume', 'pret', 'actiuni'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  indexForm: FormGroup = this.formBuilder.group({
    indexCurent:[null,[Validators.maxLength(2),Validators.required,Validators.pattern("^[0-9]*$")]],
  });
  activeTab = 0;
  serviciuForm: FormGroup =this.formBuilder.group({
    nume:[null,[Validators.maxLength(50),Validators.required]],
    pret:[null,[Validators.maxLength(10),Validators.required,Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]]
  });
  selected = new FormControl(0);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private router: Router,
              private asocCookieIdService: AsocCookieIdService,
              private serviciiService: ServiciiService,
              private indecsiService: IndecsiService,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.serviciiSubscription();
  }

  onCreareServiciu() {
    if (this.serviciuForm.invalid) {
      return;
    }

    const creareServiciuForm: CreareServiciuForm = new CreareServiciuForm(
      this.serviciuForm.value.nume,
      Number(this.serviciuForm.value.pret.replace(/,/gi, ".")),
      Number(this.asocCookieIdService.asocId)
    );
    this.serviciiService.creareSerivicu(creareServiciuForm).subscribe({
      next: next => {
        this.notifierService.showNotification(next.message, "OK", "notificare");
        this.serviciiSubscription();
        this.setTab(0);
        this.serviciuForm.reset();
        this.serviciuForm.controls['nume'].setErrors(null);
        this.serviciuForm.controls['pret'].setErrors(null);
      },
      error: err => {
        this.notifierService.showNotification(err.error.message, "OK", "eroare");
      },
    complete: () => {
    }
    });
  }

  private serviciiSubscription() {
    const asociatieId = this.asocCookieIdService.asocId;
    this.serviciiService.getServicii(Number(asociatieId)).subscribe({
    next: next => {
        this.servicii =  next;
      },
      error: err => {
        this.notifierService.showNotification(err.message, "OK", "eroare");
      },
      complete: () =>{
        this.dataSource = new MatTableDataSource(this.servicii);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  };
  openDialog(serviciu: Serviciu): void {
    const dialogRef = this.dialog.open(ModificareServiciuComponent,{
      data: serviciu
    });
    dialogRef.afterClosed().subscribe(result => {
      this.serviciiSubscription();
    });

  }

  setTab(id:number) {
    this.activeTab=id;
  }

  deleteService(serviciu: Serviciu) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent,{disableClose: false});
      dialogRef.componentInstance.confirmMessage = "Sunteți sigur/ă că doriți să ștergeți serviciul?";
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
    this.serviciiService.stergeSeriviciu(serviciu.id, Number(this.asocCookieIdService.asocId)).subscribe({
      next: next => {
        this.notifierService.showNotification(next.message, "OK", "notificare");
        this.serviciiSubscription();
      },
      error: err => {
        this.notifierService.showNotification(err.error.message, "OK", "eroare");
      }
    })
  }
});
  }

  contoare(serviciu: Serviciu) {
  this.router.navigate(['asociatie','serviciu', serviciu.id, 'contoare'], { queryParams: { serviciu:serviciu.nume },queryParamsHandling: 'merge' });
  }

  setIndex(c: ContorIndex, index: any) {
    const contorForm: IndexContorForm = new IndexContorForm(
      c.id,
      Number(index));
    this.indecsiService.salvareIndexGeneral(contorForm,Number(this.asocCookieIdService.asocId),c.idServiciu, c.id).subscribe({
      next: next =>{
        this.notifierService.showNotification(next.message, "OK", "notificare");
      },
      error: error =>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    })

  }

  getdata(serviciuId: number) {
    this.indecsiService.getContorGeneral(Number(this.asocCookieIdService.asocId),serviciuId).subscribe({
      next:next=>{
        this.contorGeneral = next;
      },
      error:error=>{
        this.expandedElement = null;
        this.notifierService.showNotification("Nu exista contor general pentru acest serviciu", "OK", "eroare");
      },
    });
  }

  istoricIndecsi(idServiciu: number, idContor: number, numeServiciu: string, numeContor: string) {
    this.router.navigate(['asociatie','serviciu', idServiciu, 'contoare', idContor], { queryParams: { numeServiciu: numeServiciu, contorNume :numeContor, return: 2 },queryParamsHandling: 'merge' });
  }
}
