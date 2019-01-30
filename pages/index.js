import Link from 'next/link'
import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'

import Todo from '../models/todo'

export default class extends Page {

  async updateData() {
    this.setState({
      data: await Todo.list(),
      newTodo: await Todo.create()
    })
  }

  async componentDidMount() {
    await this.updateData()
  }

  render() {
    return (
      <Layout {...this.props} navmenu={false} container={false}>
        <h1>Home page</h1>

        <pre>
        {JSON.stringify(this.state, null, 2)}
        </pre>
      </Layout>
    )
  }
}
