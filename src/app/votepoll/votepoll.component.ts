import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { Globals } from '../globals';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-votepoll',
  templateUrl: './votepoll.component.html',
  styleUrls: ['./votepoll.component.css']
})
export class VotepollComponent implements OnInit {
private sub: any; chart:boolean=false;
 author: string;notfound:boolean=false;
 mytitle:string;mypoll;errorMsg;votedpoll;
 votetitle;voteauthor;votecount;voteoptions;
 myoption;votestatus:boolean=false;


 
//Section for The Chart displayed on the page

  public barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels:string[]; 
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[]; 
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  

//End of Chart Section



  constructor(private route: ActivatedRoute,private postsService: PostsService,private globals: Globals) { }


onsubmit() {
  if (this.myoption==undefined){
   alert("Please select an option first");
  }else {
this.votestatus=true;
for (var i=0; i<this.mypoll[0].options.length;i++){     //Increase count after vote is clicked
  if(String(this.myoption)==String(this.mypoll[0].options[i])){
     this.mypoll[0].count[i]++;
  }
}

//Send to database for update

this.postsService.editPoll2(this.mypoll[0].title,this.mypoll[0].author,this.mypoll[0].options,this.mypoll[0].count,this.mypoll[0]._id)
       .subscribe(res => {
      this.votedpoll = res, posterror => this.errorMsg=posterror ;});


setTimeout(()=> {
       

//dynamic Chart Config
this.barChartLabels = this.votedpoll.options;
 this.barChartData = [
    {data: this.votedpoll.count, label: 'Vote Count'}
   
 ];
this.chart=true;
//dynamic Chart Config

      }
      , 2000);
 }
 

  
}
  ngOnInit() {
      

    this.sub = this.route.params.subscribe(params => {
       this.author = params['author']; // (+) converts string 'id' to a number
       this.mytitle = params['mytitle'];
      
     });

  this.postsService.getmyPoll(this.author,this.mytitle)
       .subscribe(res => {
      this.mypoll = res, posterror => this.errorMsg=posterror ;});

      setTimeout(()=> {
         if(this.mypoll.length<1){
        this.notfound=true;
      }else{
        if(this.mypoll[0].author=this.globals.name){
          this.myoption="..."
          this.onsubmit();
        }
      }
      }, 1000);
 }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }





}
  