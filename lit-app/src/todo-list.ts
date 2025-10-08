import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Todo } from "./types";
import { classMap } from "lit/directives/class-map.js";

@customElement("todo-list")
export class TodoList extends LitElement {
  static styles = css`
    .todo-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-block-start: 1rem;
    }
    .todo {
      border: solid 1px gray;
      border-radius: 5px;
      height: 30px;
      width: 300px;
    }
    .todo .done {
      text-decoration: "line-through";
    }
  `;

  @property({ type: Array }) todoList: Todo[] = [];

  render() {
    console.log(this.todoList);
    return html`<div class="todo-list">
      ${this.todoList.map(
        (todo) =>
          html`<div class=${classMap({ todo: true, done: todo.done })}>
            ${todo.text}
          </div>`
      )}
    </div>`;
  }
}
