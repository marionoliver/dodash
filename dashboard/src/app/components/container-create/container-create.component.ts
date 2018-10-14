import { Component, OnInit } from '@angular/core';
import { ContainerService } from 'src/app/services/container.service';
import { Container } from '../../models/container';
import { VariableEnv } from '../../models/variable-env';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-container-create',
  templateUrl: './container-create.component.html',
  styleUrls: ['./container-create.component.scss']
})
export class ContainerCreateComponent implements OnInit {

  container: Container = new Container();
  variableEnv: VariableEnv = new VariableEnv();

  constructor(private containerService: ContainerService, private router: Router, private spinner: SpinnerVisibilityService) { }

  ngOnInit() {
    this.container.reset();
  }

  addContainer() {
    this.spinner.show()
    console.log(this.container);
    this.containerService.addContainer(this.container).toPromise().then(() => {
      console.log("then...");
      this.spinner.hide();
      this.router.navigate(['/containers']);
    });
  }

  addVariable() {
    console.log(this.variableEnv);
    this.container.addVariable(this.variableEnv);
    this.variableEnv.reset();
  }

}
