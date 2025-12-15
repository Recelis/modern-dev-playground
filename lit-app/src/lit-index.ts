import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { RemoveTodo, Todo } from "./types";
import { v4 as uuidv4 } from "uuid";

@customElement("lit-index")
export class LitIndex extends LitElement {
  static styles = css`
    .todo-app {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;
  @state()
  _todos: Todo[] = [];

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("addTodo", this._addTodo);
    window.addEventListener("updateTodo", (e: Event) => {
      const customEvent = e as CustomEvent<Todo>;
      this._updateTodo(customEvent.detail);
    });
    window.addEventListener("removeTodo", (e: Event) => {
      const customEvent = e as CustomEvent<RemoveTodo>;
      this._removeTodo(customEvent.detail);
    });
  }

  disconnectedCallback() {
    window.removeEventListener("addTodo", this._addTodo);
    window.removeEventListener("updateTodo", (e: Event) => {
      const customEvent = e as CustomEvent<Todo>;
      this._updateTodo(customEvent.detail);
    });
  }

  private _addTodo = () => {
    console.log("todo button pressed");
      this._todos = [...this._todos, { id: uuidv4(), text: "", done: false }];
  };

  private _updateTodo = (updateTodo: Todo) => {
    this._todos = this._todos.map(todo => todo.id === updateTodo.id ? updateTodo : todo);
  };

  private _removeTodo = (removeTodo: RemoveTodo) => {
    this._todos = this._todos.filter(todo => todo.id !== removeTodo.id);
  }

  render() {
    return html`<div class="todo-app">
      <h1>Lit To do App</h1>
      <add-todo></add-todo>
      <todo-list .todoList=${this._todos}></todo-list>
    </div>`;
  }
}
