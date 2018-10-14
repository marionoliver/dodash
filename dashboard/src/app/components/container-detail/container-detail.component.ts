import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Container } from '../../models/container';
import { ContainerService } from '../../services/container.service';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-container-detail',
  templateUrl: './container-detail.component.html',
  styleUrls: ['./container-detail.component.scss']
})
export class ContainerDetailComponent implements OnInit {

  container: Container;
  hostPort: String;
  containerPort: String;
  image: String;
  constructor(private containerService: ContainerService, private route: ActivatedRoute, private spinner: SpinnerVisibilityService) { }

  ngOnInit() {
    this.spinner.show();
    this.container = new Container()
    this.route.params.subscribe(params => {
      console.log(params);
      this.image = params.Image;
      this.container.Id = params.id;
      this.containerService.getContainer(this.container.Id).subscribe(container => {
        this.container = container;
        console.log(container);
        this.hostPort = JSON.stringify(container.HostConfig.PortBindings).substring(JSON.stringify(container.HostConfig.PortBindings).indexOf('"')+1,JSON.stringify(container.HostConfig.PortBindings).indexOf(':')-1)
        console.log(this.hostPort);
        this.containerPort = JSON.stringify(container.HostConfig.PortBindings).substring(JSON.stringify(container.HostConfig.PortBindings).indexOf("rt")+5,JSON.stringify(container.HostConfig.PortBindings).indexOf("]")-2);
        console.log(this.containerPort);
      }, () => {}, () => {
        this.spinner.hide();
      });
    });
  }

}
