import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { UpdateDogComponent } from './update-dog/update-dog.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './user.service';
import { DogsService } from './dogs.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    UpdateInfoComponent,
    UpdateDogComponent,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ UserService, DogsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
