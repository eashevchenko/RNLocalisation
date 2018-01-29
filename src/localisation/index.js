import I18n from 'react-native-i18n'

export default class LocalisationProvider {

    static initLocalisations() {
        I18n.defaultLocale = 'en'
        I18n.fallbacks = true
        I18n.translations = {
            en: require('./en.json'),
            ua: require('./ua.json'),
        };
    }
}
