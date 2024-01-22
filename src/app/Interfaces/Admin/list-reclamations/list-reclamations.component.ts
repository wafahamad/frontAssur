import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/Classes/reclamation';
import { ReclamationService } from 'src/app/Services/reclamation.service';

@Component({
  selector: 'app-list-reclamations',
  templateUrl: './list-reclamations.component.html',
  styleUrls: ['./list-reclamations.component.css']
})
export class ListReclamationsComponent implements OnInit {
  reclamations!:Reclamation[];
  constructor(private servRec:ReclamationService){}
  ngOnInit(): void {
   this.servRec.getReclamations().subscribe((data)=>
   this.reclamations = data.reverse())
  }
  updateSelection(reclamation: Reclamation) {
    this.servRec.updateReclamation(reclamation).subscribe(updatedReclamation => {
      console.log('Réclamation mise à jour:', updatedReclamation);
    }, error => {
      console.error('Erreur lors de la mise à jour de la réclamation:', error);
    });
  }
}
