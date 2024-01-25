import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BordereauGAT } from 'src/app/Classes/bordereau-gat';
import { Bulletin } from 'src/app/Classes/bulletin';
import { DetailDepense } from 'src/app/Classes/detail-depense';
import { BordereauGATService } from 'src/app/Services/bordereau-gat.service';
import { BulletinService } from 'src/app/Services/bulletin.service';
import { DetailDepenseService } from 'src/app/Services/detail-depense.service';

@Component({
  selector: 'app-all-bulletin',
  templateUrl: './all-bulletin.component.html',
  styleUrls: ['./all-bulletin.component.css']
})
export class AllBulletinComponent implements OnInit {
  numBs:any;
  bulletin!:Bulletin;
  bulletins!:Bulletin[];
  details!:DetailDepense[];
  bordereau!:BordereauGAT[];
  bulletinF!:FormGroup;
  hideForm = true;

  constructor(private servBull:BulletinService, private servDetail:DetailDepenseService,
    private servBord:BordereauGATService,private fb:FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.servBull.getBulletins().subscribe((bulletinsData) => {
      console.log(bulletinsData);
      this.bulletins = bulletinsData.reverse();
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
  
}
