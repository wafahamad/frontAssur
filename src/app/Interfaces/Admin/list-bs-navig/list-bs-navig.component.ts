import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  bulletinToSearch!:number;
constructor(private activatedRoute: ActivatedRoute,
  private servBull:BulletinService,private fb:FormBuilder,private router:Router){}

  ngOnInit(): void {
    this.matricule = this.activatedRoute.snapshot.params['matricule'];
    this.servBull.getBulletinsByNavigant(this.matricule).subscribe((bulletinsData) => {
      console.log(bulletinsData);
      this.bulletins = bulletinsData;
     
    });
    
  }
  supprimerBulletin(numBs: number) {
    this.servBull.deleteBulletin(numBs).subscribe(() => {
      this.bulletins = this.bulletins.filter(bulletin => bulletin.numBs !== numBs);
      alert(`Supprimer bulletin,${numBs}`);
    });
  }
  recherche() {
    this.servBull.getBulletinByNumBs(this.bulletinToSearch).subscribe(() => {
      this.bulletins = this.bulletins.filter(bulletin => bulletin.numBs == this.bulletinToSearch);
    });
  }



  modifierBulletin(numBs: number){
    this.router.navigate([`/admin/modifierBulletin/${numBs}`])

  }

  showDetails(numBs: number){
    this.router.navigate([`/admin/detailBulletin/${numBs}`])
      }
      
}
