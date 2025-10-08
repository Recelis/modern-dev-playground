import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("add-todo")
export class AddTodo extends LitElement {
  @state()
  _showModal = false;

  handleClick = () => {
    const options = {
      detail: { name: "addTodo" },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("addTodo", options));
  };
  render() {
    return html`<button @click=${this.handleClick}>Add Todo</button>`;
  }
}
