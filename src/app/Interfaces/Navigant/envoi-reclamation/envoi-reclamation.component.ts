import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Navigant } from 'src/app/Classes/navigant';
import { NavigantServiceService } from 'src/app/Services/navigant-service.service';
import { ReclamationService } from 'src/app/Services/reclamation.service';

@Component({
  selector: 'app-envoi-reclamation',
  templateUrl: './envoi-reclamation.component.html',
  styleUrls: ['./envoi-reclamation.component.css']
})
export class EnvoiReclamationComponent implements OnInit {
  matricule!: number;
  reclamationF!: FormGroup;
  navigant!: Navigant;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private service: NavigantServiceService,
    private reclamationService: ReclamationService
  ) {}

  ngOnInit(): void {
    this.matricule = this.activatedRoute.snapshot.params['matricule'];
    console.log(this.matricule);

    this.service.getNavigantById(this.matricule).subscribe((data) => {
      console.log(data);
      this.navigant = data;
    });

    this.initForm();
  }

  initForm(): void {
    this.reclamationF = this.fb.group({
      contenu: ['', Validators.required],
    });
  }

  submitReclamation() {
    const navigantId = this.matricule;
    if (this.reclamationF.valid) {
      const reclamationData = {
        navigantMatricule: this.matricule,
        contenu: this.reclamationF.value.contenu,
      };
  
      this.reclamationService.EnvoiReclamation(reclamationData.navigantMatricule, reclamationData.contenu).subscribe(
        (result) => {
          console.log('Reclamation request submitted successfully:', result);
          this.reclamationF.reset();
         
        },
        (error) => {
          console.error('Error submitting reclamation request:', error);
          
        }
      );
    }
  }
  
}
