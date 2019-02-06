import { Form, Text } from 'informed';
import PropTypes from 'prop-types';
import { Component } from 'react';
import ListItem from 'components/list-item';
import { NextAuth } from 'next-auth/client'
import List from 'client/list';

export default class Lists extends Component {

  static async getInitialProps({ req }) {
    return {
      lang: 'en',
      lists: await List.list(),
      session: await NextAuth.init({req}),
    }
  }

  render() {
    // console.log('props: ',this.props)

    return (
      <div className="w-full max-w-xs">
        <h1>Lists</h1>


        {this.props.lists &&
          this.props.lists.map(list =>
            <ListItem {...list} />
          )
        }
      </div>
    )
  }
}
