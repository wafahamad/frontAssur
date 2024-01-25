import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BordereauGATService } from 'src/app/Services/bordereau-gat.service';

@Component({
  selector: 'app-chargement-bordereau',
  templateUrl: './chargement-bordereau.component.html',
  styleUrls: ['./chargement-bordereau.component.css']
})
export class ChargementBordereauComponent implements OnInit {
  bordereauF!:FormGroup
  constructor(private fb:FormBuilder,private servBor:BordereauGATService){}
  ngOnInit(): void {

    this.initForm()
  }
  initForm(): void {
    this.bordereauF = this.fb.group({
      bulletinNum: ['',Validators.required ],
      type_act: ['',Validators.required ],
      montant_act_dep: ['',Validators.required ], 
      montant_act_rembor:['',Validators.required ], 
    });
  }
submit(){
const bordereau=this.bordereauF.value;
this.servBor.addBordereauGAT(bordereau).subscribe((response) => {
  console.log('Bordereau GAT  ajouté avec succès', response);
alert(`Bordereau GAT  ajouté avec succès`)
this.bordereauF.reset()
});
}
}
