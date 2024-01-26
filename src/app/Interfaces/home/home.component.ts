import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(private activatedRoute: ActivatedRoute,public router: Router){}

login(){

  this.router.navigate(['/dashboard/loginNavigant']);
  
}

loginAdmin(){

  this.router.navigate(['/admin/loginAdmin']);
  
}
}
