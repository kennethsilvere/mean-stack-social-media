import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  mode = 'create';
  postToEdit: Post;
  isLoading = false;

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.isLoading = true;
          this.mode = 'edit';
          const postId = paramMap.get('postId');
          this.postsService.getPostById(postId).subscribe(
            (post) => {
              this.isLoading = false;
              this.postToEdit = {
                id: post._id,
                title: post.title,
                content: post.content
              }
            }
          )
        } else {
          this.mode = 'create';
          this.postToEdit = undefined;
        }
      }
    );
  }

  onFormSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postToEdit.id, form.value.title, form.value.content)
    }
    form.resetForm();
  }

}
