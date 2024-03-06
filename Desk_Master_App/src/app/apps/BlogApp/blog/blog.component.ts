import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { blogModel, blogs } from '../+Store/blog.model';
import { AppStateModel } from '../../../shared/store/AppState.Model';
import { loadSpinner } from '../../../shared/store/App.action';
import { deleteBlog, loadBlog } from '../+Store/blog.action';
import { getBlogInfo } from '../+Store/blog.selector';
import { AddBlogComponent } from '../add-blog/add-blog.component';

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
