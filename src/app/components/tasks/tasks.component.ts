import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskServices: TaskService) { }

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskServices.deleteTask(task).subscribe(() => (
      this.tasks = this.tasks.filter((t) => t.id !== task.id)
    ));
  }


  toggleRemainder(task: Task) {
    task.reminder = !task.reminder;
    this.taskServices.updateTaskRemainder(task).subscribe();
  }

}
