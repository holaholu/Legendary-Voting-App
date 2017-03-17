import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myName="";myPassword="";myEmail="";
onsubmit(){    //value can be anything
  
   
  }
  constructor() { }

  ngOnInit() {
  }

}
