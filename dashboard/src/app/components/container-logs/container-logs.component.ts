import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../../services/container.service';
import { ActivatedRoute } from '@angular/router';
import { Container } from '../../models/container';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-container-logs',
  templateUrl: './container-logs.component.html',
  styleUrls: ['./container-logs.component.scss']
})
export class ContainerLogsComponent implements OnInit {
  logs: String;
  container: Container
  constructor(private containerService: ContainerService, private route: ActivatedRoute, private spinner: SpinnerVisibilityService) { }

  ngOnInit() {
    this.spinner.show();
    this.container = new Container()
    this.route.params.subscribe(params => {
      this.container.Id = params.id;
      this.containerService.getLogs(this.container.Id).subscribe(logs => {
        this.logs = logs;
      }, () => {}, () => {
        this.spinner.hide();
      });
    });
  }

}
