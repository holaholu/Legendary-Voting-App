import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMsg =[];
  //Other declared variables and methods
public imgLink="http://lorempixel.com/500/400";
inpname:string = "Adisa";
shownow:Boolean = true;
color="blue";
cities =["chicago","london", "manchester", "new york", "new castle"]
cone=true;
ctwo=true;
distog(){
  if (this.shownow){
    this.shownow=false;
  }else {
     this.shownow=true;
  }
}

myalert(val) {
  alert(val);

}
 onsubmit(value:any){    //value can be anything
    alert(value);
  }


  constructor() { }

  ngOnInit() {
  }

}
