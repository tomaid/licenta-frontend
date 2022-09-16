import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {FormBuilder, FormControl} from "@angular/forms";
import {NotifierService} from "../../_core/services/notifier.service";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, Observable, shareReplay, Subscription} from "rxjs";
import {Avizier, AvizierDetalii} from "../../_core/model/Avizier";
import {AvizierService} from "../../_core/api/avizier.service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import * as moment from "moment";
import {Moment} from "moment";
import {MatDatepicker} from "@angular/material/datepicker";
import {ServiciuAvizier} from "../../_core/model/Serviciu";
import {Cheltuiala} from "../../_core/model/Cheltuiala";
import {MonthSwitchService} from "../../_shared/month-switch.service";
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
  selector: 'app-avizier',
  templateUrl: './avizier.component.html',
  styleUrls: ['./avizier.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AvizierComponent implements OnInit {
  assocId:string;
  anul: number=new Date().getFullYear();
  luna: number=new Date().getMonth()+1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );
  private routeSub!: Subscription;
  date = new FormControl(moment());
  avizier: Avizier[] = [];
  itemsArray: any[] = [];
  subArray: any[] = [];
  subSubArray: any[] = [];
  servicii: ServiciuAvizier[] = [];
  cheltuieli: Cheltuiala[] = [];
  dataSource!: MatTableDataSource<Avizier>;
  dataSourceCheltuieli!: MatTableDataSource<Cheltuiala>;
  dataSourceServicii!: MatTableDataSource<ServiciuAvizier>;
  displayedColumnsCheltuieli: string[] = ['numeCheltuiala','suma','calculNume'];
  displayedColumnsServicii: string[] = ['nume','consumLuna','pret'];
  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private asocCookieIdService: AsocCookieIdService,
              private avizierService: AvizierService,
              private route: ActivatedRoute,
              public monthSwitch: MonthSwitchService,
              private router: Router,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService) {
    this.assocId=asocCookieIdService.asocId as string;
  }
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if(params['an']!=null) this.anul = params['an'];
      if(params['luna']!=null) this.luna = params['luna'];
    });
    this.avizierSubscription();
  }
avizierSubscription (){
  this.avizierService.getAvizier(Number(this.asocCookieIdService.asocId),this.anul, this.luna).subscribe({
    next:next=>{
      this.itemsArray = next;
    },
    error:error=>{
      this.notifierService.showNotification("Avizierul nu este creat pentru luna selectata.", "OK", "eroare");
    },
    complete:() =>{
      this.dataSource = new MatTableDataSource(this.avizier);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      for (let i = 0; i < this.itemsArray[0].avizierRandDtoList.length; i++) {
        this.subArray.push(this.itemsArray[0].avizierRandDtoList[i].text);
        this.subSubArray.push("Consum");
        this.subSubArray.push("Suma");
      }
    }
  });
  this.avizierService.getServicii(Number(this.asocCookieIdService.asocId),this.anul, this.luna).subscribe({
    next:next=>{
      this.servicii = next;
    },
    error:error=>{
      this.notifierService.showNotification("Avizierul nu este creat pentru luna selectata.", "OK", "eroare");
    },
    complete:() =>{
      this.dataSourceServicii = new MatTableDataSource(this.servicii);
    }
  });
  this.avizierService.getCheltuieli(Number(this.asocCookieIdService.asocId),this.anul, this.luna).subscribe({
    next:next=>{
      this.cheltuieli = next;
    },
    error:error=>{
      this.notifierService.showNotification("Avizierul nu este creat pentru luna selectata.", "OK", "eroare");
    },
    complete:() =>{
      this.dataSourceCheltuieli = new MatTableDataSource(this.cheltuieli);
    }
  });

}
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.luna=new Date(this.date.value).getMonth()+1;
    this.anul= new Date(this.date.value).getFullYear();
    window.location.replace('/asociatie/avizier/an/' + this.anul + '/luna/' + this.luna);
    datepicker.close();

  }
}
