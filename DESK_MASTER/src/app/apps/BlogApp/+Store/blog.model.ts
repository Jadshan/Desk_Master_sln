export interface blogModel {
  id: number;
  title: string;
  category: string;
  postImgPath: string;
  content: string;
  isFeatured: boolean;
  views: number;
  createdAt?: Date;
}

export interface blogs {
  blogList: blogModel[];
  errorMessage: string;
  isLoading: boolean;
}
