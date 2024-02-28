import { createFeatureSelector, createSelector } from '@ngrx/store';
import { blogModel, blogs } from './blog.model';

export const getBlogState = createFeatureSelector<blogs>('blog');

export const getBlog = createSelector(getBlogState, (state) => {
  return state.blogList;
});

export const getBlogById = (blogId: number) =>
  createSelector(getBlogState, (state) => {
    return state.blogList.find(
      (blog: blogModel) => blog.id === blogId
    ) as blogModel;
  });

export const getBlogInfo = createSelector(getBlogState, (state) => {
  return state;
});
