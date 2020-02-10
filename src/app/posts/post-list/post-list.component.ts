import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  postsSubscription: Subscription;

  @Input() posts: Post[] = [
    // {title: 'Post 1', content: 'Content of post-1'},
    // {title: 'Post 2', content: 'Content of post-2'},
    // {title: 'Post 3', content: 'Content of post-3'},
    // {title: 'Post 4', content: 'Content of post-4'}
  ];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsSubscription = this.postsService.getUpdatedPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
