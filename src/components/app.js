import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

export default class FirstView extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <Text>{I18n.t('greetings', { name: 'Eugene' })}</Text>
        <Text>{I18n.t('first.title')}</Text>
        <Button title="UA"
          onPress={() => {
            this.props.setLocale('ua')
            this.forceUpdate()
          }} />
        <Button title="EN"
          onPress={() => {
            this.props.setLocale('en')
            this.forceUpdate()
          }} />
        <Button title="Next"
          onPress={() => {
            Actions.Second()
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
