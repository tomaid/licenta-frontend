import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Cheltuiala} from "../../_core/model/Cheltuiala";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";
import {MatDialog} from "@angular/material/dialog";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {FormBuilder} from "@angular/forms";
import {NotifierService} from "../../_core/services/notifier.service";
import {Router} from "@angular/router";
import {CheltuialaService} from "../../_core/api/cheltuiala.service";
import {CheltuieliFormComponent} from "./cheltuieli-form/cheltuieli-form.component";
import {DeleteConfirmationComponent} from "../../_shared/delete-confirmation/delete-confirmation.component";

@Component({
  selector: 'app-cheltuieli',
  templateUrl: './cheltuieli.component.html',
  styleUrls: ['./cheltuieli.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CheltuieliComponent implements OnInit {

  cheltuieli: Cheltuiala[] = [];
  dataSource!: MatTableDataSource<Cheltuiala>;
  displayedColumns: string[] = ['nume_cheltuiala', 'suma', 'data', 'actiuni'];
  expandedElement!: Cheltuiala | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
              private cheltuialaService: CheltuialaService,
              public dialog: MatDialog,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService) {}

ngOnInit(): void {

  this.cheltuialaSubscription();
}
private cheltuialaSubscription() {
  this.cheltuialaService.getCheltuieli(Number(this.asocCookieIdService.asocId)).subscribe({
    next:next=>{
      this.cheltuieli = next;
    },
    error:error=>{
      this.notifierService.showNotification(error.error.message, "OK", "eroare");
    },
    complete:() =>{
      this.dataSource = new MatTableDataSource(this.cheltuieli);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  });
}
modificareCheltuiala(cheltuiala: Cheltuiala): void {
  const dialogRef = this.dialog.open(CheltuieliFormComponent,{
    data: cheltuiala
  });
  dialogRef.afterClosed().subscribe(result => {
    this.cheltuialaSubscription();
  });
}
creareCheltuiala() : void{
  const dialogRef = this.dialog.open(CheltuieliFormComponent,{});
  dialogRef.afterClosed().subscribe(result => {
    this.cheltuialaSubscription();
  });
}
stergereCheltuiala(cheltuiala: Cheltuiala): void{
  const dialogRef = this.dialog.open(DeleteConfirmationComponent,{disableClose: false});
  dialogRef.componentInstance.confirmMessage = "Sunteți sigur/ă că doriți să ștergeți factura?";
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      this.cheltuialaService.stergeCheltuiala(cheltuiala.id, Number(this.asocCookieIdService.asocId)).subscribe({
        next: next => {
          this.notifierService.showNotification(next.message, "OK", "notificare");
          this.cheltuialaSubscription();
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



}
