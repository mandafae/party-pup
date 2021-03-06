import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { MaterializeModule } from "angular2-materialize";

import { AuthModule } from './auth/auth.module';
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
import { DogDetailComponent } from './dog-detail/dog-detail.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddDogComponent } from './add-dog/add-dog.component';
import { InboxComponent } from './inbox/inbox.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("380430961127-5en61k87ob8hpnl8fijrbfg9pm0h9tev.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1990306837854412")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    UpdateInfoComponent,
    UpdateDogComponent,
    ProfileComponent,
    DashboardComponent,
    DogDetailComponent,
    SigninComponent,
    NotFoundComponent,
    AddDogComponent,
    InboxComponent,
    MessageDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AuthModule,
    MaterializeModule,
    SocialLoginModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    UserService, DogsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
