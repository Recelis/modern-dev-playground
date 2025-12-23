import { expect, fixture, html } from '@open-wc/testing';
import { LitIndex } from './lit-index';
import type { Todo } from './types';

describe('LitIndex', () => {
  it('renders the todo app', async () => {
    const el = await fixture<LitIndex>(html`<lit-index></lit-index>`);
    
    await el.updateComplete;

    const h1 = el.shadowRoot?.querySelector('h1');
    expect(h1?.textContent).to.include('Lit To do App');
  });

  it('renders add-todo and todo-list components', async () => {
    const el = await fixture<LitIndex>(html`<lit-index></lit-index>`);
    
    await el.updateComplete;

    const addTodo = el.shadowRoot?.querySelector('add-todo');
    const todoList = el.shadowRoot?.querySelector('todo-list');
    
    expect(addTodo).to.exist;
    expect(todoList).to.exist;
  });

  it('adds a new todo when addTodo event is dispatched', async () => {
    const el = await fixture<LitIndex>(html`<lit-index></lit-index>`);
    
    await el.updateComplete;
    expect(el._todos.length).to.equal(0);

    // Dispatch addTodo event
    window.dispatchEvent(new CustomEvent('addTodo'));
    
    await el.updateComplete;
    expect(el._todos.length).to.equal(1);
    expect(el._todos[0].text).to.equal('');
    expect(el._todos[0].done).to.be.false;
  });

  it('updates a todo when updateTodo event is dispatched', async () => {
    const el = await fixture<LitIndex>(html`<lit-index></lit-index>`);
    
    await el.updateComplete;
    
    // Add a todo first
    window.dispatchEvent(new CustomEvent('addTodo'));
    await el.updateComplete;
    
    const todoId = el._todos[0].id;
    const updatedTodo: Todo = { id: todoId, text: 'Updated text', done: true };
    
    // Dispatch updateTodo event
    window.dispatchEvent(new CustomEvent('updateTodo', { detail: updatedTodo }));
    
    await el.updateComplete;
    expect(el._todos[0].text).to.equal('Updated text');
    expect(el._todos[0].done).to.be.true;
  });

  it('removes a todo when removeTodo event is dispatched', async () => {
    const el = await fixture<LitIndex>(html`<lit-index></lit-index>`);
    
    await el.updateComplete;
    
    // Add two todos
    window.dispatchEvent(new CustomEvent('addTodo'));
    await el.updateComplete;
    window.dispatchEvent(new CustomEvent('addTodo'));
    await el.updateComplete;
    
    expect(el._todos.length).to.equal(2);
    const todoId = el._todos[0].id;
    
    // Dispatch removeTodo event
    window.dispatchEvent(new CustomEvent('removeTodo', { detail: { id: todoId } }));
    
    await el.updateComplete;
    expect(el._todos.length).to.equal(1);
    expect(el._todos[0].id).to.not.equal(todoId);
  });

  it('passes todos to todo-list component', async () => {
    const el = await fixture<LitIndex>(html`<lit-index></lit-index>`);
    
    await el.updateComplete;
    
    // Add a todo
    window.dispatchEvent(new CustomEvent('addTodo'));
    await el.updateComplete;
    
    const todoList = el.shadowRoot?.querySelector('todo-list');
    expect(todoList).to.exist;
    // The todoList should receive the todos via property binding
    // We can verify this by checking the component's property
    await (todoList as any)?.updateComplete;
    expect((todoList as any).todoList?.length).to.equal(1);
  });
});

