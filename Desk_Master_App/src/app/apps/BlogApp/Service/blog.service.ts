import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { blogModel } from '../+Store/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  url = 'https://localhost:7051/api/BlogAPI';
  constructor(private http: HttpClient) {}

  GetAllBlog(): Observable<blogModel[]> {
    return this.http.get<blogModel[]>(this.url);
  }

  AddBlog(blogInput: blogModel) {
    return this.http.post(this.url, blogInput);
  }

  UpdateBlog(blogInput: blogModel) {
    return this.http.put(this.url + '/' + blogInput.id, blogInput);
  }

  DeleteBlog(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
