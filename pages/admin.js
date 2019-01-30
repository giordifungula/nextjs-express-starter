/**
 * This is an example of a simple (read only) user dashboard. To acess this page
 * page you need to use MongoDB and set '"admin": true' on your account.
 **/
import Link from 'next/link'
import Page from '../components/page'
import Layout from '../components/layout'
import Loader from '../components/loader'
import User from '../models/user'
import Todo from '../models/todo'

export default class extends Page {
  constructor(props) {
    super(props)

    this.state = {
      userData: null,
      todoData: null
    }

    this.options = {
      onPageChange: this.onPageChange.bind(this),
      onSizePerPageList: this.sizePerPageListChange.bind(this),
      page: 1,
      pageStartIndex: 1,
      paginationPosition: 'top',
      paginationSize: 5,
      sizePerPage: 10,
      sizePerPageList: [ 10, 50, 100 ]
    }
  }

  async componentDidMount() {
    await this.updateData()
  }

  async onPageChange(page, sizePerPage) {
    this.options.page = page
    this.options.sizePerPage = sizePerPage
    await this.updateData()
  }

  async sizePerPageListChange(sizePerPage) {
    this.options.sizePerPage = sizePerPage
    await this.updateData()
  }

  async updateData() {
    this.setState({
      userData: await User.list({
          page: this.options.page,
          size: this.options.sizePerPage
      }),
      todoData: await Todo.list()
    })
  }

  render() {

    console.log('this.state.todoData: ',this.state)

    if (!this.props.session.user || this.props.session.user.admin !== true)
      return super.adminAccessOnly()

    const userData = (this.state.userData && this.state.userData.users) ? this.state.userData.users : []
    const totalSize = (this.state.userData && this.state.userData.total) ? this.state.userData.total : 0

    return (
      <Layout {...this.props} navmenu={false}>
        <h1 className="display-4">Administration</h1>
        <p className="lead text-muted ">
          This is an example read-only admin page which lists user accounts.
        </p>
        <Table
          userData={userData}
          totalSize={totalSize}
          options={this.options} />
      </Layout>
    )
  }
}

export class Table extends React.Component {
  render() {
    if (!this.props.userData || this.props.userData.length < 1)
      return (<Loader/>)

    const numberTo = (this.props.options.page * this.props.options.sizePerPage < this.props.totalSize) ? (this.props.options.page * this.props.options.sizePerPage) : this.props.totalSize
    const numberFrom = numberTo - this.props.userData.length + 1
    return (
      <React.Fragment>
        <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
          {this.props.userData.map(user =>
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          )}
          </tbody>
        </table>
        <p className="mt-2 text-muted text-right">
          Displaying <strong>{numberFrom}-{numberTo}</strong> of <strong>{this.props.totalSize}</strong>
        </p>
      </React.Fragment>
    )
  }
}
