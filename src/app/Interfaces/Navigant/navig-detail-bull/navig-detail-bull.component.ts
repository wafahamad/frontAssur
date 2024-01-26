import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BordereauGAT } from 'src/app/Classes/bordereau-gat';
import { Bulletin } from 'src/app/Classes/bulletin';
import { DetailDepense } from 'src/app/Classes/detail-depense';
import { BordereauGATService } from 'src/app/Services/bordereau-gat.service';
import { BulletinService } from 'src/app/Services/bulletin.service';
import { DetailDepenseService } from 'src/app/Services/detail-depense.service';

@Component({
  selector: 'app-navig-detail-bull',
  templateUrl: './navig-detail-bull.component.html',
  styleUrls: ['./navig-detail-bull.component.css']
})
export class NavigDetailBullComponent implements OnInit {
  numBs:any;
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
}
