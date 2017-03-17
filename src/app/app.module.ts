import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

import { PostsService } from './posts.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

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
  
];

@NgModule({
  declarations: [
    AppComponent,
   HomeComponent, LoginComponent, SignupComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes) // Add routes to the app
  ],
  providers: [PostsService], // Add the posts service
  bootstrap: [AppComponent]
})
export class AppModule { }