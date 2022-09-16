import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormBuilder} from "@angular/forms";
import {NotifierService} from "../../../_core/services/notifier.service";
import {AsocCookieIdService} from "../../../_core/services/asoc-cookie-id.service";
import {FacturaService} from "../../../_core/api/factura.service";
import {UpperLowerTitleCaseService} from "../../../_shared/upper-lower-title-case.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FacturaInfo} from "../../../_core/model/Factura";
import {Chitanta} from "../../../_core/model/Chitanta";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {MatTableDataSource} from "@angular/material/table";
import {AsociatieService} from "../../../_core/api/asociatie.service";
import {AsociatieFactura} from "../../../_core/model/Asociatie";
import {MonthSwitchService} from "../../../_shared/month-switch.service";

@Component({
  selector: 'app-vizualizare-chitanta',
  templateUrl: './vizualizare-chitanta.component.html',
  styleUrls: ['./vizualizare-chitanta.component.css']
})
export class VizualizareChitantaComponent implements OnInit {
  @ViewChild('printiD') myTempRef!: ElementRef;
  asociatieFactura!: AsociatieFactura;

  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private asocCookieIdService: AsocCookieIdService,
              private asociatieService: AsociatieService,
              public monthSwitch: MonthSwitchService,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService,
              public dialogRef: MatDialogRef<VizualizareChitantaComponent>,
              @Inject(MAT_DIALOG_DATA) public chitanta: Chitanta) { }

  ngOnInit(): void {
    this.facturaSubscription();
  }


  private facturaSubscription() {
    this.asociatieService.getAsociatieFactura(Number(this.asocCookieIdService.asocId)).subscribe({
      next:next=>{
        this.asociatieFactura=next;
      },
      error:error=>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    });
  }
  printToPDF(){
    const DATA = this.myTempRef.nativeElement;
    html2canvas(DATA).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let fileWidth = 220;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setFontSize(18);
      pdf.text('Chitanta  seria '+this.chitanta.serieChitanta + ", nr." + this.chitanta.id,20, 20);
      pdf.text('din data ' +this.chitanta.dataAchitare ,20, 30);
      pdf.setFontSize(10);
      pdf.text(this.asociatieFactura.nume,130, 20);
      pdf.text("Autorizatie nr. " + this.asociatieFactura.autorizatie,130, 25);
      pdf.text("CIF: " +this.asociatieFactura.cif.toString(),130, 30);
      pdf.text("Adresa: " +this.asociatieFactura.localitate + ","  + this.asociatieFactura.judet,130, 35);
      pdf.text("str.:" +this.asociatieFactura.strada + ", nr."  + this.asociatieFactura.numar  + ", bl. "  + this.asociatieFactura.bloc + ", sc. "  + this.asociatieFactura.scara  ,130, 40);
      pdf.setFontSize(18);
      pdf.addImage(contentDataURL, 'PNG', 10, 50, fileWidth, fileHeight);
      pdf.setFontSize(20);
      pdf.text("Asociatia"  ,100, 80);

      pdf.save('chitanta.pdf');
    });
  }

}
