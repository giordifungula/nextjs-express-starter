import { Component } from 'react';
import { Form, Text } from 'informed';
import TodoClient from '../client/todo';
import PropTypes from 'prop-types';

export default class TodoForm extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    updateData: PropTypes.func
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  onSubmit = async() => {
    const FormData = this.formApi.getState();

    // Add the CSRF Token to form data
    FormData.values._csrf = this.props.session.csrfToken;

    const response = await TodoClient.create(FormData.values);

    // Update some function that is passed to the prop
    this.props.updateData && this.props.updateData();
  }

  handleClick = () => {
    console.log(this.formApi.getState());
  }

  render() {
    // console.log(': ',this.props)
    return (
      <div className="w-full max-w-xs">
        <Form
          getApi={this.setFormApi}
          onSubmit={this.onSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
              Todo Name
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
              Add Todo
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
