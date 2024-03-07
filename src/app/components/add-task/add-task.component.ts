import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';
import { UiServiceService } from 'src/app/ui-service.service';
import { Subscription, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  text!: string
  Day!: string
  remainder: boolean = false;
  showAddTask!: boolean;
  subscription : Subscription

  constructor(
    private taskService: TaskService,
    private uiservice: UiServiceService
    ) {
      this.subscription = this.uiservice
      .onToggle()
      .subscribe((value) =>(this.showAddTask = value) )
     }

  onSubmit() {
    if (!this.text) {
      alert('please add a task!')
      return
    }

    const newTask = {
      text: this.text,
      day: this.Day,
      reminder: this.remainder
    }

    this.taskService.addTask(newTask).subscribe({
      next: () => {
        window.location.reload();
      },
      error: () => {
        alert('Something went wrong')
      }
    });

    this.text = '';
    this.Day = '';
    this.remainder = false;
  }

}
