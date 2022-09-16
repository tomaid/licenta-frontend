import {Component, OnInit, ViewChild} from '@angular/core';
import {Factura, FacturaTabel} from "../../_core/model/Factura";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {FormBuilder} from "@angular/forms";
import {NotifierService} from "../../_core/services/notifier.service";
import {Router} from "@angular/router";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {FacturaService} from "../../_core/api/factura.service";
import {MatDialog} from "@angular/material/dialog";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";
import {GenerareFacturiComponent} from "./generare-facturi/generare-facturi.component";

@Component({
  selector: 'app-facturi',
  templateUrl: './facturi.component.html',
  styleUrls: ['./facturi.component.css']
})
export class FacturiComponent implements OnInit {

  facturi: FacturaTabel[] = [];
  dataSource!: MatTableDataSource<FacturaTabel>;
  displayedColumns: string[] = ['apartamentNume', 'data', 'valoare', 'valoareRestante', 'dataScadenta', 'status', 'actiuni'];
  expandedElement!: FacturaTabel | null;
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
              private facturaService: FacturaService,
              public dialog: MatDialog,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService) {}

  ngOnInit(): void {

    this.facturiSubscription();
  }
  private facturiSubscription() {
    this.facturaService.getFacturi(Number(this.asocCookieIdService.asocId)).subscribe({
      next:next=>{
        this.facturi = next;
      },
      error:error=>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      },
      complete:() =>{
        this.dataSource = new MatTableDataSource(this.facturi);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  generareFacturi() : void{
    const dialogRef = this.dialog.open(GenerareFacturiComponent,{
      data: {generare:1}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.facturiSubscription();
    });
  }
  regenerareFacturi() : void{
    const dialogRef = this.dialog.open(GenerareFacturiComponent,{data: {generare:2}});
    dialogRef.afterClosed().subscribe(result => {
      this.facturiSubscription();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  back(link: string): void {
    this.router.navigate([link]);
  }
  vizualizareFactura(factura: Factura) {
    this.router.navigate(['asociatie', 'facturi', factura.id]);
  }
}
