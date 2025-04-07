import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#FF4081',
          success: '#4CAF50',
          warning: '#FFC107',
          error: '#FF5252',
          info: '#2196F3',
          background: '#F5F7FA'
        }
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#64B5F6',
          accent: '#FF4081',
          success: '#66BB6A',
          warning: '#FFC107',
          error: '#FF5252',
          info: '#42A5F5',
          background: '#121212'
        }
      }
    },
    variations: {
      colors: ['primary', 'secondary', 'accent'],
      lighten: 5,
      darken: 5
    }
  },
  defaults: {
    VCard: {
      elevation: 2,
      rounded: 'lg'
    },
    VBtn: {
      rounded: 'pill',
      elevation: 1
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable'
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable'
    }
  }
})
