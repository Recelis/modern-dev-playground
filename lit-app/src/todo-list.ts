import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Todo } from "./types";

@customElement("todo-list")
export class TodoList extends LitElement {
  static styles = css`
    .todo-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-block-start: 1rem;
    }
  `;

  @property({ type: Array }) todoList: Todo[] = [];

  render() {
    console.log(this.todoList);
    return html`<div class="todo-list">
      ${this.todoList.map(
        (todo) =>
          html`<todo-listitem .todo=${todo}></todo-listitem>`
      )}
    </div>`;
  }
}
