import { Component, OnInit } from '@angular/core';
import { UiServiceService } from 'src/app/ui-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Task-Tracker';
  showAddTask: boolean = false;
  subscription!: Subscription;


  constructor(
    private uiservice: UiServiceService,
    private router: Router
  ) {
    this.subscription = this.uiservice
      .onToggle()
      .subscribe((value) => (this.showAddTask = value))
  }

  ngOnInit(): void { }

  toggleAddTask() {
    this.uiservice.toggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }

}
