import { Component, OnInit } from '@angular/core';

// Import rxjs map operator

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  

  images: any[] = [];

  constructor() { }

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
  }

  // Add one person to the API
  addContainer() {
    /*this.http.post(`${this.API}/users`, { name, age })
      .pipe(map(res => res))
      .subscribe(() => {
        this.getAllPeople();
      })*/
  }

 

  

}