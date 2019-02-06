import PropTypes from 'prop-types';
import { Component } from 'react';

export default class TodoItem extends Component {

  render() {
    // console.log(': ', this.props)

    return (
      <div>
        <p>
          <strong>{this.props.name}</strong>
        </p>
        <p>ID: {this.props._id}</p>

        Buttons...

      </div>
    )
  }
}
