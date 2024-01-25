import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navigant } from 'src/app/Classes/navigant';
import { NavigantServiceService } from 'src/app/Services/navigant-service.service';

@Component({
  selector: 'app-list-navigants',
  templateUrl: './list-navigants.component.html',
  styleUrls: ['./list-navigants.component.css']
})
export class ListNavigantsComponent implements OnInit {
  matricule:any;
  navigants!:Navigant[];
  matriculeToSearch!: number;
  constructor(private router:Router,private servNavigant:NavigantServiceService){}
  ngOnInit(): void {
    this.servNavigant.getNavigants().subscribe((data)=>
    this.navigants=data);
  }
  showBulletin(matricule :number){
    this.router.navigate([`/listBsNavigant/${matricule}`])
  }
  supprimerNavigant(matricule: number) {
    this.servNavigant.deleteNavigant(matricule).subscribe(() => {
      this.navigants = this.navigants.filter(navigant => navigant.matricule !== matricule);
      alert(`Supprimer navigant,${matricule}`);
    });
  }
  rechercheNavigant() {
    this.servNavigant.getNavigantById(this.matriculeToSearch).subscribe(() => {
      this.navigants = this.navigants.filter(navigant => navigant.matricule == this.matriculeToSearch);
    });
  }

}
