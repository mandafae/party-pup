import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { DogDetailComponent } from './dog-detail/dog-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { UpdateDogComponent } from './update-dog/update-dog.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: ':id/dashboard', component: DashboardComponent },
  { path: 'search', component: SearchComponent },
  { path: ':owner_id/dogs/:dog_id', component: DogDetailComponent },
  { path: ':id/profile', component: ProfileComponent },
  { path: ':id/edit', component: UpdateInfoComponent },
  { path: ':id/dogs/:dog_id/edit', component: UpdateDogComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
