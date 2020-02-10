import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts(): Post[] {
        return [ ...this.posts ];
    }

    addPost(title: string, content: string) {
        const post: Post = { title, content };
        this.posts.push(post); 
        this.postsUpdated.next(this.getPosts());
    }

    getUpdatedPosts() {
        return this.postsUpdated.asObservable();
    }
}