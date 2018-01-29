import React, { Component } from 'react'
import SecondView from '../components/second'
import connect from 'redux-connect-decorator'
import {setLocale} from '../actions/localisation'

@connect(state => ({
}), {
    setLocale
  })
class SecondScreen extends React.Component {
  render() {
    return <SecondView setlocale={this.props.setLocale} />
  }
}

export default SecondScreen 


