import React from 'react';

import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react';

import {Router, Scene, Stack} from 'react-native-router-flux'

import * as configureStore from './store'

import FirstScreen from './containers/app'
import SecondScreen from './containers/second'
import i18n from 'react-native-i18n'
import {setLocale} from './actions/localisation'

import LocalisationProvider from '../src/localisation'

LocalisationProvider.initLocalisations()

export default class App extends React.Component {

    render() {
        return (
            <Provider store={configureStore.STORE}>
                <PersistGate loading={null}
                             persistor={configureStore.PERSISTOR}
                             onBeforeLift={() => {
                                 const {locale} = configureStore.STORE.getState().localisationReduser;
                                 setLocale(locale);
                             }}>
                    <Router>
                        <Stack key='root'>
                            <Scene key="First" component={FirstScreen} title={i18n.t('first.title')}/>
                            <Scene key="Second" component={SecondScreen} backTitle=" " title={i18n.t('second.title')}/>
                        </Stack>
                    </Router>
                </PersistGate>
            </Provider>
        );
    }
}
