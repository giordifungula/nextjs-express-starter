import Link from 'next/link';
import Page from 'components/page';
import Layout from 'components/layout';

import TodoForm from 'components/todo-form-new';

import Todo from 'client/todo';

export default class extends Page {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined
    }
  }

  updateData = async () => {
    this.setState({
      data: await Todo.list()
    });
  }

  componentDidMount() {
    this.updateData();
  }


  render() {
    return (
      <Layout {...this.props} navmenu={false} container={false}>
        <h1>Home page</h1>

        <pre>
          {this.state.data &&
            JSON.stringify(this.state, null, 2)
          }
        </pre>

        <TodoForm
          session={this.props.session}
          updateData={this.updateData}
          />


      </Layout>
    )
  }
}
