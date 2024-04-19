import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BlogService } from '../Service/blog.service';
import {
  actionTypes,
  addBlog,
  addBlogSuccess,
  deleteBlog,
  deleteBlogSuccess,
  loadBlogFail,
  loadBlogSuccess,
  updateBlog,
  updateBlogSuccess,
} from './blog.action';
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { blogModel } from './blog.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  emptyAction,
  loadSpinner,
  showAlert,
} from '../../../shared/store/App.action';

@Injectable()
export class BlogEffects {
  constructor(
    private action$: Actions,
    private service: BlogService,
    private _snackBar: MatSnackBar
  ) {}

  _blog = createEffect(() =>
    this.action$.pipe(
      ofType(actionTypes.LOAD_BLOG),
      exhaustMap((action) => {
        return this.service.GetAllBlog().pipe(
          switchMap((data) =>
            of(
              loadBlogSuccess({ blogList: data }),
              loadSpinner({ isLoading: false })
            )
          ),
          catchError((_error) =>
            of(
              loadBlogFail({ errorMessage: _error.message }),
              loadSpinner({ isLoading: false })
            )
          )
        );
      })
    )
  );

  _addBlog = createEffect(() =>
    this.action$.pipe(
      ofType(addBlog),
      switchMap((action) =>
        this.service.AddBlog(action.blogInput).pipe(
          switchMap((data) =>
            of(
              addBlogSuccess({ blogInput: data as blogModel }),
              showAlert({
                message: 'Blog added successfully',
                alertType: 'success',
              }),
              loadSpinner({ isLoading: false })
            )
          ),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Adding failed - Due to' + _error.message,
                alertType: 'fail',
              }),
              loadSpinner({ isLoading: false })
            )
          )
        )
      )
    )
  );

  _updateBlog = createEffect(() =>
    this.action$.pipe(
      ofType(updateBlog),
      switchMap((action) =>
        this.service.UpdateBlog(action.blogInput).pipe(
          switchMap((res) =>
            of(
              updateBlogSuccess({ blogInput: action.blogInput }),
              showAlert({
                message: 'Updated successfully',
                alertType: 'success',
              }),
              loadSpinner({ isLoading: false })
            )
          ),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Updated failed - Due to' + _error.message,
                alertType: 'fail',
              }),
              loadSpinner({ isLoading: false })
            )
          )
        )
      )
    )
  );

  _deleteBlog = createEffect(() =>
    this.action$.pipe(
      ofType(deleteBlog),
      switchMap((action) =>
        this.service.DeleteBlog(action.blogId).pipe(
          switchMap(() =>
            of(
              deleteBlogSuccess({ blogId: action.blogId }),
              showAlert({
                message: 'Updated successfully',
                alertType: 'success',
              })
            )
          ),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Deleting failed - Due to' + _error.message,
                alertType: 'fail',
              }),
              loadSpinner({ isLoading: false })
            )
          )
        )
      )
    )
  );
}
