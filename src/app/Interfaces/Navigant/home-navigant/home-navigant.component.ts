import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigEnfant } from 'src/app/Classes/navig-enfant';
import { Navigant } from 'src/app/Classes/navigant';
import { NavigEnfantService } from 'src/app/Services/navig-enfant.service';
import { NavigantServiceService } from 'src/app/Services/navigant-service.service';

@Component({
  selector: 'app-home-navigant',
  templateUrl: './home-navigant.component.html',
  styleUrls: ['./home-navigant.component.css']
})
export class HomeNavigantComponent implements OnInit {
  matricule: any;
  navigant!: Navigant;
  enfants: NavigEnfant[] = [];
  showForm = false;
  enfantForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private navigantService: NavigantServiceService,
    private enfantService: NavigEnfantService
  ) {
    // Initialize the form group
    this.enfantForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.matricule = this.activatedRoute.snapshot.params['matricule'];
    console.log(this.matricule);
    this.navigantService.getNavigantById(this.matricule).subscribe((data) => {
      console.log(data);
      this.navigant = data;

      // Use the navigant's ID to get the associated enfants
      if (this.navigant?.matricule) {
        this.enfantService.getNavigEnfants(this.navigant.matricule).subscribe((enfantsData) => {
          console.log(enfantsData);
          this.enfants = enfantsData;
        });
      }
    });
  }
  showEnfantForm() {
    this.showForm = true;
}
  ajouterEnfant() {
    this.showForm = true;
  const navigEnfant = {
    nom: this.enfantForm.value.nom,
    prenom: this.enfantForm.value.prenom,
    navigantId: this.matricule
  };

  this.enfantService.ajouterEnfant(navigEnfant).subscribe((response) => {
    console.log('Enfant ajouté avec succès', response);

    // Refresh the list of enfants
    this.enfantService.getNavigEnfants(this.navigant.matricule).subscribe((enfantsData) => {
      this.enfants = enfantsData;
    });
    this.showForm = false;
  });
 
  }

  supprimerEnfant(idE: number) {
    // Implement logic to delete the selected child
    this.enfantService.deleteEnfant(idE).subscribe(() => {
      // Remove the deleted child from the local list
      this.enfants = this.enfants.filter(enfant => enfant.idE !== idE);
      console.log('Supprimer Enfant clicked', idE);
    });
  }
}
