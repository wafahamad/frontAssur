import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Navigant } from 'src/app/Classes/navigant';
import { NavigantServiceService } from 'src/app/Services/navigant-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  navigant!:Navigant;
  matricule:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public service: NavigantServiceService,
    public router: Router
  ) {}
  ngOnInit() {
    this.matricule = this.activatedRoute.snapshot.params['matricule'];
    console.log(this.matricule);
    this.service.getNavigantById(this.matricule).subscribe((data) => {
      console.log(data);
      this.navigant = data;
    });
  }
}
