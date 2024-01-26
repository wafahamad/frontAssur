import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAdminService } from 'src/app/Services/login-admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  loginF!: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginAdminService, 
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
              this.router.navigate([`/admin/homeAdmin`]);
  
  
          
        },
          (error) => {
            console.error('Invalid username or password', error);
            // Handle error if needed
          }
        );
      }
    }
}
