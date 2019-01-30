import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Signin from './signin'
import { NextAuth } from 'next-auth/client'
import Cookies from 'universal-cookie'

export default class extends React.Component {

  static propTypes() {
    return {
      session: React.PropTypes.object.isRequired,
      providers: React.PropTypes.object.isRequired,
      children: React.PropTypes.object.isRequired,
      fluid: React.PropTypes.boolean,
      navmenu: React.PropTypes.boolean,
      signinBtn: React.PropTypes.boolean
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      navOpen: false,
      modal: false,
      providers: null
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  async toggleModal(e) {
    if (e) e.preventDefault()

    // Save current URL so user is redirected back here after signing in
    if (this.state.modal !== true) {
      const cookies = new Cookies()
      cookies.set('redirect_url', window.location.pathname, { path: '/' })
    }

    this.setState({
      providers: this.state.providers || await NextAuth.providers(),
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>{this.props.title || 'Next.js + Friends Starter Kit'}</title>
        </Head>
        <nav>
          <Link prefetch href="/">
            <a href="/">
              Wanderless
            </a>
          </Link>
          <UserMenu session={this.props.session} toggleModal={this.toggleModal} signinBtn={this.props.signinBtn}/>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

export class UserMenu extends React.Component {
  constructor(props) {
    super(props)
    this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this)
  }

   async handleSignoutSubmit(event) {
     event.preventDefault()

     // Save current URL so user is redirected back here after signing out
     const cookies = new Cookies()
     cookies.set('redirect_url', window.location.pathname, { path: '/' })

     await NextAuth.signout()
     Router.push('/')
   }

  render() {
    if (this.props.session && this.props.session.user) {
      // If signed in display user dropdown menu
      const session = this.props.session
      return (
        <nav>
          <div>
            <Link prefetch href="/account">
              <a href="/account">{session.user.name || session.user.email}</a>
            </Link>
            <AdminMenuItem {...this.props}/>
            <form id="signout" method="post" action="/auth/signout" onSubmit={this.handleSignoutSubmit}>
              <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
              <button type="submit" className="pl-4 rounded-0 text-left dropdown-item"><span className="icon ion-md-log-out mr-1"></span> Sign out</button>
            </form>
          </div>
        </nav>
      )
     } if (this.props.signinBtn === false) {
       // If not signed in, don't display sign in button if disabled
      return null
    } else {
      // If not signed in, display sign in button
      return (
        <nav>
          <div>
            {/**
              * @TODO Add support for passing current URL path as redirect URL
              * so that users without JavaScript are also redirected to the page
              * they were on before they signed in.
              **/}
            <a href="/auth?redirect=/">Sign up / Sign in</a>
          </div>
        </nav>
      )
    }
  }
}

export class AdminMenuItem extends React.Component {
  render() {
    if (this.props.session.user && this.props.session.user.admin === true) {
      return (
        <React.Fragment>
          <Link prefetch href="/admin">
            <a href="/admin"> Admin</a>
          </Link>
        </React.Fragment>
      )
    } else {
      return(<div/>)
    }
  }
}
