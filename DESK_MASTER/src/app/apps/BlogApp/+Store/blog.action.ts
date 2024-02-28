import { createAction, props } from '@ngrx/store';
import { blogModel, blogs } from './blog.model';

export enum actionTypes {
  LOAD_BLOG = 'LOAD_BLOG',
  LOAD_BLOG_SUCCESS = 'LOAD_BLOG_SUCCESS',
  LOAD_BLOG_FAIL = 'LOAD_BLOG_FAIL',
  ADD_BLOG = 'ADD_BLOG',
  ADD_BLOG_SUCCESS = ' ADD_BLOG_SUCCESS',
  UPDATE_BLOG = 'UPDATE_BLOG',
  UPDATE_BLOG_SUCCESS = 'UPDATE_BLOG_SUCCESS',
  DELETE_BLOG = 'DELETE_BLOG',
  DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS',
}

export const loadBlog = createAction(actionTypes.LOAD_BLOG);
export const loadBlogSuccess = createAction(
  actionTypes.LOAD_BLOG_SUCCESS,
  props<{ blogList: blogModel[] }>()
);
export const loadBlogFail = createAction(
  actionTypes.LOAD_BLOG_FAIL,
  props<{ errorMessage: string }>()
);
export const addBlog = createAction(
  actionTypes.ADD_BLOG,
  props<{ blogInput: blogModel }>()
);
export const addBlogSuccess = createAction(
  actionTypes.ADD_BLOG_SUCCESS,
  props<{ blogInput: blogModel }>()
);
export const updateBlog = createAction(
  actionTypes.UPDATE_BLOG,
  props<{ blogInput: blogModel }>()
);
export const updateBlogSuccess = createAction(
  actionTypes.UPDATE_BLOG_SUCCESS,
  props<{ blogInput: blogModel }>()
);
export const deleteBlog = createAction(
  actionTypes.DELETE_BLOG,
  props<{ blogId: number }>()
);
export const deleteBlogSuccess = createAction(
  actionTypes.DELETE_BLOG_SUCCESS,
  props<{ blogId: number }>()
);
