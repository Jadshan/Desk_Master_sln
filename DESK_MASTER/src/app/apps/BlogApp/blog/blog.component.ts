import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app/shared/store/AppState.Model';
import { blogModel, blogs } from 'src/app/apps/BlogApp/+Store/blog.model';
import {
  getBlog,
  getBlogInfo,
} from 'src/app/apps/BlogApp/+Store/blog.selector';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { deleteBlog, loadBlog } from 'src/app/apps/BlogApp/+Store/blog.action';
import { loadSpinner } from 'src/app/shared/store/App.action';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogList!: blogModel[];
  blogInfo!: blogs;
  constructor(private store: Store<AppStateModel>, private Dialog: MatDialog) {}
  ngOnInit(): void {
    this.store.dispatch(loadSpinner({ isLoading: true }));
    this.store.dispatch(loadBlog());
    this.store.select(getBlogInfo).subscribe((blogInfo) => {
      this.blogInfo = blogInfo;
    });
  }

  addBlog() {
    this.openPopup(0, 'Add New Blog');
  }

  editBlog(id: number) {
    this.openPopup(id, 'Edit Blog', true);
  }

  onDelete(id: number) {
    if (confirm('Are you sure ant to remove?')) {
      this.store.dispatch(deleteBlog({ blogId: id }));
    }
  }
  openPopup(id: number, title: string, isEdit = false) {
    this.Dialog.open(AddBlogComponent, {
      width: '40%',
      data: {
        id: id,
        title: title,
        isEdit: isEdit,
      },
    });
  }
}
