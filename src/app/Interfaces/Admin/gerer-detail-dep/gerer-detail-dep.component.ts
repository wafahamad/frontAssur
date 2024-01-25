import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bulletin } from 'src/app/Classes/bulletin';
import { BulletinService } from 'src/app/Services/bulletin.service';
import { DetailDepenseService } from 'src/app/Services/detail-depense.service';

@Component({
  selector: 'app-gerer-detail-dep',
  templateUrl: './gerer-detail-dep.component.html',
  styleUrls: ['./gerer-detail-dep.component.css']
})
export class GererDetailDepComponent implements OnInit {
  numBs!:number;
  detailsF!:FormGroup;
  bulletin!: Bulletin;
  constructor( private servDetail: DetailDepenseService,
    private route: ActivatedRoute, private fb:FormBuilder,
    private servBulletin: BulletinService,){}
  ngOnInit(): void {
    this.numBs = +this.route.snapshot.params['numBs'];
this.initForm();
this.servBulletin.getBulletinByNumBs(this.numBs).subscribe((bulletin) => {
  this.bulletin = bulletin;
});
  }
  initForm(): void {
    this.detailsF = this.fb.group({
      type_act: ['',Validators.required ],
      montant_act_dep: ['',Validators.required ], 
    });
  }
  submit(){
    const detailDep={
      bulletinNum:this.numBs,
      ...this.detailsF.value
    }
    this.servDetail.addDetailDepense(detailDep).subscribe((response) => {
      console.log('detail depensé du bulletin  ajouté avec succès', response);
    alert(`detail depensé du bulletin ${this.numBs}  ajouté avec succès`)
    this.detailsF.reset()
    
   
  });
  }

}
