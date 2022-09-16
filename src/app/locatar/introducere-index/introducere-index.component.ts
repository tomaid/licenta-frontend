import {Component, OnInit, ViewChild} from '@angular/core';
import {Apartament} from "../../_core/model/Apartament";
import {ContorIndexExtend} from "../../_core/model/Contor";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder} from "@angular/forms";
import {map, Observable, shareReplay, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {NotifierService} from "../../_core/services/notifier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {ApartamenteService} from "../../_core/api/apartamente.service";
import {IndecsiService} from "../../_core/api/indecsi.service";
import {MatDialog} from "@angular/material/dialog";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";
import {IndexContorForm} from "../../_core/model/IndexContor";


@Component({
  selector: 'app-introducere-index',
  templateUrl: './introducere-index.component.html',
  styleUrls: ['./introducere-index.component.css']
})
export class IntroducereIndexComponent implements OnInit {
  contorIndecsi: ContorIndexExtend[] = [];
  dataSource!: MatTableDataSource<ContorIndexExtend>;
  displayedColumns: string[] = ['denumire', 'ultimul', 'curent', 'actiuni'];
  expandedElement!: Apartament | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );
  apartamentId:number=-1;
  private routeSub!: Subscription;
  constructor(private breakpointObserver: BreakpointObserver,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private router: Router,
              private route: ActivatedRoute,
              private asocCookieIdService: AsocCookieIdService,
              private apartamentService: ApartamenteService,
              private indecsiService: IndecsiService,
              public dialog: MatDialog,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if(params['id']!=null) this.apartamentId = params['id'];
    });
    if(this.apartamentId<0)location.reload();

    this.contoareSubscription();
  }
  private contoareSubscription() {
      this.indecsiService.getIndecsiLocatar(this.apartamentId).subscribe({
        next:next=>{
          this.contorIndecsi = next;
        },
        error:error=>{
          this.notifierService.showNotification(error.error.message, "OK", "eroare");
        },
        complete:() =>{
          this.dataSource = new MatTableDataSource(this.contorIndecsi);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //  this.dataSource.filterPredicate = (data, filter) => {
          //    const dataStr = data.numar + data.nume + data.prenume  + data.nume + " " + data.prenume;
          //    return dataStr.indexOf(filter) != -1;

          //   }
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

  setIndex(c: ContorIndexExtend) {
    const contorForm: IndexContorForm = new IndexContorForm(
      c.id,
      Number(c.indexCurent));
    this.indecsiService.salvareIndexLocatar(contorForm,this.apartamentId,c.idServiciu, c.id).subscribe({
      next: next =>{
        this.notifierService.showNotification(next.message, "OK", "notificare");
      },
      error: error =>{
        this.notifierService.showNotification(error.error.message, "OK", "eroare");
      }
    })

  }
  istoricIndecsi(idServiciu: number, idContor: number, numeServiciu: string, numeContor: string) {
   this.router.navigate(['locatar','apartament', this.apartamentId, 'service', idServiciu, 'contor', idContor, 'index'], { queryParams: { numeServiciu: numeServiciu, contorNume :numeContor, return: 1 },queryParamsHandling: 'merge' });
  }
}
