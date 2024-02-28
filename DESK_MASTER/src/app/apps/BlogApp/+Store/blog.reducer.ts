import { createReducer, on } from '@ngrx/store';
import { blogState } from './blog.state';
import {
  addBlog,
  addBlogSuccess,
  deleteBlog,
  updateBlog,
  loadBlog,
  loadBlogFail,
  loadBlogSuccess,
  updateBlogSuccess,
  deleteBlogSuccess,
} from './blog.action';
import { blogModel } from './blog.model';

const _blogReducer = createReducer(
  blogState,
  on(loadBlogSuccess, (state, action) => {
    return {
      ...state,
      blogList: [...action.blogList],
      errorMessage: '',
      isLoading: false,
    };
  }),
  on(loadBlogFail, (state, action) => {
    return {
      ...state,
      blogList: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(loadBlog, (state) => {
    return {
      ...state,
    };
  }),
  on(addBlogSuccess, (state, action) => {
    const _blog = { ...action.blogInput };
    return {
      ...state,
      blogList: [...state.blogList, _blog],
      isLoading: false,
    };
  }),
  on(updateBlogSuccess, (state, action) => {
    const _blog = { ...action.blogInput };
    const updatedBlog = state.blogList.map((blog) => {
      return _blog.id === blog.id ? _blog : blog;
    });
    return {
      ...state,
      blogList: updatedBlog,
      isLoading: false,
    };
  }),
  on(deleteBlogSuccess, (state, action) => {
    const _updatedBlog = state.blogList.filter((data: blogModel) => {
      return data.id !== action.blogId;
    });

    return {
      ...state,
      blogList: _updatedBlog,
      // isLoading: false,
    };
  })
);

export function blogReducer(state: any, action: any) {
  return _blogReducer(state, action);
}
