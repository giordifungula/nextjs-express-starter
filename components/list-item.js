import PropTypes from 'prop-types';
import { Component } from 'react';
import Link from 'next/link';

export default class ListItem extends Component {

  render() {
    // console.log(': ', this.props)

    const href = `/list/${this.props._id}`;

    return (
      <div key={this.props._id}>
        <Link href={href}>
          <p>
            <strong>List item: {this.props.name}</strong>
          </p>
        </Link>
        <p>ID: {this.props._id}</p>

        Buttons...

      </div>
    )
  }
}
