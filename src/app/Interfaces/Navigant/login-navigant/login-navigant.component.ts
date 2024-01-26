import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginNavigantService } from 'src/app/Services/login-navigant.service';

@Component({
  selector: 'app-login-navigant',
  templateUrl: './login-navigant.component.html',
  styleUrls: ['./login-navigant.component.css']
})
export class LoginNavigantComponent  implements OnInit{
  loginF!: FormGroup;

constructor(private fb: FormBuilder, private loginService: LoginNavigantService, 
  private router: Router){}
  

ngOnInit(): void {
     this.loginF = this.fb.group({
      matricule: [ '',Validators.required],
      motPasse: ['', Validators.required],
    });
  }
  get matricule() {
    return this.loginF.get('matricule');
  }

  get motPasse() {
    return this.loginF.get('motPasse');
  }
  
  onSubmit() {
   
    if (this.matricule && this.motPasse) { 

      const usermatricule = this.matricule.value;
      const motPasse = this.motPasse.value;

      this.loginService.authenticate(usermatricule, motPasse).subscribe(
        (response) => {
          console.log(JSON.parse(response)["token"]);
          
            localStorage.setItem('token', JSON.parse(response)["token"]);
            this.router.navigate([`/dashboard/homeNavigant/${usermatricule}`]);


        
      },
        (error) => {
          console.error('Invalid username or password', error);
          // Handle error if needed
          alert('Invalid matricule or password');
        }
      );
    }
  }
}
