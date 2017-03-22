import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostsService {

  constructor(private http: Http) { }

  createPoll(myTitle,creator,options,count){
       return this.http.post('/createpoll',{title:myTitle,creator:creator,options:options,count:count})
      .map(res => res.text()).catch(this._errorHandler);
  }

   editPoll(myTitle,creator,options,count,id){
       return this.http.post('/editpoll',{title:myTitle,creator:creator,options:options,count:count,id:id})
      .map(res => res.text()).catch(this._errorHandler);
  }
   editPoll2(myTitle,creator,options,count,id){
       return this.http.post('/editpoll2',{title:myTitle,creator:creator,options:options,count:count,id:id})
      .map(res => res.json()).catch(this._errorHandler);
  }


  getPoll(username){
     return this.http.post('/getpoll',{username:username})
      .map(res => res.json()).catch(this._errorHandler);

  }
  deletePoll(id){
 return this.http.post('/deletepoll',{id:id})
      .map(res => res.json()).catch(this._errorHandler);

  }
  getmyPoll(author,title){
    return this.http.post('/getsinglepoll',{author:author,title:title})
      .map(res => res.json()).catch(this._errorHandler);

  }

changePass(name,password){
    return this.http.post('/changepass',{username:name,password:password})
      .map(res => res.text()).catch(this._errorHandler);
  }
  // Sign user up and return username
  signUp(myName,myPassword,myEmail) {
    return this.http.post('/signupnow',{name:myName,username:myEmail,password:myPassword})
      .map(res => res.text()).catch(this._errorHandler);
  }
  //?username='+myEmail+"&password="+myPassword+"&name="+myName
  logIn(myEmail,myPassword) {
    return this.http.post('/login',{username:myEmail,password:myPassword})
      .map(res => res.text()).catch(this._errorHandler);
  }
//?username='+myEmail+"&password="+myPassword
  getUser() {
    return this.http.get('/getuser')
      .map(res => res.text()).catch(this._errorHandler);
  }

  _errorHandler(error:Response){
          console.error(error);
          return Observable.throw(error || "Server Error");
      }
}