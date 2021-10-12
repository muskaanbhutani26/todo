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
  buttonText = 'Add';
  formHeaderText = 'Add Todo';
  editedIndex?: number;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editedIndex = params['id'];
        this.buttonText = 'Update';
        this.formHeaderText = 'Update Todo';
        const todoList = this.todoService.getLocalStorageList();
        this.todoItem = new TodoItem(todoList[params.id].name);
      }
    });
  }

  saveToDoItem() {
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

  savetoApi() {
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
