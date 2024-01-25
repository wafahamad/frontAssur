// modifier-bulletin.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bulletin } from 'src/app/Classes/bulletin';
import { BulletinService } from 'src/app/Services/bulletin.service';

@Component({
  selector: 'app-modifier-bulletin',
  templateUrl: './modifier-bulletin.component.html',
  styleUrls: ['./modifier-bulletin.component.css']
})
export class ModifierBulletinComponent implements OnInit {
  numBs!: number;
  bulletin!: Bulletin;
  bulletinForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private bulletinService: BulletinService
  ) {}

  ngOnInit(): void {
    this.numBs = +this.route.snapshot.params['numBs'];
    this.initializeForm();
    this.loadBulletin();
  }

  initializeForm(): void {
    this.bulletinForm = this.fb.group({
      malade: ['', ],
      dateSoin: ['', ],
      montantDepense: ['', ],
      dateEnvoiGAT: ['', ],
      dateRem: ['', ],
      montantRemborse: ['',],
      status: ['', ],

      
    });
  }

  loadBulletin(): void {
    this.bulletinService.getBulletinByNumBs(this.numBs).subscribe((bulletin) => {
      this.bulletin = bulletin;
      this.bulletinForm.patchValue({
        malade: this.bulletin.malade,
        dateSoin: this.bulletin.dateSoin,
       montantDepense: this.bulletin.montantDepense,
        dateEnvoiGAT: this.bulletin.dateEnvoiGAT,
         dateRem: this.bulletin.dateRem,
         montantRemborse: this.bulletin.montantRemborse,
          status: this.bulletin.status,
        
      });
    });
  }

  modifierBulletin(): void {
    if (this.bulletinForm.valid) {
      const updatedBulletin: Bulletin =this.bulletinForm.value;

      this.bulletinService.updateBulletin(this.numBs, updatedBulletin).subscribe(() => {
        alert(`Bulletin ${this.numBs} modifié avec succès`);
        this.bulletinForm.reset();
      });
    }
  }
}
