import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllImages(): any {
    return this.http.get(`${this.API}/images`)
      .pipe(map(res => res = res));
  }

}
