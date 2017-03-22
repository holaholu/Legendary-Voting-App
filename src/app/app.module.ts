import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HomeComponent } from './home/home.component';
import { PostsService } from './posts.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { VotepollComponent } from './votepoll/votepoll.component';
import { EditComponent } from './edit/edit.component';
import { SettingsComponent } from './settings/settings.component';

// Define the routes
const routes:Routes = [
  {
    path: '',
     component: HomeComponent
   
  },
  {
    path: 'signup',
    component: SignupComponent 
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: ':author/:mytitle',
    component:VotepollComponent
  },
  {
    path: ':author/:mytitle/edit',
    component:EditComponent
  },
  {
    path: 'settings',
    component:SettingsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
   HomeComponent, SignupComponent,  LoginComponent, VotepollComponent, EditComponent, SettingsComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    FlashMessagesModule,
    RouterModule.forRoot(routes) // Add routes to the app
  ],
  providers: [PostsService,Globals], // Add the posts service
  bootstrap: [AppComponent]
})
export class AppModule { }