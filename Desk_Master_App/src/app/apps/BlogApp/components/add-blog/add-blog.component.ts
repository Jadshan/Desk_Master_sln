import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { blogModel } from '../../+Store/blog.model';
import { getBlogById } from '../../+Store/blog.selector';
import { isEqual } from 'lodash';
import { loadSpinner } from '../../../../shared/store/App.action';
import { addBlog, updateBlog } from '../../+Store/blog.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  blogForm!: FormGroup;
  pageTitle: string = '';
  editingBlogId: number = 0;
  editingBlogData!: blogModel;
  isFormModified: boolean = false;
  originalFormValues: any; // Store original form values
  constructor(
    private dialogRef: MatDialogRef<AddBlogComponent>,
    private FB: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.blogForm = this.FB.group({
      id: [0],
      title: ['', Validators.required],
      category: [''],
      postImgPath: [''],
      content: [''],
      isFeatured: [false],
      views: [0],
    });
  }
  ngOnInit(): void {
    this.pageTitle = this.data.title;
    if (this.data.isEdit) {
      this.editingBlogId = this.data.id;
      this.store.select(getBlogById(this.editingBlogId)).subscribe((_data) => {
        this.editingBlogData = _data;
        this.blogForm.setValue({
          id: this.editingBlogId,
          title: this.editingBlogData.title,
          category: this.editingBlogData.category,
          postImgPath: this.editingBlogData.postImgPath,
          content: this.editingBlogData.content,
          isFeatured: this.editingBlogData.isFeatured,
          views: this.editingBlogData.views,
        });
        // Store original form values when editing starts
        this.originalFormValues = this.blogForm.value;
      });
    }
    // Compare current form values with original values
    this.blogForm.valueChanges.subscribe(() => {
      this.isFormModified = !isEqual(
        this.originalFormValues,
        this.blogForm.value
      );
    });
  }

  saveNewBlog() {
    if (this.blogForm.valid) {
      const _blogInput: blogModel = {
        id: 0,
        title: this.blogForm.value.title,
        category: this.blogForm.value.category,
        postImgPath: this.blogForm.value.postImgPath,
        content: this.blogForm.value.content,
        isFeatured: this.blogForm.value.isFeatured,
        views: this.blogForm.value.views,
      };
      this.store.dispatch(loadSpinner({ isLoading: true }));

      if (this.data.isEdit) {
        _blogInput.id = this.blogForm.value.id;
        this.store.dispatch(updateBlog({ blogInput: _blogInput }));
      } else {
        this.store.dispatch(addBlog({ blogInput: _blogInput }));
      }

      this.closePopUp();
    }
  }
  closePopUp() {
    this.dialogRef.close();
  }
}
