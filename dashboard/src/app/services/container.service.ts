import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Container } from '../models/container';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllContainers(): any {
    //var res;
    return this.http.get(`${this.API}/containers`)
      .pipe(map(res => res = res));
    //return res;
  }

  getContainer(idContainer: any): any {
    return this.http.get(`${this.API}/container/${idContainer}`)
      .pipe(map(res => res = res));
  }

  getLogs(idContainer: any): any {
    return this.http.get(`${this.API}/container/${idContainer}/logs`)
      .pipe(map(res => res = res));
  }

  addContainer(container: Container): any {
    console.log("service : ", container);
    return this.http.post(`${this.API}/container/create`, container);
  }

  stopContainer(container: Container): any {
    return this.http.post(`${this.API}/container/stop`, container)
      .pipe(map(res => res));
  }

  removeContainer(container: Container): any {
    return this.http.post(`${this.API}/container/remove`, container)
      .pipe(map(res => res));
  }
}
