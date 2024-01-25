import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeNavigantComponent } from './Interfaces/Navigant/home-navigant/home-navigant.component';
import { HomeAdminComponent } from './Interfaces/Admin/home-admin/home-admin.component';
import { ListNavigantsComponent } from './Interfaces/Admin/list-navigants/list-navigants.component';
import { HomeComponent } from './Interfaces/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginNavigantComponent } from './Interfaces/Navigant/login-navigant/login-navigant.component';
import { NavComponent } from './Interfaces/Navigant/nav/nav.component';
import { ListBulletinComponent } from './Interfaces/Navigant/list-bulletin/list-bulletin.component';
import { EnvoiReclamationComponent } from './Interfaces/Navigant/envoi-reclamation/envoi-reclamation.component';
import { CreateCompteComponent } from './Interfaces/Navigant/create-compte/create-compte.component';
import { LoginAdminComponent } from './Interfaces/Admin/login-admin/login-admin.component';
import { NavAdminComponent } from './Interfaces/Admin/nav-admin/nav-admin.component';
import { ListBsNavigComponent } from './Interfaces/Admin/list-bs-navig/list-bs-navig.component';
import { GererBulletinsComponent } from './Interfaces/Admin/gerer-bulletins/gerer-bulletins.component';
import { ListReclamationsComponent } from './Interfaces/Admin/list-reclamations/list-reclamations.component';
import { AllBulletinComponent } from './Interfaces/Admin/all-bulletin/all-bulletin.component';
import { ChargementBordereauComponent } from './Interfaces/Admin/chargement-bordereau/chargement-bordereau.component';
import { ModifierBulletinComponent } from './Interfaces/Admin/modifier-bulletin/modifier-bulletin.component';
import { GererDetailDepComponent } from './Interfaces/Admin/gerer-detail-dep/gerer-detail-dep.component';
import { DetailsComponent } from './Interfaces/Admin/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeNavigantComponent,
    HomeAdminComponent,
    ListNavigantsComponent,
    HomeComponent,
    LoginNavigantComponent,
    NavComponent,
    ListBulletinComponent,
    EnvoiReclamationComponent,
    CreateCompteComponent,
    LoginAdminComponent,
    NavAdminComponent,
    ListBsNavigComponent,
    GererBulletinsComponent,
    ListReclamationsComponent,
    AllBulletinComponent,
    ChargementBordereauComponent,
    ModifierBulletinComponent,
    GererDetailDepComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
