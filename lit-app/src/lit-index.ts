import { LitElement, css, html, type CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { Todo } from "./types";

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
  }

  private _addTodo = () => {
    console.log("todo button pressed");
    const latestTodo = this._todos[this._todos.length - 1];
    if (latestTodo === undefined || latestTodo.text !== "") {
      // Lit is reactive to the property value changing, mutating objects or arrays in place does not trigger a rerender
      this._todos = [...this._todos, { text: "", done: false }];
    }
  };

  render() {
    return html`<div class="todo-app">
      <h1>Lit To do App</h1>
      <add-todo></add-todo>
      <todo-list .todoList=${this._todos}></todo-list>
    </div>`;
  }
}
