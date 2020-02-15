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
  posts: Post[] = [];
  isLoading = false;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSubscription = this.postsService.getUpdatedPosts().subscribe(
      (posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      }
    );
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
