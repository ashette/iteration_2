import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from 'vuetify/lib/locale/ru'

import RadioOnIcon from '../components/icons/RadioOnIcon.vue';
import RadioOffIcon from '../components/icons/RadioOffIcon.vue';
import CheckboxOnIcon from '../components/icons/CheckboxOnIcon.vue';
import CheckboxOffIcon from '../components/icons/CheckboxOffIcon.vue';

Vue.use(Vuetify);

const THEME_ICONS = {
    radioOn: { component: RadioOnIcon },
    radioOff: { component: RadioOffIcon },
    checkboxOn: { component: CheckboxOnIcon },
    checkboxOff: { component: CheckboxOffIcon }
}

export default new Vuetify({
    lang: {
        locales: { ru },
        current: 'ru',
    },
    theme: {
        themes: {
            light: {
                primary: {
                    base: '#007BFF',
                },
                secondary: '#7B0C3B',
                tertiary: '#999999',
                background: '#FFFFFF',
                disabled: '#EEEEEE',
                font: '#121212',
                menu: '#151B1F',
                green: {
                    base: '#0C7B1B',
                    darken1: '#13493F'
                },
                teal: {
                    base: '#0C7B67',
                    darken1: '#132949'
                },
                bordo: {
                    base: '#7B0C3B',
                    darken1: '#493013'
                },
                purple: {
                    base: '#720C7B',
                    darken1: '#281349'
                },
                'admin-primary': {
                    base: '#007BFF'
                },
                'admin-secondary': {
                    base: '#CB3656'
                },
                'admin-tertiary': {
                    base: '#E9ECEF'
                },
                'admin-background': {
                    base: '#F5F6F8'
                },
                'admin-font': {
                    base: '#3D5170',
                    darken1: '#495057'
                },
                'admin-border': {
                    base: '#BECAD6'
                },
                'admin-error': '#C4183C'
            }
        },
        options: {
            customProperties: true
        },
        loader: 'sass-loader',
    },
    icons: {
        values: THEME_ICONS,
    },
    breakpoint: {
        thresholds: {
            xs: 768,
            sm: 1024,
            md: 1440,
            lg: 1920,
        },
    },
});
