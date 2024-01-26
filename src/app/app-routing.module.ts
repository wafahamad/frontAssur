import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Interfaces/home/home.component';
import { HomeNavigantComponent } from './Interfaces/Navigant/home-navigant/home-navigant.component';
import { LoginNavigantComponent } from './Interfaces/Navigant/login-navigant/login-navigant.component';
import { ListBulletinComponent } from './Interfaces/Navigant/list-bulletin/list-bulletin.component';
import { EnvoiReclamationComponent } from './Interfaces/Navigant/envoi-reclamation/envoi-reclamation.component';
import { CreateCompteComponent } from './Interfaces/Navigant/create-compte/create-compte.component';
import { HomeAdminComponent } from './Interfaces/Admin/home-admin/home-admin.component';
import { LoginAdminComponent } from './Interfaces/Admin/login-admin/login-admin.component';
import { ListNavigantsComponent } from './Interfaces/Admin/list-navigants/list-navigants.component';
import { ListBsNavigComponent } from './Interfaces/Admin/list-bs-navig/list-bs-navig.component';
import { ListReclamationsComponent } from './Interfaces/Admin/list-reclamations/list-reclamations.component';
import { AllBulletinComponent } from './Interfaces/Admin/all-bulletin/all-bulletin.component';
import { GererBulletinsComponent } from './Interfaces/Admin/gerer-bulletins/gerer-bulletins.component';
import { ModifierBulletinComponent } from './Interfaces/Admin/modifier-bulletin/modifier-bulletin.component';
import { GererDetailDepComponent } from './Interfaces/Admin/gerer-detail-dep/gerer-detail-dep.component';
import { ChargementBordereauComponent } from './Interfaces/Admin/chargement-bordereau/chargement-bordereau.component';
import { DetailsComponent } from './Interfaces/Admin/details/details.component';
import { NavigDetailBullComponent } from './Interfaces/Navigant/navig-detail-bull/navig-detail-bull.component';
import { DashboardNavigantComponent } from './Interfaces/Navigant/dashboard-navigant/dashboard-navigant.component';
import { DashboardAdminComponent } from './Interfaces/Admin/dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  {
  path: '',
    children: [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path:'dashboard',component:DashboardNavigantComponent,
  children:[
  {path:'homeNavigant/:matricule',title:'home',component:HomeNavigantComponent},
  {path:'loginNavigant',title:'login',component:LoginNavigantComponent},
  {path:'CreateCompte',title:'Create Compte',component:CreateCompteComponent},
  {path:'listBulletin/:matricule',title:'list bulletin de soin',component:ListBulletinComponent},
  {path:'Reclamation/:matricule',title:'Envoyer Reclamation',component:EnvoiReclamationComponent},
  {path:'navigDetailBull/:matricule/:numBs',title:'Navigant Details Bulletin',component:NavigDetailBullComponent},


]},
{path:'admin', component:DashboardAdminComponent,
children:[
  {path:'homeAdmin',title:'home',component:HomeAdminComponent},
  {path:'loginAdmin',title:'login',component:LoginAdminComponent},
  {path:'listNavigant',title:'list Navigants',component:ListNavigantsComponent},
  {path:'listBsNavigant/:matricule',title:'list bulletin de soin du navigant ${matricule}',component:ListBsNavigComponent},
  {path:'listReclamation',title:'list Reclamations',component:ListReclamationsComponent},
  {path:'gererBulletin',title:'Gérer Bulletin',component:GererBulletinsComponent},
  {path:'modifierBulletin/:numBs',title:'modifier Bulletin de soin',component:ModifierBulletinComponent},
  {path:'gererDetailDepense/:numBs',title:'Gérer detail depensé ',component:GererDetailDepComponent},
  {path:'chargementBordereau',title:'chargement Bordereau',component:ChargementBordereauComponent},
  {path:'detailBulletin/:numBs',title:' Details Bulletin',component:DetailsComponent},
  {path:'allBulletin',title:'list all bulletins',component:AllBulletinComponent},
    ]},
  
  ]}

  
  

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
