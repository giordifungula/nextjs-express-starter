import { Component } from 'react';
import { Form, Text } from 'informed';
import ListClient from '../client/list';
import PropTypes from 'prop-types';

export default class ListFormUpdate extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    updateData: PropTypes.func,
    listData: PropTypes.object
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  onSubmit = async() => {
    const FormData = this.formApi.getState();

    // Add the CSRF Token to form data
    FormData.values._csrf = this.props.session.csrfToken;

    const response = await ListClient.create(FormData.values);

    console.log('new list response: ',response)

    if (response.ok) {
      // redirect to /lists/:id

    }
  }

  handleClick = () => {
    console.log(this.formApi.getState());
  }

  render() {
    console.log(': ',this.props)

    return (
      <div className="w-full max-w-xs">
        <Form
          getApi={this.setFormApi}
          onSubmit={this.onSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
              List Name
            </label>
            <Text
              field="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              type="text"/>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Save List
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
              href="#"
              onClick={this.handleClick}>
              Print Form State
            </a>
          </div>
        </Form>
        <p className="text-center text-grey text-xs">
          ©2019
        </p>
      </div>
    )
  }
}
