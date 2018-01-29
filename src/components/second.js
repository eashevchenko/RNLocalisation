import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import I18n from 'react-native-i18n'

export default class SecondView extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{I18n.t('greetings', { name: 'Eugene' })}</Text>
        <Text>{I18n.t('second.title')}</Text>
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
