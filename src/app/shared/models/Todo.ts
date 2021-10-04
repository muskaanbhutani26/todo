export class TodoItem {
  constructor(
    public name: string,
    public created = new Date(),
    public checked = false
  ) {}
}
