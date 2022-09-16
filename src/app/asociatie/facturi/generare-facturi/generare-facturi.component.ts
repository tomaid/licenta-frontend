import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NotifierService} from "../../../_core/services/notifier.service";
import {AsocCookieIdService} from "../../../_core/services/asoc-cookie-id.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContorFormComponent} from "../../contoare/contor-form/contor-form.component";
import {FacturaService} from "../../../_core/api/factura.service";
import * as moment from "moment";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {Moment} from "moment";
import {MatDatepicker} from "@angular/material/datepicker";
import {MatTableDataSource} from "@angular/material/table";
import {FacturaForm} from "../../../_core/model/Factura";

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-generare-facturi',
  templateUrl: './generare-facturi.component.html',
  styleUrls: ['./generare-facturi.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class GenerareFacturiComponent implements OnInit {
  regenerare!:number;
  date = new FormControl(moment());
  mesaj: string = "";
  danger: string = "Facturile vor fi generate pentru luna si anul selectat.";
  titluSiButon:string = "Generare";
  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private asocCookieIdService: AsocCookieIdService,
              private facturaService: FacturaService,
              public dialogRef: MatDialogRef<ContorFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
    this.regenerare = data.generare;
  }
  ngOnInit(): void {
    if(this.regenerare==2) {
      this.titluSiButon = "Generare";
     // this.danger = "Această operație este ireversibilă. Facturile din luna selectată vor fi șterse și regenerate.";
    }
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  generareFacturi(){
    if(this.regenerare==2) {
     this.mesaj = "re";
    }
    const generareForm: FacturaForm = new FacturaForm(
      this.regenerare,
      new Date(this.date.value).getMonth()+1,
      new Date(this.date.value).getFullYear(),
    );
    this.facturaService.generareFacturi(generareForm, Number(this.asocCookieIdService.asocId)).subscribe({
      next:next=>{
        this.notifierService.showNotification(next.message, "OK", "notificare");
      },
      error:error=>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      },
      complete:() =>{
        this.dialogRef.close();
      }
    });
  }
}
