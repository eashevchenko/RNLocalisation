import React, { Component } from 'react'
import AppView from '../components/app'
import connect from 'redux-connect-decorator'
import { setLocale } from '../actions/localisation'

@connect(state => ({
}), {
    setLocale
  })
class AppScreen extends React.Component {
  render() {
    return <AppView setLocale={this.props.setLocale} />
  }
}

export default AppScreen


