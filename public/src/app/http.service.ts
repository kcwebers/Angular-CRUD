import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getTasks();
  }

  getTasks(){
    return this._http.get('/tasks')
  }

  getTaskInfo(id){
    return this._http.get('/tasks/' + id)
  }

  addTask(newTask){
    return this._http.post('/tasks', newTask)
  }

  onEdit(editTask){
    return this._http.put('/tasks/' + editTask.id, editTask)
  }

  delete(id) {
    return this._http.delete('/tasks/' + id)
  }
}
