import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Navigant } from 'src/app/Classes/navigant';
import { NavigantServiceService } from 'src/app/Services/navigant-service.service';

@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrls: ['./create-compte.component.css']
})
export class CreateCompteComponent {
  loginForm!: FormGroup;
  navigants!:Navigant[];
  constructor(private fb:FormBuilder,private service:NavigantServiceService,private router: Router){}
  ngOnInit(): void {
    this.service.getNavigants().subscribe(
      (data) => (this.navigants = data)
    );
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      matricule: [''],
      nom:['', Validators.required],
      dateNaissance: ['', Validators.required],
      fonction: ['', Validators.required],
      numCompte: ['', Validators.required],
      motPasse: ['', Validators.required],
      marie: [false, Validators.required],
      nomConjoint: [''],

    });
  }
  public get matricule(){
    return this.loginForm.get('matricule');
  }
    public get motPasse() {
      return this.loginForm.get('motPasse');
    }
    public get nom() {
      return this.loginForm.get('nom');
    }
    public get dateNaissance() {
      return this.loginForm.get('dateNaissance');
    }
    public get numCompte() {
      return this.loginForm.get('numCompte');
    }
    public get fonction() {
      return this.loginForm.get('fonction');
    }
    public get marie() {
      return this.loginForm.get('marie');
    }
    public get nomConjoint() {
      return this.loginForm.get('nomConjoint');
    }
  CreateParticipant() {
    this.service.registerNavigant(
        
        this.matricule?.value,
        this.motPasse?.value,
        this.nom?.value,
        this.dateNaissance?.value,
        this.numCompte?.value,
        this.fonction?.value,
        this.marie?.value,
        this.nomConjoint?.value
    )
      .subscribe((navigant) => {
        this.navigants.push();
        alert('Welcome to AssurNavigant! ');
        this.router.navigate(['/loginNavigant']);
      });
  }
}
