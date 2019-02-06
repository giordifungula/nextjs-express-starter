import PropTypes from 'prop-types';
import Page from 'components/page';
import Layout from 'components/layout';

import NewListForm from 'components/list-form-new';

export default class NewList extends Page {
  constructor(props) {
    super(props);
  }

  // updateData = async () => {
  //   this.setState({
  //     data: await Todo.list()
  //   });
  // }

  render() {
    // console.log(': ',this.props)
    return (
      <Layout {...this.props} navmenu={false} container={false}>
        <h1>New List</h1>

        <NewListForm
          session={this.props.session}
          // updateData={this.updateData}
          />

      </Layout>
    )
  }
}
