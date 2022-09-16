import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {NotifierService} from "../../_core/services/notifier.service";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {Categorie, ListaProdusePrimiteDeLaAlgoritm, Produs, ProdusArray} from "../../_core/model/Categorie";
import {MatSelectChange} from "@angular/material/select";
import {AlgoritmGeneticService} from "../../_core/api/algoritm-genetic.service";

@Component({
  selector: 'app-inlocuire-electrocasnice',
  templateUrl: './inlocuire-electrocasnice.component.html',
  styleUrls: ['./inlocuire-electrocasnice.component.css']
})
export class InlocuireElectrocasniceComponent implements OnInit {
  public categorii: Categorie[] = [
    { id: 1, denumire: "Aer conditionat" },
    { id: 2, denumire: "Plita" },
    { id: 3, denumire: "Aspirator" },
    { id: 4, denumire: "Espressor" },
    { id: 5, denumire: "Frigider" },
    { id: 6, denumire: "Cuptor microunde" },
    { id: 7, denumire: "Cuptor electric" },
    { id: 8, denumire: "Fier de calcat" },
    { id: 9, denumire: "Gratar electric" },
    { id: 10, denumire: "Imprimanta" },
    { id: 12, denumire: "Masina de paine" },
    { id: 13, denumire: "Masina de spalat rufe" },
    { id: 14, denumire: "Monitoare PC" },
    { id: 15, denumire: "Storcator fructe" },
    { id: 16, denumire: "Uscator rufe" },
    { id: 17, denumire: "Sandwich-maker" },
    { id: 18, denumire: "TV" },
    { id: 19, denumire: "Masina de spalat vase" },
    { id: 20, denumire: "Laptop" },
  ];
  iDcategorie!: number;
  denumireCategorie!:string;
  produsarray= {} as unknown as ProdusArray;
  buget!:number;
  nrCicluri!:number;
  durataCiclu!:number;
  apartamentId:number=-1;
  listaproduse: Produs[] = [];
  dataSource!: MatTableDataSource<Produs>;
  variantePrimiteDelaAlgoritm:ListaProdusePrimiteDeLaAlgoritm[]=[];
  displayedColumns: string[] = ['denumire', 'ciclu', 'durata', 'actiuni'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('printiD') myTempRef!: ElementRef;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private algortimGeneticService: AlgoritmGeneticService,
              private router: Router,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService) {
  }

  ngOnInit(): void {

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
      pdf.text('Factura pentru apartamentul ',20, 20);
      pdf.setFontSize(18);
      pdf.addImage(contentDataURL, 'PNG', 5, 45, fileWidth, fileHeight);
      pdf.setFontSize(10);
      pdf.text("Numele si prenumele" ,20, 115);
      pdf.save('factura.pdf');
    });
  }

  onSelectChange(thisSelection: MatSelectChange) {
     this.iDcategorie=thisSelection.value;
  }

  adaugare() {
    for (let i = 0; i < this.categorii.length; i++) {
      if(this.categorii[i].id==this.iDcategorie){
        this.denumireCategorie=this.categorii[i].denumire;
      }
    }

    this.listaproduse.push({
      idCategorie: this.iDcategorie,
      denumireCategorie: this.denumireCategorie,
      cicluNumere: this.nrCicluri,
      durataCiclu:this.durataCiclu


    });
    this.dataSource = new MatTableDataSource(this.listaproduse);
    this.iDcategorie=-1;
    this.nrCicluri=0;
    this.durataCiclu=0;


  }

  delete(produs:Produs) {
    for (let i = 0; i < this.categorii.length; i++) {
      if(this.listaproduse[i].idCategorie==produs.idCategorie){
        this.listaproduse.splice(i,1);
        break;
      }
    }
    this.dataSource = new MatTableDataSource(this.listaproduse);
  }

  cautare() {
    // this.produsarray.produs=[];
    // for (let i = 0; i < this.listaproduse.length; i++) {
    //   this.produsarray.produs.push(this.listaproduse[i]);
    // }
    this.produsarray.produs= this.listaproduse;
    this.produsarray.pret=this.buget;
    if(this.produsarray.pret==null)
      return this.notifierService.showNotification("Introduceți bugetul alocat.", "OK", "eroare");
    if(this.produsarray.produs.length==0)
      return this.notifierService.showNotification("Alegeti produsele!", "OK", "eroare");

    this.algortimGeneticService.getProduse(this.produsarray).subscribe({
      next:next=>{
        this.variantePrimiteDelaAlgoritm = next;
      },
      error:error=>{
        this.notifierService.showNotification("A aparut o eroare", "OK", "eroare");
      },
      complete:() =>{
      }
    });

  }
}
