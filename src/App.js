import React from 'react';
import './App.css';
import { v4 } from 'uuid';

const Header = ({ toDoLength }) => <header>You have { toDoLength } todos</header>;

class SubmitForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: ''
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value })
  }

  handleSubmit(e) {
    e.preventDefault();
    const value = this.state.value;
    if(value) {
      this.props.onAdd(value);
      this.setState({ value: '' });
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <input type="submit" value="Add" />
      </form>
    )
  }
}

const ToDoList = ({ list, onDelete }) => {
  return(
    <ul>
      {list.map(element => {
        const {id, value} = element;
        return (
          <li key={id}>
            {value}
            <button onClick={() => onDelete(id)}>Delete</button>
          </li>
        )
      })}
    </ul>
  )
}

class App extends React.Component {

  state = {
    list: []
  }

  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd(value) {
    this.setState({
      list: this.state.list.concat({
        id: v4(),
        value
      })
    })
  }

  handleDelete(id) {
    this.setState(prev => {
      return {
        list: prev.list.filter(element =>  element.id !== id)
      }
    })
  }

  render() {
    const length = this.state.list.length;
    const list = this.state.list;
    return (
      <div className="App">
        <Header toDoLength={length}/>
        <SubmitForm onAdd={this.handleAdd}/>
        <ToDoList onDelete={this.handleDelete} list={list}/>
      </div>
    );
  }
}

export default App;
