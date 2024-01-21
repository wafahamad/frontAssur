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
   this.reclamations=data)
  }

}
