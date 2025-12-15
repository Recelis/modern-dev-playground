import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Todo } from "./types";
import { classMap } from "lit/directives/class-map.js";

@customElement("todo-listitem")
export class TodoListItem extends LitElement {
    static styles = css`
    .todo-listitem {
      border: solid 1px gray;
      border-radius: 5px;
      height: 30px;
      width: 300px;
    }
    .todo-listitem input {
      height: 100%;
      width: 100%;
    }
    

    .todo-listitem .done {
      text-decoration: line-through;
    }   
    .todo-listitem .item-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    .todo-listitem .item-container .item {
        flex-grow: 1;
        height: 100%;
        line-height: 30px;
        padding-left: 10px;
    }
    .todo-listitem .item-container .done {
        text-decoration: line-through;
    }

    .todo-listitem .item-container button {
        height: 100%;
    }
    .todo-listitem .item-container button:hover {
        background-color: red;
        color: white;
    }
  `;

    @property({ type: Object }) todo: Todo = { id: "", text: "", done: false };

    @state()
    _isEdit = false;

    handleItemClick = () => {
        this._isEdit = true;
    };

    handleInputChange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        const newText = input.value;
        const options = {
            detail: { ...this.todo, text: newText },
            bubbles: true,
            composed: true,
          };
          this.dispatchEvent(new CustomEvent("updateTodo", options));
    };

    handleInputBlur = () => {
        this._isEdit = false;
    };

    handleRemove = () => {
        const options = {
            detail: { id: this.todo.id },
            bubbles: true,
            composed: true,
        };
        this.dispatchEvent(new CustomEvent("removeTodo", options));
    };

    handleDoneClick = () => {
        const options = {
            detail: { ...this.todo, done: !this.todo.done },
            bubbles: true,
            composed: true,
        };
        this.dispatchEvent(new CustomEvent("updateTodo", options));
    };

    render() {
        console.log(this.todo);
        return html`<div class="todo-listitem">
            ${this._isEdit 
                ? html`<input type="text" value=${this.todo.text} @change=${this.handleInputChange} @blur=${this.handleInputBlur} />` 
                : html`<div class="item-container">
                    <div class="done-checkbox">
                        <input type="checkbox" .checked=${this.todo.done} @click=${this.handleDoneClick} ?disabled=${this.todo.text.length === 0}/>
                    </div>
                    <div class=${classMap({ item: true, done: this.todo.done })} @click=${this.handleItemClick}>${this.todo.text}</div>
                    <button @click=${this.handleRemove}>X</button>
                </div>`}
          </div>`;
    }
}
