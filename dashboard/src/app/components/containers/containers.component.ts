import { Component, OnInit } from '@angular/core';
import { Container } from '../../models/container';
import { ContainerService } from '../../services/container.service';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {


  containers: Array<any>;


  constructor(private containerService: ContainerService,private router: Router, private spinner: SpinnerVisibilityService) { }

  ngOnInit() {
    this.getAllContainers();
  }

  // Get all containers from the API
  getAllContainers() {
    this.spinner.show();
    this.containerService.getAllContainers().pipe(
      map(
        (containers: Container[]) => containers.filter(
          (container: Container) => ((container.Image != 'dashboarddocker_angular') && (container.Image != 'dashboarddocker_express'))
        )
      )
    ).subscribe(containers => this.containers = containers, () => {}, () => {
        this.spinner.hide();
      });
  }

  stop(id: string){
    this.spinner.show();
    var container = new Container();
    container.Id = id;
    this.containerService.stopContainer(container).subscribe(() => this.getAllContainers(), () => {}, () => {
      this.spinner.hide();
    });
  }

  remove(id: string){
    this.spinner.show();
    var container = new Container();
    container.Id = id;
    this.containerService.removeContainer(container).subscribe(() => this.getAllContainers(), () => {}, () => {
      this.spinner.hide();
    });
  }

  containerDetail(container: Container) {
    this.router.navigate(['/container/',container.Id]);
  }

  containerLogs(container: Container) {
    this.router.navigate([`/container/${container.Id}/logs`]);
  }
}
