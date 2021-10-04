import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TodoItem } from 'src/app/shared/models/Todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public todoList$ = this.todoService.getToDoList();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  public deleteItem(itemToRemove: TodoItem) {
    this.todoService.removeItem(itemToRemove);
  }

  public completeItem(itemToComplete: TodoItem) {
    this.todoService.completeItem(itemToComplete);
  }
}
