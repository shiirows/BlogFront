import { Component, OnInit } from '@angular/core';
import { PostService } from '../common/postService';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    private postService: PostService
  ) 

   { }

   public listPost: any = [];
  ngOnInit(): void {
    this.postAll();
  }

  public postAll(): any {
    return this.postService.getPosts(1).subscribe((data) => {
      this.listPost = data;
    });
      }

  }


