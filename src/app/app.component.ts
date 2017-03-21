import { Component,OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Globals } from './globals';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Welcome !'; store;
  user=this.globals.loggedin;


  errorMsg="";
 
logOut() {
  
  this.globals.loggedin=false;
  this.globals.name =(function () { return; })();
  this.router.navigate(['/logout']);
}

getStore(){
 
  if(this.globals.name.length < 1){
    this.globals.loggedin=false;
  } else {
    this.globals.loggedin=true;
  }
}
 constructor(private postsService: PostsService,private globals: Globals,private router: Router) { }

  ngOnInit() {
this.globals.loggedin=true;
         this.postsService.getUser()
       .subscribe(res => {
      this.globals.name = res, posterror => this.errorMsg=posterror ;});
   
  setTimeout(()=>{
this.getStore();
  }, 500);
     
 
  
  
  }


}
