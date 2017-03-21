import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import {Router} from '@angular/router';
import { Globals } from '../globals';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
store;
myPassword="";myEmail="";errorMsg="";
constructor(private _flashMessagesService: FlashMessagesService,private postsService: PostsService,private router: Router,private globals: Globals) { }

onsubmit(){
 
// loginup and get user
    this.postsService.logIn(this.myEmail,this.myPassword)
       .subscribe(res => {
      this.globals.name = res, posterror => this.errorMsg=posterror ;});
  
// Go to home page
setTimeout(()=> {

  if(this.globals.name.length < 1){
    this.router.navigate(['/login']);
    this.globals.loggedin=false;
    this._flashMessagesService.grayOut(true);
    this._flashMessagesService.show("Your email or password is incorrect", { timeout: 2500,cssClass: 'alert-danger' });
  } else {
     this.router.navigate(['']);
     this.globals.loggedin=true;
  }
  
}, 1000);
  
   

   //setTimeout(function() {
       //this.globals.name="superman";
   //},5000);
   

}

  
  ngOnInit() { 
    
    
   }
  

}
