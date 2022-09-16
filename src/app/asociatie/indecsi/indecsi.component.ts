import {Component, OnInit, ViewChild} from '@angular/core';
import {IndexContor} from "../../_core/model/IndexContor";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, shareReplay, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {NotifierService} from "../../_core/services/notifier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {MatDialog} from "@angular/material/dialog";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";
import {IndecsiService} from "../../_core/api/indecsi.service";
import {isElementScrolledOutsideView} from "@angular/cdk/overlay/position/scroll-clip";

@Component({
  selector: 'app-indecsi',
  templateUrl: './indecsi.component.html',
  styleUrls: ['./indecsi.component.css']
})
export class IndecsiComponent implements OnInit {
  indecsi: IndexContor[] = [];
  dataSource!: MatTableDataSource<IndexContor>;
  displayedColumns: string[] = ['data', 'valoare', 'consum'];
  serviceId!: number;
  numeServiciu!:string;
  titluApt:string = "";
  numeContor!:string;
  numarApartament!:string;
  contorId!: number;
  returnPage:number=0;
  apartamentId!: number;
  private routeSub?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
              private indecsiService: IndecsiService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.serviceId = params['id'];
      this.contorId = params['cid'];
    });
    this.route.queryParams.subscribe(queryParams =>{
      this.numeServiciu=this.upperLowerTitleCaseService.titleCase(queryParams['numeServiciu']);
      this.numeContor=this.upperLowerTitleCaseService.titleCase(queryParams['contorNume']);
      this.numarApartament=this.upperLowerTitleCaseService.titleCase(queryParams['apartament']);
      this.returnPage=queryParams['return'];
    })
    this.indecsiSubscription();
  }

  private indecsiSubscription() {
    this.indecsiService.getContoare(Number(this.asocCookieIdService.asocId),this.serviceId,this.contorId).subscribe({
      next:next =>{
        this.indecsi = next;
      },
      error:error =>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      },
      complete:() =>{
        this.dataSource = new MatTableDataSource(this.indecsi);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.returnPage==1)this.titluApt = "apartament";
      }
    })
  }

  back(): void {
    if(this.returnPage==1)
    {this.router.navigate(['asociatie','apartamente'])}
    else if(this.returnPage==2)
    {this.router.navigate(['asociatie','servicii'])}
    else {
      this.router.navigate(['asociatie', 'serviciu', this.serviceId, 'contoare'], {
        queryParams: {serviciu: this.numeServiciu},
        queryParamsHandling: 'merge'
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
