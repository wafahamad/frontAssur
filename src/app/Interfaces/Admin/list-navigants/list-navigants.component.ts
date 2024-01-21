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
  navigants!:Navigant[];
  constructor(private router:Router,private servNavigant:NavigantServiceService){}
  ngOnInit(): void {
    this.servNavigant.getNavigants().subscribe((data)=>
    this.navigants=data);
  }
  showBulletin(matricule :number){
    this.router.navigate([`/listBsNavigant/${matricule}`])
  }

}
