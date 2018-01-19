import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { DogDetailComponent } from './dog-detail/dog-detail.component';
import { InboxComponent } from './inbox/inbox.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { AddDogComponent } from './add-dog/add-dog.component';
import { UpdateDogComponent } from './update-dog/update-dog.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: ':id/dogs/new', component: AddDogComponent },
  { path: ':receiver_id/messages/:sender_id', component: MessageDetailComponent },
  { path: ':id/dogs/:dog_id/edit', component: UpdateDogComponent },
  { path: 'dogs/:dog_id', component: DogDetailComponent },
  { path: ':id/dashboard', component: DashboardComponent },
  { path: ':id/inbox', component: InboxComponent },
  { path: ':id/profile', component: ProfileComponent },
  { path: ':id/edit', component: UpdateInfoComponent },
  { path: '', component: SigninComponent },
  { path:'**', component: NotFoundComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
