import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(
        map((postData: { message: string; posts: any[] }) => {
          return postData.posts.map(post => {
            return {
              id: post._id,
              ...post
            };
          });
        })
      )
      .subscribe(posts => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostById(postId: string) {
    return this.http.get<{_id: string, title: string, content: string}>(`http://localhost:3000/api/posts/${postId}`);
  }

  addPost(title: string, content: string) {
    const post: Post = { title, content };
    this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
      .subscribe(response => {
        post.id = response.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  } 

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };
    this.http.put<any>(`http://localhost:3000/api/posts/${id}`, post)
             .subscribe(response => this.router.navigate(['/']));
  }

  deletePost(postId: string) {
    this.http
      .delete(`http://localhost:3000/api/posts/${postId}`)
      .subscribe((data: any) => {
        this.posts = this.posts.filter((post: Post) => post.id !== postId);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getUpdatedPosts() {
    return this.postsUpdated.asObservable();
  }
}