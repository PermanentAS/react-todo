import React, { Component } from "react";

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import ItemAddForm from "../item-add-form/item-add-form";

import "./app.css";

export default class App extends Component {
  maxId = 1;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Build Awesome App"),
      this.createTodoItem("Learn React")
    ],
    term: "",
    filter: "all"
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter(item => item.id !== id);
      return {
        todoData: newArray
      };
    });
  };

  addItem = task => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(task);

      const newArray = [...todoData, newItem];
      return {
        todoData: newArray
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const newArray = arr.map(item => {
      if (item.id === id) {
        item[propName] = !item[propName];
        return item;
      } else {
        return item;
      }
    });
    return {
      todoData: newArray
    };
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return this.toggleProperty(todoData, id, "important");
    });
    console.log("Toggle Important");
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return this.toggleProperty(todoData, id, "done");
    });
  };

  onSearchChange = term => {
    this.setState({ term });
  };

  onFilterChange = filter => {
    this.setState({ filter });
  }

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(el => el.done === true).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
