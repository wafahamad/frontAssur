import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  matricule: any;
  navigant!: Navigant;
  enfants: NavigEnfant[] = [];
  bulletinF!: FormGroup;
  isNavigantIdInvalid:boolean=false
  constructor(
    private servBull: BulletinService,
    private servNavigant: NavigantServiceService,
    private servEnfant: NavigEnfantService,
    private fb: FormBuilder,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.NavigantIdChanges();
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

  NavigantIdChanges(): void {
    const navigantIdControl = this.bulletinF.get('navigantId');
    if (navigantIdControl) {
      navigantIdControl.valueChanges.subscribe((navigantId) => {
        this.matricule = navigantId;
        this.enfants = [];
        this.servNavigant.getNavigantById(this.matricule).subscribe(
          (navigant: Navigant) => {
            if (navigant) {
              this.isNavigantIdInvalid = false;
            } 
          },
          (error) => {
            console.error("Error fetching navigant:", error);
            this.isNavigantIdInvalid = true; 
          }
        );
        this.servEnfant.getNavigEnfants(this.matricule).subscribe(
          (enfants: NavigEnfant[]) => {
            if (enfants && enfants.length > 0) {      this.enfants = enfants; 
            } else {
              console.error('No enfants found for the given matricule:', this.matricule);
            }
          }, );
      });
    }
  }
  submit() {
    if (this.bulletinF.valid) {
          
      const bulletinData = this.bulletinF.value;
        // Check if numBs already exists
        this.servBull.getBulletinByNumBs(bulletinData.numBs).subscribe(
          (existingBulletin: Bulletin) => {
            if (existingBulletin) {
             alert('Bulletin  already exists:');
            }}, 
            (error) => {
            if (bulletinData.typeSelection === 'navigant') {
              this.servNavigant.getNavigantById(this.matricule).subscribe(
                (navigant: Navigant) => {
                  if (navigant) {
                    this.navigant = navigant;
                    bulletinData.malade = navigant.nom;
                    this.submitBulletin(bulletinData);
                  }
                },
              );
            } else if (bulletinData.typeSelection === 'conjoint') {
              this.servNavigant.getNavigantById(this.matricule).subscribe(
                (navigant: Navigant) => {
                  this.navigant = navigant;
                  bulletinData.malade = navigant.nomConjoint;
                  this.submitBulletin(bulletinData);
                },
              );
            } else if (bulletinData.typeSelection === 'enfant') {
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
              );
            }
          });
          }
      
  }

  submitBulletin(bulletinData: Bulletin) {
    this.servBull.addBulletin(bulletinData).subscribe(
      (result) => {
        alert('Bulletin request submitted successfully');
        this.bulletinF.reset();
        this.router.navigate([`/admin/gererDetailDepense/${bulletinData.numBs}`])
      },
      (error) => {
        console.error('Error submitting Bulletin request:', error);
      }
    );
  }
}
