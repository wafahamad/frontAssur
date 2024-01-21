import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BordereauGAT } from 'src/app/Classes/bordereau-gat';
import { Bulletin } from 'src/app/Classes/bulletin';
import { DetailDepense } from 'src/app/Classes/detail-depense';
import { BordereauGATService } from 'src/app/Services/bordereau-gat.service';
import { BulletinService } from 'src/app/Services/bulletin.service';
import { DetailDepenseService } from 'src/app/Services/detail-depense.service';

@Component({
  selector: 'app-list-bs-navig',
  templateUrl: './list-bs-navig.component.html',
  styleUrls: ['./list-bs-navig.component.css']
})
export class ListBsNavigComponent implements OnInit {
 
  matricule: any;
  numBs:any;
  bulletin!:Bulletin;
  bulletins!:Bulletin[];
  details!:DetailDepense[];
  bordereau!:BordereauGAT[];
  show=false;
constructor(private activatedRoute: ActivatedRoute,
  private servBull:BulletinService, private servDetail:DetailDepenseService,
  private servBord:BordereauGATService){}

  ngOnInit(): void {
    this.matricule = this.activatedRoute.snapshot.params['matricule'];
    this.servBull.getBulletinsByNavigant(this.matricule).subscribe((bulletinsData) => {
      console.log(bulletinsData);
      this.bulletins = bulletinsData;
      for(let i = 0; i < this.bulletins.length; i++) {
        this.servBord.getBordereauGATs(this.bulletins[i].numBs).subscribe((bordereaudata)=>{
          console.log(bordereaudata);
          this.bordereau = bordereaudata;
        });
        this.servDetail.getDetailDepenses(this.bulletins[i].numBs).subscribe((details)=>{
          console.log(details);
          this.details = details;
        });
      }
    });
  }
  showDetails(){
    this.show=true;
      }
}
