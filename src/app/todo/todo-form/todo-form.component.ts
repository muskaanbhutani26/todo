import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoItem } from 'src/app/shared/models/Todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  @Output()
  readonly addEvent = new EventEmitter<TodoItem>();
  public todoItem = new TodoItem('');
  editMode: boolean = false;
  buttonText = 'Add';
  editedIndex?: number;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const editIndexItem = params['id'];
      if (params['id']) {
        this.editedIndex = params['id'];
        this.buttonText = 'Update';
        this.editMode = true;
        const editIndexItem = params['id'];
        const todoList = this.todoService.getLocalStorageList();
        console.log(todoList[editIndexItem]);
        this.todoItem = new TodoItem(todoList[editIndexItem].name);
      }
    });
  }

  public saveToDoItem() {
    if (this.todoItem.name) {
      if (this.editedIndex) {
        this.todoService.updateItem(
          new TodoItem(this.todoItem.name),
          this.editedIndex
        );
        this.addEvent?.emit(this.todoItem);
        this.router.navigate(['/todo']);
      } else {
        this.todoService.addItem(new TodoItem(this.todoItem.name));
        this.addEvent?.emit(this.todoItem);
        this.todoItem.name = '';
      }
    }
  }

  savetoApi() {
    if (this.todoItem.name) {
      this.todoService.saveItem(new TodoItem(this.todoItem.name)).subscribe(
        (data: any): void => {
          console.log(data);
        },
        (error): void => {
          console.error(`Error: ${error.message}`);
        }
      );
    }
  }
}
