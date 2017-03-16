import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
posts: any = [];
 errorMsg =[];
  constructor(private postsService: PostsService) { }

  ngOnInit() { 
    // Retrieve posts from the API
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts, posterror => this.errorMsg=posterror ;

    });
   }
  

}
