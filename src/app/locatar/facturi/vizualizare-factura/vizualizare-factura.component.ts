import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FacturaInfo} from "../../../_core/model/Factura";
import {AsociatieFactura} from "../../../_core/model/Asociatie";
import {FacturaDetalii} from "../../../_core/model/FacturaDetalii";
import {MatTableDataSource} from "@angular/material/table";
import {Chitanta} from "../../../_core/model/Chitanta";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, Observable, shareReplay, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {NotifierService} from "../../../_core/services/notifier.service";
import {AsocCookieIdService} from "../../../_core/services/asoc-cookie-id.service";
import {AsociatieService} from "../../../_core/api/asociatie.service";
import {FacturaService} from "../../../_core/api/factura.service";
import {MatDialog} from "@angular/material/dialog";
import {UpperLowerTitleCaseService} from "../../../_shared/upper-lower-title-case.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {PlataFacturiComponent} from "../plata-facturi/plata-facturi.component";
import {VizualizareChitantaComponent} from "../vizualizare-chitanta/vizualizare-chitanta.component";
import {MonthSwitchService} from "../../../_shared/month-switch.service";

@Component({
  selector: 'app-vizualizare-factura',
  templateUrl: './vizualizare-factura.component.html',
  styleUrls: ['./vizualizare-factura.component.css']
})
export class VizualizareFacturaComponent implements OnInit {


  @ViewChild('printiD') myTempRef!: ElementRef;
  apartamentId:number=-1;
  facturaId!:number;
  facturaInfo!: FacturaInfo;
  asociatieFactura!: AsociatieFactura;
  facturaDetalii: FacturaDetalii[] = [];
  dataSource!: MatTableDataSource<FacturaDetalii>;
  displayedColumns: string[] = ['detalii', 'valoare'];
  chitante: Chitanta[] = [];
  dataSource1!: MatTableDataSource<Chitanta>;
  displayedColumns1: string[] = ['serie', 'valoare', 'data', 'actiuni'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );
  private routeSub!: Subscription;
  constructor(private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private router: Router,
              private asocCookieIdService: AsocCookieIdService,
              private asociatieService: AsociatieService,
              public monthSwitch: MonthSwitchService,
              private facturaService: FacturaService,
              public dialog: MatDialog,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.facturaId = params['fid'];
      this.apartamentId = params['id'];
    });
    this.facturaSubscription();
  }
  private facturaSubscription() {
    this.facturaService.getFacturaLocatar(this.apartamentId, this.facturaId).subscribe({
      next:next=>{
        this.facturaInfo=next;
      },
      error:error=>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    });
    this.facturaService.getFacturaDetaliiLocatar(this.apartamentId, this.facturaId).subscribe({
      next:next=>{
        this.facturaDetalii=next;
      },
      error:error=>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      },
      complete:() =>{
        this.dataSource = new MatTableDataSource(this.facturaDetalii);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
    this.asociatieService.getAsociatieFacturaforLocatar(this.apartamentId).subscribe({
      next:next=>{
        this.asociatieFactura=next;
      },
      error:error=>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    });
    this.facturaService.getChitanteLocatar(this.apartamentId, this.facturaId).subscribe({
      next:next=>{
        this.chitante=next;
      },
      error:error=>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      },
      complete:() =>{
        this.dataSource1 = new MatTableDataSource(this.chitante);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
      }
    });
  }

  plataFactura() : void{
    const dialogRef = this.dialog.open(PlataFacturiComponent,{data: {facturaInfo:this.facturaInfo, apartamentId:this.apartamentId}});
    dialogRef.afterClosed().subscribe(result => {
      this.facturaSubscription();
    });
  }
  back() {
    this.router.navigate(['locatar','apartament', this.apartamentId, 'factura']);
  }
  printToPDF(){
    const DATA = this.myTempRef.nativeElement;
    html2canvas(DATA).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let fileWidth = 220;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setFontSize(18);
      pdf.text('Factura pentru apartamentul '+this.facturaInfo.apartamentNumar,20, 20);
      pdf.text('pentru luna ' + this.monthSwitch.switchLuna(this.facturaInfo.luna) + "." + this.facturaInfo.anul ,20, 30);
      pdf.setFontSize(10);
      pdf.text(this.asociatieFactura.nume,130, 20);
      pdf.text("Autorizatie nr. " + this.asociatieFactura.autorizatie,130, 25);
      pdf.text("CIF: " +this.asociatieFactura.cif.toString(),130, 30);
      pdf.text("Adresa: " +this.asociatieFactura.localitate + ","  + this.asociatieFactura.judet,130, 35);
      pdf.text("str.:" +this.asociatieFactura.strada + ", nr."  + this.asociatieFactura.numar  + ", bl. "  + this.asociatieFactura.bloc + ", sc. "  + this.asociatieFactura.scara  ,130, 40);
      pdf.setFontSize(18);
      pdf.addImage(contentDataURL, 'PNG', 5, 45, fileWidth, fileHeight);
      pdf.setFontSize(10);
      pdf.text("Numele si prenumele" ,20, 115);
      pdf.text(this.facturaInfo.apartamentNume ,20, 120);

      pdf.text("Restante " +this.facturaInfo.valoareRestante + " RON",130, 110);
      pdf.text("Valoare factura pentru luna " +this.monthSwitch.switchLuna(this.facturaInfo.luna) + "." + this.facturaInfo.anul+": "+this.facturaInfo.valoare + " RON" ,130, 115);
      pdf.text("Total de plata " + (this.facturaInfo.valoareRestante+this.facturaInfo.valoare) + " RON" ,130, 120);

      pdf.save('factura.pdf');
    });
  }

  vizualizareChitanta(chitante: Chitanta) : void{
    const dialogRef = this.dialog.open(VizualizareChitantaComponent,{data: {chitanta:chitante, apartamentId:this.apartamentId}});
    dialogRef.afterClosed().subscribe(result => {
      this.facturaSubscription();
    });
  }

}
