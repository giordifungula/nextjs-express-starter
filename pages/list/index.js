import { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'client/list';
import Todo from 'client/todo';
import { NextAuth } from 'next-auth/client'

export default class ListView extends Component {
  static async getInitialProps({ req }) {
    return {
      lang: 'en',
      list: await List.findOne(req.params.id),
      session: await NextAuth.init({req}),
      // todos: await Todo.findByListId(req.params.id),
    }
  }


  constructor(props) {
    super(props);

    this.state = {
      todos: undefined
    }
  }

  updateData = async () => {
    this.setState({
      todos: await Todo.findByListId(this.props.list._id),
    });
  }

  componentDidMount() {
    this.updateData();
  }

  static propTypes = {
    listItem: PropTypes.func
  }

  render() {

    return (
      <div className="w-full max-w-xs">
        <h1>List</h1>
        <p>{this.props.list.name}</p>
        <p>{this.props.list._id}</p>

        <div>
          {this.state.todos &&
            this.state.todos.map(todo =>
              <div key={todo._id}>
                {todo.name}
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
