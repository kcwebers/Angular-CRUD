import { Component, OnInit } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  task = 'Restful Realm';
  tasks = [];
  is_tasks = false;
  one_task = {};
  newTask: any;
  is_editing = false;
  editTask: any;

  constructor(private _httpService: HttpService){}

  getAllTasks(){
    let taskObservable = this._httpService.getTasks();
    taskObservable.subscribe(
      data => {
        console.log("Received Tasks!")
        console.log(data);
        this.tasks = data['data']
    });
  }

  showTaskInfo(task){
    console.log("Showing task info");
    let observable = this._httpService.getTaskInfo(task._id);
    observable.subscribe(data => {
      console.log("Got task info");
      console.log(data['data']);
      this.one_task = data['data'];
      this.is_tasks = true;
    })
  }

  ngOnInit(){
    this.newTask = { task: "", description: "", name: "" }
    this.editTask = { task: "", description: "", name: "" }
  }

  addTask(){
    let observable = this._httpService.addTask(this.newTask)
    observable.subscribe(data => {
      console.log(data['data'])
      console.log("Posted data and returned")
      // Reset task object 
      this.newTask = { task: "", description: "", name: "" };
    })
    this.getAllTasks();
  }

  onEditClick(one_task){
    console.log("Showing task for the edit");
    this.editTask = { task: one_task.task, description: one_task.description, name: one_task.name, id: one_task._id }
    this.is_editing = true;
  }

  onEdit(one_task){
    console.log("Let's Finalize this Edit...");
    let observable = this._httpService.onEdit(this.editTask);
    observable.subscribe(data => {
      this.getAllTasks();
      this.is_editing = false;

      console.log("Got task info fr final edit");
      console.log(data['data']);
    })
  }

  delete(task){
    console.log("Selecting task to delete");
    let observable = this._httpService.delete(task._id);
    observable.subscribe(data => {
      this.getAllTasks();
    })
  }
}
