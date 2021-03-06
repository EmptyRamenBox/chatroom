import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: colors.cyan.accent1,
        background: colors.grey.darken1,
      },
    },
  },
});
