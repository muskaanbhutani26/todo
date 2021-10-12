import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoItem } from '../shared/models/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {
    this.todoList$.subscribe(() => this.listChanged());
  }

  private readonly LOCAL_STORAGE_KEY = 'todoList';
  private todoArr = this.getLocalStorageList();
  private todoList$ = new BehaviorSubject<TodoItem[]>(this.todoArr);
  public getToDoList = () => this.todoList$;

  listChanged(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.todoArr));
  }

  public addItem = (newItem: TodoItem) =>
    this.todoArr.unshift(newItem) && this.todoList$.next([...this.todoArr]);

  public updateItem = (newItem: TodoItem, indexItem: number) => {
    this.todoArr[indexItem] = newItem;
    return this.todoList$.next([...this.todoArr]);
  };

  getLocalStorageList(): TodoItem[] {
    let ret = [];
    const localStorageStr = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (localStorageStr) {
      ret = JSON.parse(localStorageStr);
      ret = ret.sort((a: TodoItem, b: TodoItem) =>
        a.created > b.created ? -1 : 1
      );
    }
    return ret;
  }

  removeItem(itemToRemove: TodoItem) {
    const itemToRemoveIndex = this.todoArr.findIndex(
      (item) => item === itemToRemove
    );
    console.log(itemToRemoveIndex);
    if (itemToRemoveIndex > -1) {
      this.todoArr.splice(itemToRemoveIndex, 1);
      console.log(this.todoArr);
      this.todoList$.next([...this.todoArr]);
    }
  }

  completeItem(itemToCheck: TodoItem) {
    itemToCheck.checked = !itemToCheck.checked;
    this.todoList$.next(this.todoArr);
  }

  public saveItem = (newItem: TodoItem) =>
    this.http.post(
      `https://jsonplaceholder.typicode.com/posts`,
      JSON.stringify(newItem)
    );
}
