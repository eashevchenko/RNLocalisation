import React from 'react';

import { connect, Provider } from 'react-redux'
import { Router, Scene, Stack } from 'react-native-router-flux'

import * as configureStore from './store'

import FirstScreen from './containers/app'
import SecondScreen from './containers/second'
import {setLocale} from '../src/actions/localisation'
import i18n from 'react-native-i18n'

import LocalisationProvider from '../src/localisation'

LocalisationProvider.initLocalisations()

export default class App extends React.Component {

    render() {
        return (
            <Provider store={configureStore.STORE}>
                <Router>
                    <Stack key='root'>
                        <Scene key="First" component={FirstScreen} title={i18n.t('first.title')} />
                        <Scene key="Second" component={SecondScreen} backTitle=" " title={i18n.t('second.title')} />
                    </Stack>
                </Router>
            </Provider>
        );
    }
}
