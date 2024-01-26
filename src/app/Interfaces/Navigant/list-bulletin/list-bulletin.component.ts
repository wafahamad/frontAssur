import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BordereauGAT } from 'src/app/Classes/bordereau-gat';
import { Bulletin } from 'src/app/Classes/bulletin';
import { DetailDepense } from 'src/app/Classes/detail-depense';
import { Navigant } from 'src/app/Classes/navigant';
import { BordereauGATService } from 'src/app/Services/bordereau-gat.service';
import { BulletinService } from 'src/app/Services/bulletin.service';
import { DetailDepenseService } from 'src/app/Services/detail-depense.service';
import { NavigantServiceService } from 'src/app/Services/navigant-service.service';

@Component({
  selector: 'app-list-bulletin',
  templateUrl: './list-bulletin.component.html',
  styleUrls: ['./list-bulletin.component.css']
})
export class ListBulletinComponent implements OnInit {

  matricule: any;
  numBs:any;
  navigant!: Navigant;
  bulletin!:Bulletin;
  bulletins!:Bulletin[];
  constructor(private activatedRoute: ActivatedRoute,
    private servNav:NavigantServiceService,
    private servBull:BulletinService,private router:Router){}
  ngOnInit(): void {
    this.matricule = this.activatedRoute.snapshot.params['matricule'];
    console.log(this.matricule);
    this.servNav.getNavigantById(this.matricule).subscribe((data) => {
      console.log(data);
      this.navigant = data;
      if (this.navigant?.matricule) {
        this.servBull.getBulletinsByNavigant(this.navigant.matricule).subscribe((bulletinsData) => {
          console.log(bulletinsData);
          this.bulletins = bulletinsData;
        });
      }
    });
  }
  showDetails(matricule:number,numBs:number){
    this.router.navigate([`/dashboard/navigDetailBull/${matricule}/${numBs}`])
  }
}
