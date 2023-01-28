import { BaseComponent } from "../../component.js";

export class TodoComponet extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`
    <section class="todo">
      <h2 class="page-item_title todo_title"></h2>
      <input type="checkbox" id="todo_checkbox" />
      <label for="todo_checkbox" class="todo_label"></label>
    </section>
    `);

    const titleElement = this.element.querySelector(".todo_title")! as HTMLHeadElement;
    titleElement.textContent = title;

    const todoElement = this.element.querySelector(".todo_label")! as HTMLLabelElement;
    todoElement.textContent = todo;
  }
}
