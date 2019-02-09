import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { timeout, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  // private APIUrl1 = 'http://127.0.0.1:5000/';  // URL to web api
  // private APIUrl2 = 'http://127.0.0.1:5000/search';  // URL to web api
  private APIUrl1 = 'https://damp-island-46703.herokuapp.com/';  // URL to web api
  private APIUrl2 = 'https://damp-island-46703.herokuapp.com/search';  // URL to web api

  getPost(path: string, page: number): Observable<ApiResponse[]> {
    console.log("Initiating API call for " + path)
    return this.http.get<ApiResponse[]>(this.APIUrl1 + "?src=" + path + "&page=" + page).pipe(
      timeout(20000),
      catchError(e => {
        // do something on a timeout
        return of([]);
      })
    )
  }

  search(keyword: string, page: number): Observable<ApiResponse[]> {
    console.log("Initiating API call search for " + keyword)
    return this.http.get<ApiResponse[]>(this.APIUrl2 + "?key=" + keyword + "&page=" + page).pipe(
      timeout(20000),
      catchError(e => {
        // do something on a timeout
        return of([]);
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}

export interface ApiResponse {
  post_auth: string;
  post_desc: string;
  post_img: string;
  post_links: string;
  post_time: string;
  post_title: string;
}

export class postnews implements ApiResponse {
  post_auth: string;
  post_desc: string;
  post_img: string;
  post_links: string;
  post_time: string;
  post_title: string;

  constructor(item?: ApiResponse) {
    if (item != undefined) {
      for (let key in item) {
        try { this[key] = item[key]; }
        catch (e) { }
      }
    }
  }
}