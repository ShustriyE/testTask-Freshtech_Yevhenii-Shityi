<template>
  <div id="locale">
    <select v-model="selectedLocale" @change="changeLocale" class="locale_block">
      <option
        v-for="(locale, key) in availableLocales"
        :key="key"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<script>
import translates from '../translates_i18n'

export default {
  name: "LocaleComponent",
  data() {
    return {
      selectedLocale: this.$i18n.locale,
    };
  },
  computed: {
    availableLocales() {
      return Object.keys(translates)
    }
  },
  methods: {
    changeLocale() {
      this.$i18n.locale = this.selectedLocale;
    },
  },
};
</script>

<style lang="scss">
#locale {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.locale_block {
  margin: 0 40px;
}
</style>
