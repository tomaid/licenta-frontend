import {Component, OnInit, ViewChild} from '@angular/core';
import {IndexContor} from "../../../_core/model/IndexContor";
import {MatTableDataSource} from "@angular/material/table";
import {map, Observable, shareReplay, Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {FormBuilder, FormControl} from "@angular/forms";
import {NotifierService} from "../../../_core/services/notifier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AsocCookieIdService} from "../../../_core/services/asoc-cookie-id.service";
import {IndecsiService} from "../../../_core/api/indecsi.service";
import {MatDialog} from "@angular/material/dialog";
import {UpperLowerTitleCaseService} from "../../../_shared/upper-lower-title-case.service";

@Component({
  selector: 'app-istoric-indecsi',
  templateUrl: './istoric-indecsi.component.html',
  styleUrls: ['./istoric-indecsi.component.css']
})
export class IstoricIndecsiComponent implements OnInit {

  indecsi: IndexContor[] = [];
  dataSource!: MatTableDataSource<IndexContor>;
  displayedColumns: string[] = ['data', 'valoare', 'consum'];
  serviceId!: number;
  numeServiciu!:string;
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
      this.apartamentId = params['id'];
      this.serviceId = params['sid'];
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
    this.indecsiService.getContoareLocatar(this.apartamentId,this.serviceId,this.contorId).subscribe({
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
      }
    })
  }

  back(): void {
      this.router.navigate(['locatar','apartament', this.apartamentId, 'index'], {
        queryParams: {serviciu: this.numeServiciu},
        queryParamsHandling: 'merge'
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
