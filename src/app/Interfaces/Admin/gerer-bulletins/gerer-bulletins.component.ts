import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BordereauGAT } from 'src/app/Classes/bordereau-gat';
import { Bulletin } from 'src/app/Classes/bulletin';
import { DetailDepense } from 'src/app/Classes/detail-depense';
import { NavigEnfant } from 'src/app/Classes/navig-enfant';
import { Navigant } from 'src/app/Classes/navigant';
import { BulletinService } from 'src/app/Services/bulletin.service';
import { DetailDepenseService } from 'src/app/Services/detail-depense.service';
import { NavigEnfantService } from 'src/app/Services/navig-enfant.service';
import { NavigantServiceService } from 'src/app/Services/navigant-service.service';

@Component({
  selector: 'app-gerer-bulletins',
  templateUrl: './gerer-bulletins.component.html',
  styleUrls: ['./gerer-bulletins.component.css']
})
export class GererBulletinsComponent implements OnInit {
  bulletin!: Bulletin;
  detail!: DetailDepense;
  bordereau!: BordereauGAT;
  matricule: any;
  navigant!: Navigant;
  enfants: NavigEnfant[] = [];
  bulletinF!: FormGroup;

  constructor(
    private servBull: BulletinService,
    private servDetail: DetailDepenseService,
    private servNavigant: NavigantServiceService,
    private servEnfant: NavigEnfantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToNavigantIdChanges();
  }

  initForm(): void {
    this.bulletinF = this.fb.group({
      numBs: ['', Validators.required],
      dateSoin: ['', Validators.required],
      status: ['', Validators.required],
      navigantId: ['', Validators.required],
      typeSelection: ['', Validators.required],
      selectedEnfant: [''] 
    });
  }

  subscribeToNavigantIdChanges(): void {
    const navigantIdControl = this.bulletinF.get('navigantId');
    if (navigantIdControl) {
      navigantIdControl.valueChanges.subscribe((navigantId) => {
        this.matricule = navigantId;
        this.enfants = [];
        console.log('Matricule:', this.matricule);
        this.servEnfant.getNavigEnfants(this.matricule).subscribe(
          (enfants: NavigEnfant[]) => {
            console.log('Enfants Response:', enfants); 
  
            if (enfants && enfants.length > 0) {
              this.enfants = enfants; 
              console.log('Enfants:', this.enfants);
            } else {
              console.error('No enfants found for the given matricule:', this.matricule);
            }
          },
        );
      
      });
    }
  }
  submit() {
    console.log('Submit Reclamation called');
    if (this.bulletinF.valid) {
      const bulletinData = this.bulletinF.value;
      if (bulletinData.typeSelection === 'navigant') {
        this.servNavigant.getNavigantById(this.matricule).subscribe(
          (navigant: Navigant) => {
            this.navigant = navigant;
            bulletinData.malade = navigant.nom;
            this.submitBulletin(bulletinData);
          },
          (error) => {
            console.error('Error retrieving navigant information:', error);
          }
        );
      } else if (bulletinData.typeSelection === 'conjoint') {
        this.servNavigant.getNavigantById(this.matricule).subscribe(
          (navigant: Navigant) => {
            this.navigant = navigant;
            bulletinData.malade = navigant.nomConjoint;
            this.submitBulletin(bulletinData);
          },
          (error) => {
            console.error('Error retrieving navigant information:', error);
          }
        );
        
      } else if (bulletinData.typeSelection === 'enfant') {
        console.log('Type Selection is enfant');
        this.servEnfant.getNavigEnfants(this.matricule).subscribe(
          (enfants: NavigEnfant[]) => {
            if (enfants && enfants.length > 0) {
              this.enfants = enfants;
              const selectedEnfantId = +bulletinData.selectedEnfant;
              const selectedEnfant = enfants.find(enfant => enfant.idE === selectedEnfantId);

              if (selectedEnfant) {
                bulletinData.malade = `${selectedEnfant.nom} ${selectedEnfant.prenom}`;
                this.submitBulletin(bulletinData);
              } else {
                console.error('Selected enfant not found:', selectedEnfantId);
              }
            } else {
              console.error('No enfants found for the given matricule:', this.matricule);
            }
          },
          (error) => {
            console.error('Error retrieving enfant information:', error);
          }
        );
      }
    }
  }

  submitBulletin(bulletinData: any) {
    console.log('Submit Bulletin called');
    this.servBull.addBulletin(bulletinData).subscribe(
      (result) => {
        console.log('Bulletin request submitted successfully:', result);
        this.bulletinF.reset();
      },
      (error) => {
        console.error('Error submitting Bulletin request:', error);
      }
    );
  }
}
