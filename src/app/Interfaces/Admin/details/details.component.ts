import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BordereauGAT } from 'src/app/Classes/bordereau-gat';
import { Bulletin } from 'src/app/Classes/bulletin';
import { DetailDepense } from 'src/app/Classes/detail-depense';
import { BordereauGATService } from 'src/app/Services/bordereau-gat.service';
import { BulletinService } from 'src/app/Services/bulletin.service';
import { DetailDepenseService } from 'src/app/Services/detail-depense.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  numBs :any;idB:any; idD:any;
  bulletin!:Bulletin;
  bulletins!:Bulletin[];
  details!:DetailDepense[];
  bordereau!:BordereauGAT[]; 
  constructor(private activatedRoute: ActivatedRoute,
    private servBull:BulletinService, private servDetail:DetailDepenseService,
    private servBord:BordereauGATService){}
  ngOnInit(): void {
    this.numBs= this.activatedRoute.snapshot.params['numBs'];
    this.servBull.getBulletinByNumBs(this.numBs).subscribe((bulletinsData) => {
      console.log(bulletinsData);
      this.bulletin = bulletinsData;
        this.servBord.getBordereauGATs(this.bulletin.numBs).subscribe((bordereaudata)=>{
          console.log(bordereaudata);
          this.bordereau = bordereaudata;
        });
        this.servDetail.getDetailDepenses(this.bulletin.numBs).subscribe((details)=>{
          console.log(details);
          this.details = details;
        });
      
    });
   }
   supprimerBordereau(idB:number){
    this.servBord.deleteBordereauGAT(idB).subscribe(() => {
      this.bordereau = this.bordereau.filter(bordereau => bordereau.idB !== idB);
      alert(`Supprimer bordereau,${idB}`);
    });
   }
   supprimerDetailDep(idD:number){
    this.servDetail.deleteDetailDepense(idD).subscribe(() => {
      this.details = this.details.filter(detail => detail.idD !== idD);
      alert(`Supprimer détails depensé,${idD}`);
    });
   }
   printPage(): void {
    const printContent = document.getElementById('print-content');
    if (printContent) {
      // Create a new window or iframe
      const printWindow = window.open('', '_blank');

      if (printWindow) {
        const printDocument = printWindow.document;
        printDocument.write('<html><head><title>Imprimer Bulletin</title></head><body>');
        printDocument.write(printContent.innerHTML);
        printDocument.write('</body></html>');
        printWindow.print();
        printWindow.close();
      }
    }
  }
}
