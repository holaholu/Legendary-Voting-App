import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Globals } from '../globals';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user=this.globals.loggedin;posturl:string;
    showlink:boolean=false;polllist;dellist;
  errorMsg =[];optionstore=[];myTitleedit;optionstorecount=[];
   newPoll:Boolean=true;
  oldPoll:Boolean=false;
  myTitle:String ="";
  option=["","","","","","","","","",""];
  trackOption=[true,true,false,false,false,false,false,false,false,false];


 oldPolls(){
   this.oldPoll=true;
   this.newPoll=false;

    this.postsService.getPoll(this.globals.name)
       .subscribe(res => {
      this.polllist = res, posterror => this.errorMsg=posterror ;});
   
 }
newPolls(){
   this.oldPoll=false;
   this.newPoll=true;
   this.showlink=false;
 }
deletepoll(id){
  this.postsService.deletePoll(id)
       .subscribe(res => {
      this.dellist = res, posterror => this.errorMsg=posterror ;});

setTimeout(()=> {
  this.oldPolls()
}, 1000);
   
}

myedit(author,title) {
  this.globals.loggedin=true;
this.router.navigate(['/'+author+'/'+title+'/edit'])
}


onsubmitpoll(){
  for(var i=0;i<this.option.length;i++){
    if (this.option[i].length>1){
       this.optionstore.push(this.option[i])
    }
  }

  for(var i=0;i<this.optionstore.length;i++){
   
       this.optionstorecount.push(0);
    }
  

  this.myTitleedit=this.myTitle.split(" ").join("_");
  
  
  this.postsService.createPoll(this.myTitleedit,this.globals.name,this.optionstore,this.optionstorecount)
       .subscribe(res => {
      this.posturl = res, posterror => this.errorMsg=posterror ;});

   

setTimeout(() => {
  if(this.posturl.length>0){
    this.showlink=true;
  }else {
    this.showlink=false;
  }
  this.trackOption=[true,true,false,false,false,false,false,false,false,false];
  this.option=["","","","","","","","","",""];
  this.myTitle="";
}, 2000);



 }

 addOptions(){
    var store=0;
   for (var i=9;i>1;i--){
     if(this.trackOption[i-1]){
         var store=i;
         break;
     }
    
   }
   this.trackOption[store]=true;

 }




  constructor(private router: Router,private postsService: PostsService,private globals: Globals) { }

  ngOnInit() {

    
  }

  



}
