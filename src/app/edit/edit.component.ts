import { Component,OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Globals } from '../globals';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user=this.globals.loggedin;posturl:string;
  owner:boolean=false;notfound:boolean=false;
    showlink:boolean=false;polllist;dellist;
  errorMsg =[];optionstore=[];myTitleedit;optionstorecount=[];
   newPoll:Boolean=true;
  oldPoll:Boolean=false;
  myTitle:String ="";
  option=["","","","","","","","","",""];
  trackOption=[true,true,false,false,false,false,false,false,false,false];
private sub: any;
 author: string;
 mytitle:string;mypoll;

 



onsubmitpoll(){
  for(var i=0;i<this.option.length;i++){
    if (this.option[i].length>1){
       this.optionstore.push(this.option[i])
    }
  }

  for(var i=0;i<this.optionstore.length;i++){
     if(this.mypoll[0].count[i]==undefined){
       this.optionstorecount.push(0);
     }else {
         this.optionstorecount[i]=this.mypoll[0].count[i];
     }
  }
    
   this.myTitleedit=this.myTitle.split(" ").join("_");
  
 
  this.postsService.editPoll(this.myTitleedit,this.mypoll[0].author,this.optionstore,this.optionstorecount,this.mypoll[0]._id)
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




  constructor(private postsService: PostsService,private globals: Globals,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

   
      
 if(this.globals.loggedin){
        this.sub = this.route.params.subscribe(params => {
       this.author = params['author']; // (+) converts string 'id' to a number
       this.mytitle = params['mytitle'];
      
        });

     this.postsService.getmyPoll(this.author,this.mytitle)
       .subscribe(res => {
      this.mypoll = res, posterror => this.errorMsg=posterror ;});
       
       
       setTimeout(()=> {
         this.myTitle=this.mypoll[0].title.split("_").join(" ");

         for(var i=0;i<this.mypoll[0].options.length;i++){
           this.option[i]=this.mypoll[0].options[i];
         }
       
        if (String(this.globals.name)==String(this.mypoll[0].author)){ //For authorization
          this.owner=true;
         
        }else {
          this.owner=false;
        }

        for(var i=0;i<this.mypoll[0].options.length;i++){
          this.trackOption[i]=true;
        }


     
          
      
    
  }, 2000);

   
       

      } 

   
        setTimeout(()=> {
         if(this.mypoll.length<1){
        this.notfound=true;
       
      }
      
      }, 2000); 
   
  }

  



  }
